import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, TrendingUp, Users, CheckCircle } from 'lucide-react';

interface AssessmentIntroProps {
  onStartAssessment: () => void;
}

export const AssessmentIntro = ({ onStartAssessment }: AssessmentIntroProps) => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="bg-gradient-hero bg-clip-text text-transparent mb-6">
            <h1 className="text-5xl font-bold mb-4">
              Discover Your Fit for Energy Auditor
            </h1>
            <p className="text-xl">
              Comprehensive Readiness & Career Assessment
            </p>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Evaluate your psychological fit, technical aptitude, and career readiness 
            for a rewarding role in energy efficiency and sustainability.
          </p>
        </div>

        {/* What is Energy Auditing */}
        <Card className="mb-8 bg-gradient-card shadow-soft border-0">
          <CardContent className="p-8">
            <div className="flex items-center mb-6">
              <Lightbulb className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-2xl font-semibold">What is Energy Auditing?</h2>
            </div>
            <p className="text-lg mb-4">
              Energy Auditing involves assessing buildings, systems, and processes to identify 
              energy usage patterns, inefficiencies, and opportunities for cost-effective savings. 
              Energy auditors help organizations reduce their environmental impact while improving 
              their bottom line.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Analyze Systems</h3>
                <p className="text-sm text-muted-foreground">
                  Inspect and evaluate building systems for energy efficiency opportunities
                </p>
              </div>
              <div className="text-center">
                <div className="bg-accent/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Advise Clients</h3>
                <p className="text-sm text-muted-foreground">
                  Communicate findings and recommendations to stakeholders
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary-glow/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-8 w-8 text-primary-glow" />
                </div>
                <h3 className="font-semibold mb-2">Drive Impact</h3>
                <p className="text-sm text-muted-foreground">
                  Implement solutions that reduce costs and environmental impact
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Career Paths */}
        <Card className="mb-8 bg-gradient-card shadow-soft border-0">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-6">Career Opportunities</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'Energy Auditor',
                'Energy Consultant', 
                'Sustainability Analyst',
                'Facility Manager',
                'Building Performance Specialist',
                'Renewable Energy Technician'
              ].map((career) => (
                <div key={career} className="flex items-center p-3 bg-background rounded-lg shadow-sm">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span className="font-medium">{career}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Traits */}
        <Card className="mb-12 bg-gradient-card shadow-soft border-0">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-6">Key Traits for Success</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3 text-primary">Technical Skills</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span>Analytical and detail-oriented thinking</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span>Strong mathematical and problem-solving abilities</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span>Comfort with technology and measurement tools</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3 text-accent">Personal Qualities</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-accent mr-2" />
                    <span>Passion for sustainability and environmental impact</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-accent mr-2" />
                    <span>Excellent communication and presentation skills</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-accent mr-2" />
                    <span>Motivation to help organizations improve efficiency</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assessment Overview */}
        <Card className="mb-8 bg-gradient-card shadow-elegant border-0">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Assessment Overview</h2>
            <p className="text-lg mb-6 text-muted-foreground">
              This comprehensive 20-25 minute assessment evaluates your fit across multiple dimensions:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-4 bg-background rounded-lg shadow-sm">
                <h3 className="font-semibold text-primary mb-2">Psychometric Evaluation</h3>
                <p className="text-sm text-muted-foreground">
                  Interest, personality, cognitive style, and motivation assessment
                </p>
              </div>
              <div className="p-4 bg-background rounded-lg shadow-sm">
                <h3 className="font-semibold text-accent mb-2">Technical Aptitude</h3>
                <p className="text-sm text-muted-foreground">
                  Logical reasoning, numerical ability, and domain knowledge
                </p>
              </div>
            </div>
            
            <Button 
              onClick={onStartAssessment}
              size="lg"
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 transform hover:scale-105 text-lg px-8 py-3"
            >
              Start Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};