
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { ScheduleEvent } from '@/types/scheduling';
import { ConfirmActionDialog } from '@/components/identity/authenticator/ConfirmActionDialog';

interface EventDeleteDialogProps {
  event: ScheduleEvent;
  isEditing: boolean;
  onDelete: () => void;
}

const EventDeleteDialog: React.FC<EventDeleteDialogProps> = ({
  event,
  isEditing,
  onDelete,
}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  return (
    <>
      <Button 
        variant="destructive" 
        disabled={isEditing}
        onClick={() => setIsConfirmOpen(true)}
      >
        <Trash className="h-4 w-4 mr-1" />
        Delete
      </Button>
      
      <ConfirmActionDialog
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        onConfirm={onDelete}
        title="Are you sure?"
        description={`This will permanently delete the event "${event.title}". This action cannot be undone.`}
        confirmText="Delete"
        variant="destructive"
      />
    </>
  );
};

export default EventDeleteDialog;
