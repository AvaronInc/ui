
import React from 'react';
import { ScheduleEvent } from '@/types/scheduling';
import { format, addHours, startOfDay, isSameDay } from 'date-fns';
import { Card } from '@/components/ui/card';

interface DayViewProps {
  date: Date;
  events: ScheduleEvent[];
  onEventClick: (event: ScheduleEvent) => void;
}

const DayView: React.FC<DayViewProps> = ({ date, events, onEventClick }) => {
  // Filter events for this day
  const dayEvents = events.filter(event => isSameDay(event.startTime, date));
  
  // Create array of hour slots (24 hours)
  const hourSlots = Array.from({ length: 24 }, (_, i) => {
    const slotTime = addHours(startOfDay(date), i);
    const slotEvents = dayEvents.filter(event => 
      event.startTime.getHours() <= i && 
      event.endTime.getHours() > i
    );
    
    return {
      time: slotTime,
      events: slotEvents,
    };
  });
  
  // Get events that are all-day events
  const allDayEvents = dayEvents.filter(event => event.allDay);
  
  const getEventColor = (event: ScheduleEvent) => {
    switch (event.category) {
      case 'it-maintenance': return 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800';
      case 'software-update': return 'bg-green-100 text-green-800 border-green-300 dark:bg-green-950 dark:text-green-300 dark:border-green-800';
      case 'meeting': return 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800';
      case 'project': return 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800';
      default: return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
    }
  };
  
  const getPriorityIndicator = (priority: string) => {
    switch (priority) {
      case 'critical': return 'border-l-4 border-red-500';
      case 'high': return 'border-l-4 border-amber-500';
      case 'medium': return 'border-l-4 border-blue-500';
      case 'low': return 'border-l-4 border-green-500';
      default: return '';
    }
  };
  
  return (
    <div className="h-full overflow-auto">
      <div className="min-h-full p-4">
        {/* All-day events */}
        {allDayEvents.length > 0 && (
          <div className="mb-4">
            <h3 className="font-medium text-sm mb-2 text-muted-foreground">
              ALL-DAY EVENTS
            </h3>
            <div className="space-y-2">
              {allDayEvents.map(event => (
                <Card 
                  key={event.id}
                  className={`p-2 cursor-pointer ${getEventColor(event)} ${getPriorityIndicator(event.priority)} border`}
                  onClick={() => onEventClick(event)}
                >
                  <div className="text-sm font-medium">{event.title}</div>
                  <div className="text-xs">All day</div>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {/* Hour slots */}
        <div className="space-y-1">
          {hourSlots.map((slot, index) => (
            <div key={index} className="grid grid-cols-[60px_1fr] gap-2">
              <div className="text-sm text-muted-foreground py-2">
                {format(slot.time, 'h a')}
              </div>
              <div className="min-h-[48px] border-t relative py-1">
                {slot.events.map(event => (
                  <Card 
                    key={event.id}
                    className={`p-2 my-1 cursor-pointer ${getEventColor(event)} ${getPriorityIndicator(event.priority)} border`}
                    onClick={() => onEventClick(event)}
                  >
                    <div className="text-sm font-medium">{event.title}</div>
                    <div className="text-xs">
                      {format(event.startTime, 'h:mm a')} - {format(event.endTime, 'h:mm a')}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DayView;
