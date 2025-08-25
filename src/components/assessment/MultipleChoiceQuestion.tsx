import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface MultipleChoiceQuestionProps {
  question: string;
  options: string[];
  selectedValue?: number;
  onAnswer: (value: number) => void;
  showExplanation?: boolean;
  explanation?: string;
  correctAnswer?: number;
}

export const MultipleChoiceQuestion = ({ 
  question, 
  options, 
  selectedValue, 
  onAnswer, 
  showExplanation = false,
  explanation,
  correctAnswer
}: MultipleChoiceQuestionProps) => {
  return (
    <Card className="bg-gradient-card shadow-soft border-0">
      <CardContent className="p-8">
        <h3 className="text-lg font-medium mb-6">{question}</h3>
        
        <div className="space-y-3 mb-6">
          {options.map((option, index) => (
            <Button
              key={index}
              variant={selectedValue === index ? "default" : "outline"}
              className={`w-full justify-start p-4 h-auto text-left transition-all duration-200 ${
                selectedValue === index 
                  ? 'bg-gradient-primary shadow-glow transform scale-102' 
                  : 'hover:shadow-soft hover:transform hover:scale-101'
              } ${
                showExplanation && correctAnswer !== undefined
                  ? index === correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : selectedValue === index && index !== correctAnswer
                    ? 'border-red-500 bg-red-50'
                    : ''
                  : ''
              }`}
              onClick={() => onAnswer(index)}
            >
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full border-2 mr-3 flex-shrink-0 ${
                  selectedValue === index 
                    ? 'bg-primary-foreground border-primary-foreground' 
                    : 'border-border'
                }`} />
                <span className="whitespace-normal">{option}</span>
              </div>
            </Button>
          ))}
        </div>

        {showExplanation && explanation && (
          <div className="mt-4 p-4 bg-background rounded-lg border border-border">
            <h4 className="font-semibold text-primary mb-2">Explanation:</h4>
            <p className="text-sm text-muted-foreground">{explanation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};