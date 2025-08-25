import { AssessmentIntro } from '@/components/assessment/AssessmentIntro';
import { AssessmentSection } from '@/components/assessment/AssessmentSection';
import { AssessmentResults } from '@/components/assessment/AssessmentResults';
import { useAssessment } from '@/hooks/useAssessment';

const Index = () => {
  const {
    state,
    startAssessment,
    recordAnswer,
    nextQuestion,
    previousQuestion,
    completeSection,
    restartAssessment,
    getCurrentQuestions,
    canGoNext,
    canGoPrevious,
    isLastQuestion
  } = useAssessment();

  if (state.currentSection === 'intro') {
    return <AssessmentIntro onStartAssessment={startAssessment} />;
  }

  if (state.currentSection === 'results' && state.results) {
    return <AssessmentResults results={state.results} onRestart={restartAssessment} />;
  }

  if (state.currentSection === 'psychometric' || state.currentSection === 'technical') {
    const questions = getCurrentQuestions();
    const sectionTitle = state.currentSection === 'psychometric' 
      ? 'Psychometric Evaluation' 
      : 'Technical Aptitude Assessment';

    return (
      <AssessmentSection
        title={sectionTitle}
        questions={questions}
        currentQuestionIndex={state.currentQuestionIndex}
        answers={state.answers}
        onAnswer={recordAnswer}
        onNext={nextQuestion}
        onPrevious={previousQuestion}
        onComplete={completeSection}
        canGoNext={canGoNext}
        canGoPrevious={canGoPrevious}
        isLastQuestion={isLastQuestion}
      />
    );
  }

  return <AssessmentIntro onStartAssessment={startAssessment} />;
};

export default Index;
