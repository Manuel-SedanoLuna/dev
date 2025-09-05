import React from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { RouteGuard } from '@/components/login/route-guard';
import { StudentDashboard } from '@/views/StudentDashboard';
import { DirectorDashboard } from '@/views/DirectorDashboard';
import Dashboard from './Dashboard'; // Tu dashboard de maestro existente

const AppContent: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <RouteGuard>{null}</RouteGuard>;
  }

  // Renderizar el dashboard apropiado según el rol del usuario
  switch (user.role) {
    case 'student':
      return (
        <RouteGuard allowedRoles={['student']}>
          <StudentDashboard />
        </RouteGuard>
      );
    
    case 'teacher':
      return (
        <RouteGuard allowedRoles={['teacher']}>
          <Dashboard />
        </RouteGuard>
      );
    
    case 'director':
      return (
        <RouteGuard allowedRoles={['director']}>
          <DirectorDashboard />
        </RouteGuard>
      );
    
    default:
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Rol no reconocido</h2>
            <p className="text-gray-600">
              El rol "{user.role}" no está configurado en el sistema.
            </p>
          </div>
        </div>
      );
  }
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;