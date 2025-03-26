"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@components/common/ui/button";
import { Dumbbell } from "lucide-react";

import { Card } from "@components/common/ui/card";
import { BMICategory, BMIData } from "../lib/types";
import { getExercisesForBMI } from "../lib/exercises";
import { saveWorkoutHistory } from "../lib/storage";
import { Progress } from "@components/common/ui/progress";

interface BMIResultProps {
  result: BMIData;
}

export function BMIResult({ result }: BMIResultProps) {
  const router = useRouter();
  const [isStartingWorkout, setIsStartingWorkout] = useState(false);

  const getCategoryLabel = (category: BMICategory): string => {
    switch (category) {
      case "underweight":
        return "Underweight";
      case "normal":
        return "Normal";
      case "overweight":
        return "Overweight";
      case "obese-1":
        return "Obese Class I";
      case "obese-2":
        return "Obese Class II";
      default:
        return "";
    }
  };

  const getCategoryColor = (category: BMICategory): string => {
    switch (category) {
      case "underweight":
        return "bg-blue-500";
      case "normal":
        return "bg-green-500";
      case "overweight":
        return "bg-yellow-500";
      case "obese-1":
        return "bg-orange-500";
      case "obese-2":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getProgressPercentage = (bmi: number): number => {
    const min = 10;
    const max = 40;
    const percentage = ((bmi - min) / (max - min)) * 100;
    return Math.max(0, Math.min(100, percentage));
  };

  const startWorkout = () => {
    setIsStartingWorkout(true);
    const exercises = getExercisesForBMI(result.category);
    const workout = {
      id: `workout-${Date.now()}`,
      date: new Date().toISOString(),
      bmiData: result,
      exercises,
      completed: false,
    };
    saveWorkoutHistory(workout);
    router.push(`/projects/bmi-calculator/${workout.id}`);
  };

  return (
    <Card className="border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-black">Your BMI Result</h2>
          <p className="mb-4 text-lg">Hello, {result.name}!</p>
          <div className="flex flex-col items-center">
            <div className="bg-primary text-primary-foreground inline-block w-fit rounded-full border-4 border-black px-6 py-3 text-3xl font-black">
              {result.value}
            </div>
            <div
              className={`mt-3 inline-block w-fit rounded-md px-4 py-2 font-bold text-white ${getCategoryColor(result.category)}`}
            >
              {getCategoryLabel(result.category)}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span>10</span>
            <span>20</span>
            <span>30</span>
            <span>40</span>
          </div>
          <div className="relative">
            <Progress
              value={getProgressPercentage(result.value)}
              className="h-8 border-2 border-black"
            />
            <div
              className="absolute top-0 h-8 border-r-4 border-black"
              style={{
                left: `${getProgressPercentage(result.value)}%`,
                transform: "translateX(-50%)",
              }}
            />
          </div>
          <div className="flex justify-between text-xs">
            <span className="rounded bg-blue-500 px-2 py-1 text-white">
              Underweight
            </span>
            <span className="rounded bg-green-500 px-2 py-1 text-white">
              Normal
            </span>
            <span className="rounded bg-yellow-500 px-2 py-1 text-white">
              Overweight
            </span>
            <span className="rounded bg-orange-500 px-2 py-1 text-white">
              Obese I
            </span>
            <span className="rounded bg-red-500 px-2 py-1 text-white">
              Obese II
            </span>
          </div>
        </div>

        <div className="bg-muted rounded-md border-2 border-black p-4">
          <h3 className="mb-2 font-bold">Health Advice:</h3>
          <p>{result.message}</p>
        </div>

        <div className="bg-primary/10 rounded-md border-2 border-black p-4">
          <h3 className="mb-2 font-bold">What does this mean?</h3>
          <p className="text-sm">
            BMI is a screening tool that can indicate whether you may have
            weight issues that could lead to health problems. However, BMI is
            not a diagnostic tool and doesn&apos;t account for factors like
            muscle mass, bone density, and overall body composition. For a
            comprehensive health assessment, consult with a healthcare
            professional.
          </p>
        </div>

        <Button
          onClick={startWorkout}
          disabled={isStartingWorkout}
          className="w-full border-4 border-black bg-green-500 py-6 text-xl font-black text-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:bg-green-600 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
        >
          <Dumbbell className="mr-2 h-6 w-6" />
          {isStartingWorkout ? "Preparing Workout..." : "Start Workout"}
        </Button>
      </div>
    </Card>
  );
}
