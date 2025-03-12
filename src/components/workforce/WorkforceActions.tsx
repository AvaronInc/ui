
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, WifiOff, RefreshCw } from 'lucide-react';

interface WorkforceActionsProps {
  onGenerateReport: () => void;
  isAdmin: boolean;
}

const WorkforceActions = ({ onGenerateReport, isAdmin }: WorkforceActionsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={onGenerateReport}>
        <FileText className="mr-2 h-4 w-4" />
        Generate Report
      </Button>
      {isAdmin && (
        <Button variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Push Updates
        </Button>
      )}
      {isAdmin && (
        <Button variant="outline">
          <WifiOff className="mr-2 h-4 w-4" />
          Disconnect All VPNs
        </Button>
      )}
    </div>
  );
};

export default WorkforceActions;
