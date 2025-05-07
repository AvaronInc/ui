
import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { AuthContextType, UserProfile, AuthError } from './types';
import { logAuthError, setDevFallbackProfile } from './auth-utils';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthContext.Provider
      value={{
        session: {},
        user: {},
        profile: {},
        isAdmin: true,
        isLoading: false,
        authError: null,
        signOut: () => {},
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
