
import React, { useState } from 'react';

interface DebugPanelProps {
  networkStatus: boolean;
  isLoading: boolean;
  errorMessage: string | null;
  formSubmitted: boolean;
}

const DebugPanel: React.FC<DebugPanelProps> = ({ 
  networkStatus, 
  isLoading, 
  errorMessage, 
  formSubmitted 
}) => {
  const [debugMode, setDebugMode] = useState(false);
  
  if (!import.meta.env.DEV) return null;
  
  return (
    <div className="mt-2 text-xs">
      <button 
        type="button" 
        onClick={() => setDebugMode(!debugMode)}
        className="text-blue-500 hover:text-blue-700 underline text-xs"
      >
        {debugMode ? 'Hide Debug Info' : 'Show Debug Info'}
      </button>
      
      {debugMode && (
        <div className="mt-2 p-2 border border-gray-200 rounded text-muted-foreground">
          <p>Development mode: Signup will use a local fallback if Supabase has network errors.</p>
          <p className="mt-1">Network Status: {networkStatus ? 'Online' : 'Offline'}</p>
          <p>Form State: {isLoading ? 'Loading' : 'Ready'}</p>
          <p>Error: {errorMessage || 'None'}</p>
          <p>Form Submitted: {formSubmitted ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
};

export default DebugPanel;
