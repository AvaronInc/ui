
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
    // First check if the user exists - this doesn't affect signup but is helpful for feedback
    const { existingUser } = await checkExistingUser(values.email);
    if (existingUser) {
      console.log('[Signup] User already exists:', existingUser);
      return { 
        success: false, 
        data: null, 
        error: new Error('Email already registered'), 
        errorDetails: 'This email is already registered. Please use a different email or try to log in.' 
      };
    }

    // Simplify the user data structure to avoid potential issues
    const userData = {
      email: values.email,
      password: values.password,
      options: {
        data: {
          full_name: values.fullName,
          role: 'user'
        },
      },
    };
    
    console.log('[Signup] Sending signup request with data:', JSON.stringify(userData, null, 2));
    
    // Proceed with signup
    const { data, error } = await supabase.auth.signUp(userData);
    
    if (error) {
      console.error('[Signup] Error:', error);
      
      // Special handling for development mode to avoid CORS issues
      if (import.meta.env.DEV && (error.message === '{}' || error.message.includes('network') || error.status === 503)) {
        console.log('[Signup] Development mode: Creating mock user session');
        
        // In development mode, we'll simulate a successful signup
        toast.success('Development mode: Account created successfully!');
        
        // Don't try to sign in after simulated signup, just return success
        return { 
          success: true, 
          data: { user: { email: values.email } }, 
          error: null 
        };
      }
      
      // Provide more context for database errors
      if (error.message?.includes('type "user_role" does not exist') || 
          error.message?.includes('Database error saving new user')) {
        console.error('[Signup] Database schema error:', error);
        return { 
          success: false, 
          data: null, 
          error: new Error('Database configuration error'), 
          errorDetails: 'There is a database configuration issue. Please contact support.' 
        };
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
  } else if (error.message?.includes('already registered') || error.errorDetails?.includes('already registered')) {
    toast.error('This email is already registered. Please use a different email or try to log in.');
  } else if (error.message?.includes('Database configuration error') || error.errorDetails?.includes('database configuration')) {
    toast.error('System error: The signup system is currently experiencing issues. Please try again later.');
  } else {
    toast.error(error.message || error.errorDetails || 'Failed to create account. Please try again later.');
  }
}
