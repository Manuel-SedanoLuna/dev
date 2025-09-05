import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType, User, LoginRequest, LoginResponse } from '@/types/auth';
import { authAPI } from '@/lib/auth-api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Verificar si hay un usuario guardado en localStorage al iniciar
    useEffect(() => {
        const checkStoredAuth = () => {
            try {
                const storedToken = localStorage.getItem('auth-token');
                const storedUser = localStorage.getItem('auth-user');

                if (storedToken && storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);
                }
            } catch (error) {
                console.error('Error al cargar datos de autenticación:', error);
                localStorage.removeItem('auth-token');
                localStorage.removeItem('auth-user');
            }
        };

        checkStoredAuth();
    }, []);

    const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await authAPI.login(credentials);

            if (response.success) {
                setUser(response.user);
                // Guardar en localStorage
                localStorage.setItem('auth-token', response.token);
                localStorage.setItem('auth-user', JSON.stringify(response.user));
            } else {
                setError(response.message || 'Error en el login');
            }

            return response;
        } catch (err) {
            const errorMessage = 'Error de conexión. Intenta nuevamente.';
            setError(errorMessage);
            return {
                success: false,
                token: '',
                user: {} as User,
                message: errorMessage
            };
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setError(null);
        localStorage.removeItem('auth-token');
        localStorage.removeItem('auth-user');
    };

    const value: AuthContextType = {
        user,
        login,
        logout,
        isLoading,
        error
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};