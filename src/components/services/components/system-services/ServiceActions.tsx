
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Square, RotateCcw } from 'lucide-react';
import { ConfirmActionDialog } from "@/components/identity/authenticator/ConfirmActionDialog";
import { SystemService } from '@/types/services';
import { toast } from "sonner";

interface ServiceActionsProps {
  service: SystemService;
  onRefresh: () => void;
}

const ServiceActions: React.FC<ServiceActionsProps> = ({ service, onRefresh }) => {
  const [startDialogOpen, setStartDialogOpen] = useState(false);
  const [stopDialogOpen, setStopDialogOpen] = useState(false);
  const [restartDialogOpen, setRestartDialogOpen] = useState(false);

  // Mock function for service actions (start, stop, restart)
  const handleServiceAction = (action: 'start' | 'stop' | 'restart') => {
    console.log(`${action} service: ${service.id}`);
    
    // In a real application, this would call an API to perform the action
    toast.success(`Service ${action}ed successfully`);
    setTimeout(onRefresh, 500); // Refresh after action completes
  };

  return (
    <div className="flex gap-2">
      {/* Start Button */}
      <Button 
        variant="outline" 
        size="sm" 
        disabled={service.status === 'running'}
        className="flex items-center gap-1"
        onClick={() => setStartDialogOpen(true)}
      >
        <Play className="h-4 w-4" />
        <span>Start</span>
      </Button>
      
      {/* Stop Button */}
      <Button 
        variant="outline" 
        size="sm" 
        disabled={service.status !== 'running'}
        className="flex items-center gap-1"
        onClick={() => setStopDialogOpen(true)}
      >
        <Square className="h-4 w-4" />
        <span>Stop</span>
      </Button>
      
      {/* Restart Button */}
      <Button 
        variant="outline" 
        size="sm" 
        disabled={service.status !== 'running'}
        className="flex items-center gap-1"
        onClick={() => setRestartDialogOpen(true)}
      >
        <RotateCcw className="h-4 w-4" />
        <span>Restart</span>
      </Button>
      
      {/* Start Confirmation Dialog */}
      <ConfirmActionDialog
        open={startDialogOpen}
        onOpenChange={setStartDialogOpen}
        onConfirm={() => handleServiceAction('start')}
        title="Start Service"
        description={`Are you sure you want to start the ${service.name} service?`}
        confirmText="Start"
      />
      
      {/* Stop Confirmation Dialog */}
      <ConfirmActionDialog
        open={stopDialogOpen}
        onOpenChange={setStopDialogOpen}
        onConfirm={() => handleServiceAction('stop')}
        title="Stop Service"
        description={`Are you sure you want to stop the ${service.name} service? This may disrupt dependent services.`}
        confirmText="Stop"
        variant="destructive"
      />
      
      {/* Restart Confirmation Dialog */}
      <ConfirmActionDialog
        open={restartDialogOpen}
        onOpenChange={setRestartDialogOpen}
        onConfirm={() => handleServiceAction('restart')}
        title="Restart Service"
        description={`Are you sure you want to restart the ${service.name} service? This will cause a brief disruption of service.`}
        confirmText="Restart"
      />
    </div>
  );
};

export default ServiceActions;
