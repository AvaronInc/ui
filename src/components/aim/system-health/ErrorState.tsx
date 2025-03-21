
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message = "Failed to load health data" }) => {
  return (
    <Alert variant="destructive" className="my-2">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
  );
};

export default ErrorState;
