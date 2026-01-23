// Exercise data with emojis for visual appeal and image paths
const exercises = [
    { id: 1, name: 'Lat Pulldowns', emoji: '🦾', category: 'Back', image: 'images/exercises/LatPulldowns.png' },
    { id: 2, name: 'Seated Cable Row', emoji: '🚣', category: 'Back', image: 'images/exercises/SeatedCableRow.png' },
    { id: 3, name: 'Chest Supported Row', emoji: '💪', category: 'Back', image: 'images/exercises/ChestSupportedRow.png' },
    { id: 4, name: 'Machine Chest Press', emoji: '🏋️', category: 'Chest', image: 'images/exercises/MachineChestPress.png' },
    { id: 5, name: 'Incline Chest Press', emoji: '📈', category: 'Chest', image: 'images/exercises/InclineChestPress.png' },
    { id: 6, name: 'Machine Chest Fly', emoji: '🦅', category: 'Chest', image: 'images/exercises/MachineChestFly.png' },
    { id: 7, name: 'Shoulder Press', emoji: '⬆️', category: 'Shoulders', image: 'images/exercises/ShoulderPress.png' },
    { id: 8, name: 'Lateral Raises', emoji: '🤸', category: 'Shoulders', image: 'images/exercises/LateralRaises.png' },
    { id: 9, name: 'Rear Delt Fly', emoji: '🦋', category: 'Shoulders', image: 'images/exercises/RearDeltFly.png' },
    { id: 10, name: 'Cable Bicep Curl', emoji: '💪', category: 'Biceps', image: 'images/exercises/CableBicepCurl.png' },
    { id: 11, name: 'Preacher Curls', emoji: '🙏', category: 'Biceps', image: 'images/exercises/PreacherCurls.png' },
    { id: 12, name: 'Hammer Curls', emoji: '🔨', category: 'Biceps', image: 'images/exercises/HammerCurls.png' },
    { id: 13, name: 'Rope Triceps Pushdowns', emoji: '⬇️', category: 'Triceps', image: 'images/exercises/RopeTricepsPushdowns.png' },
    { id: 14, name: 'Overhead Tricep Extensions', emoji: '☝️', category: 'Triceps', image: 'images/exercises/OverheadTricepExtensions.png' },
    { id: 15, name: 'Leg Press', emoji: '🦵', category: 'Legs', image: 'images/exercises/LegPress.png' },
    { id: 16, name: 'Leg Extensions', emoji: '🔥', category: 'Legs', image: 'images/exercises/LegExtensions.png' },
    { id: 17, name: 'Crunches', emoji: '🔄', category: 'Abs', image: 'images/exercises/Crunches.png' }
];

let workoutData = {
    exercises: {},
    stats: {
        totalWorkouts: 0,
        totalSets: 0,
        streak: 0,
        lastWorkoutDate: null
    }
};

let currentExerciseId = null;
let currentUser = null;
let chart = null;

// Available users
const USERS = ['Lukas', 'Kozma'];

// User icons
const USER_ICONS = {
    'Lukas': '👨',
    'Kozma': '🧔'
};

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadUserSelection();
    setupEventListeners();
});

// Load user selection screen
function loadUserSelection() {
    const grid = document.getElementById('userCardsGrid');
    grid.innerHTML = '';
    
    USERS.forEach(username => {
        const card = document.createElement('div');
        card.className = 'user-card';
        card.onclick = () => selectUser(username);
        
        const icon = USER_ICONS[username] || '👤';
        
        card.innerHTML = `
            <div class="user-card-icon">${icon}</div>
            <h2 class="user-card-name">${username}</h2>
            <p class="user-card-label">Click to continue</p>
        `;
        
        grid.appendChild(card);
    });
}

// Select a user and load their data
function selectUser(username) {
    currentUser = username;
    
    // Update user display
    document.getElementById('currentUserDisplay').textContent = username;
    document.getElementById('currentUserDisplayDetail').textContent = username;
    
    // Hide user selection, show main page
    document.getElementById('userSelectionPage').style.display = 'none';
    document.getElementById('mainPage').style.display = 'block';
    
    // Load user data
    loadData();
    renderExercises();
    updateStats();
}

// Switch to user selection screen
function switchUser() {
    document.getElementById('mainPage').style.display = 'none';
    document.getElementById('detailPage').style.display = 'none';
    document.getElementById('userSelectionPage').style.display = 'block';
    currentUser = null;
    currentExerciseId = null;
}

// Load data from localStorage for current user
function loadData() {
    if (!currentUser) {
        console.error('No user selected');
        return;
    }
    
    const storageKey = `gymProgressData_${currentUser}`;
    const savedData = localStorage.getItem(storageKey);
    
    if (savedData) {
        try {
            workoutData = JSON.parse(savedData);
            // Ensure all exercises exist in the data structure
            exercises.forEach(exercise => {
                if (!workoutData.exercises[exercise.id]) {
                    workoutData.exercises[exercise.id] = {
                        name: exercise.name,
                        workouts: []
                    };
                }
            });
        } catch (error) {
            console.error('Error loading data:', error);
            initializeData();
        }
    } else {
        initializeData();
    }
}

// Initialize data structure
function initializeData() {
    workoutData.exercises = {};
    exercises.forEach(exercise => {
        workoutData.exercises[exercise.id] = {
            name: exercise.name,
            workouts: []
        };
    });
    saveData();
}

// Save data to localStorage for current user
function saveData() {
    if (!currentUser) {
        console.error('No user selected');
        return;
    }
    
    const storageKey = `gymProgressData_${currentUser}`;
    localStorage.setItem(storageKey, JSON.stringify(workoutData));
}

// Render exercise cards
function renderExercises() {
    const grid = document.getElementById('exercisesGrid');
    grid.innerHTML = '';

    exercises.forEach(exercise => {
        const exerciseData = workoutData.exercises[exercise.id];
        const lastWorkout = exerciseData?.workouts[exerciseData.workouts.length - 1];
        
        const card = document.createElement('div');
        card.className = 'exercise-card';
        card.onclick = () => navigateToDetail(exercise.id);

        const lastWeight = lastWorkout ? lastWorkout.weight : 0;
        const lastReps = lastWorkout ? lastWorkout.reps : 0;
        const totalSessions = exerciseData?.workouts.length || 0;

        // Try to load image, fallback to emoji
        const imageHtml = `
            <img src="${exercise.image}" 
                 alt="${exercise.name}" 
                 style="width: 100%; height: 100%; object-fit: cover;"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <span style="display: none; width: 100%; height: 100%; align-items: center; justify-content: center; font-size: 4rem;">${exercise.emoji}</span>
        `;

        card.innerHTML = `
            <div class="exercise-image">
                ${imageHtml}
            </div>
            <div class="exercise-info">
                <h3 class="exercise-name">${exercise.name}</h3>
                <p style="color: var(--text-secondary); font-size: 0.9rem;">${exercise.category}</p>
                <div class="exercise-stats">
                    <div class="exercise-stat">
                        <div class="exercise-stat-value">${lastWeight}</div>
                        <div class="exercise-stat-label">Last Weight (kg)</div>
                    </div>
                    <div class="exercise-stat">
                        <div class="exercise-stat-value">${lastReps}</div>
                        <div class="exercise-stat-label">Last Reps</div>
                    </div>
                    <div class="exercise-stat">
                        <div class="exercise-stat-value">${totalSessions}</div>
                        <div class="exercise-stat-label">Sessions</div>
                    </div>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });
}

// Update statistics
function updateStats() {
    // Calculate total workouts (unique dates across all exercises)
    const allDates = new Set();
    let totalSets = 0;

    Object.values(workoutData.exercises).forEach(exercise => {
        exercise.workouts.forEach(workout => {
            allDates.add(workout.date.split('T')[0]);
            totalSets += workout.sets || 1;
        });
    });

    workoutData.stats.totalWorkouts = allDates.size;
    workoutData.stats.totalSets = totalSets;

    // Calculate streak
    const sortedDates = Array.from(allDates).sort().reverse();
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < sortedDates.length; i++) {
        const workoutDate = new Date(sortedDates[i]);
        workoutDate.setHours(0, 0, 0, 0);
        
        const daysDiff = Math.floor((today - workoutDate) / (1000 * 60 * 60 * 24));
        
        if (i === 0 && daysDiff <= 1) {
            streak = 1;
        } else if (i > 0) {
            const prevDate = new Date(sortedDates[i - 1]);
            prevDate.setHours(0, 0, 0, 0);
            const diff = Math.floor((prevDate - workoutDate) / (1000 * 60 * 60 * 24));
            
            if (diff === 1) {
                streak++;
            } else {
                break;
            }
        }
    }

    workoutData.stats.streak = streak;

    // Update UI
    document.getElementById('totalWorkouts').textContent = workoutData.stats.totalWorkouts;
    document.getElementById('totalSets').textContent = workoutData.stats.totalSets;
    document.getElementById('streak').textContent = workoutData.stats.streak;

    // Add animation to stat values
    document.querySelectorAll('.stat-value').forEach(el => {
        el.style.animation = 'none';
        setTimeout(() => {
            el.style.animation = 'scaleIn 0.5s ease-out';
        }, 10);
    });
}

// Navigate to detail page
function navigateToDetail(exerciseId) {
    currentExerciseId = exerciseId;
    const exercise = exercises.find(e => e.id === exerciseId);
    
    // Update detail page content
    document.getElementById('detailExerciseName').textContent = exercise.name;
    document.getElementById('detailExerciseCategory').textContent = exercise.category;
    document.getElementById('detailExerciseEmoji').textContent = exercise.emoji;
    
    // Load image
    const detailImage = document.getElementById('detailExerciseImage');
    const imageFallback = document.getElementById('detailImageFallback');
    
    detailImage.src = exercise.image;
    detailImage.style.display = 'block';
    imageFallback.style.display = 'none';
    
    detailImage.onerror = function() {
        this.style.display = 'none';
        imageFallback.style.display = 'flex';
    };
    
    // Pre-fill with last workout data
    const exerciseData = workoutData.exercises[exerciseId];
    const lastWorkout = exerciseData.workouts[exerciseData.workouts.length - 1];
    
    if (lastWorkout) {
        document.getElementById('detailWeightInput').value = lastWorkout.weight;
        document.getElementById('detailRepsInput').value = lastWorkout.reps;
        document.getElementById('detailSetsInput').value = lastWorkout.sets || 1;
    } else {
        document.getElementById('detailWeightInput').value = '';
        document.getElementById('detailRepsInput').value = '';
        document.getElementById('detailSetsInput').value = 1;
    }
    
    // Update quick stats
    updateDetailQuickStats(exerciseId);
    
    // Render history and chart
    renderDetailHistory(exerciseId);
    renderDetailChart(exerciseId);
    
    // Switch pages
    document.getElementById('mainPage').style.display = 'none';
    document.getElementById('detailPage').style.display = 'block';
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Focus on weight input
    setTimeout(() => {
        document.getElementById('detailWeightInput').focus();
    }, 300);
}

// Navigate back to main page
function navigateToMain() {
    document.getElementById('detailPage').style.display = 'none';
    document.getElementById('mainPage').style.display = 'block';
    currentExerciseId = null;
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Update quick stats on detail page
function updateDetailQuickStats(exerciseId) {
    const exerciseData = workoutData.exercises[exerciseId];
    const workouts = exerciseData.workouts;
    
    const lastWorkout = workouts[workouts.length - 1];
    const lastWeight = lastWorkout ? lastWorkout.weight : 0;
    const lastReps = lastWorkout ? lastWorkout.reps : 0;
    const totalSessions = workouts.length;
    
    // Calculate best volume
    let bestVolume = 0;
    workouts.forEach(workout => {
        const volume = workout.weight * workout.reps * (workout.sets || 1);
        if (volume > bestVolume) {
            bestVolume = volume;
        }
    });
    
    document.getElementById('detailLastWeight').textContent = `${lastWeight} kg`;
    document.getElementById('detailLastReps').textContent = lastReps;
    document.getElementById('detailTotalSessions').textContent = totalSessions;
    document.getElementById('detailBestVolume').textContent = Math.round(bestVolume);
}

// Render workout history on detail page
function renderDetailHistory(exerciseId) {
    const exerciseData = workoutData.exercises[exerciseId];
    const historyList = document.getElementById('detailHistoryList');
    
    if (!exerciseData.workouts.length) {
        historyList.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">No workouts yet. Add your first one!</p>';
        return;
    }
    
    const recentWorkouts = exerciseData.workouts.slice(-20).reverse();
    
    historyList.innerHTML = recentWorkouts.map(workout => {
        const date = new Date(workout.date);
        const formattedDate = date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
        });
        
        const volume = workout.weight * workout.reps * (workout.sets || 1);
        
        return `
            <div class="history-item">
                <div class="history-info">
                    <span class="history-badge">${workout.weight} kg × ${workout.reps}</span>
                    ${workout.sets > 1 ? `<span class="history-badge">${workout.sets} sets</span>` : ''}
                    <span class="history-badge" style="background: var(--secondary-color);">Vol: ${volume}</span>
                </div>
                <span class="history-date">${formattedDate}</span>
            </div>
        `;
    }).join('');
}

// Render progress chart on detail page using Canvas
function renderDetailChart(exerciseId) {
    const exerciseData = workoutData.exercises[exerciseId];
    const canvas = document.getElementById('detailProgressChart');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = 250 * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    const width = canvas.offsetWidth;
    const height = 250;
    
    if (!exerciseData.workouts.length) {
        ctx.fillStyle = '#94a3b8';
        ctx.font = '14px "Segoe UI"';
        ctx.textAlign = 'center';
        ctx.fillText('No data yet', width / 2, height / 2);
        return;
    }
    
    // Prepare data - show last 20 workouts
    const workouts = exerciseData.workouts.slice(-20);
    const data = workouts.map(w => w.weight * w.reps); // Volume as metric
    const labels = workouts.map((w, i) => {
        const date = new Date(w.date);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    
    // Calculate bounds
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue || 1;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw grid
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
        const y = padding + (chartHeight / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    
    // Draw line
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    
    ctx.beginPath();
    data.forEach((value, i) => {
        const x = padding + (chartWidth / (data.length - 1 || 1)) * i;
        const y = padding + chartHeight - ((value - minValue) / range) * chartHeight;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
    
    // Draw gradient under line
    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.3)');
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    data.forEach((value, i) => {
        const x = padding + (chartWidth / (data.length - 1 || 1)) * i;
        const y = padding + chartHeight - ((value - minValue) / range) * chartHeight;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.lineTo(width - padding, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.closePath();
    ctx.fill();
    
    // Draw points
    data.forEach((value, i) => {
        const x = padding + (chartWidth / (data.length - 1 || 1)) * i;
        const y = padding + chartHeight - ((value - minValue) / range) * chartHeight;
        
        ctx.fillStyle = '#6366f1';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#f1f5f9';
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
    });
    
    // Draw labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px "Segoe UI"';
    ctx.textAlign = 'center';
    
    // X-axis labels (show every few labels to avoid crowding)
    const labelStep = Math.ceil(labels.length / 5);
    labels.forEach((label, i) => {
        if (i % labelStep === 0 || i === labels.length - 1) {
            const x = padding + (chartWidth / (data.length - 1 || 1)) * i;
            ctx.fillText(label, x, height - padding + 20);
        }
    });
    
    // Y-axis labels
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
        const value = minValue + (range / 4) * (4 - i);
        const y = padding + (chartHeight / 4) * i;
        ctx.fillText(Math.round(value), padding - 10, y + 4);
    }
    
    // Title
    ctx.fillStyle = '#f1f5f9';
    ctx.font = 'bold 13px "Segoe UI"';
    ctx.textAlign = 'left';
    ctx.fillText('Volume (Weight × Reps)', padding, padding - 15);
}

// Save workout from detail page
function saveDetailWorkout() {
    const weight = parseFloat(document.getElementById('detailWeightInput').value);
    const reps = parseInt(document.getElementById('detailRepsInput').value);
    const sets = parseInt(document.getElementById('detailSetsInput').value);
    
    if (!weight || !reps || !sets) {
        alert('Please fill in all fields');
        return;
    }
    
    const workout = {
        date: new Date().toISOString(),
        weight: weight,
        reps: reps,
        sets: sets
    };
    
    workoutData.exercises[currentExerciseId].workouts.push(workout);
    saveData();
    updateStats();
    
    // Update detail page
    updateDetailQuickStats(currentExerciseId);
    renderDetailHistory(currentExerciseId);
    renderDetailChart(currentExerciseId);
    
    // Clear inputs
    document.getElementById('detailWeightInput').value = '';
    document.getElementById('detailRepsInput').value = '';
    document.getElementById('detailSetsInput').value = 1;
    
    // Show success feedback
    showDetailSuccessAnimation();
    
    // Focus back on weight input
    setTimeout(() => {
        document.getElementById('detailWeightInput').focus();
    }, 1500);
}

// Show success animation on detail page
function showDetailSuccessAnimation() {
    const button = document.getElementById('detailSaveWorkout');
    const originalText = button.textContent;
    button.textContent = '✓ Workout Saved!';
    button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = 'var(--gradient)';
    }, 1500);
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('backButton').addEventListener('click', navigateToMain);
    document.getElementById('detailSaveWorkout').addEventListener('click', saveDetailWorkout);
    document.getElementById('switchUserBtn').addEventListener('click', switchUser);
    document.getElementById('switchUserBtnDetail').addEventListener('click', switchUser);
    document.getElementById('downloadDataBtn').addEventListener('click', downloadUserData);
    document.getElementById('downloadDataBtnDetail').addEventListener('click', downloadUserData);
    document.getElementById('importDataBtn').addEventListener('click', importUserData);
    document.getElementById('importDataBtnDetail').addEventListener('click', importUserData);
    
    // Navigate back on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && currentExerciseId !== null) {
            navigateToMain();
        }
    });
    
    // Submit on Enter key in detail page inputs
    const inputs = ['detailWeightInput', 'detailRepsInput', 'detailSetsInput'];
    inputs.forEach(id => {
        document.getElementById(id).addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveDetailWorkout();
            }
        });
    });
}

// Export current user's data to JSON file
function downloadUserData() {
    if (!currentUser) {
        alert('No user selected');
        return;
    }
    
    const dataStr = JSON.stringify(workoutData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gym-progress-${currentUser}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    console.log(`✅ Downloaded workout data for ${currentUser}`);
}

// Import user data from JSON file
function importUserData() {
    if (!currentUser) {
        alert('No user selected');
        return;
    }
    
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const importedData = JSON.parse(event.target.result);
                
                // Validate data structure
                if (!importedData.exercises || !importedData.stats) {
                    throw new Error('Invalid data format');
                }
                
                // Confirm before overwriting
                if (confirm(`Import workout data for ${currentUser}? This will overwrite current data.`)) {
                    workoutData = importedData;
                    saveData();
                    renderExercises();
                    updateStats();
                    
                    // Refresh detail page if open
                    if (currentExerciseId) {
                        updateDetailQuickStats(currentExerciseId);
                        renderDetailHistory(currentExerciseId);
                        renderDetailChart(currentExerciseId);
                    }
                    
                    alert('✅ Data imported successfully!');
                }
            } catch (error) {
                console.error('Error importing data:', error);
                alert('❌ Failed to import data. Please check the file format.');
            }
        };
        reader.readAsText(file);
    };
    
    input.click();
}

// Make functions available globally
window.downloadGymData = downloadUserData;
window.importGymData = importUserData;
