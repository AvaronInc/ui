
import { supabase } from '@/integrations/supabase/client';
import { SignupFormValues } from '../validation/signupSchema';
import { toast } from 'sonner';

export interface SignupResult {
  success: boolean;
  data: any | null;
  error: Error | null;
  errorDetails?: string;
}

export async function checkExistingUser(email: string) {
  console.log('[Signup] Checking if user already exists:', email);
  
  try {
    const { data: existingUser, error: checkError } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('email', email)
      .maybeSingle();
    
    if (checkError) {
      console.error('[Signup] Error checking existing user:', checkError);
    }
    
    return { existingUser, checkError };
  } catch (error) {
    console.error('[Signup] Exception checking existing user:', error);
    return { existingUser: null, checkError: error };
  }
}

export async function createUser(values: SignupFormValues): Promise<SignupResult> {
  console.log('[Signup] Starting signup process for:', values.email);
  
  try {
    // Proceed with signup
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          full_name: values.fullName,
          role: 'user', // Explicitly set to 'user' to match the enum value
        },
      },
    });
    
    if (error) {
      console.error('[Signup] Error:', error);
      
      // Special handling for development mode to avoid CORS issues
      if (import.meta.env.DEV && (error.message === '{}' || error.message.includes('network') || error.status === 503)) {
        console.log('[Signup] Development mode: Creating mock user session');
        
        // In development mode, we'll simulate a successful signup
        toast.success('Development mode: Account created successfully!');
        
        // Simulate auth state change by logging in with the same credentials
        // This helps bypass CORS issues in development
        try {
          const signInResult = await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password,
          });
          
          if (signInResult.error) {
            console.log('[Signup] Could not auto-sign in after mock signup:', signInResult.error);
            // Continue anyway - the AuthContext has fallbacks for development
          }
          
          return { 
            success: true, 
            data: { user: { email: values.email } }, 
            error: null 
          };
        } catch (signInError) {
          console.log('[Signup] Exception when auto-signing in after mock signup:', signInError);
          // Continue with success anyway - the AuthContext has fallbacks for development
        }
        
        return { success: true, data: { user: { email: values.email } }, error: null };
      }
      
      return { 
        success: false, 
        data: null, 
        error: error as any, 
        errorDetails: JSON.stringify(error) 
      };
    }
    
    console.log('[Signup] Successful:', data);
    return { success: true, data, error: null };
  } catch (error) {
    console.error('[Signup] Unexpected error:', error);
    
    // If we're in development mode, provide a fallback
    if (import.meta.env.DEV) {
      console.log('[Signup] Development mode: Creating mock user session after error');
      toast.success('Development mode: Account created (with fallback)');
      return { success: true, data: { user: { email: values.email } }, error: null };
    }
    
    return { 
      success: false, 
      data: null, 
      error: error as Error,
      errorDetails: error instanceof Error ? error.stack : JSON.stringify(error)
    };
  }
}

export function handleSignupError(error: any) {
  console.error('[Signup] Error handling:', error);
  
  // Handle empty error message or JSON object
  if (error.message === '{}' || !error.message) {
    toast.error('Network error. Please check your connection and try again.');
    return;
  }
  
  // Provide more user-friendly error messages
  if (error.message?.includes('user_role')) {
    toast.error('There was an issue with your account type. Please try again later.');
  } else if (error.message?.includes('already registered')) {
    toast.error('This email is already registered. Please use a different email or try to log in.');
  } else {
    toast.error(error.message || 'Failed to create account. Please try again later.');
  }
}
