import React, { createContext, useContext, useState } from 'react';

interface AuthContextProps {
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (newUsername: string, newPassword: string, confirmedPassword: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  const login = async (username: string, password: string) => {
    try {
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const user = await response.json();
            console.log('Login successful:', user);
            setIsLoggedIn(true);
        } else {
            throw new Error('Invalid username or password');
        }
    } catch (error) {
        console.error('Invalid username or password', error);
        throw new Error('Invalid username or password');
    }
};
  
  const register = async (newUsername: string, newPassword: string, confirmedPassword: string) => {
    try {
      const response = await fetch(`http://localhost:8080/users/${newUsername}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        throw new Error('Username already exists.');
      } else if (response.status === 400) {
        if (newPassword !== confirmedPassword) {
          throw new Error('Password and Confirm Password do not match.');
        }
  
        const response = await fetch('http://localhost:8080/users/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: newUsername, password: newPassword }),
        });
  
        if (!response.ok) {
          throw new Error('Error during registration');
        }
      } else {
        throw new Error('Error checking username');
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  
  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
