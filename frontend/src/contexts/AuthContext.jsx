import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const API_BASE_URL = 'http://localhost:5000/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored token and validate it
    const token = localStorage.getItem('techno-kratos-token');
    if (token) {
      validateToken(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const validateToken = async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        // Token is invalid, remove it
        localStorage.removeItem('techno-kratos-token');
        localStorage.removeItem('techno-kratos-user');
      }
    } catch (error) {
      console.error('Token validation error:', error);
      localStorage.removeItem('techno-kratos-token');
      localStorage.removeItem('techno-kratos-user');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        localStorage.setItem('techno-kratos-token', data.token);
        localStorage.setItem('techno-kratos-user', JSON.stringify(data.user));
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        // Handle new error format
        const error = new Error(data.message || 'Login failed');
        error.errors = data.errors || [];
        throw error;
      }
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const signup = async (userData) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        localStorage.setItem('techno-kratos-token', data.token);
        localStorage.setItem('techno-kratos-user', JSON.stringify(data.user));
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        // Handle new error format
        const error = new Error(data.message || 'Registration failed');
        error.errors = data.errors || [];
        throw error;
      }
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const setupAdmin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/setup-admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        localStorage.setItem('techno-kratos-token', data.token);
        localStorage.setItem('techno-kratos-user', JSON.stringify(data.user));
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        // Handle new error format
        const error = new Error(data.message || 'Admin setup failed');
        error.errors = data.errors || [];
        throw error;
      }
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const updateUser = async (updateData) => {
    try {
      const token = localStorage.getItem('techno-kratos-token');
      
      const response = await fetch(`${API_BASE_URL}/auth/update-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        localStorage.setItem('techno-kratos-token', data.token);
        localStorage.setItem('techno-kratos-user', JSON.stringify(data.user));
        return { success: true, data };
      } else {
        // Handle new error format
        const error = new Error(data.message || 'Update failed');
        error.errors = data.errors || [];
        throw error;
      }
    } catch (error) {
      throw error;
    }
  };

  const checkAdminExists = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/check-admin`);
      const data = await response.json();
      return data.adminExists;
    } catch (error) {
      console.error('Check admin error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('techno-kratos-token');
    localStorage.removeItem('techno-kratos-user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      setupAdmin,
      updateUser,
      checkAdminExists,
      logout, 
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