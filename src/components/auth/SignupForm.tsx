
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
  
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
    },
  });

  // Safety timeout to prevent UI from getting stuck in loading state
  useEffect(() => {
    let timeoutId: number | undefined;
    
    if (isLoading && formSubmitted) {
      timeoutId = window.setTimeout(() => {
        console.log('[SignupForm] Safety timeout triggered to prevent UI freeze');
        setIsLoading(false);
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
      
      // First do a pre-check if the email already exists
      const { existingUser } = await checkExistingUser(values.email);
      if (existingUser) {
        console.log('[SignupForm] Email already exists:', values.email);
        setSignupError('This email is already registered. Please use a different email or try to log in.');
        setIsLoading(false);
        return;
      }
      
      console.log('[SignupForm] Creating account for:', values.email);
      const { success, error, errorDetails } = await createUser(values);
      
      if (success) {
        console.log('[SignupForm] Account created successfully');
        setFormSubmitted(false);
        form.reset();
        toast.success('Account created successfully!');
        
        // Call the onSuccess callback to trigger any parent component actions
        onSuccess();
        
        // Short delay before navigation to ensure toast is visible
        setTimeout(() => {
          if (import.meta.env.DEV) {
            console.log('[SignupForm] Development mode: Redirecting to home');
            navigate('/');
          }
        }, 1000);
      } else if (error) {
        console.error('[SignupForm] Signup error:', error, errorDetails);
        setSignupError(errorDetails || error.message || 'Failed to create account');
      }
    } catch (error: any) {
      console.error('[SignupForm] Exception during signup:', error);
      handleSignupError(error);
      setSignupError(error.errorDetails || error.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
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
                <p className="mt-1">Browser Online: {navigator.onLine ? 'Yes' : 'No'}</p>
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
