import { Student } from "@/types/students/student";

const student1: Student = {
    id: "u1",
    name: "Juan Pérez",
    grade: "1° Secundaria",
    groupId: "A",
    avatar: "/avatars/student1.png",
    progressPercentage: 72,
    learningStyle: "Visual",
    mathSkills: {
        algebra: 65,
        geometry: 70,
        arithmetic: 80,
        statistics: 60,
        calculus: 50,
    },
    courseProgress: {
        currentUnit: "Ecuaciones Básicas",
        startDate: "2024-01-15",
        completedPercentage: 72,
    },
    achievements: [
        {
            id: "ach1",
            title: "Constante",
            description: "Has estudiado 7 días seguidos",
            dateEarned: "2025-08-20",
        },
        {
            id: "ach2",
            title: "Primer Ejercicio Completado",
            description: "Completaste tu primer ejercicio.",
            dateEarned: "2024-01-15",
        },
        {
            id: "ach3",
            title: "Matemático en progreso",
            description: "Has alcanzado 70% de avance en el curso.",
            dateEarned: "2025-09-01",
        },
    ],
};


// mockUsers alineado con Student
export const mockUsers = [
    {
        id: "u1",
        email: "juan@student.com",
        name: student1.name,
        role: "student",
        avatar: student1.avatar,
        createdAt: "2024-01-15",
        lastLogin: "2025-09-01",
        isActive: true,
        studentData: student1, // 👈 ahora es directamente un Student
    },
    {
        id: "t1",
        email: "elena@school.com",
        name: "Elena Martínez",
        role: "teacher",
        avatar: "/avatars/teacher1.png",
        createdAt: "2023-10-01",
        lastLogin: "2025-09-02",
        isActive: true,
        teacherData: {
            employeeId: "EMP1001",
            classes: [], // aquí puedes usar mockClasses si ya lo tienes definido
            totalStudents: 80,
            averageClassProgress: 68,
            department: "Matemáticas",
            specialization: ["Álgebra", "Cálculo"],
        },
    },
    {
        id: "d1",
        email: "director@school.com",
        name: "Roberto Hernández",
        role: "director",
        createdAt: "2022-09-01",
        lastLogin: "2025-09-03",
        isActive: true,
        directorData: {
            schoolId: "SCL001",
            schoolName: "Colegio Nacional",
            totalTeachers: 25,
            totalStudents: 450,
            totalClasses: 30,
            overallSchoolProgress: 71,
            departments: ["Matemáticas", "Ciencias", "Lenguas"],
        },
    },
];
