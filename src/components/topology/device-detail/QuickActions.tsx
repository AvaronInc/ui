
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Play, Ticket } from 'lucide-react';

interface QuickActionsProps {
  deviceStatus: string;
  onRestartDevice: () => void;
  onRunDiagnostics: () => void;
  onOpenTicket: () => void;
}

const QuickActions = ({ 
  deviceStatus, 
  onRestartDevice, 
  onRunDiagnostics, 
  onOpenTicket 
}: QuickActionsProps) => {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Quick Actions</h4>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRestartDevice}
          disabled={deviceStatus === 'offline'}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Restart
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onRunDiagnostics}
          disabled={deviceStatus === 'offline'}
        >
          <Play className="h-4 w-4 mr-2" />
          Run Diagnostics
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onOpenTicket}
        >
          <Ticket className="h-4 w-4 mr-2" />
          Open Ticket
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;
