export interface Question {
  id: string;
  text: string;
  type: 'single' | 'multiple';
  options: Option[];
  required: boolean;
}

export interface Option {
  id: string;
  text: string;
  value: string;
  icon?: string;
  image?: string;
}

export interface Answer {
  questionId: string;
  value: string | string[];
}

export interface AssessmentResult {
  score: number;
  scoreLabel: string;
  drainageRisk: 'low' | 'medium' | 'high';
  privacyScore: 'low' | 'medium' | 'high';
  valueGap: string;
  recommendedPackage: Package;
  problems: string[];
}

export interface Package {
  name: string;
  description: string;
  priceRange: string;
  timeline: string;
  features: string[];
}

export interface AssessmentState {
  currentStep: number;
  answers: Answer[];
  result: AssessmentResult | null;
  setCurrentStep: (step: number) => void;
  setAnswer: (questionId: string, value: string | string[]) => void;
  calculateResult: () => void;
  reset: () => void;
}
