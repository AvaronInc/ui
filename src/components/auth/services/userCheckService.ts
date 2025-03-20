
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
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // We're only checking if the email exists, not actually creating a user
        shouldCreateUser: false // This is a valid option for signInWithOtp
      }
    });
    
    // If there's no error, the email exists and we can send OTP to it
    if (!error) {
      console.log('[Signup] Email exists (can receive OTP):', email);
      return { existingUser: { email }, checkError: null };
    }
    
    // If we get an error about user not found, that means the user doesn't exist
    if (error.message.includes('user not found')) {
      console.log('[Signup] Email does not exist (cannot proceed with signup):', email);
      return { existingUser: null, checkError: null };
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
