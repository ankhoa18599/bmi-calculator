"use client";

import { ThemeProvider } from "@components/common/ThemeProvider";
import { ModeToggle } from "./components/ModeToggle";
import { Calculator } from "./components/Calculator";

export default function BMICalculatorTemplate() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <div className="bg-background min-h-screen p-4 md:p-8">
        <header className="mx-auto mb-8 flex max-w-4xl items-center justify-between">
          <h1 className="text-3xl font-black tracking-tight md:text-4xl">
            BMI Calculator
          </h1>
          <ModeToggle />
        </header>
        <main className="mx-auto max-w-4xl">
          <Calculator />
        </main>
        <footer className="text-muted-foreground mx-auto mt-12 max-w-4xl text-center text-sm">
          <p>
            © {new Date().getFullYear()} BMI Calculator. All rights reserved.
          </p>
        </footer>
      </div>
    </ThemeProvider>
  );
}
