
import React, { useEffect, useState } from 'react';
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
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  
  useEffect(() => {
    // Set a timeout for loading to prevent waiting indefinitely
    const timeoutId = setTimeout(() => {
      console.log('Loading timeout reached, forcing continuation');
      setLoadingTimeout(true);
    }, 3000); // Reduced to 3 seconds for better UX
    
    return () => clearTimeout(timeoutId);
  }, []);
  
  // Show loading state but with a timeout
  if (isLoading && !loadingTimeout) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <span className="text-muted-foreground">Loading...</span>
      </div>
    );
  }
  
  // For development/testing purposes, always allow access in development mode
  const isDevelopment = import.meta.env.DEV;
  if (isDevelopment) {
    console.log('Development mode: bypassing authentication checks');
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
