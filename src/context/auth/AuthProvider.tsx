
import React, { createContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { AuthContextType, UserProfile, AuthError } from './types';
import { logAuthError, setDevFallbackProfile } from './auth-utils';
import { fetchUserProfile } from './useProfileFetch';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<AuthError | null>(null);

  // Initialize auth state once when component mounts
  useEffect(() => {
    console.log('[Auth] Setting up auth provider...');
    let didCancel = false;
    let subscriptionObject: { unsubscribe: () => void } | null = null;
    
    const initializeAuth = async () => {
      try {
        // First set up the auth state listener to avoid missing events
        // CRITICAL: Use non-async callback to prevent deadlocks
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
          console.log('[Auth] Auth state changed:', event, Boolean(newSession));
          
          if (didCancel) return;
          
          // Update session and user immediately (synchronously)
          setSession(newSession);
          setUser(newSession?.user || null);
          
          // Use setTimeout to defer profile fetching and prevent deadlocks
          if (newSession?.user) {
            setTimeout(async () => {
              if (didCancel) return;
              setIsLoading(true);
              try {
                const userProfile = await fetchUserProfile(newSession.user.id);
                if (!didCancel) setProfile(userProfile);
              } catch (error) {
                const authErr = logAuthError(error, 'auth state change profile fetch');
                setAuthError(authErr);
                const fallbackProfile = setDevFallbackProfile(import.meta.env.DEV);
                if (!didCancel) setProfile(fallbackProfile);
              } finally {
                if (!didCancel) setIsLoading(false);
              }
            }, 0);
          } else {
            // Create fallback profile for development or clear for production
            setTimeout(() => {
              if (!didCancel) {
                const fallbackProfile = setDevFallbackProfile(import.meta.env.DEV);
                setProfile(fallbackProfile);
                setIsLoading(false);
              }
            }, 0);
          }
        });

        // Store the subscription for cleanup
        subscriptionObject = subscription;
        
        // Then check for existing session
        console.log('[Auth] Checking for existing session...');
        const { data: sessionData, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        console.log('[Auth] Session retrieved:', sessionData.session ? 'Valid session' : 'No session');
        
        if (didCancel) return;
        
        setSession(sessionData.session);
        setUser(sessionData.session?.user || null);
        
        if (sessionData.session?.user) {
          try {
            const userProfile = await fetchUserProfile(sessionData.session.user.id);
            if (!didCancel) setProfile(userProfile);
          } catch (error) {
            const authErr = logAuthError(error, 'initial session profile fetch');
            setAuthError(authErr);
            const fallbackProfile = setDevFallbackProfile(import.meta.env.DEV);
            if (!didCancel) setProfile(fallbackProfile);
          }
        } else {
          // Create fallback profile for development
          const fallbackProfile = setDevFallbackProfile(import.meta.env.DEV);
          if (!didCancel) setProfile(fallbackProfile);
        }
      } catch (error: any) {
        const loggedError = logAuthError(error, 'initialization');
        setAuthError(loggedError);
        toast.error(`Authentication error: ${loggedError.message}`);
        const fallbackProfile = setDevFallbackProfile(import.meta.env.DEV);
        if (!didCancel) setProfile(fallbackProfile);
      } finally {
        if (!didCancel) setIsLoading(false);
      }
    };
    
    initializeAuth();

    // Clean up
    return () => {
      didCancel = true;
      if (subscriptionObject) {
        // Properly unsubscribe from auth events
        subscriptionObject.unsubscribe();
      }
    };
  }, []);

  const signOut = async () => {
    try {
      console.log('[Auth] Signing out...');
      
      // Clear local state first
      setIsLoading(true);
      
      // Then sign out from Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      // Reset all state after successful logout
      setSession(null);
      setUser(null);
      setProfile(null);
      setAuthError(null);
      
      console.log('[Auth] Successfully signed out');
      
      // Show success message
      toast.success('Logged out successfully');
      
      return Promise.resolve();
    } catch (error: any) {
      const loggedError = logAuthError(error, 'sign out');
      toast.error(`Logout error: ${loggedError.message}`);
      
      // Even in case of errors, we'll consider the logout successful from UI perspective
      setSession(null);
      setUser(null);
      setProfile(null);
      
      return Promise.resolve();
    } finally {
      setIsLoading(false);
    }
  };

  // Always set isAdmin to true for development purposes
  const isAdmin = import.meta.env.DEV ? true : profile?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        isAdmin,
        isLoading,
        authError,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
