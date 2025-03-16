
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Users } from 'lucide-react';
import { format } from 'date-fns';
import { ScheduleEvent, ScheduleEventStatus, ScheduleEventPriority } from '@/types/scheduling';

interface EventDetailsSectionProps {
  event: ScheduleEvent;
  isEditing: boolean;
  editedEvent: Partial<ScheduleEvent>;
  onFieldChange: (field: keyof ScheduleEvent, value: any) => void;
}

const EventDetailsSection: React.FC<EventDetailsSectionProps> = ({
  event,
  isEditing,
  editedEvent,
  onFieldChange,
}) => {
  return (
    <>
      {/* Location */}
      {(event.location || isEditing) && (
        <div className="flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
          {isEditing ? (
            <Input 
              value={editedEvent.location ?? (event.location || '')} 
              onChange={(e) => onFieldChange('location', e.target.value)}
              placeholder="Add location"
              className="flex-1"
            />
          ) : (
            <span>{event.location}</span>
          )}
        </div>
      )}
      
      {/* Attendees */}
      <div className="flex items-start">
        <Users className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-medium">Attendees</p>
          {isEditing ? (
            <Textarea 
              value={(editedEvent.attendees ? editedEvent.attendees.join(', ') : event.attendees.join(', '))} 
              onChange={(e) => onFieldChange('attendees', e.target.value.split(',').map(a => a.trim()))}
              placeholder="Add attendees (comma separated)"
              className="mt-1"
            />
          ) : (
            <ul className="text-sm text-muted-foreground mt-1">
              {event.attendees.map((attendee, idx) => (
                <li key={idx}>{attendee}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
      {/* Status and Priority */}
      {isEditing && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={editedEvent.status ?? event.status}
              onValueChange={(value) => onFieldChange('status', value as ScheduleEventStatus)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Priority</Label>
            <Select
              value={editedEvent.priority ?? event.priority}
              onValueChange={(value) => onFieldChange('priority', value as ScheduleEventPriority)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
      
      {/* Notes */}
      {(event.notes || isEditing) && (
        <div className="space-y-2">
          <Label>Notes</Label>
          {isEditing ? (
            <Textarea 
              value={editedEvent.notes ?? (event.notes || '')} 
              onChange={(e) => onFieldChange('notes', e.target.value)}
              placeholder="Add notes..."
              className="w-full"
            />
          ) : (
            <div className="text-sm text-muted-foreground border rounded-md p-3">
              {event.notes || "No notes added"}
            </div>
          )}
        </div>
      )}
      
      {/* Additional details */}
      <div className="pt-4 border-t">
        <p className="text-sm text-muted-foreground">
          Created {format(event.createdAt, 'MMM d, yyyy')}
          {event.updatedAt > event.createdAt && 
            ` • Updated ${format(event.updatedAt, 'MMM d, yyyy')}`}
        </p>
      </div>
    </>
  );
};

export default EventDetailsSection;
