export type UnitSystem = "metric" | "imperial";
export type BMICategory = "underweight" | "normal" | "overweight" | "obese-1" | "obese-2";
export type Gender = "male" | "female" | "other";
export type ExerciseType = "reps" | "time";

export interface BMIData {
  value: number;
  category: BMICategory;
  message: string;
  name: string;
  gender: Gender;
  date: string;
}

export interface Exercise {
  id: string;
  name: string;
  type: ExerciseType;
  description: string;
  imageUrl: string;
  duration?: number; // in seconds for time-based exercises
  sets?: number;
  reps?: number;
  completed: boolean;
}

export interface WorkoutHistory {
  id: string;
  date: string;
  bmiData: BMIData;
  exercises: Exercise[];
  completed: boolean;
}