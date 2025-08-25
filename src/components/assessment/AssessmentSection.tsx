import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ProgressBar } from './ProgressBar';
import { LikertQuestion } from './LikertQuestion';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { PsychometricQuestion, TechnicalQuestion, AssessmentAnswer } from '@/types/assessment';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface AssessmentSectionProps {
  title: string;
  questions: (PsychometricQuestion | TechnicalQuestion)[];
  currentQuestionIndex: number;
  answers: AssessmentAnswer[];
  onAnswer: (questionId: string, value: number | string) => void;
  onNext: () => void;
  onPrevious: () => void;
  onComplete: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isLastQuestion: boolean;
}

export const AssessmentSection = ({
  title,
  questions,
  currentQuestionIndex,
  answers,
  onAnswer,
  onNext,
  onPrevious,
  onComplete,
  canGoNext,
  canGoPrevious,
  isLastQuestion
}: AssessmentSectionProps) => {
  const [showExplanation, setShowExplanation] = useState(false);
  const currentQuestion = questions[currentQuestionIndex];
  
  if (!currentQuestion) return null;

  const currentAnswer = answers.find(a => a.questionId === currentQuestion.id);

  const handleAnswer = (value: number | string) => {
    onAnswer(currentQuestion.id, value);
    setShowExplanation(false);
  };

  const handleNext = () => {
    if ('correctAnswer' in currentQuestion && currentAnswer) {
      setShowExplanation(true);
      setTimeout(() => {
        setShowExplanation(false);
        if (isLastQuestion) {
          onComplete();
        } else {
          onNext();
        }
      }, 2000);
    } else {
      if (isLastQuestion) {
        onComplete();
      } else {
        onNext();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <ProgressBar
          currentStep={currentQuestionIndex + 1}
          totalSteps={questions.length}
          sectionTitle={title}
        />

        <div className="max-w-3xl mx-auto">
          {currentQuestion.type === 'likert' && (
            <LikertQuestion
              question={currentQuestion.question}
              scale={currentQuestion.scale || 5}
              selectedValue={currentAnswer ? Number(currentAnswer.value) : undefined}
              onAnswer={handleAnswer}
            />
          )}

          {currentQuestion.type === 'multiple_choice' && (
            <MultipleChoiceQuestion
              question={currentQuestion.question}
              options={currentQuestion.options || []}
              selectedValue={currentAnswer ? Number(currentAnswer.value) : undefined}
              onAnswer={handleAnswer}
              showExplanation={showExplanation}
              explanation={'explanation' in currentQuestion ? currentQuestion.explanation : undefined}
              correctAnswer={'correctAnswer' in currentQuestion ? currentQuestion.correctAnswer : undefined}
            />
          )}

          {currentQuestion.type === 'scenario' && (
            <MultipleChoiceQuestion
              question={currentQuestion.question}
              options={currentQuestion.options || []}
              selectedValue={currentAnswer ? Number(currentAnswer.value) : undefined}
              onAnswer={handleAnswer}
              showExplanation={showExplanation}
              explanation={'explanation' in currentQuestion ? currentQuestion.explanation : undefined}
              correctAnswer={'correctAnswer' in currentQuestion ? currentQuestion.correctAnswer : undefined}
            />
          )}

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={onPrevious}
              disabled={!canGoPrevious}
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <Button
              onClick={handleNext}
              disabled={!canGoNext || !currentAnswer}
              className="flex items-center bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              {isLastQuestion ? 'Complete Assessment' : 'Next'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};