
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Wrench, Ticket } from 'lucide-react';
import { toast } from 'sonner';

interface DeviceQuickActionsProps {
  deviceName: string;
  deviceStatus: string;
}

const DeviceQuickActions = ({ deviceName, deviceStatus }: DeviceQuickActionsProps) => {
  const handleRestartDevice = () => {
    toast.info(`Restarting ${deviceName}...`);
    // In a real app, you would trigger an API call here
  };
  
  const handleRunDiagnostics = () => {
    toast.info(`Running diagnostics on ${deviceName}...`);
    // In a real app, you would trigger an API call here
  };
  
  const handleOpenTicket = () => {
    toast.info(`Opening a ticket for ${deviceName}...`);
    // In a real app, you would navigate to the ticket creation page
  };

  return (
    <div className="flex justify-between mt-6 gap-2">
      <Button 
        size="sm" 
        variant="outline" 
        onClick={handleRestartDevice}
        disabled={deviceStatus === 'offline'}
        className="flex-1"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Restart
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        onClick={handleRunDiagnostics} 
        disabled={deviceStatus === 'offline'}
        className="flex-1"
      >
        <Wrench className="w-4 h-4 mr-2" />
        Diagnostics
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        onClick={handleOpenTicket}
        className="flex-1"
      >
        <Ticket className="w-4 h-4 mr-2" />
        New Ticket
      </Button>
    </div>
  );
};

export default DeviceQuickActions;
