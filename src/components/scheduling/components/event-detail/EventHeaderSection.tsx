
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { ScheduleEvent } from '@/types/scheduling';

interface EventHeaderSectionProps {
  event: ScheduleEvent;
  isEditing: boolean;
  editedEvent: Partial<ScheduleEvent>;
  onFieldChange: (field: keyof ScheduleEvent, value: any) => void;
}

const EventHeaderSection: React.FC<EventHeaderSectionProps> = ({
  event,
  isEditing,
  editedEvent,
  onFieldChange,
}) => {
  return (
    <SheetHeader className="pb-4">
      <SheetTitle className="text-xl">
        {isEditing ? (
          <Input 
            value={editedEvent.title ?? event.title} 
            onChange={(e) => onFieldChange('title', e.target.value)}
            className="text-lg font-bold"
          />
        ) : (
          event.title
        )}
      </SheetTitle>
      
      <SheetDescription>
        {isEditing ? (
          <Textarea 
            value={editedEvent.description ?? (event.description || '')} 
            onChange={(e) => onFieldChange('description', e.target.value)}
            placeholder="Add a description..."
            className="mt-2"
          />
        ) : (
          event.description ? event.description : "No description provided"
        )}
      </SheetDescription>
    </SheetHeader>
  );
};

export default EventHeaderSection;
