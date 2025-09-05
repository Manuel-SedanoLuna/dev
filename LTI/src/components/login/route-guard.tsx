import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { LoginForm } from './login-form';
import { User } from '@/types/auth';

interface RouteGuardProps {
    children: React.ReactNode;
    allowedRoles?: Array<'student' | 'teacher' | 'director'>;
    fallback?: React.ReactNode;
}

export const RouteGuard: React.FC<RouteGuardProps> = ({
    children,
    allowedRoles,
    fallback
}) => {
    const { user } = useAuth();

    // Si no hay usuario autenticado, mostrar login
    if (!user) {
        return <LoginForm />;
    }

    // Si se especifican roles permitidos, verificar acceso
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return (
            fallback || (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                    <div className="text-center space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Acceso Denegado
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            No tienes permisos para acceder a esta sección.
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                            Rol actual: {user.role} | Roles permitidos: {allowedRoles.join(', ')}
                        </p>
                    </div>
                </div>
            )
        );
    }

    return <>{children}</>;
};

// Hook para verificar permisos
export const usePermissions = () => {
    const { user } = useAuth();

    const hasRole = (role: User['role']) => {
        return user?.role === role;
    };

    const hasAnyRole = (roles: User['role'][]) => {
        return user ? roles.includes(user.role) : false;
    };

    const canViewStudentData = () => {
        return hasAnyRole(['teacher', 'director']);
    };

    const canManageExercises = () => {
        return hasRole('teacher');
    };

    const canViewSchoolMetrics = () => {
        return hasRole('director');
    };

    const canManageStudents = () => {
        return hasAnyRole(['teacher', 'director']);
    };

    return {
        user,
        hasRole,
        hasAnyRole,
        canViewStudentData,
        canManageExercises,
        canViewSchoolMetrics,
        canManageStudents
    };
};