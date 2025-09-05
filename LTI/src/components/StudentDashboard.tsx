import { useState } from 'react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Search, Filter, ArrowLeft, Users } from 'lucide-react';
import { Group } from '../types/students/student';
import { StudentCard } from './StudentCard';

interface StudentDashboardProps {
  group: Group;
  onViewProfile: (studentId: string) => void;
  onBack: () => void;
}

export function StudentDashboard({ group, onViewProfile, onBack }: StudentDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStyle, setFilterStyle] = useState<string>('all');
  const [filterProgress, setFilterProgress] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');

  let filteredStudents = group.students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStyle = filterStyle === 'all' || student.learningStyle === filterStyle;
    const matchesProgress = filterProgress === 'all' || 
      (filterProgress === 'high' && student.progressPercentage >= 80) ||
      (filterProgress === 'medium' && student.progressPercentage >= 60 && student.progressPercentage < 80) ||
      (filterProgress === 'low' && student.progressPercentage < 60);

    return matchesSearch && matchesStyle && matchesProgress;
  });

  // Ordenar estudiantes
  filteredStudents.sort((a, b) => {
    switch (sortBy) {
      case 'progress-desc':
        return b.progressPercentage - a.progressPercentage;
      case 'progress-asc':
        return a.progressPercentage - b.progressPercentage;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="p-8 space-y-6">
      {/* Header con navegación */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          onClick={onBack} 
          className="gap-2 text-muted-foreground hover:text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
          Regresar
        </Button>
      </div>

      {/* Información del grupo */}
      <div className="liquid-glass-card rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${group.color} flex items-center justify-center`}>
            <Users className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl text-white">{group.name}</h1>
            <p className="text-muted-foreground">{group.grade}</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-sm text-muted-foreground">
                {group.studentCount} estudiantes
              </span>
              <span className="text-sm text-muted-foreground">
                Promedio: {group.averageProgress}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Controles de búsqueda y filtros */}
      <div className="liquid-glass-card rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Buscador */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-muted-foreground"
            />
          </div>
          
          {/* Filtros */}
          <div className="flex gap-2">
            <Select value={filterStyle} onValueChange={setFilterStyle}>
              <SelectTrigger className="w-[180px] bg-white/5 border-white/20 text-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Estilo de aprendizaje" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/20">
                <SelectItem value="all" className="text-white">Todos los estilos</SelectItem>
                <SelectItem value="Visual" className="text-white">Visual</SelectItem>
                <SelectItem value="Auditivo" className="text-white">Auditivo</SelectItem>
                <SelectItem value="Kinestésico" className="text-white">Kinestésico</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterProgress} onValueChange={setFilterProgress}>
              <SelectTrigger className="w-[160px] bg-white/5 border-white/20 text-white">
                <SelectValue placeholder="Progreso" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/20">
                <SelectItem value="all" className="text-white">Todos</SelectItem>
                <SelectItem value="high" className="text-white">Alto (80%+)</SelectItem>
                <SelectItem value="medium" className="text-white">Medio (60-79%)</SelectItem>
                <SelectItem value="low" className="text-white">Necesita apoyo (&lt;60%)</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px] bg-white/5 border-white/20 text-white">
                <SelectValue placeholder="Ordenar" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/20">
                <SelectItem value="name" className="text-white">Por nombre</SelectItem>
                <SelectItem value="progress-desc" className="text-white">Mayor progreso</SelectItem>
                <SelectItem value="progress-asc" className="text-white">Menor progreso</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            Mostrando {filteredStudents.length} de {group.studentCount} estudiantes
          </p>
        </div>
        
        {filteredStudents.length === 0 ? (
          <div className="text-center py-12">
            <div className="liquid-glass-card rounded-2xl p-8 max-w-md mx-auto">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-white text-xl mb-2">No se encontraron estudiantes</h3>
              <p className="text-muted-foreground">
                {group.studentCount === 0 
                  ? 'Este grupo aún no tiene estudiantes asignados.'
                  : 'No hay estudiantes que coincidan con los filtros aplicados.'
                }
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map(student => (
              <StudentCard
                key={student.id}
                student={student}
                onViewProfile={onViewProfile}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}