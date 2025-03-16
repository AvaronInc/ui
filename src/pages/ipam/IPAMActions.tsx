
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, X, RefreshCw, Download, Bell } from 'lucide-react';
import { toast } from 'sonner';
import { IPAddress } from '@/types/ipam';

interface IPAMActionsProps {
  selectedIP: IPAddress | null;
}

const IPAMActions: React.FC<IPAMActionsProps> = ({ selectedIP }) => {
  const handleAssignIP = () => {
    toast.success("Assign IP dialog would open here");
  };

  const handleReleaseIP = () => {
    if (!selectedIP) {
      toast.error("Please select an IP to release");
      return;
    }
    
    if (selectedIP.status === 'available') {
      toast.error("IP is already available");
      return;
    }
    
    toast.success(`IP ${selectedIP.address} has been released`);
  };

  const handleScanForConflicts = () => {
    toast.success("Network scan initiated");
  };

  const handleExportData = () => {
    toast.success("Preparing network data export");
  };

  const handleSetAlerts = () => {
    toast.success("IP alerts configuration dialog would open here");
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="sm" onClick={handleAssignIP}>
        <Plus className="h-4 w-4 mr-1" />
        Assign IP
      </Button>
      <Button 
        size="sm" 
        variant="outline"
        onClick={handleReleaseIP}
        disabled={!selectedIP || selectedIP.status === 'available'}
      >
        <X className="h-4 w-4 mr-1" />
        Release IP
      </Button>
      <Button size="sm" variant="secondary" onClick={handleScanForConflicts}>
        <RefreshCw className="h-4 w-4 mr-1" />
        Scan Network
      </Button>
      <Button size="sm" variant="outline" onClick={handleExportData}>
        <Download className="h-4 w-4 mr-1" />
        Export
      </Button>
      <Button size="sm" variant="ghost" onClick={handleSetAlerts}>
        <Bell className="h-4 w-4 mr-1" />
        Alerts
      </Button>
    </div>
  );
};

export default IPAMActions;
