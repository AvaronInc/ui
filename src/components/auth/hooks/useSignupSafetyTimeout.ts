
import { useEffect } from 'react';
import { toast } from 'sonner';

export const useSignupSafetyTimeout = (
  isLoading: boolean,
  formSubmitted: boolean,
  setIsLoading: (loading: boolean) => void,
  setFormSubmitted: (submitted: boolean) => void
) => {
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
  }, [isLoading, formSubmitted, setIsLoading, setFormSubmitted]);
};
