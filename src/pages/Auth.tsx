
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import PageTransition from '@/components/transitions/PageTransition';
import { AuthCard } from '@/components/auth';
import { toast } from 'sonner';

const Auth = () => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);
  
  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      try {
        setIsChecking(true);
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error checking session:', error);
          // Don't redirect on error - let the user try to log in manually
          return;
        }
        
        if (data.session) {
          console.log('User already has a session, redirecting to home');
          navigate('/');
        }
      } catch (error) {
        console.error('Exception in checkSession:', error);
        // Handle any unexpected errors 
      } finally {
        setIsChecking(false);
      }
    };
    
    checkSession();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event);
        if (session) {
          toast.success('Successfully authenticated!');
          navigate('/');
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <PageTransition>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-background to-secondary/20 p-4">
        {isChecking ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Checking authentication...</p>
          </div>
        ) : (
          <AuthCard />
        )}
      </div>
    </PageTransition>
  );
};

export default Auth;
