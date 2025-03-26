import { Exercise, BMICategory } from './types';

const exercisesByCategory: Record<BMICategory, Exercise[]> = {
  "underweight": [
    {
      id: "push-ups",
      name: "Push-ups",
      type: "reps",
      description: "Start in a plank position, lower your body until your chest nearly touches the ground, then push back up.",
      imageUrl: "https://media.giphy.com/media/7YCC7PTNX2TOhJQ6aW/giphy.gif",
      sets: 3,
      reps: 10,
      completed: false
    },
    {
      id: "squats",
      name: "Bodyweight Squats",
      type: "reps",
      description: "Stand with feet shoulder-width apart, lower your body as if sitting back into a chair, then return to standing.",
      imageUrl: "https://media.giphy.com/media/1qfKN8Dt0CRdCRxz9q/giphy.gif",
      sets: 3,
      reps: 15,
      completed: false
    }
  ],
  "normal": [
    {
      id: "jumping-jacks",
      name: "Jumping Jacks",
      type: "time",
      description: "Jump while spreading your legs and arms out to the side, then return to starting position.",
      imageUrl: "https://media.giphy.com/media/2tKBrBqfzWsqA/giphy.gif",
      duration: 60,
      completed: false
    },
    {
      id: "mountain-climbers",
      name: "Mountain Climbers",
      type: "time",
      description: "Start in a plank position and alternate bringing each knee towards your chest.",
      imageUrl: "https://media.giphy.com/media/1qfKN8Dt0CRdCRxz9q/giphy.gif",
      duration: 45,
      completed: false
    }
  ],
  "overweight": [
    {
      id: "walking",
      name: "Brisk Walking",
      type: "time",
      description: "Walk at a pace that elevates your heart rate but still allows you to hold a conversation.",
      imageUrl: "https://media.giphy.com/media/3o7ZetM6YUwkGfZgTS/giphy.gif",
      duration: 300,
      completed: false
    },
    {
      id: "wall-push-ups",
      name: "Wall Push-ups",
      type: "reps",
      description: "Stand facing a wall, place hands on wall at shoulder height, perform push-ups against the wall.",
      imageUrl: "https://media.giphy.com/media/7YCC7PTNX2TOhJQ6aW/giphy.gif",
      sets: 3,
      reps: 12,
      completed: false
    }
  ],
  "obese-1": [
    {
      id: "seated-exercises",
      name: "Seated Arm Circles",
      type: "time",
      description: "Sitting in a chair, extend arms to sides and make small circles.",
      imageUrl: "https://media.giphy.com/media/3o7ZetM6YUwkGfZgTS/giphy.gif",
      duration: 60,
      completed: false
    },
    {
      id: "leg-raises",
      name: "Seated Leg Raises",
      type: "reps",
      description: "Sitting in a chair, extend one leg straight out, hold, then lower. Alternate legs.",
      imageUrl: "https://media.giphy.com/media/1qfKN8Dt0CRdCRxz9q/giphy.gif",
      sets: 2,
      reps: 10,
      completed: false
    }
  ],
  "obese-2": [
    {
      id: "water-walking",
      name: "Water Walking",
      type: "time",
      description: "Walk in a pool at waist depth, focusing on good posture and controlled movements.",
      imageUrl: "https://media.giphy.com/media/3o7ZetM6YUwkGfZgTS/giphy.gif",
      duration: 180,
      completed: false
    },
    {
      id: "seated-punches",
      name: "Seated Punches",
      type: "time",
      description: "Sitting in a chair, alternate punching arms forward with controlled movements.",
      imageUrl: "https://media.giphy.com/media/1qfKN8Dt0CRdCRxz9q/giphy.gif",
      duration: 60,
      completed: false
    }
  ]
};

export const getExercisesForBMI = (category: BMICategory): Exercise[] => {
  return exercisesByCategory[category].map(exercise => ({
    ...exercise,
    id: `${exercise.id}-${Date.now()}` // Ensure unique IDs
  }));
};