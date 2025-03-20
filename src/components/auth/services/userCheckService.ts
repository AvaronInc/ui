
import { supabase } from '@/integrations/supabase/client';

export async function checkExistingUser(email: string) {
  console.log('[Signup] Checking if user already exists:', email);
  
  try {
    // For development mode, always return success without checking
    if (import.meta.env.DEV) {
      console.log('[Signup] Development mode: Skipping existing user check');
      return { existingUser: null, checkError: null };
    }
    
    // For production, check if the email exists
    const { data, error } = await supabase.auth.signUp({
      email,
      password: 'TEMPORARY_PASSWORD_FOR_CHECK_ONLY',
      options: {
        emailRedirectTo: window.location.origin,
      }
    });
    
    // If there's no error or an error that doesn't mention "already registered", 
    // the email doesn't exist
    if (!error || !error.message.includes('already registered')) {
      console.log('[Signup] Email does not exist (can proceed with signup):', email);
      return { existingUser: null, checkError: null };
    }
    
    // If we get an error about email already registered, that means the user exists
    if (error.message.includes('already registered')) {
      console.log('[Signup] Email exists (cannot proceed with signup):', email);
      return { existingUser: { email }, checkError: null };
    }
    
    // For other errors, log them and allow signup to proceed in development
    console.error('[Signup] Error checking if user exists:', error.message);
    
    return { existingUser: null, checkError: error };
  } catch (error) {
    console.error('[Signup] Exception checking existing user:', error);
    
    // In development mode, allow signup to proceed on errors
    if (import.meta.env.DEV) {
      console.log('[Signup] Error in DEV mode: Continuing with signup');
      return { existingUser: null, checkError: null };
    }
    
    return { existingUser: null, checkError: error as Error };
  }
}
