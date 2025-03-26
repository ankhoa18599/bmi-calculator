"use client";

import { Button } from "@components/common/ui/button";
import { Card } from "@components/common/ui/card";
import { Progress } from "@components/common/ui/progress";
import { CheckCircle, ChevronRight, Timer } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getWorkoutHistory, updateWorkout } from "./lib/storage";
import { WorkoutHistory } from "./lib/types";

export default function WorkoutDetailTemplate() {
  const router = useRouter();
  const { id } = useParams();

  const [workout, setWorkout] = useState<WorkoutHistory | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    const history = getWorkoutHistory();
    const currentWorkout = history.find((w) => w.id === id);
    if (currentWorkout) {
      setWorkout(currentWorkout);
    }
  }, [id]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeRemaining]);

  if (!workout) {
    return <div>Loading...</div>;
  }

  const currentExercise = workout.exercises[currentExerciseIndex];
  const isLastExercise = currentExerciseIndex === workout.exercises.length - 1;

  const startTimer = () => {
    if (currentExercise.type === "time" && currentExercise.duration) {
      setTimeRemaining(currentExercise.duration);
      setIsTimerRunning(true);
    }
  };

  const completeExercise = () => {
    const updatedWorkout = {
      ...workout,
      exercises: workout.exercises.map((ex, index) =>
        index === currentExerciseIndex ? { ...ex, completed: true } : ex,
      ),
    };

    if (isLastExercise) {
      updatedWorkout.completed = true;
    }

    updateWorkout(workout.id, updatedWorkout);
    setWorkout(updatedWorkout);

    if (isLastExercise) {
      router.push(`/projects/bmi-calculator/${workout.id}/summary`);
    } else {
      setCurrentExerciseIndex((prev) => prev + 1);
      setIsTimerRunning(false);
      setTimeRemaining(0);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-background min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <Card className="border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-black">Workout Plan</h1>
              <p className="text-sm font-medium">
                Exercise {currentExerciseIndex + 1} of{" "}
                {workout.exercises.length}
              </p>
            </div>

            <Progress
              value={(currentExerciseIndex / workout.exercises.length) * 100}
              className="h-2 border-2 border-black"
            />

            <div className="aspect-video overflow-hidden rounded-lg border-4 border-black">
              <img
                src={currentExercise.imageUrl}
                alt={currentExercise.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold">{currentExercise.name}</h2>
              <p className="text-muted-foreground">
                {currentExercise.description}
              </p>

              {currentExercise.type === "reps" ? (
                <div className="bg-primary/10 rounded-md border-2 border-black p-4">
                  <p className="font-bold">
                    Complete {currentExercise.sets} sets of{" "}
                    {currentExercise.reps} repetitions
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-primary/10 rounded-md border-2 border-black p-4">
                    <p className="font-bold">
                      Duration: {formatTime(currentExercise.duration || 0)}
                    </p>
                  </div>

                  {!isTimerRunning && timeRemaining === 0 && (
                    <Button
                      onClick={startTimer}
                      className="w-full border-2 border-black bg-blue-500 py-4 font-bold text-white hover:bg-blue-600"
                    >
                      <Timer className="mr-2 h-5 w-5" />
                      Start Timer
                    </Button>
                  )}

                  {isTimerRunning && (
                    <div className="text-center">
                      <p className="text-4xl font-black">
                        {formatTime(timeRemaining)}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <Button
                onClick={completeExercise}
                disabled={currentExercise.type === "time" && timeRemaining > 0}
                className="w-full border-4 border-black bg-green-500 py-6 text-xl font-black text-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:bg-green-600 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              >
                {isLastExercise ? (
                  <>
                    <CheckCircle className="mr-2 h-6 w-6" />
                    Complete Workout
                  </>
                ) : (
                  <>
                    <ChevronRight className="mr-2 h-6 w-6" />
                    Next Exercise
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
