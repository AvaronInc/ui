
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface LoadingStateProps {
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  progress?: number;
}

const LoadingState: React.FC<LoadingStateProps> = ({ isLoading, error, onRetry, progress = 0 }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-6 min-h-[300px]">
        <div className="text-center w-full max-w-md">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="mb-3">Loading settings...</p>
          <Progress value={progress} className="h-2 mb-2" />
          <p className="text-sm text-muted-foreground">
            {progress < 100 ? 'Retrieving your settings...' : 'Almost done...'}
          </p>
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
