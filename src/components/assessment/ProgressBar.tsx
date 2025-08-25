import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  sectionTitle: string;
}

export const ProgressBar = ({ currentStep, totalSteps, sectionTitle }: ProgressBarProps) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-foreground">{sectionTitle}</h2>
        <span className="text-sm text-muted-foreground">
          {currentStep} of {totalSteps}
        </span>
      </div>
      <Progress 
        value={progressPercentage} 
        className="h-3"
      />
      <div className="mt-2 text-sm text-muted-foreground text-center">
        {Math.round(progressPercentage)}% Complete
      </div>
    </div>
  );
};