
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Square, RotateCcw } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
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
    // Close all dialogs
    setStartDialogOpen(false);
    setStopDialogOpen(false);
    setRestartDialogOpen(false);
    
    // In a real application, this would call an API to perform the action
    toast.success(`Service ${action}ed successfully`);
    setTimeout(onRefresh, 500); // Refresh after action completes
  };

  return (
    <div className="flex gap-2">
      {/* Start Button Dialog */}
      <AlertDialog open={startDialogOpen} onOpenChange={setStartDialogOpen}>
        <AlertDialogTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            disabled={service.status === 'running'}
            className="flex items-center gap-1"
          >
            <Play className="h-4 w-4" />
            <span>Start</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Start Service</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to start the {service.name} service?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setStartDialogOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleServiceAction('start')}>Start</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Stop Button Dialog */}
      <AlertDialog open={stopDialogOpen} onOpenChange={setStopDialogOpen}>
        <AlertDialogTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            disabled={service.status !== 'running'}
            className="flex items-center gap-1"
          >
            <Square className="h-4 w-4" />
            <span>Stop</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Stop Service</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to stop the {service.name} service? This may disrupt dependent services.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setStopDialogOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => handleServiceAction('stop')}
              className="bg-destructive hover:bg-destructive/90"
            >
              Stop
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Restart Button Dialog */}
      <AlertDialog open={restartDialogOpen} onOpenChange={setRestartDialogOpen}>
        <AlertDialogTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            disabled={service.status !== 'running'}
            className="flex items-center gap-1"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Restart</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Restart Service</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to restart the {service.name} service? This will cause a brief disruption of service.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setRestartDialogOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleServiceAction('restart')}>Restart</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ServiceActions;
