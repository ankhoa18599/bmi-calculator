import { BMIData, WorkoutHistory } from './types';

const BMI_HISTORY_KEY = 'bmi_history';
const WORKOUT_HISTORY_KEY = 'workout_history';

export const saveBMIHistory = (bmiData: BMIData) => {
  const history = getBMIHistory();
  history.push(bmiData);
  localStorage.setItem(BMI_HISTORY_KEY, JSON.stringify(history));
};

export const getBMIHistory = (): BMIData[] => {
  const history = localStorage.getItem(BMI_HISTORY_KEY);
  return history ? JSON.parse(history) : [];
};

export const saveWorkoutHistory = (workout: WorkoutHistory) => {
  const history = getWorkoutHistory();
  history.push(workout);
  localStorage.setItem(WORKOUT_HISTORY_KEY, JSON.stringify(history));
};

export const getWorkoutHistory = (): WorkoutHistory[] => {
  const history = localStorage.getItem(WORKOUT_HISTORY_KEY);
  return history ? JSON.parse(history) : [];
};

export const updateWorkout = (workoutId: string, updatedWorkout: WorkoutHistory) => {
  const history = getWorkoutHistory();
  const index = history.findIndex(w => w.id === workoutId);
  if (index !== -1) {
    history[index] = updatedWorkout;
    localStorage.setItem(WORKOUT_HISTORY_KEY, JSON.stringify(history));
  }
};