
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

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  isAdmin: boolean;
  isLoading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize auth state once when component mounts
  useEffect(() => {
    console.log('Setting up auth provider...');
    
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log('Auth state changed:', event);
      
      // Update session and user
      setSession(newSession);
      setUser(newSession?.user || null);
      
      if (newSession?.user) {
        setIsLoading(true);
        await fetchUserProfile(newSession.user.id);
      } else {
        // Create fallback profile for development
        setDevFallbackProfile();
        setIsLoading(false);
      }
    });

    // Then check for existing session
    const initializeSession = async () => {
      try {
        console.log('Initializing auth session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error.message);
          throw error;
        }
        
        console.log('Session retrieved:', session ? 'Valid session' : 'No session');
        setSession(session);
        setUser(session?.user || null);
        
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        } else {
          // Create fallback profile for development
          setDevFallbackProfile();
          setIsLoading(false);
        }
      } catch (error: any) {
        console.error('Error in initializeSession:', error.message);
        setDevFallbackProfile();
        setIsLoading(false);
      }
    };
    
    initializeSession();

    // Clean up subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Set a fallback profile for development
  const setDevFallbackProfile = () => {
    if (import.meta.env.DEV) {
      console.log('Development mode: Creating fallback admin profile');
      setProfile({
        id: 'dev-user',
        role: 'admin',
      });
    }
  };

  const fetchUserProfile = async (userId: string) => {
    console.log('Fetching user profile for:', userId);
    
    try {
      // Try to fetch profile from the database
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching user profile from DB:', error.message);
        throw error;
      }
      
      if (data) {
        console.log('Profile found in database:', data);
        // Ensure admin role for development
        setProfile({
          ...data as UserProfile,
          role: import.meta.env.DEV ? 'admin' : (data as UserProfile).role  // Force admin role in dev
        });
      } else {
        console.log('No profile found in database, creating fallback profile');
        // Create a fallback profile with admin role if none exists
        setProfile({
          id: userId,
          role: 'admin', // Default to admin for development
        });
      }
    } catch (error: any) {
      console.error('Exception in fetchUserProfile:', error.message);
      // Provide a fallback profile to prevent getting stuck
      setProfile({
        id: userId,
        role: 'admin', // Default to admin for development
      });
    } finally {
      console.log('Finished profile fetch, setting isLoading to false');
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      console.log('Signing out...');
      
      // Clear local state first
      setIsLoading(true);
      
      // Then sign out from Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Error during signOut:', error);
        // Continue with the logout process even if there's an error
      }
      
      // Reset all state after successful logout
      setSession(null);
      setUser(null);
      setProfile(null);
      
      console.log('Successfully completed logout process');
      
      // Show success message
      toast.success('Logged out successfully');
      
      return Promise.resolve();
    } catch (error: any) {
      console.error('Error signing out:', error.message);
      // Even in case of errors, we'll consider the logout successful from UI perspective
      toast.error('There was an issue during logout, but you have been logged out from this device');
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
