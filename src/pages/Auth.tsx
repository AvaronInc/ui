
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
  const [networkStatus, setNetworkStatus] = useState(navigator.onLine);
  
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

  // Check if user is already logged in
  useEffect(() => {
    let didCancel = false;
    let subscriptionObject: { unsubscribe: () => void } | null = null;
    
    const checkSession = async () => {
      try {
        setIsChecking(true);
        setCheckingError(null);
        
        console.log('[Auth Page] Setting up auth listener...');
        
        // Set up auth state listener first - IMPORTANT: Using non-async callback to prevent deadlocks
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, session) => {
            console.log('[Auth Page] Auth state changed:', event);
            if (didCancel) return;
            
            if (session) {
              console.log('[Auth Page] Session detected in auth change');
              // Use setTimeout to defer navigation and avoid deadlocks
              setTimeout(() => {
                if (!didCancel) {
                  console.log('[Auth Page] Navigating to home after auth change');
                  toast.success('Successfully authenticated!');
                  navigate('/');
                }
              }, 0);
            }
          }
        );
        
        // Store the subscription for cleanup
        subscriptionObject = subscription;
        
        // If we're offline in development mode, don't try to check session
        if (import.meta.env.DEV && !networkStatus) {
          console.log('[Auth Page] Offline in development mode, skipping session check');
          if (!didCancel) {
            setIsChecking(false);
          }
          return;
        }
        
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
    
    // Use a shorter timeout for faster user experience
    const timeoutId = setTimeout(() => {
      if (isChecking && !didCancel) {
        console.log('[Auth Page] Session check timeout, allowing login');
        setIsChecking(false);
      }
    }, 1500); // Reduced timeout for better UX
    
    checkSession();
    
    return () => {
      didCancel = true;
      clearTimeout(timeoutId);
      if (subscriptionObject) {
        // Properly unsubscribe from auth events
        subscriptionObject.unsubscribe();
      }
    };
  }, [navigate, networkStatus]);

  if (isChecking) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-secondary/20 p-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-center text-muted-foreground">Checking authentication status...</p>
        
        {!networkStatus && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-800 text-sm max-w-md text-center">
            <AlertTriangle className="h-4 w-4 inline-block mr-2" />
            <span>You appear to be offline. {import.meta.env.DEV ? 'Development mode enabled.' : 'Some features may be limited.'}</span>
          </div>
        )}
        
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
            <p>Online: {networkStatus ? 'Yes' : 'No'}</p>
            <p>Development mode: {import.meta.env.DEV ? 'Yes' : 'No'}</p>
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
        
        {!networkStatus && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 px-4 py-2 rounded-lg text-sm flex items-center max-w-md text-center">
            <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>You are currently offline. {import.meta.env.DEV ? 'Development mode enabled.' : 'Some features may be limited.'}</span>
          </div>
        )}
        
        <AuthCard />
      </div>
    </PageTransition>
  );
};

export default Auth;
