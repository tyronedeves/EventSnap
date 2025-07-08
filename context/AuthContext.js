import React, { createContext, useContext, useState, useEffect } from 'react';
import { appwriteAuth } from '../lib/appwrite';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const loggedIn = await appwriteAuth.isLoggedIn();
      
      if (loggedIn) {
        const currentUser = await appwriteAuth.getCurrentUser();
        setUser(currentUser);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email, password, name) => {
    try {
      setIsLoading(true);
      
      // First, ensure no active session exists
      await appwriteAuth.signOut();
      
      // Create account
      await appwriteAuth.createAccount(email, password, name);
      
      // Sign in the user after account creation
      await appwriteAuth.signIn(email, password);
      
      // Get user info
      const currentUser = await appwriteAuth.getCurrentUser();
      setUser(currentUser);
      setIsLoggedIn(true);
      
      return { success: true };
    } catch (error) {
      console.error('Sign up failed:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email, password) => {
    try {
      setIsLoading(true);
      
      // First, ensure no active session exists
      await appwriteAuth.signOut();
      
      // Sign in user
      await appwriteAuth.signIn(email, password);
      
      // Get user info
      const currentUser = await appwriteAuth.getCurrentUser();
      setUser(currentUser);
      setIsLoggedIn(true);
      
      return { success: true };
    } catch (error) {
      console.error('Sign in failed:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await appwriteAuth.signOut();
      setUser(null);
      setIsLoggedIn(false);
      return { success: true };
    } catch (error) {
      console.error('Sign out failed:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    isLoggedIn,
    signUp,
    signIn,
    signOut,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};