import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { User, AuthContextType } from '@/types/auth';
import { authAPI } from '@/services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = Cookies.get('access_token');
      if (token) {
        // Check if it's a demo token
        if (token === 'demo_token') {
          // Set demo user based on what was stored or default to admin
          const demoUser = {
            id: 1,
            email: 'admin@demo.com',
            firstName: 'Admin',
            lastName: 'User',
            role: 'admin' as const,
            createdAt: new Date().toISOString()
          };
          setUser(demoUser);
        } else {
          // Try to get real user data from API
          try {
            const userData = await authAPI.getCurrentUser();
            setUser(userData);
          } catch (error) {
            console.error('Failed to get current user:', error);
            Cookies.remove('access_token');
            Cookies.remove('refresh_token');
          }
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo credentials for testing
    const demoCredentials = [
      {
        email: 'admin@demo.com',
        password: 'admin123',
        user: {
          id: 1,
          email: 'admin@demo.com',
          firstName: 'Admin',
          lastName: 'User',
          role: 'admin' as const,
          createdAt: new Date().toISOString()
        }
      },
      {
        email: 'student@demo.com',
        password: 'student123',
        user: {
          id: 2,
          email: 'student@demo.com',
          firstName: 'John',
          lastName: 'Student',
          role: 'student' as const,
          createdAt: new Date().toISOString()
        }
      }
    ];

    // Check for demo credentials first
    const demoUser = demoCredentials.find(
      cred => cred.email === email && cred.password === password
    );

    if (demoUser) {
      // Simulate demo login
      Cookies.set('access_token', 'demo_token', {
        expires: 1,
        secure: false, // Set to false for demo
        sameSite: 'lax'
      });
      
      Cookies.set('refresh_token', 'demo_refresh_token', {
        expires: 7,
        secure: false, // Set to false for demo
        sameSite: 'lax'
      });

      setUser(demoUser.user);
      toast.success(`Welcome ${demoUser.user.firstName}! (Demo Mode)`);
      return true;
    }

    // If not demo credentials, try real API (when backend is ready)
    try {
      const response = await authAPI.login(email, password);
      
      Cookies.set('access_token', response.access, {
        expires: 1,
        secure: true,
        sameSite: 'strict'
      });
      
      Cookies.set('refresh_token', response.refresh, {
        expires: 7,
        secure: true,
        sameSite: 'strict'
      });

      setUser(response.user);
      toast.success('Login successful!');
      return true;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Invalid email or password. Try demo credentials: admin@demo.com/admin123 or student@demo.com/student123');
      return false;
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'admin' | 'student';
  }): Promise<boolean> => {
    try {
      await authAPI.register(userData);
      toast.success('Registration successful! Please login.');
      return true;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
      return false;
    }
  };

  const logout = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    try {
      await authAPI.forgotPassword(email);
      toast.success('Password reset email sent!');
      return true;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to send reset email');
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    forgotPassword,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isStudent: user?.role === 'student'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};