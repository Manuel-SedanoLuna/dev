export interface Student {
  id: string;
  name: string;
  grade: string;
  groupId: string;
  avatar: string;
  progressPercentage: number;
  learningStyle: 'Visual' | 'Auditivo' | 'Kinestésico';
  mathSkills: {
    algebra: number;
    geometry: number;
    arithmetic: number;
    statistics: number;
    calculus: number;
  };
  achievements: Achievement[];
  courseProgress: {
    currentUnit: string;
    startDate: string;
    completedPercentage: number;
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  dateEarned?: string;
}

export interface Group {
  id: string;
  name: string;
  grade: string;
  studentCount: number;
  averageProgress: number;
  color: string;
  students: Student[];
}

export const mockStudents: Student[] = [
  // Grupo A - 1° Secundaria
  {
    id: '1',
    name: 'Ana García Mendoza',
    grade: '1° Secundaria',
    groupId: 'A',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616c24ad4fb?w=100&h=100&fit=crop&crop=face',
    progressPercentage: 85,
    learningStyle: 'Visual',
    mathSkills: {
      algebra: 90,
      geometry: 75,
      arithmetic: 95,
      statistics: 80,
      calculus: 70
    },
    achievements: [
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
    ],
    courseProgress: {
      currentUnit: 'Números Enteros',
      startDate: '2024-08-15',
      completedPercentage: 85
    }
  },
  {
    id: '2',
    name: 'Carlos Mendoza Rivera',
    grade: '1° Secundaria',
    groupId: 'A',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    progressPercentage: 72,
    learningStyle: 'Kinestésico',
    mathSkills: {
      algebra: 65,
      geometry: 85,
      arithmetic: 80,
      statistics: 60,
      calculus: 70
    },
    achievements: [
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
    ],
    courseProgress: {
      currentUnit: 'Geometría Básica',
      startDate: '2024-08-15',
      completedPercentage: 72
    }
  },
  {
    id: '3',
    name: 'María Rodríguez López',
    grade: '1° Secundaria',
    groupId: 'A',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    progressPercentage: 91,
    learningStyle: 'Auditivo',
    mathSkills: {
      algebra: 88,
      geometry: 92,
      arithmetic: 95,
      statistics: 85,
      calculus: 80
    },
    achievements: [
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
    ],
    courseProgress: {
      currentUnit: 'Fracciones',
      startDate: '2024-08-15',
      completedPercentage: 91
    }
  },
  {
    id: '4',
    name: 'Diego Torres Vázquez',
    grade: '1° Secundaria',
    groupId: 'A',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    progressPercentage: 58,
    learningStyle: 'Visual',
    mathSkills: {
      algebra: 45,
      geometry: 60,
      arithmetic: 70,
      statistics: 50,
      calculus: 40
    },
    achievements: [],
    courseProgress: {
      currentUnit: 'Operaciones Básicas',
      startDate: '2024-08-15',
      completedPercentage: 58
    }
  },
  {
    id: '5',
    name: 'Sofia Hernández Castro',
    grade: '1° Secundaria',
    groupId: 'A',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    progressPercentage: 79,
    learningStyle: 'Auditivo',
    mathSkills: {
      algebra: 75,
      geometry: 80,
      arithmetic: 85,
      statistics: 75,
      calculus: 70
    },
    achievements: [],
    courseProgress: {
      currentUnit: 'Proporciones',
      startDate: '2024-08-15',
      completedPercentage: 79
    }
  },
  // Grupo B - 2° Secundaria
  {
    id: '6',
    name: 'Roberto Jiménez Silva',
    grade: '2° Secundaria',
    groupId: 'B',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    progressPercentage: 88,
    learningStyle: 'Kinestésico',
    mathSkills: {
      algebra: 92,
      geometry: 85,
      arithmetic: 90,
      statistics: 85,
      calculus: 80
    },
    achievements: [],
    courseProgress: {
      currentUnit: 'Ecuaciones Lineales',
      startDate: '2024-08-15',
      completedPercentage: 88
    }
  },
  {
    id: '7',
    name: 'Camila Morales Ruiz',
    grade: '2° Secundaria',
    groupId: 'B',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
    progressPercentage: 76,
    learningStyle: 'Visual',
    mathSkills: {
      algebra: 80,
      geometry: 78,
      arithmetic: 85,
      statistics: 70,
      calculus: 65
    },
    achievements: [],
    courseProgress: {
      currentUnit: 'Sistemas de Ecuaciones',
      startDate: '2024-08-15',
      completedPercentage: 76
    }
  },
  // Grupo C - 3° Secundaria
  {
    id: '8',
    name: 'Alejandro Pérez Gómez',
    grade: '3° Secundaria',
    groupId: 'C',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face',
    progressPercentage: 94,
    learningStyle: 'Auditivo',
    mathSkills: {
      algebra: 95,
      geometry: 90,
      arithmetic: 98,
      statistics: 92,
      calculus: 88
    },
    achievements: [],
    courseProgress: {
      currentUnit: 'Funciones Cuadráticas',
      startDate: '2024-08-15',
      completedPercentage: 94
    }
  },
  {
    id: '9',
    name: 'Isabella Ramírez Cruz',
    grade: '3° Secundaria',
    groupId: 'C',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    progressPercentage: 67,
    learningStyle: 'Visual',
    mathSkills: {
      algebra: 70,
      geometry: 65,
      arithmetic: 75,
      statistics: 60,
      calculus: 55
    },
    achievements: [],
    courseProgress: {
      currentUnit: 'Trigonometría Básica',
      startDate: '2024-08-15',
      completedPercentage: 67
    }
  }
];

export const mockGroups: Group[] = [
  {
    id: 'A',
    name: 'Grupo A',
    grade: '1° Secundaria',
    studentCount: 5,
    averageProgress: 77,
    color: 'from-blue-500 to-blue-600',
    students: mockStudents.filter(s => s.groupId === 'A')
  },
  {
    id: 'B',
    name: 'Grupo B',
    grade: '2° Secundaria',
    studentCount: 2,
    averageProgress: 82,
    color: 'from-emerald-500 to-emerald-600',
    students: mockStudents.filter(s => s.groupId === 'B')
  },
  {
    id: 'C',
    name: 'Grupo C',
    grade: '3° Secundaria',
    studentCount: 2,
    averageProgress: 81,
    color: 'from-purple-500 to-purple-600',
    students: mockStudents.filter(s => s.groupId === 'C')
  },
  {
    id: 'D',
    name: 'Grupo D',
    grade: '1° Secundaria',
    studentCount: 0,
    averageProgress: 0,
    color: 'from-amber-500 to-amber-600',
    students: []
  },
  {
    id: 'E',
    name: 'Grupo E',
    grade: '2° Secundaria',
    studentCount: 0,
    averageProgress: 0,
    color: 'from-rose-500 to-rose-600',
    students: []
  }
];