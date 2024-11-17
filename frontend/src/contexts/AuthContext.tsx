import React, { createContext, useContext, useState, useCallback } from 'react';
import { api } from '../api/client';
import type { AuthResponse, User } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    try {
      console.log('Attempting login with:', { email });
      const formData = new FormData();
      formData.append('username', email);
      formData.append('password', password);

      const response = await api.post<AuthResponse>('/auth/token', formData);
      console.log('Login response:', response);
      
      if (response.access_token) {
        api.setToken(response.access_token);
        setIsAuthenticated(true);
        
        // Fetch user data
        const userData = await api.get<User>('/auth/me');
        setUser(userData);
      } else {
        throw new Error('No access token received');
      }
    } catch (error) {
      console.error('Login failed:', error);
      if (error instanceof Error) {
        throw new Error(`Login failed: ${error.message}`);
      }
      throw error;
    }
  }, []);

  const register = useCallback(async (email: string, password: string, fullName: string) => {
    try {
      console.log('Attempting registration with:', { email, fullName });
      await api.post<User>('/auth/register', {
        email,
        password,
        full_name: fullName,
      });
      console.log('Registration successful, proceeding to login');
      await login(email, password);
    } catch (error) {
      console.error('Registration failed:', error);
      if (error instanceof Error) {
        throw new Error(`Registration failed: ${error.message}`);
      }
      throw error;
    }
  }, [login]);

  const logout = useCallback(() => {
    api.clearToken();
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
