export interface ExecutionStep {
  stepIndex: number;
  lineNumber: number;
  codeSnippet: string;
  explanation: string;
  variables: Record<string, any>;
  callStack: string[];
  visualState: VisualState;
}

export interface VisualState {
  type: 'array' | 'linked_list' | 'tree' | 'graph' | 'stack' | 'queue' | 'dp_table' | 'general';
  data: any;
  pointers?: Record<string, any>;
  highlights?: Record<string | number, 'active' | 'comparing' | 'sorted' | 'swapped' | 'visited' | 'found' | 'pivot'>;
  auxiliary?: any;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Lesson {
  _id: string;
  id?: string;
  title: string;
  slug: string;
  moduleId: string;
  category: 'searching' | 'sorting' | 'linked_list' | 'stack' | 'queue' | 'tree' | 'graph' | 'dp';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  theory: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  codeSnippet: string;
  defaultInput: any;
  algorithmKey: string;
  teachingPoints?: string[];
  quizQuestions?: QuizQuestion[];
}

export interface Module {
  _id: string;
  id?: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  order: number;
  lessons?: Lesson[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  completedLessons: string[];
}
