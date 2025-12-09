// src/context/useBetterAuth.js
import { useState, useEffect, useCallback } from 'react';

const useBetterAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Ensure this runs only on the client-side
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('betterAuth_currentUser');
      if (user) {
        setCurrentUser(JSON.parse(user));
      }
    }
  }, []);

  const signup = useCallback(({ name, email, password, background }) => {
    if (typeof window !== 'undefined') {
      const users = JSON.parse(localStorage.getItem('betterAuth_users') || '[]');
      if (users.find(u => u.email === email)) {
        throw new Error('An account with this email already exists.');
      }
      // NOTE: In a real app, hash the password. For this project, we do not store the password.
      const newUser = { name, email, background };
      localStorage.setItem('betterAuth_users', JSON.stringify([...users, newUser]));
    }
  }, []);

  const login = useCallback(({ email, password }) => {
    if (typeof window !== 'undefined') {
      const users = JSON.parse(localStorage.getItem('betterAuth_users') || '[]');
      const user = users.find(u => u.email === email);
      
      // NOTE: In a real app, you would verify a hashed password.
      // For this frontend-only demo, we just check if the user exists.
      if (!user) {
        throw new Error('Account not found. Please sign up first.');
      }
      
      localStorage.setItem('betterAuth_currentUser', JSON.stringify(user));
      setCurrentUser(user);
      return user;
    }
    return null;
  }, []);

  const logout = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('betterAuth_currentUser');
      setCurrentUser(null);
      // Force a reload to ensure all components depending on auth state are reset
      window.location.reload();
    }
  }, []);

  return { currentUser, signup, login, logout };
};

export default useBetterAuth;
