
import React from 'react';
import { format } from 'date-fns';
import { ScheduleEvent } from '@/types/scheduling';
import { ConfirmActionDialog } from '@/components/identity/authenticator/ConfirmActionDialog';

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
  // Create a custom description with the list of conflicting events
  const description = (
    <>
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
    </>
  );

  return (
    <ConfirmActionDialog
      open={show}
      onOpenChange={onClose}
      onConfirm={onConfirm}
      title="Scheduling Conflict Detected"
      description={description.props.children}
      cancelText="Go Back"
      confirmText="Schedule Anyway"
    />
  );
};

export default EventConflictDialog;
