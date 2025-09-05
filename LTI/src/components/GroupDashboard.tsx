import { Group } from '../types/students/student';
import { GroupCard } from './GroupCard';
import { BarChart3, Users, TrendingUp, Award } from 'lucide-react';

interface GroupDashboardProps {
  groups: Group[];
  onViewGroup: (groupId: string) => void;
  onManageStudents: (groupId: string) => void;
}

export function GroupDashboard({ groups, onViewGroup, onManageStudents }: GroupDashboardProps) {
  const totalStudents = groups.reduce((sum, group) => sum + group.studentCount, 0);
  const overallAverage = groups.length > 0 
    ? Math.round(groups.reduce((sum, group) => sum + (group.averageProgress * group.studentCount), 0) / totalStudents) || 0
    : 0;
  const groupsWithStudents = groups.filter(group => group.studentCount > 0);

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl text-foreground">Panel de Control</h1>
        <p className="text-muted-foreground text-lg">
          Gestiona y supervisa el progreso de tus grupos de secundaria
        </p>
      </div>

      {/* Estadísticas generales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="liquid-glass-card rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Grupos</p>
              <p className="text-2xl text-foreground">{groups.length}</p>
            </div>
          </div>
        </div>

        <div className="liquid-glass-card rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-chart-2/20 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-chart-2" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Estudiantes</p>
              <p className="text-2xl text-foreground">{totalStudents}</p>
            </div>
          </div>
        </div>

        <div className="liquid-glass-card rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-chart-3/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-chart-3" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Promedio General</p>
              <p className="text-2xl text-foreground">{overallAverage}%</p>
            </div>
          </div>
        </div>

        <div className="liquid-glass-card rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-chart-4/20 flex items-center justify-center">
              <Award className="w-6 h-6 text-chart-4" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Grupos Activos</p>
              <p className="text-2xl text-foreground">{groupsWithStudents.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de grupos */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl text-foreground">Mis Grupos de Secundaria</h2>
          <p className="text-muted-foreground">
            {groupsWithStudents.length} grupos activos de {groups.length} totales
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map(group => (
            <GroupCard
              key={group.id}
              group={group}
              onViewGroup={onViewGroup}
              onManageStudents={onManageStudents}
            />
          ))}
        </div>
      </div>

      {/* Mensaje si no hay grupos activos */}
      {groupsWithStudents.length === 0 && (
        <div className="text-center py-12">
          <div className="liquid-glass-card rounded-2xl p-8 max-w-md mx-auto">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-foreground text-xl mb-2">No hay grupos activos</h3>
            <p className="text-muted-foreground">
              Aún no tienes estudiantes asignados a tus grupos. 
              Los grupos aparecerán aquí una vez que tengas estudiantes registrados.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}