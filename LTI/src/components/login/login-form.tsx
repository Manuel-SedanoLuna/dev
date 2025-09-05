import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Eye, EyeOff, BookOpen, Sun, Moon } from 'lucide-react';
import { LoginCredentialsCard } from '@/components/login/login-credentials-card';

interface LoginFormProps {
    onLoginSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const { login, isLoading, error } = useAuth();

    // Aplicar tema al body
    useEffect(() => {
        document.body.className = isDarkMode ? 'dark' : '';
    }, [isDarkMode]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            return;
        }

        const response = await login({ email, password });

        if (response.success && onLoginSuccess) {
            onLoginSuccess();
        }
    };

    const fillCredentials = (userEmail: string, userPassword: string) => {
        setEmail(userEmail);
        setPassword(userPassword);
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
            {/* Botón de tema en la esquina superior derecha */}
            <Button
                variant="outline"
                size="icon"
                className="fixed top-4 right-4 z-50"
                onClick={toggleTheme}
            >
                {isDarkMode ? (
                    <Sun className="h-4 w-4" />
                ) : (
                    <Moon className="h-4 w-4" />
                )}
            </Button>

            <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
                {/* Lado izquierdo - Información del sistema */}
                <div className="space-y-6 text-center lg:text-left">
                    <div className="space-y-4">
                        <div className="flex items-center justify-center lg:justify-start space-x-2">
                            <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                                Edu+
                            </h1>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                            Panel de Control Educativo
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto lg:mx-0">
                            Sistema de gestión educativa para secundaria especializado en matemáticas
                        </p>
                    </div>

                    {/* Tarjeta de credenciales de prueba */}
                    <LoginCredentialsCard onFillCredentials={fillCredentials} />
                </div>

                {/* Lado derecho - Formulario de login */}
                <div className="w-full max-w-md mx-auto">
                    <Card className="shadow-2xl border-0 rounded-2xl bg-[#222e40] dark:bg-white">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl text-center">Iniciar Sesión</CardTitle>
                            <CardDescription className="text-center">
                                Ingresa tus credenciales para acceder al sistema
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {error && (
                                <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
                                    <AlertDescription className="text-red-700 dark:text-red-400">
                                        {error}
                                    </AlertDescription>
                                </Alert>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Correo Electrónico</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="usuario@escuela.edu"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={isLoading}
                                        className="h-11"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Contraseña</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            disabled={isLoading}
                                            className="h-11 pr-10"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                            onClick={() => setShowPassword(!showPassword)}
                                            disabled={isLoading}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-11"
                                    disabled={isLoading || !email || !password}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Iniciando sesión...
                                        </>
                                    ) : (
                                        'Iniciar Sesión'
                                    )}
                                </Button>
                            </form>

                            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                                <p>Sistema LTI - Contenido Matemático</p>
                                <p className="text-xs mt-1">Versión 1.0.0</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};