import { AssessmentAnswer, WISCARScores, AssessmentResults } from '@/types/assessment';
import { psychometricQuestions, technicalQuestions } from '@/data/questions';

export const calculatePsychometricScore = (answers: AssessmentAnswer[]): number => {
  const psychAnswers = answers.filter(a => 
    psychometricQuestions.some(q => q.id === a.questionId)
  );

  let totalScore = 0;
  let maxScore = 0;

  psychAnswers.forEach(answer => {
    const question = psychometricQuestions.find(q => q.id === answer.questionId);
    if (question) {
      if (question.type === 'likert') {
        totalScore += Number(answer.value);
        maxScore += question.scale || 5;
      } else if (question.type === 'multiple_choice') {
        // For multiple choice, assign weighted scores based on expected answers
        const scores = [3, 5, 4, 4]; // Weighted scores for different options
        totalScore += scores[Number(answer.value)] || 3;
        maxScore += 5;
      }
    }
  });

  return maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
};

export const calculateTechnicalScore = (answers: AssessmentAnswer[]): number => {
  const techAnswers = answers.filter(a => 
    technicalQuestions.some(q => q.id === a.questionId)
  );

  let correctAnswers = 0;
  let totalQuestions = 0;

  techAnswers.forEach(answer => {
    const question = technicalQuestions.find(q => q.id === answer.questionId);
    if (question) {
      totalQuestions++;
      if (Number(answer.value) === question.correctAnswer) {
        correctAnswers++;
      }
    }
  });

  return totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
};

export const calculateWISCARScores = (answers: AssessmentAnswer[]): WISCARScores => {
  const psychScore = calculatePsychometricScore(answers);
  const techScore = calculateTechnicalScore(answers);

  // Extract specific answers for WISCAR calculation
  const motivationAnswers = answers.filter(a => 
    psychometricQuestions.some(q => q.id === a.questionId && q.category === 'motivation')
  );
  
  const interestAnswers = answers.filter(a => 
    psychometricQuestions.some(q => q.id === a.questionId && q.category === 'interest')
  );

  const personalityAnswers = answers.filter(a => 
    psychometricQuestions.some(q => q.id === a.questionId && q.category === 'personality')
  );

  const cognitiveAnswers = answers.filter(a => 
    psychometricQuestions.some(q => q.id === a.questionId && q.category === 'cognitive')
  );

  // Calculate WISCAR dimensions
  const will = calculateDimensionScore(motivationAnswers, ['mot_2']);
  const interest = calculateDimensionScore(interestAnswers, ['int_1', 'int_2', 'int_3', 'int_4']);
  const skill = (psychScore + techScore) / 2;
  const cognitive = (techScore + calculateDimensionScore(cognitiveAnswers, ['cog_1', 'cog_2'])) / 2;
  const ability = calculateDimensionScore(personalityAnswers, ['per_2', 'per_4']);
  const realWorld = calculateDimensionScore(answers, ['hol_1', 'hol_2']);

  return {
    will: Math.min(100, Math.max(0, will)),
    interest: Math.min(100, Math.max(0, interest)),
    skill: Math.min(100, Math.max(0, skill)),
    cognitive: Math.min(100, Math.max(0, cognitive)),
    ability: Math.min(100, Math.max(0, ability)),
    realWorld: Math.min(100, Math.max(0, realWorld))
  };
};

const calculateDimensionScore = (answers: AssessmentAnswer[], questionIds: string[]): number => {
  const relevantAnswers = answers.filter(a => questionIds.includes(a.questionId));
  
  if (relevantAnswers.length === 0) return 50; // Default neutral score

  let totalScore = 0;
  let maxScore = 0;

  relevantAnswers.forEach(answer => {
    const question = psychometricQuestions.find(q => q.id === answer.questionId);
    if (question) {
      if (question.type === 'likert') {
        totalScore += Number(answer.value);
        maxScore += question.scale || 5;
      } else if (question.type === 'multiple_choice') {
        // Weighted scoring for multiple choice based on alignment with energy auditing
        const weights = [3, 5, 4, 4]; // Adjust based on question context
        totalScore += weights[Number(answer.value)] || 3;
        maxScore += 5;
      }
    }
  });

  return maxScore > 0 ? (totalScore / maxScore) * 100 : 50;
};

export const generateAssessmentResults = (answers: AssessmentAnswer[]): AssessmentResults => {
  const psychometricScore = calculatePsychometricScore(answers);
  const technicalScore = calculateTechnicalScore(answers);
  const wiscarScores = calculateWISCARScores(answers);
  
  const overallScore = (psychometricScore + technicalScore + 
    Object.values(wiscarScores).reduce((sum, score) => sum + score, 0) / 6) / 3;

  // Determine recommendation
  let recommendation: 'yes' | 'maybe' | 'no';
  if (overallScore >= 75 && psychometricScore >= 70 && technicalScore >= 65) {
    recommendation = 'yes';
  } else if (overallScore >= 60 && (psychometricScore >= 60 || technicalScore >= 60)) {
    recommendation = 'maybe';
  } else {
    recommendation = 'no';
  }

  // Generate insights
  const insights = generateInsights(psychometricScore, technicalScore, wiscarScores);
  
  // Generate next steps
  const nextSteps = generateNextSteps(recommendation, psychometricScore, technicalScore);
  
  // Generate career paths
  const careerPaths = generateCareerPaths(recommendation, wiscarScores);

  return {
    psychometricScore,
    technicalScore,
    wiscarScores,
    overallScore,
    recommendation,
    insights,
    nextSteps,
    careerPaths
  };
};

const generateInsights = (psychScore: number, techScore: number, wiscar: WISCARScores): string[] => {
  const insights: string[] = [];

  if (psychScore >= 80) {
    insights.push('Excellent psychological alignment with energy auditing work, showing strong motivation and personality fit.');
  } else if (psychScore >= 60) {
    insights.push('Good psychological fit with some areas for development in motivation or personality alignment.');
  } else {
    insights.push('Consider exploring what aspects of energy auditing align with your interests and values.');
  }

  if (techScore >= 80) {
    insights.push('Strong technical foundation with excellent problem-solving and domain knowledge capabilities.');
  } else if (techScore >= 60) {
    insights.push('Solid technical aptitude with room for improvement in domain-specific knowledge.');
  } else {
    insights.push('Focus on building foundational technical skills and energy auditing knowledge.');
  }

  if (wiscar.interest >= 80) {
    insights.push('High genuine interest in energy efficiency and sustainability work.');
  }

  if (wiscar.cognitive >= 80) {
    insights.push('Excellent analytical and problem-solving capabilities for complex energy assessments.');
  }

  if (wiscar.will >= 80) {
    insights.push('Strong internal motivation and persistence for pursuing energy auditing career goals.');
  }

  return insights;
};

const generateNextSteps = (recommendation: string, psychScore: number, techScore: number): string[] => {
  const steps: string[] = [];

  if (recommendation === 'yes') {
    steps.push('Pursue energy auditing certification (such as BPI or RESNET)');
    steps.push('Seek internship or entry-level position with energy consulting firm');
    steps.push('Develop proficiency with energy auditing software and tools');
    steps.push('Join professional organizations like AEE or BPI');
  } else if (recommendation === 'maybe') {
    if (psychScore < 70) {
      steps.push('Explore energy efficiency projects to build genuine interest and motivation');
      steps.push('Shadow experienced energy auditors to understand daily responsibilities');
    }
    if (techScore < 70) {
      steps.push('Complete foundational courses in building science and thermodynamics');
      steps.push('Practice with energy calculation problems and technical scenarios');
    }
    steps.push('Consider related roles like sustainability coordinator or facility management');
  } else {
    steps.push('Explore related fields that align better with your interests and strengths');
    steps.push('Consider roles in renewable energy, environmental compliance, or green building');
    steps.push('Build foundational knowledge through online courses if still interested');
  }

  return steps;
};

const generateCareerPaths = (recommendation: string, wiscar: WISCARScores): string[] => {
  const paths: string[] = [];

  if (recommendation === 'yes' || recommendation === 'maybe') {
    paths.push('Energy Auditor - Commercial Buildings');
    paths.push('Residential Energy Assessor');
    paths.push('Energy Efficiency Program Manager');
    
    if (wiscar.realWorld >= 70) {
      paths.push('Energy Consulting Business Owner');
    }
    
    if (wiscar.cognitive >= 75) {
      paths.push('Building Performance Analyst');
      paths.push('Energy Modeling Specialist');
    }
  }

  // Always include some alternatives
  paths.push('Sustainability Coordinator');
  paths.push('Facility Energy Manager');
  paths.push('Environmental Compliance Specialist');

  return paths;
};