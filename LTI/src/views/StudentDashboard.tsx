import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { UnifiedSidebar } from "@/components/UnifiedSidebar";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    Trophy,
    TrendingUp,
    Star,
    CheckCircle,
} from "lucide-react";

import { mockExercises } from "@/mocks/Exercises/mockExercises";
import { Student } from "@/types/students/student";
import { mockUsers } from "@/mocks/Users/mockUsers";

export const StudentDashboard: React.FC = () => {
    const { user } = useAuth();
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [activeSection, setActiveSection] = useState("inicio");
    const [studentData, setStudentData] = useState<Student | null>(null);

    // Aplicar tema al body
    useEffect(() => {
        document.body.className = isDarkMode ? "dark" : "";
    }, [isDarkMode]);

    // Cargar datos desde mocks
    useEffect(() => {
        const fixedId = "u1"; // aquí pones el ID del estudiante que quieras
        const studentFound = mockUsers.find((s) => s.id === fixedId);

        if (studentFound) {
            // Construir el objeto Student manualmente, agregando valores por defecto para las propiedades faltantes
            const studentMock: Student = {
                id: studentFound.id,
                name: studentFound.name,
                avatar: "",
                mathSkills: {
                    arithmetic: 75,
                    algebra: 50,
                    geometry: 30,
                    statistics: 0,
                    calculus: 0,
                },
                grade: (studentFound as any).grade || "Sin grado",
                groupId: (studentFound as any).groupId || "Sin grupo",
                progressPercentage: (studentFound as any).progressPercentage || 72,
                learningStyle: (studentFound as any).learningStyle || "No definido",
                courseProgress: (studentFound as any).courseProgress || { completedPercentage: 0 },
                achievements: (studentFound as any).achievements || [
                    {
                        id: "a1",
                        title: "Primer Ejercicio Completado",
                        description: "Completaste tu primer ejercicio.",
                        dateEarned: "2024-01-15",
                    },
                    {
                        id: "a2",
                        title: "5 Ejercicios Completados",
                        description: "Completaste 5 ejercicios.",
                        dateEarned: "2024-01-20",
                    }
                ]
            };

            setStudentData(studentMock);
        }
    }, [user]);


    if (!user || !studentData) return <div>Cargando...</div>;

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar */}
            <UnifiedSidebar
                activeSection={activeSection}
                onSectionChange={setActiveSection}
                userRole="student"
                userName={user.name}
                isDarkMode={isDarkMode}
                onThemeToggle={toggleTheme}
                onContactAdmin={() => alert("Contacto con admin")}
            />

            {/* Contenido principal */}
            <main className="flex-1 overflow-y-auto p-6">
                {activeSection === "inicio" && (
                    <div>
                        {/* Estadísticas principales */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                Progreso General
                                            </p>
                                            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                                {studentData.progressPercentage}%
                                            </p>
                                        </div>
                                        <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <Progress value={studentData.progressPercentage} className="mt-3" />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                Ejercicios Completados
                                            </p>
                                            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                                                {mockExercises.filter((e) => e.completed).length}
                                            </p>
                                        </div>
                                        <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                        de {mockExercises.length} totales
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                Puntos
                                            </p>
                                            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                                                {studentData.courseProgress.completedPercentage * 10}
                                            </p>
                                        </div>
                                        <Star className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                        Nivel {Math.floor(studentData.courseProgress.completedPercentage / 10)}
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                Logros
                                            </p>
                                            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                                                {studentData.achievements.length}
                                            </p>
                                        </div>
                                        <Trophy className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <br />
                        {/* Lista rápida de ejercicios */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Tus ejercicios</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {mockExercises.slice(0, 4).map((ex) => (
                                    <div
                                        key={ex.id}
                                        className="flex items-center justify-between p-3 rounded-lg bg-white/50 dark:bg-gray-700/50"
                                    >
                                        <div>
                                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                                {ex.title}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {ex.category} · {ex.difficulty}
                                            </p>
                                        </div>
                                        <Badge
                                            className={`text-xs ${ex.completed ? "bg-emerald-500/20 text-emerald-400" : "bg-gray-500/20 text-gray-300"
                                                }`}
                                        >
                                            {ex.completed ? "Completado" : "Pendiente"}
                                        </Badge>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                )}
            </main>
        </div>
    );
};
