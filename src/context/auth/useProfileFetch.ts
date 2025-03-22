
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from './types';
import { logAuthError } from './auth-utils';

export const fetchUserProfile = async (userId: string): Promise<UserProfile> => {
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
      const role = import.meta.env.DEV ? 'admin' : (data as UserProfile).role;
      
      // Make sure the role is valid
      const validRole = (role === 'admin' || role === 'manager' || role === 'user') ? role : 'user';
      
      return {
        ...data as Omit<UserProfile, 'role'>,
        role: validRole,
      };
    } else {
      console.log('[Auth] No profile found in database, creating fallback profile');
      // Create a fallback profile with admin role if none exists
      return {
        id: userId,
        role: 'admin', // Default to admin for development
      };
    }
  } catch (error: any) {
    console.error('[Auth] Exception in fetchUserProfile:', error.message);
    // Log error but don't rethrow - provide a fallback profile to prevent getting stuck
    logAuthError(error, 'profile fetch');
    
    // Provide a fallback profile to prevent getting stuck
    return {
      id: userId,
      role: 'admin', // Default to admin for development
    };
  }
};
