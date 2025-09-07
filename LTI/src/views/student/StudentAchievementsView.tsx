import React, { useMemo } from "react";
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
    Award,
    Zap,
    Sun,
    Shield,
    Sparkles,
    Calendar,
    TrendingUp
} from "lucide-react";
import { Student } from "@/types/students/student";

interface StudentAchievementsViewProps {
    studentData: Student;
}

// Sistema de runas simbólicas de Edu+
const runeSystem = [
    {
        id: "uruz",
        name: "Uruz",
        symbol: Shield,
        meaning: "Fuerza y Determinación",
        role: "Representa la perseverancia ante los desafíos matemáticos",
        condition: "Completar 10 ejercicios consecutivos",
        requiredAchievements: 10,
        color: "emerald",
        gradient: "from-emerald-500 to-emerald-600"
    },
    {
        id: "tiwaz", 
        name: "Tiwaz",
        symbol: Zap,
        meaning: "Victoria y Justicia",
        role: "Simboliza el dominio de conceptos complejos",
        condition: "Alcanzar 90% de precisión en 5 ejercicios",
        requiredAchievements: 5,
        color: "blue",
        gradient: "from-blue-500 to-blue-600"
    },
    {
        id: "anzus",
        name: "Anzus", 
        symbol: Sparkles,
        meaning: "Comunicación y Sabiduría",
        role: "Reconoce la capacidad de explicar conceptos matemáticos",
        condition: "Ayudar a 3 compañeros con ejercicios",
        requiredAchievements: 3,
        color: "purple",
        gradient: "from-purple-500 to-purple-600"
    },
    {
        id: "sowilo",
        name: "Sowilo",
        symbol: Sun,
        meaning: "Éxito y Energía Solar",
        role: "Corona del aprendizaje matemático completo",
        condition: "Completar todos los módulos del curso",
        requiredAchievements: 20,
        color: "amber",
        gradient: "from-amber-500 to-amber-600"
    }
];

export const StudentAchievementsView: React.FC<StudentAchievementsViewProps> = ({ studentData }) => {
    // Calcular progreso de runas basado en logros del estudiante
    const runeProgress = useMemo(() => {
        const totalAchievements = studentData.achievements.length;
        
        return runeSystem.map(rune => {
            const isUnlocked = totalAchievements >= rune.requiredAchievements;
            const progress = Math.min((totalAchievements / rune.requiredAchievements) * 100, 100);
            
            return {
                ...rune,
                isUnlocked,
                progress: Math.round(progress)
            };
        });
    }, [studentData.achievements]);

    // Estadísticas de logros
    const stats = useMemo(() => {
        const totalAchievements = studentData.achievements.length;
        const unlockedRunes = runeProgress.filter(r => r.isUnlocked).length;
        const totalRunes = runeSystem.length;
        const overallProgress = Math.round((totalAchievements / 20) * 100); // Asumiendo 20 como máximo

        return {
            totalAchievements,
            unlockedRunes,
            totalRunes,
            overallProgress: Math.min(overallProgress, 100)
        };
    }, [studentData.achievements, runeProgress]);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Logros</h1>
                    <p className="text-muted-foreground">
                        Tu progreso y reconocimientos en Edu+
                    </p>
                </div>
                <Trophy className="h-8 w-8 text-primary" />
            </div>

            {/* Estadísticas generales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Logros Obtenidos
                                </p>
                                <p className="text-3xl font-bold text-primary">
                                    {stats.totalAchievements}
                                </p>
                            </div>
                            <Award className="h-8 w-8 text-primary" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Runas Desbloqueadas
                                </p>
                                <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                                    {stats.unlockedRunes}/{stats.totalRunes}
                                </p>
                            </div>
                            <Shield className="h-8 w-8 text-amber-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Progreso General
                                </p>
                                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                                    {stats.overallProgress}%
                                </p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-green-500" />
                        </div>
                        <Progress value={stats.overallProgress} className="mt-3" />
                    </CardContent>
                </Card>
            </div>

            {/* Sistema de Runas Simbólicas */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Sistema de Runas Simbólicas Edu+
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Desbloquea runas ancestrales que representan tu dominio matemático
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {runeProgress.map((rune) => {
                            const Icon = rune.symbol;
                            return (
                                <Card
                                    key={rune.id}
                                    className={`relative overflow-hidden transition-all duration-300 ${
                                        rune.isUnlocked
                                            ? `border-${rune.color}-500/50 shadow-lg hover:shadow-xl`
                                            : "border-gray-300 dark:border-gray-600 opacity-75"
                                    }`}
                                >
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${
                                            rune.isUnlocked ? rune.gradient : "from-gray-500 to-gray-600"
                                        } opacity-10`}
                                    />
                                    
                                    <CardContent className="relative p-6">
                                        <div className="flex items-start gap-4">
                                            <div
                                                className={`p-3 rounded-full ${
                                                    rune.isUnlocked
                                                        ? `bg-${rune.color}-500/20`
                                                        : "bg-gray-500/20"
                                                } ${
                                                    rune.isUnlocked ? "animate-pulse" : ""
                                                }`}
                                            >
                                                <Icon
                                                    className={`h-8 w-8 ${
                                                        rune.isUnlocked
                                                            ? `text-${rune.color}-600 dark:text-${rune.color}-400`
                                                            : "text-gray-500"
                                                    }`}
                                                />
                                            </div>
                                            
                                            <div className="flex-1 space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-lg font-bold text-foreground">
                                                        {rune.name}
                                                    </h3>
                                                    <Badge
                                                        className={
                                                            rune.isUnlocked
                                                                ? `bg-${rune.color}-500/20 text-${rune.color}-600 dark:text-${rune.color}-400`
                                                                : "bg-gray-500/20 text-gray-500"
                                                        }
                                                    >
                                                        {rune.isUnlocked ? "Desbloqueada" : "Bloqueada"}
                                                    </Badge>
                                                </div>
                                                
                                                <p className="text-sm font-medium text-muted-foreground">
                                                    {rune.meaning}
                                                </p>
                                                
                                                <p className="text-xs text-muted-foreground">
                                                    {rune.role}
                                                </p>
                                                
                                                <div className="pt-2">
                                                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                                        <span>Progreso</span>
                                                        <span>{rune.progress}%</span>
                                                    </div>
                                                    <Progress
                                                        value={rune.progress}
                                                        className="h-2"
                                                    />
                                                </div>
                                                
                                                <p className="text-xs text-muted-foreground pt-1">
                                                    <strong>Condición:</strong> {rune.condition}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Timeline de Logros */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Timeline de Logros
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {studentData.achievements.length > 0 ? (
                        <div className="space-y-4">
                            {studentData.achievements
                                .sort((a, b) => new Date(b.dateEarned ?? "").getTime() - new Date(a.dateEarned ?? "").getTime())
                                .map((achievement, index) => (
                                    <div
                                        key={achievement.id}
                                        className="flex items-start gap-4 p-4 rounded-lg bg-white/50 dark:bg-gray-700/50 border border-border/20"
                                    >
                                        <div className="p-2 rounded-full bg-primary/20">
                                            <Trophy className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-foreground">
                                                {achievement.title}
                                            </h4>
                                            <p className="text-sm text-muted-foreground mb-2">
                                                {achievement.description}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-xs text-muted-foreground">
                                                    {new Date(achievement.dateEarned ?? "").toLocaleDateString('es-ES', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                        <Badge
                                            className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                                        >
                                            #{studentData.achievements.length - index}
                                        </Badge>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-foreground mb-2">
                                ¡Comienza tu aventura!
                            </h3>
                            <p className="text-muted-foreground">
                                Completa ejercicios para obtener tus primeros logros.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};