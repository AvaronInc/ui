
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Activity, RefreshCw } from 'lucide-react';

interface TopologyActionsProps {
  onGenerateReport: () => void;
}

const TopologyActions = ({ onGenerateReport }: TopologyActionsProps) => {
  const handleNetworkHealthCheck = () => {
    console.log('Running network health check');
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={handleNetworkHealthCheck}>
        <Activity className="mr-2 h-4 w-4" />
        Network Health Check
      </Button>
      <Button variant="outline" onClick={onGenerateReport}>
        <FileText className="mr-2 h-4 w-4" />
        Generate Report
      </Button>
      <Button variant="outline">
        <RefreshCw className="mr-2 h-4 w-4" />
        Refresh Devices
      </Button>
    </div>
  );
};

export default TopologyActions;
