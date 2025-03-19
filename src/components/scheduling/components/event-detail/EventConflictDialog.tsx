
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { ScheduleEvent } from '@/types/scheduling';

interface EventConflictDialogProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  conflictingEvents: ScheduleEvent[];
}

const EventConflictDialog: React.FC<EventConflictDialogProps> = ({
  show,
  onClose,
  onConfirm,
  conflictingEvents,
}) => {
  return (
    <AlertDialog open={show} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
            Scheduling Conflict Detected
          </AlertDialogTitle>
          <AlertDialogDescription>
            This event conflicts with {conflictingEvents.length} existing {
              conflictingEvents.length === 1 ? 'event' : 'events'
            }:
            <ul className="mt-2 list-disc pl-5 space-y-1">
              {conflictingEvents.map(e => (
                <li key={e.id}>
                  <span className="font-medium">{e.title}</span>
                  <span className="text-muted-foreground"> ({format(e.startTime, 'h:mm a')} - {format(e.endTime, 'h:mm a')})</span>
                </li>
              ))}
            </ul>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Go Back</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Schedule Anyway</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EventConflictDialog;
