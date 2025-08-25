import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WISCARRadar } from './WISCARRadar';
import { AssessmentResults as AssessmentResultsType } from '@/types/assessment';
import { CheckCircle, AlertCircle, XCircle, TrendingUp, BookOpen, Users } from 'lucide-react';

interface AssessmentResultsProps {
  results: AssessmentResultsType;
  onRestart: () => void;
}

export const AssessmentResults = ({ results, onRestart }: AssessmentResultsProps) => {
  const getRecommendationIcon = () => {
    switch (results.recommendation) {
      case 'yes': return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'maybe': return <AlertCircle className="h-6 w-6 text-yellow-600" />;
      case 'no': return <XCircle className="h-6 w-6 text-red-600" />;
    }
  };

  const getRecommendationColor = () => {
    switch (results.recommendation) {
      case 'yes': return 'bg-green-50 border-green-200';
      case 'maybe': return 'bg-yellow-50 border-yellow-200';
      case 'no': return 'bg-red-50 border-red-200';
    }
  };

  const getRecommendationText = () => {
    switch (results.recommendation) {
      case 'yes': return 'Excellent Fit - Highly Recommended';
      case 'maybe': return 'Partial Fit - Consider with Development';
      case 'no': return 'Limited Fit - Explore Alternatives';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
            Your Energy Auditor Assessment Results
          </h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive analysis of your fit for energy auditing career
          </p>
        </div>

        {/* Overall Recommendation */}
        <Card className={`mb-8 ${getRecommendationColor()} shadow-elegant border-2`}>
          <CardContent className="p-8">
            <div className="flex items-center justify-center mb-4">
              {getRecommendationIcon()}
              <h2 className="text-2xl font-bold ml-3">{getRecommendationText()}</h2>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold mb-2">
                {Math.round(results.overallScore)}%
              </div>
              <p className="text-lg text-muted-foreground">Overall Compatibility Score</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Detailed Scores */}
          <Card className="bg-gradient-card shadow-soft border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Detailed Assessment Scores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Psychometric Fit</span>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {Math.round(results.psychometricScore)}%
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Technical Readiness</span>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {Math.round(results.technicalScore)}%
                  </Badge>
                </div>
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3">WISCAR Framework Scores</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>Will:</span>
                      <span className="font-medium">{Math.round(results.wiscarScores.will)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Interest:</span>
                      <span className="font-medium">{Math.round(results.wiscarScores.interest)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Skill:</span>
                      <span className="font-medium">{Math.round(results.wiscarScores.skill)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cognitive:</span>
                      <span className="font-medium">{Math.round(results.wiscarScores.cognitive)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ability:</span>
                      <span className="font-medium">{Math.round(results.wiscarScores.ability)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Real-World:</span>
                      <span className="font-medium">{Math.round(results.wiscarScores.realWorld)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* WISCAR Radar Chart */}
          <Card className="bg-gradient-card shadow-soft border-0">
            <CardHeader>
              <CardTitle>WISCAR Framework Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <WISCARRadar scores={results.wiscarScores} />
            </CardContent>
          </Card>
        </div>

        {/* Insights */}
        <Card className="mb-8 bg-gradient-card shadow-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Key Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.insights.map((insight, index) => (
                <div key={index} className="flex items-start p-3 bg-background rounded-lg">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <p>{insight}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps and Career Paths */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gradient-card shadow-soft border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Recommended Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start p-3 bg-background rounded-lg">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </div>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Related Career Paths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.careerPaths.map((career, index) => (
                  <div key={index} className="flex items-center p-3 bg-background rounded-lg">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span className="font-medium">{career}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="text-center">
          <Button 
            onClick={onRestart}
            size="lg"
            variant="outline"
            className="mr-4"
          >
            Retake Assessment
          </Button>
          <Button 
            size="lg"
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            onClick={() => window.print()}
          >
            Download Report
          </Button>
        </div>
      </div>
    </div>
  );
};