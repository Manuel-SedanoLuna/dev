import { LoginRequest, LoginResponse, User, StudentData, TeacherData, DirectorData, MathSkill, Exercise, Achievement, ClassInfo, SchoolMetrics } from '@/types/auth';

// Datos mock para diferentes usuarios
const mockUsers: User[] = [
    {
        id: 'student-1',
        email: 'alumno@escuela.edu',
        name: 'María González',
        role: 'student',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
        createdAt: '2024-01-15T08:00:00Z',
        lastLogin: '2025-09-01T09:30:00Z',
        isActive: true,
        studentData: {
            enrollmentNumber: 'EST-2024-001',
            classId: 'class-3a',
            className: '3° A - Matemáticas',
            teacherId: 'teacher-1',
            teacherName: 'Prof. Elena Martínez',
            overallProgress: 78,
            completedExercises: 142,
            totalExercises: 182,
            currentLevel: 8,
            points: 2847,
            mathSkills: [
                {
                    id: 'skill-1',
                    name: 'Álgebra Básica',
                    category: 'Álgebra',
                    progress: 85,
                    exercises: [],
                    lastPracticed: '2025-08-30T14:20:00Z'
                },
                {
                    id: 'skill-2',
                    name: 'Geometría Plana',
                    category: 'Geometría',
                    progress: 72,
                    exercises: [],
                    lastPracticed: '2025-08-29T10:15:00Z'
                },
                {
                    id: 'skill-3',
                    name: 'Trigonometría',
                    category: 'Trigonometría',
                    progress: 65,
                    exercises: [],
                    lastPracticed: '2025-08-28T16:45:00Z'
                }
            ],
            achievements: [
                {
                    id: 'ach-1',
                    title: 'Maestro del Álgebra',
                    description: 'Completaste 50 ejercicios de álgebra consecutivos',
                    icon: '🏆',
                    earnedAt: '2025-08-25T12:00:00Z',
                    category: 'Álgebra'
                }
            ]
        }
    },
    {
        id: 'teacher-1',
        email: 'profesor@escuela.edu',
        name: 'Prof. Elena Martínez',
        role: 'teacher',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
        createdAt: '2023-08-01T08:00:00Z',
        lastLogin: '2025-09-01T08:15:00Z',
        isActive: true,
        teacherData: {
            employeeId: 'PROF-2023-005',
            totalStudents: 127,
            averageClassProgress: 79,
            department: 'Matemáticas',
            specialization: ['Álgebra', 'Geometría', 'Cálculo'],
            classes: [
                {
                    id: 'class-3a',
                    name: '3° A',
                    grade: 'Tercero',
                    studentCount: 32,
                    averageProgress: 82,
                    subject: 'Matemáticas',
                    schedule: 'Lun-Vie 08:00-09:00'
                },
                {
                    id: 'class-3b',
                    name: '3° B',
                    grade: 'Tercero',
                    studentCount: 28,
                    averageProgress: 75,
                    subject: 'Matemáticas',
                    schedule: 'Lun-Vie 09:00-10:00'
                },
                {
                    id: 'class-2a',
                    name: '2° A',
                    grade: 'Segundo',
                    studentCount: 35,
                    averageProgress: 78,
                    subject: 'Matemáticas',
                    schedule: 'Lun-Vie 10:00-11:00'
                },
                {
                    id: 'class-2b',
                    name: '2° B',
                    grade: 'Segundo',
                    studentCount: 32,
                    averageProgress: 81,
                    subject: 'Matemáticas',
                    schedule: 'Lun-Vie 11:00-12:00'
                }
            ]
        }
    },
    {
        id: 'director-1',
        email: 'director@escuela.edu',
        name: 'Dr. Roberto Hernández',
        role: 'director',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto',
        createdAt: '2022-01-10T08:00:00Z',
        lastLogin: '2025-09-01T07:45:00Z',
        isActive: true,
        directorData: {
            schoolId: 'ESC-001',
            schoolName: 'Escuela Secundaria Federal #1',
            totalTeachers: 45,
            totalStudents: 850,
            totalClasses: 24,
            overallSchoolProgress: 76,
            departments: ['Matemáticas', 'Ciencias', 'Humanidades', 'Artes', 'Educación Física']
        }
    }
];

const mockExercises: Exercise[] = [
    {
        id: 'ex-1',
        title: 'Ecuaciones Lineales Básicas',
        description: 'Resuelve ecuaciones de primer grado con una incógnita',
        difficulty: 'easy',
        category: 'Álgebra',
        isCompleted: true,
        score: 95,
        attempts: 2,
        createdBy: 'teacher-1',
        isExtra: false,
        dueDate: '2025-09-05T23:59:59Z'
    },
    {
        id: 'ex-2',
        title: 'Sistema de Ecuaciones 2x2',
        description: 'Resuelve sistemas de ecuaciones lineales con dos incógnitas',
        difficulty: 'medium',
        category: 'Álgebra',
        isCompleted: false,
        attempts: 1,
        createdBy: 'teacher-1',
        isExtra: true,
        dueDate: '2025-09-10T23:59:59Z'
    },
    {
        id: 'ex-3',
        title: 'Área de Polígonos Regulares',
        description: 'Calcula el área de diferentes polígonos regulares',
        difficulty: 'medium',
        category: 'Geometría',
        isCompleted: true,
        score: 88,
        attempts: 3,
        createdBy: 'teacher-1',
        isExtra: false
    }
];

const mockSchoolMetrics: SchoolMetrics = {
    totalTeachers: 45,
    totalStudents: 850,
    totalClasses: 24,
    overallProgress: 76,
    needingSupportCount: 127,
    departmentPerformance: [
        {
            department: 'Matemáticas',
            teacherCount: 12,
            studentCount: 340,
            averageProgress: 79,
            classesCount: 8
        },
        {
            department: 'Ciencias',
            teacherCount: 10,
            studentCount: 285,
            averageProgress: 73,
            classesCount: 6
        },
        {
            department: 'Humanidades',
            teacherCount: 15,
            studentCount: 180,
            averageProgress: 81,
            classesCount: 7
        }
    ],
    monthlyProgress: [
        { month: 'Enero', progress: 65, completedExercises: 2450, activeStudents: 820 },
        { month: 'Febrero', progress: 68, completedExercises: 2680, activeStudents: 835 },
        { month: 'Marzo', progress: 71, completedExercises: 2890, activeStudents: 840 },
        { month: 'Abril', progress: 74, completedExercises: 3120, activeStudents: 845 },
        { month: 'Mayo', progress: 76, completedExercises: 3350, activeStudents: 850 }
    ],
    topPerformingClasses: [
        {
            className: '3° A - Matemáticas',
            teacherName: 'Prof. Elena Martínez',
            studentCount: 32,
            averageProgress: 82,
            completionRate: 94
        },
        {
            className: '2° B - Matemáticas',
            teacherName: 'Prof. Elena Martínez',
            studentCount: 32,
            averageProgress: 81,
            completionRate: 91
        }
    ]
};

// Función para simular delay de red
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API simulada para login
export const authAPI = {
    async login(credentials: LoginRequest): Promise<LoginResponse> {
        await delay(1000); // Simular latencia de red

        const user = mockUsers.find(u => u.email === credentials.email);

        if (!user) {
            return {
                success: false,
                token: '',
                user: {} as User,
                message: 'Usuario no encontrado'
            };
        }

        // Simulación simple de validación de contraseña
        // En un sistema real, esto se haría en el backend con hash
        const validPasswords: Record<string, string> = {
            'alumno@escuela.edu': 'alumno123',
            'profesor@escuela.edu': 'profesor123',
            'director@escuela.edu': 'director123'
        };

        if (validPasswords[credentials.email] !== credentials.password) {
            return {
                success: false,
                token: '',
                user: {} as User,
                message: 'Contraseña incorrecta'
            };
        }

        // Actualizar último login
        user.lastLogin = new Date().toISOString();

        return {
            success: true,
            token: `mock-jwt-token-${user.id}-${Date.now()}`,
            user,
            message: 'Login exitoso'
        };
    },

    async getExercises(userId: string): Promise<Exercise[]> {
        await delay(500);
        console.log(userId);
        return mockExercises;
    },

    async getSchoolMetrics(): Promise<SchoolMetrics> {
        await delay(800);
        return mockSchoolMetrics;
    },

    async getUserProfile(userId: string): Promise<User | null> {
        await delay(300);
        return mockUsers.find(u => u.id === userId) || null;
    }
};

// Función para obtener datos específicos según el rol
export const getRoleSpecificData = (user: User) => {
    switch (user.role) {
        case 'student':
            return {
                exercises: mockExercises.filter(ex => !ex.isExtra),
                extraExercises: mockExercises.filter(ex => ex.isExtra),
                progress: user.studentData?.overallProgress || 0
            };

        case 'teacher':
            return {
                classes: user.teacherData?.classes || [],
                totalStudents: user.teacherData?.totalStudents || 0,
                averageProgress: user.teacherData?.averageClassProgress || 0
            };

        case 'director':
            return {
                schoolMetrics: mockSchoolMetrics,
                totalTeachers: user.directorData?.totalTeachers || 0,
                totalStudents: user.directorData?.totalStudents || 0
            };

        default:
            return {};
    }
};