
import React from 'react';
import { ScheduleEvent } from '@/types/scheduling';
import { format, addDays, startOfDay, setHours, isToday, isSameDay, isBefore, isAfter, getHours, areIntervalsOverlapping } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface WeekViewProps {
  date: Date;
  events: ScheduleEvent[];
  onEventClick: (event: ScheduleEvent) => void;
}

const WeekView: React.FC<WeekViewProps> = ({ date, events, onEventClick }) => {
  // Calculate the start of the week (Sunday)
  const startOfWeek = startOfDay(new Date(date));
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  
  // Create an array of 7 days starting from the start of the week
  const days = Array.from({ length: 7 }, (_, i) => addDays(startOfWeek, i));
  
  // Generate hours from 6 AM to 10 PM
  const hours = Array.from({ length: 17 }, (_, i) => i + 6);
  
  // Helper function to determine if an event is happening at a specific hour on a specific day
  const isEventAtHourOnDay = (event: ScheduleEvent, day: Date, hour: number) => {
    const dayStart = startOfDay(day);
    const hourStart = setHours(dayStart, hour);
    const hourEnd = setHours(dayStart, hour + 1);
    
    return areIntervalsOverlapping(
      { start: hourStart, end: hourEnd },
      { start: event.startTime, end: event.endTime }
    );
  };
  
  // Filter events for a specific day and hour
  const getEventsForHourAndDay = (day: Date, hour: number) => {
    return events.filter(event => isEventAtHourOnDay(event, day, hour));
  };
  
  // Determine the color for an event based on category
  const getEventColor = (event: ScheduleEvent) => {
    switch (event.category) {
      case 'it-maintenance':
        return 'bg-blue-500/80 hover:bg-blue-600/90';
      case 'software-update':
        return 'bg-green-500/80 hover:bg-green-600/90';
      case 'meeting':
        return 'bg-purple-500/80 hover:bg-purple-600/90';
      case 'project':
        return 'bg-amber-500/80 hover:bg-amber-600/90';
      default:
        return 'bg-gray-500/80 hover:bg-gray-600/90';
    }
  };
  
  // Add priority indicator to the event
  const getPriorityIndicator = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'border-l-4 border-red-500';
      case 'high':
        return 'border-l-4 border-orange-500';
      case 'medium':
        return 'border-l-4 border-yellow-500';
      case 'low':
        return 'border-l-4 border-green-500';
      default:
        return '';
    }
  };
  
  // Get the current hour to highlight the current time
  const currentHour = new Date().getHours();
  const currentDay = new Date();
  
  return (
    <div className="flex flex-col h-full">
      {/* Days header */}
      <div className="grid grid-cols-8 border-b">
        <div className="p-2 text-center font-medium text-sm text-muted-foreground">
          Time
        </div>
        {days.map((day, idx) => (
          <div 
            key={idx} 
            className={`p-2 text-center font-medium ${
              isToday(day) ? 'bg-accent text-accent-foreground' : ''
            }`}
          >
            <div className="text-sm">{format(day, 'EEE')}</div>
            <div className={isToday(day) ? 'text-primary' : ''}>
              {format(day, 'd')}
            </div>
          </div>
        ))}
      </div>
      
      {/* Time grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-8 divide-x h-full">
          {/* Time column */}
          <div className="divide-y">
            {hours.map((hour) => (
              <div 
                key={hour} 
                className={`p-2 text-center text-xs text-muted-foreground h-16 ${
                  hour === currentHour ? 'bg-muted/50' : ''
                }`}
              >
                {format(setHours(new Date(), hour), 'h a')}
              </div>
            ))}
          </div>
          
          {/* Days columns */}
          {days.map((day, dayIdx) => (
            <div key={dayIdx} className="divide-y relative">
              {hours.map((hour) => {
                const hourEvents = getEventsForHourAndDay(day, hour);
                const isCurrentHourToday = isToday(day) && hour === currentHour;
                
                return (
                  <div 
                    key={hour} 
                    className={`p-1 h-16 relative ${
                      isCurrentHourToday ? 'bg-muted/50' : ''
                    }`}
                  >
                    {hourEvents.length > 0 ? (
                      <div className="space-y-1 overflow-y-auto max-h-full">
                        {hourEvents.map((event) => {
                          // Show abbreviated info for events
                          const startHour = getHours(event.startTime);
                          const isStartingThisHour = startHour === hour && isSameDay(event.startTime, day);
                          
                          return (
                            <div
                              key={event.id}
                              className={`text-xs rounded px-1 py-0.5 cursor-pointer text-white ${getEventColor(event)} ${getPriorityIndicator(event.priority)}`}
                              onClick={() => onEventClick(event)}
                            >
                              {isStartingThisHour && (
                                <div className="font-medium truncate">
                                  {format(event.startTime, 'h:mm')} {event.title}
                                </div>
                              )}
                              {!isStartingThisHour && (
                                <div className="truncate">
                                  {event.title}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeekView;
