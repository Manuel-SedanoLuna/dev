import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Plus, X, Search, Users, ArrowLeft } from 'lucide-react';
import { Group, Student, mockStudents } from '../types/students/student';

interface ManageStudentsProps {
  group: Group;
  onBack: () => void;
  onUpdateGroup: (groupId: string, studentIds: string[]) => void;
}

export function ManageStudents({ group, onBack, onUpdateGroup }: ManageStudentsProps) {
  const [studentId, setStudentId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentStudentIds, setCurrentStudentIds] = useState<string[]>(
    group.students.map(s => s.id)
  );

  // Estudiantes disponibles para añadir (no están en el grupo)
  const availableStudents = mockStudents.filter(
    student => !currentStudentIds.includes(student.id)
  );

  // Filtrar estudiantes disponibles por búsqueda
  const filteredAvailableStudents = availableStudents.filter(
    student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.includes(searchTerm)
  );

  // Estudiantes actuales del grupo
  const currentStudents = mockStudents.filter(
    student => currentStudentIds.includes(student.id)
  );

  const handleAddStudent = (id: string) => {
    if (mockStudents.find(s => s.id === id)) {
      const newStudentIds = [...currentStudentIds, id];
      setCurrentStudentIds(newStudentIds);
      setStudentId('');
    }
  };

  const handleAddById = () => {
    if (studentId.trim() && !currentStudentIds.includes(studentId.trim())) {
      handleAddStudent(studentId.trim());
    }
  };

  const handleRemoveStudent = (id: string) => {
    const newStudentIds = currentStudentIds.filter(studentId => studentId !== id);
    setCurrentStudentIds(newStudentIds);
  };

  const handleSave = () => {
    onUpdateGroup(group.id, currentStudentIds);
    onBack();
  };

  const hasChanges = currentStudentIds.length !== group.students.length ||
    !currentStudentIds.every(id => group.students.some(s => s.id === id));

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          onClick={onBack} 
          className="gap-2 text-muted-foreground hover:text-foreground hover:bg-accent"
        >
          <ArrowLeft className="w-4 h-4" />
          Regresar
        </Button>
      </div>

      {/* Información del grupo */}
      <Card className="liquid-glass-card rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-foreground">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${group.color} flex items-center justify-center`}>
              <Users className="w-6 h-6 text-white" />
            </div>
            Gestionar Estudiantes - {group.name}
          </CardTitle>
          <p className="text-muted-foreground">{group.grade}</p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Añadir estudiantes */}
        <Card className="liquid-glass-card rounded-2xl">
          <CardHeader>
            <CardTitle className="text-foreground">Añadir Estudiantes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Añadir por ID */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Añadir por ID:</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Ingresa el ID del estudiante"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="bg-input-background border-border text-foreground placeholder:text-muted-foreground"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddById()}
                />
                <Button 
                  onClick={handleAddById}
                  disabled={!studentId.trim() || currentStudentIds.includes(studentId.trim())}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Añadir
                </Button>
              </div>
            </div>

            {/* Búsqueda de estudiantes disponibles */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Buscar estudiantes disponibles:</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar por nombre o ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input-background border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Lista de estudiantes disponibles */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredAvailableStudents.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-4">
                  {searchTerm ? 'No se encontraron estudiantes' : 'No hay estudiantes disponibles'}
                </p>
              ) : (
                filteredAvailableStudents.map(student => (
                  <div key={student.id} className="flex items-center gap-3 p-3 liquid-glass rounded-lg">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={student.avatar} alt={student.name} />
                      <AvatarFallback className="bg-gradient-to-r from-primary to-chart-2 text-white text-xs">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground truncate">{student.name}</p>
                      <p className="text-xs text-muted-foreground">ID: {student.id}</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleAddStudent(student.id)}
                      className="gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      Añadir
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Estudiantes del grupo */}
        <Card className="liquid-glass-card rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-foreground">
              Estudiantes del Grupo
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                {currentStudents.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {currentStudents.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-8">
                  No hay estudiantes en este grupo
                </p>
              ) : (
                currentStudents.map(student => (
                  <div key={student.id} className="flex items-center gap-3 p-3 liquid-glass rounded-lg">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={student.avatar} alt={student.name} />
                      <AvatarFallback className="bg-gradient-to-r from-primary to-chart-2 text-white text-xs">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground truncate">{student.name}</p>
                      <p className="text-xs text-muted-foreground">ID: {student.id} • {student.progressPercentage}%</p>
                    </div>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleRemoveStudent(student.id)}
                      className="gap-1"
                    >
                      <X className="w-3 h-3" />
                      Quitar
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Botones de acción */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onBack}>
          Cancelar
        </Button>
        <Button 
          onClick={handleSave}
          disabled={!hasChanges}
          className="gap-2"
        >
          <Users className="w-4 h-4" />
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
}