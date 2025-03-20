
import { toast } from 'sonner';

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
