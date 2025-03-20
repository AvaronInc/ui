import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { toast } from 'sonner';
import SignupFormFields from './components/SignupFormFields';
import { signupSchema, SignupFormValues } from './validation/signupSchema';
import { createUser, handleSignupError, checkExistingUser } from './services/signupService';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

interface SignupFormProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  onSuccess: () => void;
}

const SignupForm = ({ isLoading, setIsLoading, onSuccess }: SignupFormProps) => {
  const navigate = useNavigate();
  const [signupError, setSignupError] = useState<string | null>(null);
  const [debugMode, setDebugMode] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [networkStatus, setNetworkStatus] = useState(navigator.onLine);
  
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
    },
  });

  // Update network status
  useEffect(() => {
    const handleOnline = () => setNetworkStatus(true);
    const handleOffline = () => setNetworkStatus(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Safety timeout to prevent UI from getting stuck in loading state
  useEffect(() => {
    let timeoutId: number | undefined;
    
    if (isLoading && formSubmitted) {
      timeoutId = window.setTimeout(() => {
        console.log('[SignupForm] Safety timeout triggered to prevent UI freeze');
        setIsLoading(false);
        setFormSubmitted(false);
        toast.error('The request is taking longer than expected. Please try again.');
      }, 5000); // 5-second safety timeout
    }
    
    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [isLoading, formSubmitted, setIsLoading]);

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
      
      // In development mode, skip existing user check and create user directly
      if (import.meta.env.DEV) {
        console.log('[SignupForm] Development mode: Creating account without user check');
        
        const { success, error, errorDetails } = await createUser(values);
        
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
        
        setIsLoading(false);
        setFormSubmitted(false);
        return;
      }
      
      // For production, check if user exists first
      console.log('[SignupForm] Checking if email already exists:', values.email);
      const { existingUser, checkError } = await checkExistingUser(values.email);
      
      if (checkError) {
        console.error('[SignupForm] Error checking user existence:', checkError);
        setSignupError('Unable to verify if email already exists. Please try again.');
        setIsLoading(false);
        setFormSubmitted(false);
        return;
      }
      
      if (existingUser) {
        console.log('[SignupForm] Email already exists:', values.email);
        setSignupError('This email is already registered. Please use a different email or try to log in.');
        setIsLoading(false);
        setFormSubmitted(false);
        return;
      }
      
      console.log('[SignupForm] Creating account for:', values.email);
      const { success, error, errorDetails } = await createUser(values);
      
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-4">
        {signupError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm flex items-start">
            <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
            <span>{signupError}</span>
          </div>
        )}
        
        {!networkStatus && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-800 text-sm flex items-start">
            <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
            <span>You are currently offline. {import.meta.env.DEV ? 'Development mode will simulate signup.' : 'Please check your internet connection.'}</span>
          </div>
        )}
        
        <SignupFormFields form={form} isLoading={isLoading} />
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
        
        {import.meta.env.DEV && (
          <div className="mt-2 text-xs">
            <button 
              type="button" 
              onClick={() => setDebugMode(!debugMode)}
              className="text-blue-500 hover:text-blue-700 underline text-xs"
            >
              {debugMode ? 'Hide Debug Info' : 'Show Debug Info'}
            </button>
            
            {debugMode && (
              <div className="mt-2 p-2 border border-gray-200 rounded text-muted-foreground">
                <p>Development mode: Signup will use a local fallback if Supabase has network errors.</p>
                <p className="mt-1">Network Status: {networkStatus ? 'Online' : 'Offline'}</p>
                <p>Form State: {isLoading ? 'Loading' : 'Ready'}</p>
                <p>Error: {signupError || 'None'}</p>
                <p>Form Submitted: {formSubmitted ? 'Yes' : 'No'}</p>
              </div>
            )}
          </div>
        )}
      </form>
    </Form>
  );
};

export default SignupForm;
