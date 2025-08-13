export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'student';
  createdAt: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'admin' | 'student';
  }) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isStudent: boolean;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  createdBy: User;
  pdfCount: number;
}

export interface PDF {
  id: number;
  filename: string;
  originalName: string;
  courseId: number;
  uploadedAt: string;
  size: number;
}