import {
    Home,
    BookOpen,
    Trophy,
    Users,
    LogOut,
    User,
    Moon,
    Sun,
    MessageCircle,
    School,
    BarChart3,
    Target,
    Settings
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from './ui/button';
import { Switch } from './ui/switch';

export type UserRole = 'student' | 'teacher' | 'director';

interface UnifiedSidebarProps {
    activeSection: string;
    onSectionChange: (section: string) => void;
    userRole: UserRole;
    userName?: string;
    isDarkMode: boolean;
    onThemeToggle: () => void;
    onContactAdmin: () => void;
}

// Configuración de menús por rol
const menuConfig = {
    student: [
        { id: 'inicio', label: 'Inicio', icon: Home },
        { id: 'ejercicios', label: 'Ejercicios', icon: BookOpen },
        { id: 'logros', label: 'Logros', icon: Trophy },
    ],
    teacher: [
        { id: 'inicio', label: 'Inicio', icon: Home },
        { id: 'grupos', label: 'Mis Grupos', icon: Users },
    ],
    director: [
        { id: 'inicio', label: 'Inicio', icon: School },
        { id: 'resumen', label: 'Resumen', icon: BarChart3 },
        { id: 'departamentos', label: 'Departamentos', icon: Users },
        { id: 'clases', label: 'Clases', icon: BookOpen },
        { id: 'reportes', label: 'Reportes', icon: Target },
    ]
};

// Configuración de roles
const roleConfig = {
    student: {
        title: 'Panel del Estudiante',
        defaultName: 'Alumno Invitado',
        displayName: (name: string) => name.split(' ')[0],
        width: 'w-64'
    },
    teacher: {
        title: 'Panel del Maestro',
        defaultName: 'Prof. Elena Martínez',
        displayName: (name: string) => name.split(' ')[1] || name.split(' ')[0],
        width: 'w-64'
    },
    director: {
        title: 'Panel del Director',
        defaultName: 'Dr. Roberto Hernández',
        displayName: (name: string) => name,
        width: 'w-64'
    }
};

export function UnifiedSidebar({
    activeSection,
    onSectionChange,
    userRole,
    userName,
    isDarkMode,
    onThemeToggle,
    onContactAdmin
}: UnifiedSidebarProps) {
    const { logout } = useAuth();

    const menuItems = menuConfig[userRole];
    const config = roleConfig[userRole];
    const displayName = userName || config.defaultName;
    const shortName = config.displayName(displayName);

    // Renderizado para student y teacher
    return (
        <div className={`${config.width} h-full flex flex-col liquid-glass border-r border-border/20`}>
            {/* Header con información del usuario */}
            <div className="p-6 border-b border-border/20">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-chart-2 flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-foreground">{shortName}</h2>
                        <p className="text-muted-foreground text-sm">Edu+</p>
                    </div>
                </div>
                <div className="liquid-glass rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">{config.title}</p>
                    <p className="text-sm text-foreground">{displayName}</p>
                </div>
            </div>

            {/* Navegación */}
            <nav className="flex-1 p-4">
                <div className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.id;
                        return (
                            <Button
                                key={item.id}
                                variant="ghost"
                                className={`w-full justify-start gap-3 h-12 transition-all duration-200 ${isActive
                                    ? 'bg-primary/20 text-primary border border-primary/30 liquid-glass'
                                    : 'hover:bg-accent text-muted-foreground hover:text-foreground'
                                    }`}
                                onClick={() => onSectionChange(item.id)}
                            >
                                <Icon className="w-5 h-5" />
                                {item.label}
                            </Button>
                        );
                    })}
                </div>
            </nav>

            {/* Controles de configuración */}
            <div className="p-4 space-y-4 border-t border-border/20">
                {/* Toggle de tema */}
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <Sun className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Tema</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Switch
                            checked={isDarkMode}
                            onCheckedChange={onThemeToggle}
                            className="data-[state=checked]:bg-primary"
                        />
                        <Moon className="w-4 h-4 text-muted-foreground" />
                    </div>
                </div>

                {/* Contactar administrador */}
                <Button
                    variant="ghost"
                    onClick={onContactAdmin}
                    className="w-full justify-start gap-3 h-12 text-chart-2 hover:text-chart-2 hover:bg-chart-2/10"
                >
                    <MessageCircle className="w-5 h-5" />
                    Contactar Administrador
                </Button>

                {/* Cerrar sesión */}
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 h-12 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={logout}
                >
                    <LogOut className="w-5 h-5" />
                    Cerrar Sesión
                </Button>
            </div>
        </div>
    );
}