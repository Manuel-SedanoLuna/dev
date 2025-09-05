import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, BookOpen, Users, BarChart3 } from 'lucide-react';

interface TestCredential {
    role: 'student' | 'teacher' | 'director';
    email: string;
    password: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    features: string[];
}

const testCredentials: TestCredential[] = [
    {
        role: 'student',
        email: 'alumno@escuela.edu',
        password: 'alumno123',
        name: 'María González',
        description: 'Vista de alumno',
        icon: <User className="h-4 w-4" />,
        features: ['Ver ejercicios', 'Seguir progreso', 'Logros']
    },
    {
        role: 'teacher',
        email: 'profesor@escuela.edu',
        password: 'profesor123',
        name: 'Prof. Elena Martínez',
        description: 'Vista de maestro',
        icon: <BookOpen className="h-4 w-4" />,
        features: ['Gestionar grupos', 'Ejercicios extra', 'Progreso estudiantes']
    },
    {
        role: 'director',
        email: 'director@escuela.edu',
        password: 'director123',
        name: 'Dr. Roberto Hernández',
        description: 'Vista de director',
        icon: <BarChart3 className="h-4 w-4" />,
        features: ['Métricas escolares', 'Todos los grupos', 'Reportes generales']
    }
];

interface LoginCredentialsCardProps {
    onFillCredentials: (email: string, password: string) => void;
}

export const LoginCredentialsCard: React.FC<LoginCredentialsCardProps> = ({ onFillCredentials }) => {
    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'student':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
            case 'teacher':
                return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
            case 'director':
                return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
        }
    };

    const getRoleLabel = (role: string) => {
        switch (role) {
            case 'student': return 'Alumno';
            case 'teacher': return 'Maestro';
            case 'director': return 'Director';
            default: return role;
        }
    };

    return (
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-dashed">
            <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center space-x-2">
                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <span>Credenciales de Prueba</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {testCredentials.map((credential) => (
                    <div
                        key={credential.role}
                        className="flex items-center justify-between p-3 rounded-lg bg-white/50 dark:bg-gray-700/50 hover:bg-white/70 dark:hover:bg-gray-700/70 transition-colors"
                    >
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                                {credential.icon}
                                <span className="font-medium text-sm">{credential.name}</span>
                                <Badge className={`text-xs ${getRoleBadgeColor(credential.role)}`}>
                                    {getRoleLabel(credential.role)}
                                </Badge>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                {credential.description}
                            </p>
                            <div className="flex flex-wrap gap-1">
                                {credential.features.map((feature, index) => (
                                    <span
                                        key={index}
                                        className="text-xs px-2 py-1 rounded-full text-gray-600 dark:text-gray-200"
                                    >
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onFillCredentials(credential.email, credential.password)}
                            className="ml-3 flex-shrink-0 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:border-gray-600"
                        >
                            Usar
                        </Button>
                    </div>
                ))}
                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
                    Haz clic en "Usar" para autocompletar las credenciales
                </p>
            </CardContent>
        </Card>
    );
};