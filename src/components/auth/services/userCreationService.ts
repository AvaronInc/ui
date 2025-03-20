
import { supabase } from '@/integrations/supabase/client';
import { SignupResult } from './types';
import { toast } from 'sonner';

export async function createUser(values: { email: string; password: string; fullName: string }): Promise<SignupResult> {
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
      
      // Check for already registered error
      if (error.message?.includes('already registered')) {
        return { 
          success: false, 
          data: null, 
          error: new Error('Email already registered'), 
          errorDetails: 'This email is already registered. Please use a different email or try to log in.' 
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
