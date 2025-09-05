export interface User {
    id: string;
    email: string;
    name: string;
    role: 'student' | 'teacher' | 'director';
    avatar?: string;
    createdAt: string;
    lastLogin: string;
    isActive: boolean;
    // Datos específicos según rol
    studentData?: StudentData;
    teacherData?: TeacherData;
    directorData?: DirectorData;
}

export interface StudentData {
    enrollmentNumber: string;
    classId: string;
    className: string;
    teacherId: string;
    teacherName: string;
    overallProgress: number;
    completedExercises: number;
    totalExercises: number;
    mathSkills: MathSkill[];
    currentLevel: number;
    points: number;
    achievements: Achievement[];
}

export interface TeacherData {
    employeeId: string;
    classes: ClassInfo[];
    totalStudents: number;
    averageClassProgress: number;
    department: string;
    specialization: string[];
}

export interface DirectorData {
    schoolId: string;
    schoolName: string;
    totalTeachers: number;
    totalStudents: number;
    totalClasses: number;
    overallSchoolProgress: number;
    departments: string[];
}

export interface ClassInfo {
    id: string;
    name: string;
    teacherId: string;
    teacherName: string;
    grade: string;
    studentCount: number;
    averageProgress: number;
    subject: string;
    students: { id: string; name: string; progress: number }[];
    totalExercises: number;
    schedule: string;
}

export interface MathSkill {
    id: string;
    name: string;
    category: string;
    progress: number;
    exercises: Exercise[];
    lastPracticed: string;
}

export interface Exercise {
    id: string;
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
    category?: string;
    isCompleted?: boolean;
    score?: number;
    attempts?: number;
    createdBy?: string;
    points?: number;
    isExtra?: boolean;
    completedAt?: string;
    completed?: boolean;
    dueDate?: string;
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    earnedAt: string;
    category: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    token: string;
    user: User;
    message?: string;
}

export interface AuthContextType {
    user: User | null;
    login: (credentials: LoginRequest) => Promise<LoginResponse>;
    logout: () => void;
    isLoading: boolean;
    error: string | null;
}

export interface DashboardStats {
    totalGroups: number;
    totalStudents: number;
    averageProgress: number;
    studentsNeedingSupport: number;
}

// Métricas específicas para directores
export interface SchoolMetrics {
    totalTeachers: number;
    totalStudents: number;
    totalClasses: number;
    overallProgress: number;
    departmentPerformance: DepartmentPerformance[];
    monthlyProgress: MonthlyProgress[];
    topPerformingClasses: ClassPerformance[];
    needingSupportCount: number;
}

export interface DepartmentPerformance {
    department: string;
    teacherCount: number;
    studentCount: number;
    averageProgress: number;
    classesCount: number;
}

export interface MonthlyProgress {
    month: string;
    progress: number;
    completedExercises: number;
    activeStudents: number;
}

export interface ClassPerformance {
    className: string;
    teacherName: string;
    studentCount: number;
    averageProgress: number;
    completionRate: number;
}