import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Eye, BookOpen } from 'lucide-react';
import { Student } from '../types/students/student';

interface StudentCardProps {
  student: Student;
  onViewProfile: (studentId: string) => void;
}

export function StudentCard({ student, onViewProfile }: StudentCardProps) {
  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'text-emerald-400';
    if (percentage >= 60) return 'text-amber-400';
    return 'text-red-400';
  };

  const getLearningStyleColor = (style: string) => {
    switch (style) {
      case 'Visual': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Auditivo': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'Kinestésico': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <Card className="liquid-glass-card rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="w-14 h-14 ring-2 ring-white/20">
            <AvatarImage src={student.avatar} alt={student.name} />
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              {student.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-white truncate">{student.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <BookOpen className="w-3 h-3 text-muted-foreground" />
              <p className="text-muted-foreground text-sm">{student.grade}</p>
            </div>
            
            <div className="mt-4 space-y-3">
              {/* Progreso global */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Progreso Global</span>
                  <span className={`font-medium ${getProgressColor(student.progressPercentage)}`}>
                    {student.progressPercentage}%
                  </span>
                </div>
                <Progress value={student.progressPercentage} className="h-2" />
              </div>

              {/* Unidad actual */}
              <div className="liquid-glass rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Unidad Actual</p>
                <p className="text-sm text-white truncate">{student.courseProgress.currentUnit}</p>
              </div>
              
              {/* Estilo de aprendizaje y botón */}
              <div className="flex items-center justify-between gap-3">
                <Badge className={`${getLearningStyleColor(student.learningStyle)} text-xs px-2 py-1`}>
                  {student.learningStyle}
                </Badge>
                
                <Button 
                  size="sm" 
                  onClick={() => onViewProfile(student.id)}
                  className="gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white"
                >
                  <Eye className="w-4 h-4" />
                  Ver Perfil
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}