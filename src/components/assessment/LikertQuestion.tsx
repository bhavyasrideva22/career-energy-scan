import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface LikertQuestionProps {
  question: string;
  scale: number;
  selectedValue?: number;
  onAnswer: (value: number) => void;
}

export const LikertQuestion = ({ question, scale, selectedValue, onAnswer }: LikertQuestionProps) => {
  const labels = [
    'Strongly Disagree',
    'Disagree', 
    'Neutral',
    'Agree',
    'Strongly Agree'
  ];

  return (
    <Card className="bg-gradient-card shadow-soft border-0">
      <CardContent className="p-8">
        <h3 className="text-lg font-medium mb-6 text-center">{question}</h3>
        
        <div className="space-y-3">
          {Array.from({ length: scale }, (_, i) => i + 1).map((value) => (
            <Button
              key={value}
              variant={selectedValue === value ? "default" : "outline"}
              className={`w-full justify-start p-4 h-auto transition-all duration-200 ${
                selectedValue === value 
                  ? 'bg-gradient-primary shadow-glow transform scale-102' 
                  : 'hover:shadow-soft hover:transform hover:scale-101'
              }`}
              onClick={() => onAnswer(value)}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    selectedValue === value 
                      ? 'bg-primary-foreground border-primary-foreground' 
                      : 'border-border'
                  }`} />
                  <span className="font-medium">{value}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {labels[value - 1]}
                </span>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};