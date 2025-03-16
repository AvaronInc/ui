
import React, { useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { ScheduleEvent } from '@/types/scheduling';
import { toast } from 'sonner';

// Import sub-components
import EventHeaderSection from './event-detail/EventHeaderSection';
import EventStatusSection from './event-detail/EventStatusSection';
import EventTimeSection from './event-detail/EventTimeSection';
import EventDetailsSection from './event-detail/EventDetailsSection';
import EventConflictDialog from './event-detail/EventConflictDialog';
import EventFooterActions from './event-detail/EventFooterActions';

interface EventDetailDrawerProps {
  event: ScheduleEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<ScheduleEvent>) => void;
  onDelete: (id: string) => void;
  checkConflicts: (startTime: Date, endTime: Date, excludeEventId?: string) => ScheduleEvent[];
}

const EventDetailDrawer: React.FC<EventDetailDrawerProps> = ({
  event,
  isOpen,
  onClose,
  onUpdate,
  onDelete,
  checkConflicts
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState<Partial<ScheduleEvent>>({});
  const [showConflictWarning, setShowConflictWarning] = useState(false);
  const [conflictingEvents, setConflictingEvents] = useState<ScheduleEvent[]>([]);
  
  // Reset state when the drawer opens/closes or event changes
  React.useEffect(() => {
    if (event) {
      setEditedEvent({});
      setIsEditing(false);
      setShowConflictWarning(false);
    }
  }, [event, isOpen]);
  
  if (!event) return null;
  
  const handleEditToggle = () => {
    if (isEditing) {
      // Apply changes
      const updatedEvent = { ...event, ...editedEvent };
      const conflicts = checkConflicts(
        editedEvent.startTime || event.startTime,
        editedEvent.endTime || event.endTime,
        event.id
      );
      
      if (conflicts.length > 0) {
        setConflictingEvents(conflicts);
        setShowConflictWarning(true);
      } else {
        onUpdate(event.id, editedEvent);
        setIsEditing(false);
        toast.success('Event updated successfully');
      }
    } else {
      // Enter edit mode
      setIsEditing(true);
    }
  };
  
  const handleForceUpdate = () => {
    onUpdate(event.id, editedEvent);
    setIsEditing(false);
    setShowConflictWarning(false);
    toast.success('Event updated with conflicts');
  };
  
  const handleDelete = () => {
    onDelete(event.id);
    onClose();
    toast.success('Event deleted successfully');
  };
  
  const handleFieldChange = (field: keyof ScheduleEvent, value: any) => {
    setEditedEvent(prev => ({ ...prev, [field]: value }));
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedEvent({});
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <EventHeaderSection 
          event={event}
          isEditing={isEditing}
          editedEvent={editedEvent}
          onFieldChange={handleFieldChange}
        />
        
        <div className="space-y-6 py-4">
          {/* Status & Priority */}
          <EventStatusSection event={event} />
          
          {/* Time Information */}
          <EventTimeSection 
            event={event}
            isEditing={isEditing}
            editedEvent={editedEvent}
            onFieldChange={handleFieldChange}
          />
          
          {/* Event Details */}
          <EventDetailsSection 
            event={event}
            isEditing={isEditing}
            editedEvent={editedEvent}
            onFieldChange={handleFieldChange}
          />
        </div>
        
        {/* Conflict Warning */}
        <EventConflictDialog 
          show={showConflictWarning}
          onClose={() => setShowConflictWarning(false)}
          onConfirm={handleForceUpdate}
          conflictingEvents={conflictingEvents}
        />
        
        {/* Footer Actions */}
        <EventFooterActions 
          event={event}
          isEditing={isEditing}
          onEditToggle={handleEditToggle}
          onDelete={handleDelete}
          onCancelEdit={handleCancelEdit}
        />
      </SheetContent>
    </Sheet>
  );
};

export default EventDetailDrawer;
