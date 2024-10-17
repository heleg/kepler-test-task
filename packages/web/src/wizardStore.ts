import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Answer } from "@kepler-test-task/shared";

export interface WizardState {
  currentStep: number;
  answers: Array<Answer>;
  completed: boolean;
  setCurrentStep: (updater: (state: WizardState) => number) => void;
  setAnswers: (updater: (state: WizardState) => Array<Answer>) => void;
  setCompleted: () => void;
  reset: () => void;
}

export const useWizardStore = create<WizardState>()(
  persist(
    (set) => ({
      currentStep: 0,
      answers: [],
      completed: false,
      setCurrentStep: (updater) =>
        set((state) => ({ currentStep: updater(state) })),
      setAnswers: (updater) => set((state) => ({ answers: updater(state) })),
      setCompleted: () => set({ completed: true }),
      reset: () => set({ currentStep: 0, answers: [], completed: false }),
    }),
    { name: "wizard-store" },
  ),
);
