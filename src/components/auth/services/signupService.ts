
import { supabase } from '@/integrations/supabase/client';
import { SignupFormValues } from '../validation/signupSchema';
import { toast } from 'sonner';

export async function checkExistingUser(email: string) {
  const { data: existingUser, error: checkError } = await supabase
    .from('user_profiles')
    .select('id')
    .eq('email', email)
    .maybeSingle();
  
  if (checkError) {
    console.error('Error checking existing user:', checkError);
  }
  
  return { existingUser, checkError };
}

export async function createUser(values: SignupFormValues) {
  console.log('Starting signup process...');
  
  // First check if the user already exists
  const { existingUser } = await checkExistingUser(values.email);
  
  if (existingUser) {
    toast.error('An account with this email already exists');
    return { success: false, data: null, error: 'User already exists' };
  }
  
  // Proceed with signup
  const { data, error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
    options: {
      data: {
        full_name: values.fullName,
        // Explicitly set role to 'user' to avoid type issues
        role: 'user',
      },
    },
  });
  
  if (error) {
    console.error('Signup error:', error);
    return { success: false, data: null, error };
  }
  
  console.log('Signup successful:', data);
  return { success: true, data, error: null };
}

export function handleSignupError(error: any) {
  console.error('Error in handleSignup:', error);
  
  // Provide more user-friendly error messages
  if (error.message?.includes('user_role')) {
    toast.error('There was an issue with your account type. Please try again later.');
  } else if (error.message?.includes('already registered')) {
    toast.error('This email is already registered. Please use a different email or try to log in.');
  } else {
    toast.error(error.message || 'Failed to create account. Please try again later.');
  }
}
