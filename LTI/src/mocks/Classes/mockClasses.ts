import { mockExercises } from "@/mocks/Exercises/mockExercises";
import { ClassInfo } from "@/types/auth";

export const mockClasses: ClassInfo[] = [
    {
        id: "c1",
        name: "Matemáticas Avanzadas",
        teacherId: "t1",
        teacherName: "Elena Martínez",
        grade: "10°",                        // ✅ agregado
        subject: "Matemáticas",              // ✅ agregado
        schedule: "Lunes y Miércoles 10:00-12:00", // ✅ agregado
        studentCount: 3,                     // ✅ agregado
        students: [
            { id: "s1", name: "Juan Pérez", progress: 72 },
            { id: "s2", name: "María López", progress: 85 },
            { id: "s3", name: "Carlos Ramírez", progress: 64 },
        ],
        averageProgress: 74,
        totalExercises: mockExercises.length,
    },
    {
        id: "c2",
        name: "Álgebra Intermedia",
        teacherId: "t1",
        teacherName: "Elena Martínez",
        grade: "9°",
        subject: "Álgebra",
        schedule: "Martes y Jueves 08:00-10:00",
        studentCount: 2,
        students: [
            { id: "s4", name: "Ana Torres", progress: 91 },
            { id: "s5", name: "Luis Fernández", progress: 68 },
        ],
        averageProgress: 79,
        totalExercises: mockExercises.length,
    },
];
