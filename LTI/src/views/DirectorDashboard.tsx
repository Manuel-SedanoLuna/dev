import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    BarChart3,
    Users,
    TrendingUp,
    School,
    UserCheck,
    AlertCircle,
    Calendar,
    Award,
    Sun,
    Moon,
    MessageCircle,
    BookOpen,
    Target,
    Settings
} from 'lucide-react';
import { SchoolMetrics, DepartmentPerformance, ClassPerformance } from '@/types/auth';
import { authAPI } from '@/lib/auth-api';
import { UnifiedSidebar } from '@/components/UnifiedSidebar';

export const DirectorDashboard: React.FC = () => {
    const { user } = useAuth();
    const [activeSection, setActiveSection] = useState('inicio');
    const [schoolMetrics, setSchoolMetrics] = useState<SchoolMetrics | null>(null);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [showContactDialog, setShowContactDialog] = useState(false);

    // Aplicar tema al body
    useEffect(() => {
        document.body.className = isDarkMode ? 'dark' : '';
    }, [isDarkMode]);

    // Cargar métricas de la escuela
    useEffect(() => {
        const loadSchoolData = async () => {
            try {
                setIsLoading(true);
                const metrics = await authAPI.getSchoolMetrics();
                setSchoolMetrics(metrics);
            } catch (error) {
                console.error('Error cargando datos de la escuela:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadSchoolData();
    }, []);

    const handleThemeToggle = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleContactAdmin = () => {
        setShowContactDialog(true);
    };

    const directorData = user?.directorData;

    if (!user || !directorData || !schoolMetrics) {
        return <div>Cargando...</div>;
    }

    const renderMainContent = () => {
        switch (activeSection) {
            case 'inicio':
                return (
                    <div className="p-8 space-y-8">
                        <div className="text-center space-y-4">
                            <h1 className="text-4xl text-foreground">Panel de Control Director</h1>
                            <p className="text-muted-foreground text-lg">
                                Gestión integral de {directorData.schoolName}
                            </p>
                        </div>

                        {/* Métricas principales */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="liquid-glass-card rounded-2xl p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                        <UserCheck className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Total Maestros</p>
                                        <p className="text-2xl text-foreground">{schoolMetrics.totalTeachers}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="liquid-glass-card rounded-2xl p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-chart-2/20 flex items-center justify-center">
                                        <Users className="w-6 h-6 text-chart-2" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Total Estudiantes</p>
                                        <p className="text-2xl text-foreground">{schoolMetrics.totalStudents}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="liquid-glass-card rounded-2xl p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-chart-3/20 flex items-center justify-center">
                                        <TrendingUp className="w-6 h-6 text-chart-3" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Progreso General</p>
                                        <p className="text-2xl text-foreground">{schoolMetrics.overallProgress}%</p>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <Progress value={schoolMetrics.overallProgress} />
                                </div>
                            </div>

                            <div className="liquid-glass-card rounded-2xl p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-chart-4/20 flex items-center justify-center">
                                        <AlertCircle className="w-6 h-6 text-chart-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Necesitan Apoyo</p>
                                        <p className="text-2xl text-foreground">{schoolMetrics.needingSupportCount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Acceso rápido */}
                        <div className="liquid-glass-card rounded-2xl p-8">
                            <h2 className="text-2xl text-foreground mb-6">Acceso Rápido</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <button
                                    onClick={() => setActiveSection('departamentos')}
                                    className="liquid-glass rounded-xl p-6 text-left hover:bg-accent transition-all duration-200"
                                >
                                    <div className="flex items-center gap-4">
                                        <Users className="w-8 h-8 text-primary" />
                                        <div>
                                            <h3 className="text-foreground text-lg">Departamentos</h3>
                                            <p className="text-muted-foreground text-sm">Gestiona departamentos académicos</p>
                                        </div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => setActiveSection('clases')}
                                    className="liquid-glass rounded-xl p-6 text-left hover:bg-accent transition-all duration-200"
                                >
                                    <div className="flex items-center gap-4">
                                        <BookOpen className="w-8 h-8 text-chart-2" />
                                        <div>
                                            <h3 className="text-foreground text-lg">Clases</h3>
                                            <p className="text-muted-foreground text-sm">Supervisa todas las clases</p>
                                        </div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => setActiveSection('reportes')}
                                    className="liquid-glass rounded-xl p-6 text-left hover:bg-accent transition-all duration-200"
                                >
                                    <div className="flex items-center gap-4">
                                        <Target className="w-8 h-8 text-chart-3" />
                                        <div>
                                            <h3 className="text-foreground text-lg">Reportes</h3>
                                            <p className="text-muted-foreground text-sm">Análisis y estadísticas</p>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 'resumen':
                return (
                    <div className="p-8 space-y-8">
                        <div className="text-center space-y-4">
                            <h1 className="text-4xl text-foreground">Resumen General</h1>
                            <p className="text-muted-foreground text-lg">
                                Vista general del desempeño escolar
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Progreso mensual */}
                            <div className="liquid-glass-card rounded-2xl p-8">
                                <h2 className="text-2xl text-foreground mb-6 flex items-center gap-2">
                                    <Calendar className="w-6 h-6" />
                                    Progreso Mensual
                                </h2>
                                <div className="space-y-6">
                                    {schoolMetrics.monthlyProgress.map((month) => (
                                        <div key={month.month} className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium text-foreground">{month.month}</span>
                                                <span className="text-primary font-bold">{month.progress}%</span>
                                            </div>
                                            <Progress value={month.progress} />
                                            <div className="flex justify-between text-sm text-muted-foreground">
                                                <span>{month.completedExercises} ejercicios</span>
                                                <span>{month.activeStudents} estudiantes activos</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Clases destacadas */}
                            <div className="liquid-glass-card rounded-2xl p-8">
                                <h2 className="text-2xl text-foreground mb-6 flex items-center gap-2">
                                    <Award className="w-6 h-6" />
                                    Clases Destacadas
                                </h2>
                                <div className="space-y-4">
                                    {schoolMetrics.topPerformingClasses.map((classData, index) => (
                                        <div key={classData.className} className="liquid-glass rounded-xl p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="font-medium text-foreground">{classData.className}</h3>
                                                <Badge className="bg-primary/20 text-primary">
                                                    #{index + 1}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-3">
                                                Maestro: {classData.teacherName}
                                            </p>
                                            <div className="grid grid-cols-3 gap-4 text-sm">
                                                <div>
                                                    <span className="text-muted-foreground">Estudiantes:</span>
                                                    <div className="font-bold text-foreground">{classData.studentCount}</div>
                                                </div>
                                                <div>
                                                    <span className="text-muted-foreground">Progreso:</span>
                                                    <div className="font-bold text-chart-2">{classData.averageProgress}%</div>
                                                </div>
                                                <div>
                                                    <span className="text-muted-foreground">Completado:</span>
                                                    <div className="font-bold text-chart-3">{classData.completionRate}%</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'departamentos':
                return (
                    <div className="p-8 space-y-8">
                        <div className="text-center space-y-4">
                            <h1 className="text-4xl text-foreground">Departamentos Académicos</h1>
                            <p className="text-muted-foreground text-lg">
                                Análisis de desempeño por departamento
                            </p>
                        </div>

                        <div className="space-y-6">
                            {schoolMetrics.departmentPerformance.map((dept) => (
                                <div key={dept.department} className="liquid-glass-card rounded-2xl p-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-2xl font-semibold text-foreground">{dept.department}</h3>
                                        <Badge 
                                            className={`${
                                                dept.averageProgress >= 80 ? 'bg-chart-2/20 text-chart-2' :
                                                dept.averageProgress >= 70 ? 'bg-chart-3/20 text-chart-3' : 
                                                'bg-chart-4/20 text-chart-4'
                                            }`}
                                        >
                                            {dept.averageProgress}% promedio
                                        </Badge>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-primary">{dept.teacherCount}</div>
                                            <div className="text-sm text-muted-foreground">Maestros</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-chart-2">{dept.studentCount}</div>
                                            <div className="text-sm text-muted-foreground">Estudiantes</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-chart-3">{dept.classesCount}</div>
                                            <div className="text-sm text-muted-foreground">Clases</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-chart-4">
                                                {Math.round(dept.studentCount / dept.teacherCount)}
                                            </div>
                                            <div className="text-sm text-muted-foreground">Est/Maestro</div>
                                        </div>
                                    </div>

                                    <Progress value={dept.averageProgress} className="h-3" />
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'clases':
                return (
                    <div className="p-8 space-y-8">
                        <div className="text-center space-y-4">
                            <h1 className="text-4xl text-foreground">Todas las Clases</h1>
                            <p className="text-muted-foreground text-lg">
                                Vista detallada de todas las clases de la escuela
                            </p>
                        </div>

                        <div className="grid gap-6">
                            {schoolMetrics.topPerformingClasses.map((classData) => (
                                <div key={classData.className} className="liquid-glass-card rounded-2xl p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h3 className="text-xl font-semibold text-foreground">{classData.className}</h3>
                                            <p className="text-muted-foreground">
                                                Profesor: {classData.teacherName}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-primary">
                                                {classData.averageProgress}%
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                promedio
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-6 mb-4">
                                        <div>
                                            <span className="text-muted-foreground">Estudiantes:</span>
                                            <div className="text-lg font-medium text-foreground">{classData.studentCount}</div>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground">Completado:</span>
                                            <div className="text-lg font-medium text-foreground">{classData.completionRate}%</div>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground">Estado:</span>
                                            <Badge className={`${
                                                classData.averageProgress >= 80 ? 'bg-chart-2/20 text-chart-2' :
                                                classData.averageProgress >= 70 ? 'bg-chart-3/20 text-chart-3' : 
                                                'bg-chart-4/20 text-chart-4'
                                            }`}>
                                                {classData.averageProgress >= 80 ? 'Excelente' :
                                                    classData.averageProgress >= 70 ? 'Bueno' : 'Necesita apoyo'}
                                            </Badge>
                                        </div>
                                    </div>

                                    <Progress value={classData.averageProgress} />
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'reportes':
                return (
                    <div className="p-8 space-y-8">
                        <div className="text-center space-y-4">
                            <h1 className="text-4xl text-foreground">Reportes y Estadísticas</h1>
                            <p className="text-muted-foreground text-lg">
                                Información institucional y resumen ejecutivo
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="liquid-glass-card rounded-2xl p-8">
                                <h2 className="text-2xl text-foreground mb-6">Resumen Ejecutivo</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 liquid-glass rounded-xl">
                                        <span className="text-foreground">Total de Personal Docente</span>
                                        <span className="font-bold text-primary">{schoolMetrics.totalTeachers}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 liquid-glass rounded-xl">
                                        <span className="text-foreground">Total de Estudiantes</span>
                                        <span className="font-bold text-chart-2">{schoolMetrics.totalStudents}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 liquid-glass rounded-xl">
                                        <span className="text-foreground">Clases Activas</span>
                                        <span className="font-bold text-chart-3">{schoolMetrics.totalClasses}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 liquid-glass rounded-xl">
                                        <span className="text-foreground">Promedio General</span>
                                        <span className="font-bold text-chart-4">{schoolMetrics.overallProgress}%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="liquid-glass-card rounded-2xl p-8">
                                <h2 className="text-2xl text-foreground mb-6">Información Institucional</h2>
                                <div className="space-y-6">
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">
                                            Institución
                                        </label>
                                        <p className="text-lg font-medium text-foreground">{directorData.schoolName}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">
                                            Código de Escuela
                                        </label>
                                        <p className="text-lg font-medium text-foreground">{directorData.schoolId}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">
                                            Departamentos
                                        </label>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {directorData.departments.map((dept) => (
                                                <Badge key={dept} className="bg-primary/20 text-primary">{dept}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">
                                            Última Actualización
                                        </label>
                                        <p className="text-lg font-medium text-foreground">{new Date().toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="p-8">
                        <div className="liquid-glass-card rounded-2xl p-8 text-center">
                            <h2 className="text-foreground text-xl">Sección no encontrada</h2>
                            <p className="text-muted-foreground mt-2">La sección solicitada no existe.</p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="flex h-screen">
            <UnifiedSidebar
                            activeSection={activeSection}
                            onSectionChange={setActiveSection}
                            userRole='director'
                            userName={user.name}
                            isDarkMode={isDarkMode}
                            onThemeToggle={handleThemeToggle}
                            onContactAdmin={handleContactAdmin}
                        />

            <div className="flex-1 overflow-auto">
                {renderMainContent()}
            </div>

            {/* Dialog de contacto al administrador */}
            <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
                <DialogContent className="liquid-glass-card border-border">
                    <DialogHeader>
                        <DialogTitle className="text-foreground">Contactar Administrador</DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            Información de contacto para obtener soporte técnico y asistencia con la plataforma Edu+.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <p className="text-muted-foreground">
                            Para obtener soporte técnico o asistencia con la plataforma, puedes contactar al administrador a través de:
                        </p>
                        <div className="liquid-glass rounded-lg p-4 space-y-2">
                            <p className="text-foreground font-medium">Email: admin@eduplus.com</p>
                            <p className="text-foreground font-medium">Teléfono: +52 (55) 1234-5678</p>
                            <p className="text-foreground font-medium">Horario: Lunes a Viernes, 8:00 AM - 6:00 PM</p>
                        </div>
                        <div className="flex justify-end">
                            <Button onClick={() => setShowContactDialog(false)}>
                                Cerrar
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};