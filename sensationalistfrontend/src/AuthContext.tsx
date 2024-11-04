
// AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';

// **Define your interfaces here**
interface User {
  id: number;
  username: string;
  email: string; // Include if returned by backend
  role: string;
  // Add other user properties as needed
}

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  user: User | null;
}

interface AuthContextProps {
  auth: AuthState;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({
    isLoggedIn: false,
    token: null,
    user: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');

    if (token && userString) {
      try {
        const user = JSON.parse(userString);
        setAuth({ isLoggedIn: true, token, user });
      } catch (error) {
        console.error('Failed to parse user data from localStorage:', error);
        setAuth({ isLoggedIn: false, token: null, user: null });
      }
    }
  }, []);

  const login = (token: string, user: User) => {
    console.log('AuthContext: login called with', { token, user });
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setAuth({ isLoggedIn: true, token, user });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth({ isLoggedIn: false, token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
