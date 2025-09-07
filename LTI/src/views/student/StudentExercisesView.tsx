import React, { useState, useMemo } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    BookOpen,
    CheckCircle,
    Clock,
    Filter,
    Play,
    RotateCcw,
    TrendingUp
} from "lucide-react";
import { mockExercises } from "@/mocks/Exercises/mockExercises";

export const StudentExercisesView: React.FC = () => {
    const [categoryFilter, setCategoryFilter] = useState<string>("all");
    const [difficultyFilter, setDifficultyFilter] = useState<string>("all");

    // Obtener categorías y dificultades únicas
    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(mockExercises.map(ex => ex.category))];
        return uniqueCategories;
    }, []);

    const difficulties = useMemo(() => {
        const uniqueDifficulties = [...new Set(mockExercises.map(ex => ex.difficulty))];
        return uniqueDifficulties;
    }, []);

    // Filtrar ejercicios
    const filteredExercises = useMemo(() => {
        return mockExercises.filter(exercise => {
            const categoryMatch = categoryFilter === "all" || exercise.category === categoryFilter;
            const difficultyMatch = difficultyFilter === "all" || exercise.difficulty === difficultyFilter;
            return categoryMatch && difficultyMatch;
        });
    }, [categoryFilter, difficultyFilter]);

    // Estadísticas
    const stats = useMemo(() => {
        const completed = filteredExercises.filter(ex => ex.completed).length;
        const total = filteredExercises.length;
        const pending = total - completed;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

        return { completed, pending, total, percentage };
    }, [filteredExercises]);

    const handleExerciseAction = (exerciseId: string, isCompleted: boolean) => {
        if (isCompleted) {
            console.log(`Reintentando ejercicio ${exerciseId}`);
            // Aquí iría la lógica para reintentar el ejercicio
        } else {
            console.log(`Resolviendo ejercicio ${exerciseId}`);
            // Aquí iría la lógica para resolver el ejercicio
        }
    };

    const resetFilters = () => {
        setCategoryFilter("all");
        setDifficultyFilter("all");
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Ejercicios</h1>
                    <p className="text-muted-foreground">
                        Practica y mejora tus habilidades matemáticas
                    </p>
                </div>
                <BookOpen className="h-8 w-8 text-primary" />
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Total
                                </p>
                                <p className="text-2xl font-bold text-foreground">
                                    {stats.total}
                                </p>
                            </div>
                            <BookOpen className="h-6 w-6 text-blue-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Completados
                                </p>
                                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                    {stats.completed}
                                </p>
                            </div>
                            <CheckCircle className="h-6 w-6 text-green-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Pendientes
                                </p>
                                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                                    {stats.pending}
                                </p>
                            </div>
                            <Clock className="h-6 w-6 text-orange-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Progreso
                                </p>
                                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                    {stats.percentage}%
                                </p>
                            </div>
                            <TrendingUp className="h-6 w-6 text-purple-500" />
                        </div>
                        <Progress value={stats.percentage} className="mt-2 h-2" />
                    </CardContent>
                </Card>
            </div>

            {/* Filtros */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium text-foreground">Filtros:</span>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3 flex-1">
                            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                <SelectTrigger className="w-full sm:w-48">
                                    <SelectValue placeholder="Todas las categorías" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todas las categorías</SelectItem>
                                    {categories.map(category => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                                <SelectTrigger className="w-full sm:w-48">
                                    <SelectValue placeholder="Todas las dificultades" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todas las dificultades</SelectItem>
                                    {difficulties.map(difficulty => (
                                        <SelectItem key={difficulty} value={difficulty}>
                                            {difficulty}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {(categoryFilter !== "all" || difficultyFilter !== "all") && (
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={resetFilters}
                                    className="shrink-0"
                                >
                                    Limpiar filtros
                                </Button>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Lista de ejercicios */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredExercises.map((exercise) => (
                    <Card key={exercise.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <CardTitle className="text-lg leading-tight">
                                    {exercise.title}
                                </CardTitle>
                                <Badge
                                    className={`ml-2 shrink-0 ${
                                        exercise.completed
                                            ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                                            : "bg-gray-500/20 text-gray-600 dark:text-gray-400"
                                    }`}
                                >
                                    {exercise.completed ? "Completado" : "Pendiente"}
                                </Badge>
                            </div>
                        </CardHeader>
                        
                        <CardContent className="pt-0">
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Categoría:</span>
                                    <span className="font-medium text-foreground">
                                        {exercise.category}
                                    </span>
                                </div>
                                
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Dificultad:</span>
                                    <Badge
                                        variant="outline"
                                        className={`text-xs ${
                                            exercise.difficulty === "Fácil"
                                                ? "border-green-500 text-green-600 dark:text-green-400"
                                                : exercise.difficulty === "Intermedio"
                                                ? "border-yellow-500 text-yellow-600 dark:text-yellow-400"
                                                : "border-red-500 text-red-600 dark:text-red-400"
                                        }`}
                                    >
                                        {exercise.difficulty}
                                    </Badge>
                                </div>

                                <Button
                                    className="w-full mt-4"
                                    variant={exercise.completed ? "outline" : "default"}
                                    onClick={() => handleExerciseAction(exercise.id, exercise.completed)}
                                >
                                    {exercise.completed ? (
                                        <>
                                            <RotateCcw className="w-4 h-4 mr-2" />
                                            Reintentar
                                        </>
                                    ) : (
                                        <>
                                            <Play className="w-4 h-4 mr-2" />
                                            Resolver
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredExercises.length === 0 && (
                <Card>
                    <CardContent className="p-8 text-center">
                        <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                            No se encontraron ejercicios
                        </h3>
                        <p className="text-muted-foreground">
                            Prueba ajustando los filtros para ver más ejercicios.
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};