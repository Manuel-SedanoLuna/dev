import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Users, TrendingUp, Settings } from 'lucide-react';
import { Group } from '../types/students/student';

interface GroupCardProps {
  group: Group;
  onViewGroup: (groupId: string) => void;
  onManageStudents: (groupId: string) => void;
}

export function GroupCard({ group, onViewGroup, onManageStudents }: GroupCardProps) {
  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'text-chart-2';
    if (percentage >= 60) return 'text-chart-3';
    return 'text-chart-4';
  };

  const getProgressBgColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-chart-2/20';
    if (percentage >= 60) return 'bg-chart-3/20';
    return 'bg-chart-4/20';
  };

  return (
    <Card className="liquid-glass-card rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-105">
      <CardContent className="p-0">
        {/* Header con gradiente */}
        <div className={`h-24 bg-gradient-to-r ${group.color} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative p-6 flex items-center justify-between h-full">
            <div>
              <h3 className="text-white text-xl">{group.name}</h3>
              <p className="text-white/80 text-sm">{group.grade}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-white/90">
                <Users className="w-4 h-4" />
                <span className="text-sm">{group.studentCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-4">
          {/* Progreso promedio */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Progreso Promedio</span>
              </div>
              <span className={`font-medium ${getProgressColor(group.averageProgress)}`}>
                {group.averageProgress}%
              </span>
            </div>
            
            <div className="relative">
              <Progress value={group.averageProgress} className="h-3" />
              <div 
                className={`absolute inset-0 rounded-full ${getProgressBgColor(group.averageProgress)} opacity-20`}
              />
            </div>
          </div>

          {/* Estadísticas adicionales */}
          <div className="grid grid-cols-2 gap-4">
            <div className="liquid-glass rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Estudiantes</p>
              <p className="text-lg text-foreground">{group.studentCount}</p>
            </div>
            <div className="liquid-glass rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Promedio</p>
              <p className="text-lg text-foreground">{group.averageProgress}%</p>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="space-y-2">
            <Button 
              onClick={() => onViewGroup(group.id)}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={group.studentCount === 0}
            >
              {group.studentCount === 0 ? 'Sin estudiantes' : 'Ver Alumnos'}
            </Button>
            
            <Button 
              onClick={() => onManageStudents(group.id)}
              variant="outline"
              className="w-full gap-2 border-border hover:bg-accent"
            >
              <Settings className="w-4 h-4" />
              Gestionar Estudiantes
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}