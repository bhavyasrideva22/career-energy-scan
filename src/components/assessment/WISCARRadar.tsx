import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { WISCARScores } from '@/types/assessment';

interface WISCARRadarProps {
  scores: WISCARScores;
}

export const WISCARRadar = ({ scores }: WISCARRadarProps) => {
  const data = [
    {
      dimension: 'Will',
      score: scores.will,
      fullMark: 100,
    },
    {
      dimension: 'Interest',
      score: scores.interest,
      fullMark: 100,
    },
    {
      dimension: 'Skill',
      score: scores.skill,
      fullMark: 100,
    },
    {
      dimension: 'Cognitive',
      score: scores.cognitive,
      fullMark: 100,
    },
    {
      dimension: 'Ability to Learn',
      score: scores.ability,
      fullMark: 100,
    },
    {
      dimension: 'Real-World',
      score: scores.realWorld,
      fullMark: 100,
    },
  ];

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis 
            dataKey="dimension" 
            tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
          />
          <Radar
            name="WISCAR Scores"
            dataKey="score"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary) / 0.3)"
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};