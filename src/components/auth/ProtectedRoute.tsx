
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { Loader2, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { user, profile, isLoading, authError, isAdmin } = useAuth();
  const location = useLocation();
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  
  useEffect(() => {
    // Display auth errors if they occur
    if (authError) {
      toast.error(`Authentication error: ${authError.message}`, {
        description: "Please try refreshing the page or logging in again",
        duration: 5000,
      });
    }
  }, [authError]);
  
  useEffect(() => {
    // Set a timeout for loading to prevent waiting indefinitely
    const timeoutId = setTimeout(() => {
      console.log('[ProtectedRoute] Loading timeout reached, forcing continuation');
      setLoadingTimeout(true);
    }, 3000); // Reduced to 3 seconds for better UX
    
    return () => clearTimeout(timeoutId);
  }, []);
  
  // Show loading state but with a timeout
  if (isLoading && !loadingTimeout) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <span className="text-muted-foreground">Checking authentication...</span>
        
        {/* Show debug button after 1.5 seconds */}
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
            <p>User authenticated: {user ? 'Yes' : 'No'}</p>
            <p>Profile loaded: {profile ? 'Yes' : 'No'}</p>
            <p>Auth error: {authError ? authError.message : 'None'}</p>
            <p>Loading timeout: {loadingTimeout ? 'Yes' : 'No'}</p>
            <p>Current route: {location.pathname}</p>
            <div className="mt-2 border-t pt-2">
              <p className="font-semibold">Network Status:</p>
              <p>Online: {navigator.onLine ? 'Yes' : 'No'}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  // For development/testing purposes, always allow access in development mode
  const isDevelopment = import.meta.env.DEV;
  if (isDevelopment) {
    console.log('[ProtectedRoute] Development mode: bypassing authentication checks');
    return <>{children}</>;
  }
  
  // If loading timed out and we still don't have a user, redirect to auth
  if (loadingTimeout && !user) {
    console.log('[ProtectedRoute] Loading timed out without authentication, redirecting to login');
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  
  // Check if user is authenticated
  if (!user) {
    console.log('[ProtectedRoute] No user found, redirecting to login');
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  
  // For admin-only routes, check if user has admin role
  if (adminOnly && !isAdmin) {
    toast.error('You do not have permission to access this page');
    return <Navigate to="/" replace />;
  }
  
  // Render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
