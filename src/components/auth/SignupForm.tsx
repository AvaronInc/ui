
import React from 'react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import SignupFormFields from './components/SignupFormFields';
import SignupErrorAlert from './components/SignupErrorAlert';
import NetworkStatusAlert from './components/NetworkStatusAlert';
import DebugPanel from './components/DebugPanel';
import { useSignupForm } from './hooks/useSignupForm';

interface SignupFormProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  onSuccess: () => void;
}

const SignupForm = ({ isLoading, setIsLoading, onSuccess }: SignupFormProps) => {
  const { 
    form, 
    handleSignup, 
    signupError, 
    networkStatus, 
    formSubmitted 
  } = useSignupForm({ 
    isLoading, 
    setIsLoading, 
    onSuccess 
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-4">
        <SignupErrorAlert errorMessage={signupError} />
        <NetworkStatusAlert isOnline={networkStatus} />
        
        <SignupFormFields form={form} isLoading={isLoading} />
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
        
        <DebugPanel 
          networkStatus={networkStatus}
          isLoading={isLoading}
          errorMessage={signupError}
          formSubmitted={formSubmitted}
        />
      </form>
    </Form>
  );
};

export default SignupForm;
