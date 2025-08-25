import { useState, useCallback } from 'react';
import { AssessmentState, AssessmentAnswer } from '@/types/assessment';
import { psychometricQuestions, technicalQuestions } from '@/data/questions';
import { generateAssessmentResults } from '@/utils/assessmentScoring';

export const useAssessment = () => {
  const [state, setState] = useState<AssessmentState>({
    currentSection: 'intro',
    currentQuestionIndex: 0,
    answers: [],
    startTime: new Date()
  });

  const startAssessment = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentSection: 'psychometric',
      currentQuestionIndex: 0,
      startTime: new Date()
    }));
  }, []);

  const recordAnswer = useCallback((questionId: string, value: number | string) => {
    setState(prev => ({
      ...prev,
      answers: [
        ...prev.answers.filter(a => a.questionId !== questionId),
        { questionId, value }
      ]
    }));
  }, []);

  const nextQuestion = useCallback(() => {
    setState(prev => {
      const currentQuestions = prev.currentSection === 'psychometric' 
        ? psychometricQuestions 
        : technicalQuestions;
      
      if (prev.currentQuestionIndex < currentQuestions.length - 1) {
        return {
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1
        };
      } else if (prev.currentSection === 'psychometric') {
        return {
          ...prev,
          currentSection: 'technical',
          currentQuestionIndex: 0
        };
      } else {
        // Complete assessment
        const results = generateAssessmentResults(prev.answers);
        return {
          ...prev,
          currentSection: 'results',
          results
        };
      }
    });
  }, []);

  const previousQuestion = useCallback(() => {
    setState(prev => {
      if (prev.currentQuestionIndex > 0) {
        return {
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex - 1
        };
      } else if (prev.currentSection === 'technical') {
        return {
          ...prev,
          currentSection: 'psychometric',
          currentQuestionIndex: psychometricQuestions.length - 1
        };
      }
      return prev;
    });
  }, []);

  const completeSection = useCallback(() => {
    setState(prev => {
      if (prev.currentSection === 'psychometric') {
        return {
          ...prev,
          currentSection: 'technical',
          currentQuestionIndex: 0
        };
      } else if (prev.currentSection === 'technical') {
        const results = generateAssessmentResults(prev.answers);
        return {
          ...prev,
          currentSection: 'results',
          results
        };
      }
      return prev;
    });
  }, []);

  const restartAssessment = useCallback(() => {
    setState({
      currentSection: 'intro',
      currentQuestionIndex: 0,
      answers: [],
      startTime: new Date()
    });
  }, []);

  const getCurrentQuestions = () => {
    switch (state.currentSection) {
      case 'psychometric':
        return psychometricQuestions;
      case 'technical':
        return technicalQuestions;
      default:
        return [];
    }
  };

  const canGoNext = () => {
    const currentQuestions = getCurrentQuestions();
    return state.currentQuestionIndex < currentQuestions.length - 1 || 
           state.currentSection === 'psychometric';
  };

  const canGoPrevious = () => {
    return state.currentQuestionIndex > 0 || state.currentSection === 'technical';
  };

  const isLastQuestion = () => {
    const currentQuestions = getCurrentQuestions();
    return state.currentSection === 'technical' && 
           state.currentQuestionIndex === currentQuestions.length - 1;
  };

  return {
    state,
    startAssessment,
    recordAnswer,
    nextQuestion,
    previousQuestion,
    completeSection,
    restartAssessment,
    getCurrentQuestions,
    canGoNext: canGoNext(),
    canGoPrevious: canGoPrevious(),
    isLastQuestion: isLastQuestion()
  };
};