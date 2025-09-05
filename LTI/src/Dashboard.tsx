import { useState, useEffect } from 'react';
import { UnifiedSidebar } from '@/components/UnifiedSidebar';
import { GroupDashboard } from '@/components/GroupDashboard';
import { StudentDashboard } from '@/components/StudentDashboard';
import { StudentProfile } from '@/components/StudentProfile';
import { ManageStudents } from '@/components/ManageStudents';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './components/ui/dialog';
import { Button } from './components/ui/button';
import { BarChart3, Users, TrendingUp, MessageCircle } from 'lucide-react';
import { mockGroups, mockStudents } from './types/students/student';

export default function Dashboard() {
    const [activeSection, setActiveSection] = useState('inicio');
    const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
    const [managingStudentsGroupId, setManagingStudentsGroupId] = useState<string | null>(null);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [showContactDialog, setShowContactDialog] = useState(false);
    const [groups, setGroups] = useState(mockGroups);

    // Aplicar tema al body
    useEffect(() => {
        document.body.className = isDarkMode ? 'dark' : '';
    }, [isDarkMode]);

    const selectedGroup = selectedGroupId
        ? groups.find(g => g.id === selectedGroupId)
        : null;

    const selectedStudent = selectedStudentId
        ? mockStudents.find(s => s.id === selectedStudentId)
        : null;

    const managingGroup = managingStudentsGroupId
        ? groups.find(g => g.id === managingStudentsGroupId)
        : null;

    const handleViewGroup = (groupId: string) => {
        setSelectedGroupId(groupId);
        setSelectedStudentId(null);
        setManagingStudentsGroupId(null);
    };

    const handleViewProfile = (studentId: string) => {
        setSelectedStudentId(studentId);
    };

    const handleManageStudents = (groupId: string) => {
        setManagingStudentsGroupId(groupId);
        setSelectedGroupId(null);
        setSelectedStudentId(null);
    };

    const handleUpdateGroup = (groupId: string, studentIds: string[]) => {
        setGroups(prevGroups =>
            prevGroups.map(group => {
                if (group.id === groupId) {
                    const groupStudents = mockStudents.filter(s => studentIds.includes(s.id));
                    const averageProgress = groupStudents.length > 0
                        ? Math.round(groupStudents.reduce((sum, s) => sum + s.progressPercentage, 0) / groupStudents.length)
                        : 0;

                    return {
                        ...group,
                        students: groupStudents,
                        studentCount: groupStudents.length,
                        averageProgress
                    };
                }
                return group;
            })
        );
    };

    const handleBackToGroups = () => {
        setSelectedGroupId(null);
        setSelectedStudentId(null);
        setManagingStudentsGroupId(null);
        setActiveSection('grupos');
    };

    const handleBackToGroup = () => {
        setSelectedStudentId(null);
    };

    const handleBackFromManage = () => {
        setManagingStudentsGroupId(null);
        setActiveSection('grupos');
    };

    const handleThemeToggle = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleContactAdmin = () => {
        setShowContactDialog(true);
    };

    const renderMainContent = () => {
        // Gestión de estudiantes
        if (managingGroup) {
            return (
                <ManageStudents
                    group={managingGroup}
                    onBack={handleBackFromManage}
                    onUpdateGroup={handleUpdateGroup}
                />
            );
        }

        // Perfil individual del estudiante
        if (selectedStudent) {
            return (
                <StudentProfile
                    student={selectedStudent}
                    onBack={handleBackToGroup}
                />
            );
        }

        // Lista de alumnos del grupo
        if (selectedGroup) {
            return (
                <StudentDashboard
                    group={selectedGroup}
                    onViewProfile={handleViewProfile}
                    onBack={handleBackToGroups}
                />
            );
        }

        // Secciones principales
        switch (activeSection) {
            case 'inicio':
                return (
                    <div className="p-8 space-y-8">
                        <div className="text-center space-y-4">
                            <h1 className="text-4xl text-foreground">Panel de Control Edu+</h1>
                            <p className="text-muted-foreground text-lg">
                                Bienvenido al sistema de gestión educativa para secundaria
                            </p>
                        </div>

                        {/* Estadísticas principales */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                                        <p className="text-sm text-muted-foreground">Estudiantes</p>
                                        <p className="text-2xl text-foreground">{mockStudents.length}</p>
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
                                        <p className="text-2xl text-foreground">
                                            {Math.round(mockStudents.reduce((sum, s) => sum + s.progressPercentage, 0) / mockStudents.length)}%
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="liquid-glass-card rounded-2xl p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-chart-4/20 flex items-center justify-center">
                                        <Users className="w-6 h-6 text-chart-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Necesitan Apoyo</p>
                                        <p className="text-2xl text-foreground">
                                            {mockStudents.filter(s => s.progressPercentage < 60).length}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Acceso rápido */}
                        <div className="liquid-glass-card rounded-2xl p-8">
                            <h2 className="text-2xl text-foreground mb-6">Acceso Rápido</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    onClick={() => setActiveSection('grupos')}
                                    className="liquid-glass rounded-xl p-6 text-left hover:bg-accent transition-all duration-200"
                                >
                                    <div className="flex items-center gap-4">
                                        <Users className="w-8 h-8 text-primary" />
                                        <div>
                                            <h3 className="text-foreground text-lg">Ver Mis Grupos</h3>
                                            <p className="text-muted-foreground text-sm">Gestiona tus grupos de secundaria</p>
                                        </div>
                                    </div>
                                </button>

                                <button
                                    onClick={handleContactAdmin}
                                    className="liquid-glass rounded-xl p-6 text-left hover:bg-accent transition-all duration-200"
                                >
                                    <div className="flex items-center gap-4">
                                        <MessageCircle className="w-8 h-8 text-chart-2" />
                                        <div>
                                            <h3 className="text-foreground text-lg">Contactar Soporte</h3>
                                            <p className="text-muted-foreground text-sm">Obtén ayuda del administrador</p>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 'grupos':
                return (
                    <GroupDashboard
                        groups={groups}
                        onViewGroup={handleViewGroup}
                        onManageStudents={handleManageStudents}
                    />
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
                userRole='teacher'
                userName={Users.name}
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
}



