"use client";

import { useState, useEffect } from "react";
import { Button } from "@components/common/ui/button";
import { Card } from "@components/common/ui/card";
import { Input } from "@components/common/ui/input";
import { Label } from "@components/common/ui/label";
import { RadioGroup, RadioGroupItem } from "@components/common/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/common/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@components/common/ui/tabs";
import { Scale, Weight, Ruler, User } from "lucide-react";
import { BMICategory, BMIData, Gender, UnitSystem } from "../lib/types";
import { saveBMIHistory } from "../lib/storage";
import { BMIResult } from "./BMIResult";

export function Calculator() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [heightUnit, setHeightUnit] = useState<"cm" | "m">("cm");
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<Gender>("other");
  const [bmiResult, setBmiResult] = useState<BMIData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setHeight("");
    setWeight("");
    setBmiResult(null);
    setError(null);
  }, [unitSystem]);

  const calculateBMI = () => {
    setError(null);

    if (!name) {
      setError("Please enter your name");
      return;
    }

    if (!height || !weight) {
      setError("Please enter both height and weight");
      return;
    }

    const heightValue = parseFloat(height);
    const weightValue = parseFloat(weight);

    if (isNaN(heightValue) || isNaN(weightValue)) {
      setError("Please enter valid numbers");
      return;
    }

    if (heightValue <= 0 || weightValue <= 0) {
      setError("Height and weight must be positive values");
      return;
    }

    let heightInMeters: number;
    let weightInKg: number;

    if (unitSystem === "metric") {
      heightInMeters = heightUnit === "cm" ? heightValue / 100 : heightValue;
      weightInKg = weightValue;
    } else {
      heightInMeters = heightValue * 0.0254;
      weightInKg = weightValue * 0.453592;
    }

    const bmi = weightInKg / (heightInMeters * heightInMeters);

    if (bmi < 0 || bmi > 100) {
      setError(
        "Calculated BMI is outside reasonable range. Please check your inputs.",
      );
      return;
    }

    let category: BMICategory;
    let message: string;

    if (bmi < 18.5) {
      category = "underweight";
      message =
        "You may need to gain some weight. Consider consulting with a nutritionist for a healthy weight gain plan.";
    } else if (bmi >= 18.5 && bmi < 23) {
      category = "normal";
      message =
        "Your BMI is within the healthy range. Maintain a balanced diet and regular physical activity.";
    } else if (bmi >= 23 && bmi < 25) {
      category = "overweight";
      message =
        "Consider adopting a healthier lifestyle with moderate exercise and a balanced diet.";
    } else if (bmi >= 25 && bmi < 30) {
      category = "obese-1";
      message =
        "It's recommended to consult with a healthcare provider about weight management strategies.";
    } else {
      category = "obese-2";
      message =
        "Please consult with a healthcare provider for a comprehensive weight management plan.";
    }

    const result: BMIData = {
      value: parseFloat(bmi.toFixed(2)),
      category,
      message,
      name,
      gender,
      date: new Date().toISOString(),
    };

    setBmiResult(result);
    saveBMIHistory(result);
  };

  return (
    <div className="space-y-8">
      <Card className="border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="name"
                className="flex items-center gap-2 text-lg font-bold"
              >
                <User className="h-5 w-5" />
                Your Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 border-2 border-black"
              />
            </div>

            <div>
              <Label
                htmlFor="gender"
                className="flex items-center gap-2 text-lg font-bold"
              >
                <User className="h-5 w-5" />
                Gender
              </Label>
              <Select
                value={gender}
                onValueChange={(value: Gender) => setGender(value)}
              >
                <SelectTrigger className="mt-2 border-2 border-black">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs
            defaultValue="metric"
            onValueChange={(value) => setUnitSystem(value as UnitSystem)}
          >
            <TabsList className="mb-6 grid w-full grid-cols-2">
              <TabsTrigger value="metric" className="text-lg font-bold">
                Metric
              </TabsTrigger>
              <TabsTrigger value="imperial" className="text-lg font-bold">
                Imperial
              </TabsTrigger>
            </TabsList>

            <TabsContent value="metric" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="metric-height"
                    className="flex items-center gap-2 text-lg font-bold"
                  >
                    <Ruler className="h-5 w-5" />
                    Height
                  </Label>
                  <div className="mt-2 flex">
                    <Input
                      id="metric-height"
                      type="number"
                      placeholder="Enter height"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="rounded-r-none border-2 border-black"
                    />
                    <RadioGroup
                      value={heightUnit}
                      onValueChange={(value) =>
                        setHeightUnit(value as "cm" | "m")
                      }
                      className="flex rounded-l-none border-2 border-l-0 border-black"
                    >
                      <div className="flex items-center border-r-2 border-black px-3">
                        <RadioGroupItem value="cm" id="cm" className="mr-1" />
                        <Label htmlFor="cm" className="font-medium">
                          cm
                        </Label>
                      </div>
                      <div className="flex items-center px-3">
                        <RadioGroupItem value="m" id="m" className="mr-1" />
                        <Label htmlFor="m" className="font-medium">
                          m
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="metric-weight"
                    className="flex items-center gap-2 text-lg font-bold"
                  >
                    <Weight className="h-5 w-5" />
                    Weight (kg)
                  </Label>
                  <Input
                    id="metric-weight"
                    type="number"
                    placeholder="Enter weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="mt-2 border-2 border-black"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="imperial" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="imperial-height"
                    className="flex items-center gap-2 text-lg font-bold"
                  >
                    <Ruler className="h-5 w-5" />
                    Height (inches)
                  </Label>
                  <Input
                    id="imperial-height"
                    type="number"
                    placeholder="Enter height in inches"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="mt-2 border-2 border-black"
                  />
                  <p className="text-muted-foreground mt-1 text-xs">
                    Tip: 1 foot = 12 inches (e.g., 5&apos;10&quot; = 70 inches)
                  </p>
                </div>

                <div>
                  <Label
                    htmlFor="imperial-weight"
                    className="flex items-center gap-2 text-lg font-bold"
                  >
                    <Weight className="h-5 w-5" />
                    Weight (lbs)
                  </Label>
                  <Input
                    id="imperial-weight"
                    type="number"
                    placeholder="Enter weight in pounds"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="mt-2 border-2 border-black"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {error && (
            <div className="bg-destructive/10 border-destructive text-destructive rounded-md border-2 p-3">
              {error}
            </div>
          )}

          <Button
            onClick={calculateBMI}
            className="bg-primary w-full border-4 border-black py-6 text-xl font-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
          >
            <Scale className="mr-2 h-6 w-6" />
            Calculate BMI
          </Button>
        </div>
      </Card>

      {bmiResult && <BMIResult result={bmiResult} />}
    </div>
  );
}
