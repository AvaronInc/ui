
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import PageTransition from '@/components/transitions/PageTransition';
import { AuthCard } from '@/components/auth';
import { toast } from 'sonner';
import { Loader2, AlertTriangle } from 'lucide-react';

const Auth = () => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);
  const [checkingError, setCheckingError] = useState<string | null>(null);
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  
  // Check if user is already logged in
  useEffect(() => {
    let didCancel = false;
    let subscriptionObject: { unsubscribe: () => void } | null = null;
    
    const checkSession = async () => {
      try {
        setIsChecking(true);
        setCheckingError(null);
        
        console.log('[Auth Page] Setting up auth listener...');
        
        // Set up auth state listener first
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, session) => {
            console.log('[Auth Page] Auth state changed:', event);
            if (didCancel) return;
            
            if (session) {
              console.log('[Auth Page] Session detected in auth change, navigating to home');
              toast.success('Successfully authenticated!');
              navigate('/');
            }
          }
        );
        
        // Store the subscription for cleanup
        subscriptionObject = subscription;
        
        // Then check for existing session
        console.log('[Auth Page] Checking for existing session...');
        const { data: sessionData, error } = await supabase.auth.getSession();
        
        if (didCancel) return;
        
        if (error) {
          console.error('[Auth Page] Error checking session:', error);
          setCheckingError(error.message);
          // Don't redirect on error - let the user try to log in manually
          return;
        }
        
        if (sessionData.session) {
          console.log('[Auth Page] User already has a session, redirecting to home');
          navigate('/');
        }
      } catch (error: any) {
        console.error('[Auth Page] Exception in checkSession:', error);
        if (!didCancel) {
          setCheckingError(error.message || 'Failed to check authentication status');
        }
      } finally {
        if (!didCancel) {
          setIsChecking(false);
        }
      }
    };
    
    const timeoutId = setTimeout(() => {
      if (isChecking && !didCancel) {
        console.log('[Auth Page] Session check timeout, allowing login');
        setIsChecking(false);
      }
    }, 2500);
    
    checkSession();
    
    return () => {
      didCancel = true;
      clearTimeout(timeoutId);
      if (subscriptionObject) {
        // Properly unsubscribe from auth events
        subscriptionObject.unsubscribe();
      }
    };
  }, [navigate]);

  if (isChecking) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-secondary/20 p-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-center text-muted-foreground">Checking authentication status...</p>
        
        {/* Show debug button after 1 second */}
        {!showDebugInfo && (
          <button 
            onClick={() => setShowDebugInfo(true)}
            className="mt-4 text-xs text-blue-500 hover:text-blue-700 underline"
          >
            Show Debug Info
          </button>
        )}
        
        {showDebugInfo && (
          <div className="mt-6 max-w-md p-4 border rounded bg-slate-50 dark:bg-slate-900 text-xs">
            <h3 className="font-semibold mb-2 flex items-center">
              <AlertTriangle className="h-3 w-3 mr-1 text-amber-500" />
              Debug Information
            </h3>
            <p>Checking session: {isChecking ? 'Yes' : 'No'}</p>
            <p>Error: {checkingError || 'None'}</p>
            <p>Online: {navigator.onLine ? 'Yes' : 'No'}</p>
            <div className="mt-2 border-t pt-2">
              <p className="text-xs text-muted-foreground mt-2">
                If this takes too long, the page will automatically continue to 
                the login form where you can try to authenticate.
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-background to-secondary/20 p-4">
        {checkingError && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-4 py-2 rounded-lg text-sm flex items-center max-w-md text-center">
            <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>Error checking authentication: {checkingError}</span>
          </div>
        )}
        <AuthCard />
      </div>
    </PageTransition>
  );
};

export default Auth;
