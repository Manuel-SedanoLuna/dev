import { CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Lightbulb, Brain, Eye, Headphones, Hand } from 'lucide-react';
import { Student } from '../types/students/student';

interface PedagogicalRecommendationsProps {
  student: Student;
}

export function PedagogicalRecommendations({ student }: PedagogicalRecommendationsProps) {
  const generateRecommendations = (student: Student): string[] => {
    const recommendations: string[] = [];
    const { mathSkills, learningStyle } = student;
    
    // Identificar áreas débiles
    const weakAreas = Object.entries(mathSkills)
      .filter(([_, value]) => value < 60)
      .map(([area, _]) => area);
    
    const intermediateAreas = Object.entries(mathSkills)
      .filter(([_, value]) => value >= 60 && value < 80)
      .map(([area, _]) => area);

    // Recomendaciones basadas en estilo de aprendizaje y áreas débiles
    if (learningStyle === 'Visual') {
      if (weakAreas.includes('geometry')) {
        recommendations.push('Utiliza diagramas interactivos, figuras geométricas 3D y software de geometría dinámica para reforzar conceptos espaciales.');
      }
      if (weakAreas.includes('algebra')) {
        recommendations.push('Emplea gráficos de funciones con colores diferenciados y representaciones visuales de ecuaciones para mejorar la comprensión algebraica.');
      }
      if (weakAreas.includes('statistics')) {
        recommendations.push('Crea infografías, histogramas coloridos y gráfincomparativas para explicar conceptos estadísticos de manera visual.');
      }
      if (weakAreas.includes('arithmetic')) {
        recommendations.push('Usa ábacos visuales, bloques de colores y representaciones gráficas de operaciones para reforzar la aritmética básica.');
      }
      recommendations.push('Incorpora mapas mentales, esquemas estructurados y organizadores gráficos en todas las explicaciones matemáticas.');
    }
    
    if (learningStyle === 'Auditivo') {
      if (weakAreas.includes('arithmetic')) {
        recommendations.push('Practica las operaciones básicas con canciones numéricas, rimas matemáticas y repetición oral estructurada.');
      }
      if (weakAreas.includes('algebra')) {
        recommendations.push('Explica paso a paso los procesos algebraicos en voz alta y fomenta que el estudiante verbalice su razonamiento matemático.');
      }
      if (weakAreas.includes('geometry')) {
        recommendations.push('Describe las propiedades geométricas mediante narraciones detalladas y permite que el estudiante explique las figuras oralmente.');
      }
      recommendations.push('Utiliza podcasts educativos, explicaciones grabadas y discusiones grupales para reforzar conceptos matemáticos.');
      recommendations.push('Incorpora música o ritmos mnemotécnicos para memorizar fórmulas y secuencias matemáticas importantes.');
    }
    
    if (learningStyle === 'Kinestésico') {
      if (weakAreas.includes('geometry')) {
        recommendations.push('Usa bloques de construcción, figuras manipulables 3D y actividades de medición real para enseñar geometría práctica.');
      }
      if (weakAreas.includes('arithmetic')) {
        recommendations.push('Implementa juegos físicos con dados, fichas y actividades de conteo que involucren movimiento corporal.');
      }
      if (weakAreas.includes('algebra')) {
        recommendations.push('Crea actividades con balanzas físicas para representar ecuaciones y permite manipular objetos para resolver problemas algebraicos.');
      }
      recommendations.push('Diseña experimentos matemáticos donde el estudiante pueda tocar, construir y experimentar con conceptos abstractos.');
      recommendations.push('Incluye descansos activos cada 20 minutos y permite movimiento durante las explicaciones teóricas.');
    }

    // Recomendaciones para áreas intermedias
    intermediateAreas.forEach(area => {
      const areaNames: { [key: string]: string } = {
        algebra: 'álgebra',
        geometry: 'geometría',
        arithmetic: 'aritmética',
        statistics: 'estadística',
        calculus: 'cálculo'
      };
      recommendations.push(`Refuerza ${areaNames[area]} con ejercicios graduales, práctica constante y retroalimentación inmediata.`);
    });

    // Recomendación general de motivación
    if (student.progressPercentage < 70) {
      recommendations.push('Establece metas pequeñas y alcanzables, celebra cada logro y mantén un ambiente de aprendizaje positivo y motivador.');
    }

    return recommendations.slice(0, 5); // Limitar a 5 recomendaciones
  };

  const recommendations = generateRecommendations(student);

  const getStyleIcon = (style: string) => {
    switch (style) {
      case 'Visual': return Eye;
      case 'Auditivo': return Headphones;
      case 'Kinestésico': return Hand;
      default: return Brain;
    }
  };

  const getStyleColor = (style: string) => {
    switch (style) {
      case 'Visual': return 'from-blue-500 to-blue-600';
      case 'Auditivo': return 'from-emerald-500 to-emerald-600';
      case 'Kinestésico': return 'from-purple-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const StyleIcon = getStyleIcon(student.learningStyle);

  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-white text-xl">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          Recomendaciones Pedagógicas Personalizadas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Estilo de aprendizaje destacado */}
        <div className="liquid-glass rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getStyleColor(student.learningStyle)} flex items-center justify-center`}>
              <StyleIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white text-lg">Estilo de Aprendizaje Principal</h3>
              <Badge className={`${getLearningStyleColor(student.learningStyle)} text-sm px-3 py-1 mt-1`}>
                {student.learningStyle}
              </Badge>
            </div>
          </div>
          <p className="text-muted-foreground text-sm">
            Las siguientes recomendaciones están adaptadas específicamente para optimizar el aprendizaje 
            {student.learningStyle.toLowerCase()} de {student.name.split(' ')[0]}.
          </p>
        </div>
        
        {/* Lista de recomendaciones */}
        <div className="space-y-4">
          {recommendations.map((recommendation, index) => (
            <div key={index} className="liquid-glass rounded-xl p-5 hover:bg-white/5 transition-all duration-200">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-1">
                  {index + 1}
                </div>
                <p className="text-white leading-relaxed">{recommendation}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Nota adicional */}
        <div className="liquid-glass rounded-xl p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
          <p className="text-sm text-blue-200">
            <strong>Nota:</strong> Estas recomendaciones se basan en el análisis del perfil de aprendizaje y 
            las áreas de oportunidad identificadas. Se sugiere implementarlas gradualmente y monitorear el progreso.
          </p>
        </div>
      </CardContent>
    </>
  );

  function getLearningStyleColor(style: string) {
    switch (style) {
      case 'Visual': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Auditivo': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'Kinestésico': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  }
}