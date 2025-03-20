
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, SignupFormValues } from '../validation/signupSchema';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { createUser, handleSignupError } from '../services/signupService';
import { useNetworkStatus } from './useNetworkStatus';
import { useSignupSafetyTimeout } from './useSignupSafetyTimeout';

interface UseSignupFormProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  onSuccess: () => void;
}

export const useSignupForm = ({ isLoading, setIsLoading, onSuccess }: UseSignupFormProps) => {
  const navigate = useNavigate();
  const [signupError, setSignupError] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const networkStatus = useNetworkStatus();
  
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
    },
  });

  // Safety timeout hook
  useSignupSafetyTimeout(isLoading, formSubmitted, setIsLoading, setFormSubmitted);

  const handleSignup = async (values: SignupFormValues) => {
    try {
      setFormSubmitted(true);
      setIsLoading(true);
      setSignupError(null);
      
      console.log('[SignupForm] Starting signup process for:', values.email);
      
      // In development mode with network offline, use mock workflow
      if (import.meta.env.DEV && !networkStatus) {
        console.log('[SignupForm] Network offline - activating mock mode');
        toast.info('You are offline. Using development mode for signup.');
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log('[SignupForm] Development mode: Simulating successful signup');
        setFormSubmitted(false);
        form.reset();
        toast.success('Development mode: Account created successfully!');
        onSuccess();
        
        // Defer navigation with setTimeout to prevent potential deadlocks
        setTimeout(() => {
          navigate('/');
        }, 10); // very short timeout to avoid UI flicker
        
        setIsLoading(false);
        return;
      }
      
      // Skip user existence check and create user directly
      console.log('[SignupForm] Creating account for:', values.email);
      
      // Make sure we pass the full values object with all required properties
      const { success, error, errorDetails } = await createUser({
        email: values.email,
        password: values.password,
        fullName: values.fullName
      });
      
      if (success) {
        console.log('[SignupForm] Account created successfully');
        setFormSubmitted(false);
        form.reset();
        toast.success('Account created successfully!');
        onSuccess();
        
        setTimeout(() => {
          navigate('/');
        }, 100);
      } else if (error) {
        console.error('[SignupForm] Signup error:', error, errorDetails);
        setSignupError(errorDetails || error.message || 'Failed to create account');
      }
    } catch (error: any) {
      console.error('[SignupForm] Exception during signup:', error);
      const errorMessage = error.message || 'An unexpected error occurred';
      handleSignupError(error);
      setSignupError(error.errorDetails || errorMessage);
    } finally {
      setIsLoading(false);
      setFormSubmitted(false);
    }
  };

  return {
    form,
    handleSignup,
    signupError,
    networkStatus,
    formSubmitted
  };
};
