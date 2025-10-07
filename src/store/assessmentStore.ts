import { create } from 'zustand';
import { AssessmentState } from '../types';
import { calculateScore } from '../utils/scoring';

export const useAssessmentStore = create<AssessmentState>((set, get) => ({
  currentStep: 0,
  answers: [],
  result: null,

  setCurrentStep: (step: number) => set({ currentStep: step }),

  setAnswer: (questionId: string, value: string | string[]) => {
    const currentAnswers = get().answers;
    const existingIndex = currentAnswers.findIndex(a => a.questionId === questionId);

    if (existingIndex >= 0) {
      // Update existing answer
      const newAnswers = [...currentAnswers];
      newAnswers[existingIndex] = { questionId, value };
      set({ answers: newAnswers });
    } else {
      // Add new answer
      set({ answers: [...currentAnswers, { questionId, value }] });
    }
  },

  calculateResult: () => {
    const answers = get().answers;
    const result = calculateScore(answers);
    set({ result });
  },

  reset: () => set({ currentStep: 0, answers: [], result: null }),
}));
