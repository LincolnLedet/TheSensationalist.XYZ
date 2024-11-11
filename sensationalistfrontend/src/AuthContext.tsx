
import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
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
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Simulate fetching the token and user data from localStorage
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');

    if (token && userString) {
      try {
        const user = JSON.parse(userString);
        setAuth({ isLoggedIn: true, token, user });
      } catch (error) {
        console.error('Failed to parse user data from localStorage:', error);
      }
    }

    setLoading(false); // Set loading to false after data is fetched
  }, []);

  const login = (token: string, user: User) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setAuth({ isLoggedIn: true, token, user });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth({ isLoggedIn: false, token: null, user: null });
  };

  // Render a loading indicator until initialization is complete
  if (loading) {
    return <div>Loading...</div>; // This can be a custom loading component or a spinner
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
