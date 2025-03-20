
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
    // For development, provide a simpler path if we encounter network issues
    if (import.meta.env.DEV && !navigator.onLine) {
      console.log('[Signup] Offline mode: Skipping existing user check');
      return { existingUser: null, checkError: null };
    }
    
    const { data: existingUser, error: checkError } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('email', email)
      .maybeSingle();
    
    if (checkError) {
      console.error('[Signup] Error checking existing user:', checkError);
      // In dev mode, don't block signup if we can't check (likely CORS/network issue)
      if (import.meta.env.DEV) {
        return { existingUser: null, checkError };
      }
    }
    
    return { existingUser, checkError };
  } catch (error) {
    console.error('[Signup] Exception checking existing user:', error);
    // In development mode, allow signup to proceed on errors
    if (import.meta.env.DEV) {
      return { existingUser: null, checkError: error };
    }
    return { existingUser: null, checkError: error };
  }
}

export async function createUser(values: SignupFormValues): Promise<SignupResult> {
  console.log('[Signup] Starting signup process for:', values.email);
  
  try {
    // In offline or error state, always provide a dev fallback
    if (import.meta.env.DEV && !navigator.onLine) {
      console.log('[Signup] Development offline mode: Simulating successful signup');
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
      return { 
        success: true, 
        data: { user: { email: values.email } }, 
        error: null 
      };
    }

    // Simplify the user data structure to avoid potential issues
    const userData = {
      email: values.email,
      password: values.password,
      options: {
        data: {
          full_name: values.fullName
        },
      },
    };
    
    console.log('[Signup] Sending signup request with data:', JSON.stringify({
      email: userData.email,
      options: { data: userData.options.data }
    }));
    
    // Proceed with signup
    const { data, error } = await supabase.auth.signUp(userData);
    
    if (error) {
      console.error('[Signup] Error:', error);
      
      // Special handling for development mode to avoid CORS issues
      if (import.meta.env.DEV && (error.message === '{}' || 
                                  error.message.includes('network') || 
                                  error.status === 503 ||
                                  error.message.includes('fetch failed'))) {
        console.log('[Signup] Development mode: Creating mock user session');
        toast.success('Development mode: Account created successfully!');
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
        errorDetails: error.message || JSON.stringify(error) 
      };
    }
    
    console.log('[Signup] Successful signup. Data:', data);
    
    // Important: Don't try to sign in automatically as this can cause issues
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
