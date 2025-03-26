"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { CheckCircle, Home, History } from "lucide-react";
import { WorkoutHistory } from "./lib/types";
import { getWorkoutHistory } from "./lib/storage";
import { Button } from "@components/common/ui/button";
import { Card } from "@components/common/ui/card";

export default function WorkoutSummaryTemplate() {
  const router = useRouter();
  const { id } = useParams();
  const [workout, setWorkout] = useState<WorkoutHistory | null>(null);

  useEffect(() => {
    const history = getWorkoutHistory();
    const completedWorkout = history.find((w) => w.id === id);
    if (completedWorkout) {
      setWorkout(completedWorkout);
    }
  }, [id]);

  if (!workout) {
    return <div>Loading....</div>;
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <Card className="border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="space-y-6">
            <div className="text-center">
              <div className="mb-4 inline-block rounded-full bg-green-500 p-4 text-white">
                <CheckCircle className="h-12 w-12" />
              </div>
              <h1 className="mb-2 text-3xl font-black">Workout Complete!</h1>
              <p className="text-lg text-muted-foreground">
                Great job, {workout.bmiData.name}! You&apos;ve completed all
                exercises.
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-md border-2 border-black bg-primary/10 p-4">
                <h2 className="mb-2 font-bold">Workout Summary</h2>
                <p>BMI: {workout.bmiData.value}</p>
                <p>Category: {workout.bmiData.category}</p>
                <p>Date: {new Date(workout.date).toLocaleDateString()}</p>
              </div>

              <div className="rounded-md border-2 border-black bg-primary/10 p-4">
                <h2 className="mb-2 font-bold">Completed Exercises</h2>
                <ul className="space-y-2">
                  {workout.exercises.map((exercise, index) => (
                    <li key={exercise.id} className="flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                      <span>{exercise.name}</span>
                      {exercise.type === "reps" ? (
                        <span className="ml-auto">
                          {exercise.sets} sets × {exercise.reps} reps
                        </span>
                      ) : (
                        <span className="ml-auto">
                          {Math.floor((exercise.duration || 0) / 60)} minutes
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => router.push("/")}
                className="border-4 border-black bg-primary py-6 font-bold shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              >
                <Home className="mr-2 h-5 w-5" />
                Home
              </Button>
              <Button
                onClick={() => router.push("/history")}
                className="border-4 border-black bg-primary py-6 font-bold shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              >
                <History className="mr-2 h-5 w-5" />
                View History
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
