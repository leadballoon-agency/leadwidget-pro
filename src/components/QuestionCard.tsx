import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '../types';
import ProgressBar from './ProgressBar';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (value: string | string[]) => void;
  onBack: () => void;
  initialValue?: string | string[];
}

export default function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  onAnswer,
  onBack,
  initialValue,
}: QuestionCardProps) {
  const [selected, setSelected] = useState<string | string[]>(
    initialValue || (question.type === 'multiple' ? [] : '')
  );
  const [postcodeInput, setPostcodeInput] = useState('');

  const handleSelect = (value: string) => {
    if (question.type === 'multiple') {
      const current = selected as string[];
      const newSelected = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      setSelected(newSelected);
    } else {
      setSelected(value);
      // Auto-advance for single-select questions (except postcode)
      if (question.id !== 'postcode') {
        setTimeout(() => onAnswer(value), 300);
      }
    }
  };

  const handleNext = () => {
    if (question.id === 'postcode') {
      onAnswer(postcodeInput);
    } else {
      onAnswer(selected);
    }
  };

  const canProceed =
    question.id === 'postcode'
      ? true // Postcode is optional
      : question.type === 'multiple'
      ? (selected as string[]).length > 0
      : selected !== '';

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen flex flex-col px-4 py-6 bg-yc-cream"
    >
      {/* Header */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-yc-gray hover:text-yc-charcoal transition-colors"
          >
            ← Back
          </button>
          <span className="text-sm text-yc-gray">
            {currentIndex + 1} / {totalQuestions}
          </span>
        </div>
        <ProgressBar current={currentIndex + 1} total={totalQuestions} />
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full">
        <h2 className="text-2xl md:text-3xl font-semibold text-yc-charcoal mb-8">
          {question.text}
        </h2>

        {/* Options */}
        <div className="space-y-3 mb-8">
          <AnimatePresence>
            {question.id === 'postcode' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border-2 border-gray-200 rounded-yc-button p-4"
              >
                <input
                  type="text"
                  value={postcodeInput}
                  onChange={(e) => setPostcodeInput(e.target.value.toUpperCase())}
                  placeholder="e.g. WF9 4EA"
                  className="w-full text-lg outline-none"
                  maxLength={8}
                />
              </motion.div>
            ) : (
              question.options.map((option, index) => {
                const isSelected =
                  question.type === 'multiple'
                    ? (selected as string[]).includes(option.value)
                    : selected === option.value;

                return (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSelect(option.value)}
                    className={`
                      w-full touch-target p-4 rounded-yc-button border-2 transition-all text-left
                      ${
                        isSelected
                          ? 'bg-blue-50 border-yc-blue'
                          : 'bg-white border-gray-200 hover:border-yc-blue'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      {option.icon && <span className="text-2xl">{option.icon}</span>}
                      {question.type === 'multiple' && (
                        <div
                          className={`
                            w-5 h-5 rounded border-2 flex items-center justify-center
                            ${isSelected ? 'bg-yc-blue border-yc-blue' : 'border-gray-300'}
                          `}
                        >
                          {isSelected && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      )}
                      <span className="flex-1 text-lg font-medium text-yc-charcoal">
                        {option.text}
                      </span>
                    </div>
                  </motion.button>
                );
              })
            )}
          </AnimatePresence>
        </div>

        {/* Next Button for Multi-select and Postcode */}
        {(question.type === 'multiple' || question.id === 'postcode') && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: canProceed ? 1 : 0.5 }}
            onClick={handleNext}
            disabled={!canProceed && question.required}
            className="touch-target bg-yc-blue text-white text-lg font-semibold px-8 py-4 rounded-yc disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yc-blue/90 transition-colors mt-auto"
          >
            {question.id === 'postcode' ? 'See My Results' : 'Continue'}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
