# 💪 Gym Progress Tracker

A clean, modern web app to track your gym progress with visual exercise images, detailed statistics, and motivating progress charts.

## ✨ Features

- **Multi-User Support** - Separate profiles for Lukas and Kozma (easily add more)
- **17 Exercises** with custom images organized by muscle group
- **Detailed Exercise View** - Full-screen detail page with large images
- **Progress Tracking** - Log weight, reps, and sets for each workout
- **Visual Progress Charts** - See your volume (weight × reps) trending upward
- **Statistics Dashboard** - Track total workouts, sets, and workout streaks
- **Auto-Save** - All data saved to browser localStorage per user
- **Backup & Restore** - Download/upload JSON files for each user
- **User Switching** - Switch between users anytime
- **Responsive Design** - Works beautifully on desktop, tablet, and mobile
- **No Server Required** - Works completely offline and on GitHub Pages

## 🚀 Quick Start

1. **Open `index.html`** in your web browser (or visit the GitHub Pages URL)
2. **Select your user** (Lukas or Kozma) on the welcome screen
3. Click any exercise card to open the detail view
4. Enter your weight, reps, and sets
5. Click "💪 Save Workout" - data saves automatically to browser storage
6. Watch your progress graph grow over time!

### Additional Features:
- **Switch users**: Click the ↻ button in the header
- **Backup data**: Click the 💾 button to download JSON backup
- **Import data**: Click the 📥 button to restore from backup
- **View on any device**: Your data stays with your browser

## 📁 Project Structure

```
├── index.html          # Main HTML with multi-page layout
├── styles.css          # Complete styling with animations
├── script.js           # All functionality and localStorage management
├── README.md           # This file
├── data/               # Reference folder for data structure
│   └── users/          # User folders (for documentation)
│       ├── Lukas/
│       └── Kozma/
└── images/
    └── exercises/      # Exercise images (17 total)
        ├── LatPulldowns.png
        ├── SeatedCableRow.png
        ├── ChestSupportedRow.png
        └── ... (14 more)
```

## 🖼️ Adding Exercise Images

Place your exercise images in the `images/exercises/` folder with these exact names:

1. `LatPulldowns.png`
2. `SeatedCableRow.png`
3. `PreacherCurls.png`
4. `BenchPress.png`
5. `ShoulderPress.png`
6. `Squats.png`
7. `Deadlifts.png`
8. `LegPress.png`
9. `TricepPushdowns.png`
10. `DumbbellFlyes.png`

**Supported formats:** PNG, JPG  
**Recommended size:** 800x600px or larger  
**Aspect ratio:** 4:3 or 16:9

If an image is missing, the app will display an emoji placeholder instead.

## 💾 Data Storage

Your workout data is saved in **browser localStorage**:
- **Separate storage per user**: `gymProgressData_Lukas` and `gymProgressData_Kozma`
- **Automatic saving**: Every workout is saved immediately
- **Persistent**: Data stays even after closing the browser

### Backup Your Data

Click the **💾 Download Backup** button to save your data as a JSON file:
- Downloads as: `gym-progress-[Username]-[Date].json`
- Save this file somewhere safe (Google Drive, Dropbox, etc.)

### Restore from Backup

Click the **📥 Import Data** button to restore from a JSON backup:
- Select your previously downloaded JSON file
- Confirm to overwrite current data
- All workouts will be restored

### Add New Users

Edit `script.js` and add to the `USERS` array:
```javascript
const USERS = ['Lukas', 'Kozma', 'NewName'];
```
Optionally add an icon:
```javascript
const USER_ICONS = {
    'Lukas': '👨',
    'Kozma': '🧔',
    'NewName': '👤'
};
```

## 🎨 Design Features

- **Dark theme** with purple/blue gradients
- **Smooth animations** on all interactions
- **Page transitions** between exercise list and detail view
- **Responsive grid layouts** that adapt to screen size
- **Custom scrollbars** for a polished look
- **Hover effects** and interactive elements

## ⌨️ Keyboard Shortcuts

- **Enter** - Save workout (when in input fields)
- **Escape** - Return to exercise list from detail view

## 🏋️ Exercises Included (17 Total)

### Back (3)
- Lat Pulldowns 🦾
- Seated Cable Row 🚣
- Chest Supported Row 💪

### Chest (3)
- Machine Chest Press 🏋️
- Incline Chest Press 📈
- Machine Chest Fly 🦅

### Shoulders (3)
- Shoulder Press ⬆️
- Lateral Raises 🤸
- Rear Delt Fly 🦋

### Biceps (3)
- Cable Bicep Curl 💪
- Preacher Curls 🙏
- Hammer Curls 🔨

### Triceps (2)
- Rope Triceps Pushdowns ⬇️
- Overhead Tricep Extensions ☝️

### Legs (2)
- Leg Press 🦵
- Leg Extensions 🔥

### Abs (1)
- Crunches 🔄

## 📊 Metrics Tracked

- **Weight** (kg)
- **Reps** per set
- **Number of sets**
- **Total volume** (weight × reps × sets)
- **Best volume** achieved
- **Workout history** (last 20 sessions)
- **Progress over time** via charts

## 🛠️ Technologies Used

- Pure HTML5
- CSS3 (Grid, Flexbox, Animations)
- Vanilla JavaScript (ES6+)
- Canvas API for charts
- localStorage API for data persistence
- File API for import/export

## 📱 Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## 🎯 Future Enhancements

- Add custom exercises
- Exercise categories filter
- Personal records (PR) highlighting
- Dark/light theme toggle
- Exercise notes and comments
- Workout templates and routines
- Progress photos
- Body weight tracking

---

**Built with 💪 for tracking gains and staying motivated!**