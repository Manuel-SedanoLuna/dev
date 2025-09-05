import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { ArrowLeft, Calendar, BookOpen, User } from 'lucide-react';
import { Student } from '../types/students/student';
import { MathSkillsRadar } from './MathSkillsRadar';
import { PedagogicalRecommendations } from './PedagogicalRecommendations';

interface StudentProfileProps {
  student: Student;
  onBack: () => void;
}

export function StudentProfile({ student, onBack }: StudentProfileProps) {
  const getLearningStyleColor = (style: string) => {
    switch (style) {
      case 'Visual': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Auditivo': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'Kinestésico': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header con botón de regreso */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          onClick={onBack} 
          className="gap-2 text-muted-foreground hover:text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
          Regresar al Grupo
        </Button>
      </div>

      {/* Información básica del estudiante */}
      <Card className="liquid-glass-card rounded-2xl">
        <CardContent className="p-8">
          <div className="flex items-center gap-6">
            <Avatar className="w-24 h-24 ring-4 ring-white/20">
              <AvatarImage src={student.avatar} alt={student.name} />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-2xl">
                {student.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h1 className="text-3xl text-white">{student.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <p className="text-muted-foreground text-lg">{student.grade}</p>
              </div>
              
              <div className="mt-6 flex items-center gap-6">
                <Badge 
                  className={`${getLearningStyleColor(student.learningStyle)} px-4 py-2 text-base`}
                >
                  Estilo de Aprendizaje: {student.learningStyle}
                </Badge>
                
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground">Progreso General:</span>
                  <span className="text-2xl text-emerald-400">{student.progressPercentage}%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Gráfico de habilidades matemáticas */}
        <Card className="liquid-glass-card rounded-2xl xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-white text-xl">Desempeño por Áreas de Matemáticas</CardTitle>
          </CardHeader>
          <CardContent>
            <MathSkillsRadar mathSkills={student.mathSkills} />
          </CardContent>
        </Card>

        {/* Progreso del curso */}
        <Card className="liquid-glass-card rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <BookOpen className="w-5 h-5" />
              Avance del Curso
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-muted-foreground">Progreso del Curso</span>
                <span className="text-xl text-emerald-400">{student.courseProgress.completedPercentage}%</span>
              </div>
              <Progress value={student.courseProgress.completedPercentage} className="h-4" />
            </div>
            
            <div className="space-y-4">
              <div className="liquid-glass rounded-lg p-4">
                <div className="flex items-center gap-2 text-sm mb-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Fecha de inicio</span>
                </div>
                <span className="text-white">{formatDate(student.courseProgress.startDate)}</span>
              </div>
              
              <div className="liquid-glass rounded-lg p-4">
                <div className="text-sm mb-2">
                  <span className="text-muted-foreground">Unidad actual</span>
                </div>
                <span className="text-white font-medium">{student.courseProgress.currentUnit}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recomendaciones pedagógicas */}
      <div className="liquid-glass-card rounded-2xl">
        <PedagogicalRecommendations student={student} />
      </div>
    </div>
  );
}