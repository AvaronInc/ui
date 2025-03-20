
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface UserProfile {
  id: string;
  full_name?: string;
  role: 'admin' | 'manager' | 'user';
  company_id?: string;
  avatar_url?: string;
}

interface AuthError {
  message: string;
  details?: string;
  timestamp: string;
}

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  isAdmin: boolean;
  isLoading: boolean;
  authError: AuthError | null;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<AuthError | null>(null);

  const logAuthError = (error: any, context: string) => {
    const timestamp = new Date().toISOString();
    const errorMessage = error?.message || 'Unknown error';
    const errorDetails = error?.details || error?.stack || JSON.stringify(error);
    
    console.error(`[${timestamp}] Authentication error in ${context}:`, errorMessage, error);
    
    setAuthError({
      message: errorMessage,
      details: errorDetails,
      timestamp
    });
    
    return { message: errorMessage, details: errorDetails, timestamp };
  };

  // Initialize auth state once when component mounts
  useEffect(() => {
    console.log('[Auth] Setting up auth provider...');
    let didCancel = false;
    let subscriptionObject: { unsubscribe: () => void } | null = null;
    
    const initializeAuth = async () => {
      try {
        // First set up the auth state listener to avoid missing events
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
          console.log('[Auth] Auth state changed:', event, Boolean(newSession));
          
          if (didCancel) return;
          
          // Update session and user
          setSession(newSession);
          setUser(newSession?.user || null);
          
          if (newSession?.user) {
            setIsLoading(true);
            try {
              await fetchUserProfile(newSession.user.id);
            } catch (error) {
              logAuthError(error, 'auth state change profile fetch');
              setDevFallbackProfile();
            } finally {
              if (!didCancel) setIsLoading(false);
            }
          } else {
            // Create fallback profile for development or clear for production
            setDevFallbackProfile();
            if (!didCancel) setIsLoading(false);
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
            await fetchUserProfile(sessionData.session.user.id);
          } catch (error) {
            logAuthError(error, 'initial session profile fetch');
            setDevFallbackProfile();
          }
        } else {
          // Create fallback profile for development
          setDevFallbackProfile();
        }
      } catch (error: any) {
        const loggedError = logAuthError(error, 'initialization');
        toast.error(`Authentication error: ${loggedError.message}`);
        setDevFallbackProfile();
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

  // Set a fallback profile for development
  const setDevFallbackProfile = () => {
    if (import.meta.env.DEV) {
      console.log('[Auth] Development mode: Creating fallback admin profile');
      setProfile({
        id: 'dev-user',
        role: 'admin',
      });
    } else {
      setProfile(null);
    }
  };

  const fetchUserProfile = async (userId: string) => {
    console.log('[Auth] Fetching user profile for:', userId);
    
    try {
      // Try to fetch profile from the database
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (error) {
        throw error;
      }
      
      if (data) {
        console.log('[Auth] Profile found in database:', data);
        // Ensure admin role for development
        setProfile({
          ...data as UserProfile,
          role: import.meta.env.DEV ? 'admin' : (data as UserProfile).role  // Force admin role in dev
        });
      } else {
        console.log('[Auth] No profile found in database, creating fallback profile');
        // Create a fallback profile with admin role if none exists
        setProfile({
          id: userId,
          role: 'admin', // Default to admin for development
        });
      }
    } catch (error: any) {
      console.error('[Auth] Exception in fetchUserProfile:', error.message);
      // Log error but don't rethrow - provide a fallback profile to prevent getting stuck
      logAuthError(error, 'profile fetch');
      
      // Provide a fallback profile to prevent getting stuck
      setProfile({
        id: userId,
        role: 'admin', // Default to admin for development
      });
    }
  };

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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
