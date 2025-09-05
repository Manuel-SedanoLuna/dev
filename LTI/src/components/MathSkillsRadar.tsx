import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface MathSkillsRadarProps {
  mathSkills: {
    algebra: number;
    geometry: number;
    arithmetic: number;
    statistics: number;
    calculus: number;
  };
}

export function MathSkillsRadar({ mathSkills }: MathSkillsRadarProps) {
  const data = [
    { subject: 'Álgebra', value: mathSkills.algebra },
    { subject: 'Geometría', value: mathSkills.geometry },
    { subject: 'Aritmética', value: mathSkills.arithmetic },
    { subject: 'Estadística', value: mathSkills.statistics },
    { subject: 'Cálculo', value: mathSkills.calculus },
  ];

  const getColor = (value: number) => {
    if (value >= 80) return '#22c55e'; // Verde
    if (value >= 60) return '#eab308'; // Amarillo
    return '#ef4444'; // Rojo
  };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" className="text-sm" />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]} 
            className="text-xs"
            tick={false}
          />
          <Radar
            name="Habilidades"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
      
      <div className="mt-4 flex justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm">Dominio (80-100%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-sm">Intermedio (60-79%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-sm">Necesita Apoyo (&lt;60%)</span>
        </div>
      </div>
    </div>
  );
}