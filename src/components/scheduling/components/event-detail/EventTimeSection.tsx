
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarClock } from 'lucide-react';
import { format } from 'date-fns';
import { ScheduleEvent } from '@/types/scheduling';

interface EventTimeSectionProps {
  event: ScheduleEvent;
  isEditing: boolean;
  editedEvent: Partial<ScheduleEvent>;
  onFieldChange: (field: keyof ScheduleEvent, value: any) => void;
}

const EventTimeSection: React.FC<EventTimeSectionProps> = ({
  event,
  isEditing,
  editedEvent,
  onFieldChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <CalendarClock className="h-5 w-5 mr-2 text-muted-foreground" />
        {isEditing ? (
          <div className="grid gap-2 w-full">
            <Label>Start Time</Label>
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    {editedEvent.startTime 
                      ? format(editedEvent.startTime, 'PPP') 
                      : format(event.startTime, 'PPP')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={editedEvent.startTime || event.startTime}
                    onSelect={(date) => onFieldChange('startTime', date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              <Input 
                type="time" 
                value={format(editedEvent.startTime || event.startTime, 'HH:mm')}
                onChange={(e) => {
                  const [hours, minutes] = e.target.value.split(':').map(Number);
                  const date = new Date(editedEvent.startTime || event.startTime);
                  date.setHours(hours);
                  date.setMinutes(minutes);
                  onFieldChange('startTime', date);
                }}
                className="w-24"
              />
            </div>
            
            <Label>End Time</Label>
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    {editedEvent.endTime 
                      ? format(editedEvent.endTime, 'PPP') 
                      : format(event.endTime, 'PPP')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={editedEvent.endTime || event.endTime}
                    onSelect={(date) => onFieldChange('endTime', date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              <Input 
                type="time" 
                value={format(editedEvent.endTime || event.endTime, 'HH:mm')}
                onChange={(e) => {
                  const [hours, minutes] = e.target.value.split(':').map(Number);
                  const date = new Date(editedEvent.endTime || event.endTime);
                  date.setHours(hours);
                  date.setMinutes(minutes);
                  onFieldChange('endTime', date);
                }}
                className="w-24"
              />
            </div>
          </div>
        ) : (
          <div>
            <p className="text-sm font-medium">
              {format(event.startTime, 'EEEE, MMMM d, yyyy')}
            </p>
            <p className="text-sm text-muted-foreground">
              {format(event.startTime, 'h:mm a')} - {format(event.endTime, 'h:mm a')}
            </p>
          </div>
        )}
      </div>
      
      {isEditing && (
        <div className="flex items-center space-x-2">
          <Switch 
            checked={editedEvent.allDay ?? event.allDay}
            onCheckedChange={(checked) => onFieldChange('allDay', checked)}
            id="all-day"
          />
          <Label htmlFor="all-day">All day event</Label>
        </div>
      )}
    </div>
  );
};

export default EventTimeSection;
