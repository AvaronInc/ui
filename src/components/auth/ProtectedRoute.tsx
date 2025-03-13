
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { user, profile, isLoading, isAdmin } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    // Add a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      console.log('Loading timeout reached, may indicate an authentication issue');
    }, 5000);
    
    return () => clearTimeout(timeoutId);
  }, []);
  
  // Show loading state with a max duration of 5 seconds
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <span className="text-muted-foreground">Loading...</span>
      </div>
    );
  }
  
  // For development/testing purposes, allow access even without authentication
  const isDevelopment = import.meta.env.DEV;
  if (isDevelopment && !user) {
    console.log('Development mode: bypassing authentication');
    return <>{children}</>;
  }
  
  // Check if user is authenticated
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  
  // For admin-only routes, check if user has admin role
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  // Render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
