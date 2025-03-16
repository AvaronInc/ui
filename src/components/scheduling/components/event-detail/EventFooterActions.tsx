
import React from 'react';
import { SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import EventDeleteDialog from './EventDeleteDialog';
import { ScheduleEvent } from '@/types/scheduling';

interface EventFooterActionsProps {
  event: ScheduleEvent;
  isEditing: boolean;
  onEditToggle: () => void;
  onDelete: () => void;
  onCancelEdit: () => void;
}

const EventFooterActions: React.FC<EventFooterActionsProps> = ({
  event,
  isEditing,
  onEditToggle,
  onDelete,
  onCancelEdit,
}) => {
  return (
    <SheetFooter className="flex-col sm:flex-col gap-2 mt-4">
      <div className="flex space-x-2 w-full">
        <Button 
          onClick={onEditToggle} 
          className="flex-1"
          variant={isEditing ? "default" : "outline"}
        >
          {isEditing ? 'Save Changes' : 'Edit Event'}
        </Button>
        
        <EventDeleteDialog 
          event={event}
          isEditing={isEditing}
          onDelete={onDelete}
        />
      </div>
      
      {isEditing && (
        <Button 
          variant="ghost" 
          onClick={onCancelEdit}
          className="w-full"
        >
          Cancel
        </Button>
      )}
    </SheetFooter>
  );
};

export default EventFooterActions;
