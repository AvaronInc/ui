
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface SignupErrorAlertProps {
  errorMessage: string | null;
}

const SignupErrorAlert: React.FC<SignupErrorAlertProps> = ({ errorMessage }) => {
  if (!errorMessage) return null;
  
  return (
    <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm flex items-start">
      <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
      <span>{errorMessage}</span>
    </div>
  );
};

export default SignupErrorAlert;
