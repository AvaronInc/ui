
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, Loader2 } from 'lucide-react';

interface LoadingStateProps {
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

const LoadingState: React.FC<LoadingStateProps> = ({ isLoading, error, onRetry }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-6 min-h-[300px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p>Loading settings...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-6 min-h-[200px]">
        <div className="text-center">
          <AlertCircle className="h-10 w-10 text-destructive mx-auto mb-3" />
          <p className="text-destructive mb-4 font-medium">{error}</p>
          <Button 
            onClick={onRetry} 
            variant="outline"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }
  
  return null;
};

export default LoadingState;
