'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getUsers } from '../lib/mockData';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  role?: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
  confirmPasswordReset: (email: string, newPassword: string) => Promise<boolean>;
  isLoading: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session on mount
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Save user to localStorage whenever it changes
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get users (handles reading from localStorage and seeding default admin if necessary)
      const users = getUsers();

      // Find user with matching email and password
      const foundUser = users.find((u: any) =>
        u.email === email && u.password === password
      );

      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        setIsLoading(false);
        return true;
      }

      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get existing users
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      // Check if user already exists
      if (users.find((u: any) => u.email === userData.email)) {
        setIsLoading(false);
        return false;
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        role: (userData.email === 'admin@example.com' ? 'admin' : 'user') as 'admin' | 'user',
        createdAt: new Date().toISOString()
      };

      // Save to localStorage
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Auto-login after registration
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);

      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      // Find user with matching email
      const foundUser = users.find((u: any) => u.email === email);

      if (foundUser) {
        // In a real app, this would send an email
        console.log(`Password reset link sent to ${email}`);
        setIsLoading(false);
        return true;
      }

      // For security, we might want to return true even if user not found, 
      // but for this demo defined behavior is false if not found? 
      // Let's return false to show error message for now as it's easier to test.
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Reset password error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const confirmPasswordReset = async (email: string, newPassword: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex((u: any) => u.email === email);

      if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem('users', JSON.stringify(users));
        setIsLoading(false);
        return true;
      }

      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Confirm reset password error:', error);
      setIsLoading(false);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      resetPassword,
      confirmPasswordReset,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
