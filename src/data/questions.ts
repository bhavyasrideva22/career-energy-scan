import { PsychometricQuestion, TechnicalQuestion } from '@/types/assessment';

export const psychometricQuestions: PsychometricQuestion[] = [
  // Interest Scale Questions
  {
    id: 'int_1',
    category: 'interest',
    question: 'I am passionate about environmental sustainability and energy conservation.',
    type: 'likert',
    scale: 5
  },
  {
    id: 'int_2',
    category: 'interest',
    question: 'I enjoy analyzing data to identify patterns and inefficiencies.',
    type: 'likert',
    scale: 5
  },
  {
    id: 'int_3',
    category: 'interest',
    question: 'Working with building systems and energy equipment excites me.',
    type: 'likert',
    scale: 5
  },
  {
    id: 'int_4',
    category: 'interest',
    question: 'I find satisfaction in helping organizations save money through efficiency improvements.',
    type: 'likert',
    scale: 5
  },

  // Personality Questions (Big 5 Focus)
  {
    id: 'per_1',
    category: 'personality',
    question: 'I prefer to work methodically and pay close attention to details.',
    type: 'likert',
    scale: 5
  },
  {
    id: 'per_2',
    category: 'personality',
    question: 'I enjoy exploring new technologies and innovative solutions.',
    type: 'likert',
    scale: 5
  },
  {
    id: 'per_3',
    category: 'personality',
    question: 'I am comfortable working independently for extended periods.',
    type: 'likert',
    scale: 5
  },
  {
    id: 'per_4',
    category: 'personality',
    question: 'I handle unexpected problems and changes well.',
    type: 'likert',
    scale: 5
  },

  // Holland Codes
  {
    id: 'hol_1',
    category: 'holland',
    question: 'Which work environment appeals to you most?',
    type: 'multiple_choice',
    options: [
      'Investigating and analyzing complex systems',
      'Building and fixing mechanical equipment',
      'Leading teams and managing projects',
      'Working with people to solve their problems'
    ]
  },
  {
    id: 'hol_2',
    category: 'holland',
    question: 'Your ideal workday would involve:',
    type: 'multiple_choice',
    options: [
      'Conducting detailed inspections and measurements',
      'Presenting findings to clients and stakeholders',
      'Developing creative solutions to energy challenges',
      'Working hands-on with technical equipment'
    ]
  },

  // Cognitive Style
  {
    id: 'cog_1',
    category: 'cognitive',
    question: 'When solving problems, I prefer to:',
    type: 'multiple_choice',
    options: [
      'Follow systematic, proven methodologies',
      'Think creatively and try innovative approaches',
      'Collaborate with others to find solutions',
      'Research thoroughly before taking action'
    ]
  },
  {
    id: 'cog_2',
    category: 'cognitive',
    question: 'I process information best when it is:',
    type: 'multiple_choice',
    options: [
      'Presented with detailed charts and graphs',
      'Explained through real-world examples',
      'Broken down into logical steps',
      'Connected to broader concepts and trends'
    ]
  },

  // Motivation Questions
  {
    id: 'mot_1',
    category: 'motivation',
    question: 'What motivates you most about energy auditing work?',
    type: 'multiple_choice',
    options: [
      'Making a positive environmental impact',
      'The intellectual challenge of analysis',
      'Helping organizations save money',
      'Working with cutting-edge technology'
    ]
  },
  {
    id: 'mot_2',
    category: 'motivation',
    question: 'I am willing to pursue additional certifications and training to advance in this field.',
    type: 'likert',
    scale: 5
  }
];

export const technicalQuestions: TechnicalQuestion[] = [
  // General Aptitude
  {
    id: 'apt_1',
    category: 'aptitude',
    question: 'If a building uses 1,200 kWh per month and energy costs $0.12 per kWh, what is the annual energy cost?',
    type: 'multiple_choice',
    options: ['$1,440', '$1,728', '$14,400', '$17,280'],
    correctAnswer: 1,
    explanation: '1,200 kWh × 12 months × $0.12 = $1,728 annually'
  },
  {
    id: 'apt_2',
    category: 'aptitude',
    question: 'A pattern follows: 2, 6, 18, 54... What comes next?',
    type: 'multiple_choice',
    options: ['108', '162', '216', '270'],
    correctAnswer: 1,
    explanation: 'Each number is multiplied by 3: 54 × 3 = 162'
  },
  {
    id: 'apt_3',
    category: 'aptitude',
    question: 'If implementing an energy efficiency measure costs $5,000 and saves $800 annually, what is the simple payback period?',
    type: 'multiple_choice',
    options: ['5.0 years', '6.25 years', '7.5 years', '8.0 years'],
    correctAnswer: 1,
    explanation: 'Payback = Initial Cost ÷ Annual Savings = $5,000 ÷ $800 = 6.25 years'
  },

  // Prerequisite Knowledge
  {
    id: 'pre_1',
    category: 'prerequisite',
    question: 'What is the standard unit for measuring electrical energy consumption?',
    type: 'multiple_choice',
    options: ['Watts (W)', 'Kilowatt-hours (kWh)', 'Voltage (V)', 'Amperes (A)'],
    correctAnswer: 1,
    explanation: 'kWh measures energy consumption over time, while watts measure instantaneous power'
  },
  {
    id: 'pre_2',
    category: 'prerequisite',
    question: 'Which factor most directly affects heating and cooling energy use in buildings?',
    type: 'multiple_choice',
    options: ['Building orientation', 'Thermal insulation', 'Lighting efficiency', 'Water heating'],
    correctAnswer: 1,
    explanation: 'Thermal insulation has the most direct impact on heating and cooling energy requirements'
  },
  {
    id: 'pre_3',
    category: 'prerequisite',
    question: 'In energy auditing, what does "baseline" refer to?',
    type: 'multiple_choice',
    options: [
      'The minimum energy a building can use',
      'Current energy usage before improvements',
      'Industry standard energy consumption',
      'Maximum allowable energy use'
    ],
    correctAnswer: 1,
    explanation: 'Baseline establishes current energy usage patterns before implementing efficiency measures'
  },

  // Domain-Specific Questions
  {
    id: 'dom_1',
    category: 'domain',
    question: 'During a commercial building audit, you notice the HVAC system runs continuously. Your first step should be:',
    type: 'scenario',
    options: [
      'Immediately recommend a new HVAC system',
      'Check thermostat settings and control schedules',
      'Measure air quality throughout the building',
      'Calculate the total energy cost'
    ],
    correctAnswer: 1,
    explanation: 'Always check controls and scheduling first, as these are often the cause of inefficient operation'
  },
  {
    id: 'dom_2',
    category: 'domain',
    question: 'Which tool is most commonly used to measure thermal energy loss in buildings?',
    type: 'multiple_choice',
    options: ['Power meter', 'Thermal imaging camera', 'Light meter', 'Sound level meter'],
    correctAnswer: 1,
    explanation: 'Thermal imaging cameras detect heat loss through infrared radiation visualization'
  },
  {
    id: 'dom_3',
    category: 'domain',
    question: 'When prioritizing energy efficiency measures, which factor should be considered first?',
    type: 'multiple_choice',
    options: [
      'Measures with lowest upfront cost',
      'Measures with shortest payback period',
      'Measures with highest energy savings',
      'Measures that are easiest to implement'
    ],
    correctAnswer: 1,
    explanation: 'Shortest payback period typically indicates the most cost-effective improvements'
  }
];