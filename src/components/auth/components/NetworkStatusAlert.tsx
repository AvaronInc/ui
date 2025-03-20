
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface NetworkStatusAlertProps {
  isOnline: boolean;
}

const NetworkStatusAlert: React.FC<NetworkStatusAlertProps> = ({ isOnline }) => {
  if (isOnline) return null;
  
  return (
    <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-800 text-sm flex items-start">
      <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
      <span>
        You are currently offline. 
        {import.meta.env.DEV ? 'Development mode will simulate signup.' : 'Please check your internet connection.'}
      </span>
    </div>
  );
};

export default NetworkStatusAlert;
