export interface AssessmentAnswer {
  questionId: string;
  value: number | string | string[];
}

export interface PsychometricQuestion {
  id: string;
  category: 'interest' | 'personality' | 'holland' | 'cognitive' | 'motivation';
  question: string;
  type: 'likert' | 'multiple_choice' | 'ranking';
  options?: string[];
  scale?: number;
}

export interface TechnicalQuestion {
  id: string;
  category: 'aptitude' | 'prerequisite' | 'domain';
  question: string;
  type: 'multiple_choice' | 'scenario';
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface WISCARScores {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  ability: number;
  realWorld: number;
}

export interface AssessmentResults {
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: WISCARScores;
  overallScore: number;
  recommendation: 'yes' | 'maybe' | 'no';
  insights: string[];
  nextSteps: string[];
  careerPaths: string[];
}

export interface AssessmentState {
  currentSection: 'intro' | 'psychometric' | 'technical' | 'results';
  currentQuestionIndex: number;
  answers: AssessmentAnswer[];
  results?: AssessmentResults;
  startTime: Date;
}