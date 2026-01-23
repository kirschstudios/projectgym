# Gym Progress Data

This folder is designated for storing your gym progress data.

## Data Storage

The application currently uses browser `localStorage` to save your workout data automatically. This ensures your progress is preserved between sessions.

## Backup Your Data

To backup your data:
1. Open the browser console (F12)
2. Type: `downloadGymData()`
3. Press Enter

This will download a JSON file with all your workout data.

## Restore Data

To restore from a backup:
1. Open the browser console (F12)
2. Paste your JSON data
3. Or manually copy the data into localStorage

## Data Structure

```json
{
  "exercises": {
    "1": {
      "name": "Lat Pulldowns",
      "workouts": [
        {
          "date": "2024-01-15T10:30:00.000Z",
          "weight": 50,
          "reps": 12,
          "sets": 3
        }
      ]
    }
  },
  "stats": {
    "totalWorkouts": 10,
    "totalSets": 45,
    "streak": 5,
    "lastWorkoutDate": "2024-01-15"
  }
}
```

## Future Enhancement

In a future version with a backend server, this folder will be used to store actual JSON files.
