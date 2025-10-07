import { AnimatePresence } from 'framer-motion';
import { useAssessmentStore } from './store/assessmentStore';
import HeroScreen from './components/HeroScreen';
import QuestionCard from './components/QuestionCard';
import ResultsScreen from './components/ResultsScreen';
import { questions } from './data/questions';

function App() {
  const { currentStep, answers, result, setCurrentStep, setAnswer, calculateResult } =
    useAssessmentStore();

  const totalSteps = questions.length + 1; // +1 for hero screen
  const isHero = currentStep === 0;
  const isResults = currentStep === totalSteps;

  const handleStart = () => {
    setCurrentStep(1);
  };

  const handleAnswer = (questionId: string, value: string | string[]) => {
    setAnswer(questionId, value);

    // Check if this is the last question
    if (currentStep === questions.length) {
      calculateResult();
      setCurrentStep(totalSteps);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getCurrentAnswer = (questionId: string) => {
    return answers.find(a => a.questionId === questionId)?.value;
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {isHero && (
          <HeroScreen key="hero" onStart={handleStart} />
        )}

        {!isHero && !isResults && (
          <QuestionCard
            key={`question-${currentStep}`}
            question={questions[currentStep - 1]}
            currentIndex={currentStep - 1}
            totalQuestions={questions.length}
            onAnswer={(value) => handleAnswer(questions[currentStep - 1].id, value)}
            onBack={handleBack}
            initialValue={getCurrentAnswer(questions[currentStep - 1].id)}
          />
        )}

        {isResults && result && (
          <ResultsScreen key="results" result={result} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
