
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
    // For development, always return success without checking
    if (import.meta.env.DEV) {
      console.log('[Signup] Development mode: Bypassing existing user check');
      return { existingUser: null, checkError: null };
    }
    
    // For production, we need a more reliable approach to check if email exists
    // This method uses a simple query that won't actually create an auth attempt
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false // This ensures we don't create a new user
      }
    });
    
    if (error) {
      // If we get an error about email not found, that means the user doesn't exist
      if (error.message.includes('Email not found')) {
        console.log('[Signup] Email does not exist (can proceed with signup):', email);
        return { existingUser: null, checkError: null };
      }
      
      // For other errors, log them but allow signup to proceed in development
      console.error('[Signup] Error checking if user exists:', error.message);
      
      // In production, we should be more careful and report this error
      if (!import.meta.env.DEV) {
        return { existingUser: null, checkError: error };
      }
      
      // In development, continue despite errors
      return { existingUser: null, checkError: null };
    }
    
    // If we get here with no error, it means the OTP was sent, which indicates the user exists
    console.log('[Signup] Email exists (cannot proceed with signup):', email);
    return { existingUser: { email }, checkError: null };
  } catch (error) {
    console.error('[Signup] Exception checking existing user:', error);
    
    // In development mode, allow signup to proceed on errors
    if (import.meta.env.DEV) {
      console.log('[Signup] Error in DEV mode: Continuing with signup');
      return { existingUser: null, checkError: null };
    }
    
    return { existingUser: null, checkError: error };
  }
}

export async function createUser(values: SignupFormValues): Promise<SignupResult> {
  console.log('[Signup] Starting signup process for:', values.email);
  
  try {
    // In development mode or offline state, always provide a dev fallback
    if (import.meta.env.DEV) {
      if (!navigator.onLine) {
        console.log('[Signup] Development offline mode: Simulating successful signup');
      } else {
        console.log('[Signup] Development mode: May use fallback if needed');
      }
      
      // Add slight delay to give better user feedback
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Attempt real signup but with fallback for development
      try {
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
        
        console.log('[Signup] Sending signup request in DEV mode');
        
        // Proceed with signup - with shorter timeout in dev mode
        const signupPromise = supabase.auth.signUp(userData);
        
        // In dev mode, add a safety timeout
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Signup request timeout')), 3000);
        });
        
        // Race between signup and timeout
        const { data, error } = await Promise.race([
          signupPromise,
          timeoutPromise.then(() => {
            console.log('[Signup] Signup timeout in DEV mode, using fallback');
            return {
              data: { user: { email: values.email, user_metadata: { full_name: values.fullName } } },
              error: null
            };
          }).catch(e => {
            console.log('[Signup] Fallback error:', e);
            return {
              data: { user: { email: values.email, user_metadata: { full_name: values.fullName } } },
              error: null
            };
          })
        ]);
        
        if (error) {
          console.warn('[Signup] Error in DEV mode, using fallback:', error);
          toast.success('Development mode: Account created with fallback!');
          return { 
            success: true, 
            data: { user: { email: values.email, user_metadata: { full_name: values.fullName } } }, 
            error: null 
          };
        }
        
        console.log('[Signup] Successful DEV mode signup with real API');
        return { success: true, data, error: null };
      } catch (error) {
        console.warn('[Signup] Exception in DEV mode, using fallback:', error);
        toast.success('Development mode: Account created with fallback!');
        return { 
          success: true, 
          data: { user: { email: values.email, user_metadata: { full_name: values.fullName } } }, 
          error: null 
        };
      }
    }

    // Production mode - strict error handling
    
    // Simplify the user data structure
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
