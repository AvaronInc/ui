
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { toast } from 'sonner';
import SignupFormFields from './components/SignupFormFields';
import { signupSchema, SignupFormValues } from './validation/signupSchema';
import { createUser, handleSignupError } from './services/signupService';
import { useNavigate } from 'react-router-dom';

interface SignupFormProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  onSuccess: () => void;
}

const SignupForm = ({ isLoading, setIsLoading, onSuccess }: SignupFormProps) => {
  const navigate = useNavigate();
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
    },
  });

  const handleSignup = async (values: SignupFormValues) => {
    setIsLoading(true);
    try {
      const { success, error } = await createUser(values);
      
      if (success) {
        toast.success('Account created successfully. Please check your email to confirm your account.');
        form.reset();
        onSuccess();
        
        // In development mode, explicitly navigate after simulated signup
        if (import.meta.env.DEV) {
          setTimeout(() => {
            navigate('/');
          }, 500);
        }
      } else if (error) {
        throw error;
      }
    } catch (error: any) {
      handleSignupError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-4">
        <SignupFormFields form={form} isLoading={isLoading} />
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
        
        {import.meta.env.DEV && (
          <p className="text-xs text-muted-foreground mt-2">
            Dev mode: Signup will use a local fallback if Supabase has network errors.
          </p>
        )}
      </form>
    </Form>
  );
};

export default SignupForm;
