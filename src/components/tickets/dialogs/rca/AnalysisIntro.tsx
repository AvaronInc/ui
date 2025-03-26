
import React from 'react';
import { Cpu, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const AnalysisIntro: React.FC = () => {
  return (
    <div className="space-y-4 py-4">
      <div className="flex items-start space-x-4">
        <Cpu className="h-8 w-8 text-primary mt-1" />
        <div>
          <h4 className="font-medium">AI-Powered Root Cause Analysis</h4>
          <p className="text-sm text-muted-foreground mt-1">
            This process will analyze system logs, network traffic, and infrastructure metrics 
            to identify the most likely cause of the reported issue.
          </p>
        </div>
      </div>
      
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Automated process</AlertTitle>
        <AlertDescription>
          The analysis may take several minutes to complete. You can close this dialog and return 
          to the ticket while the process runs in the background.
        </AlertDescription>
      </Alert>
    </div>
  );
};
