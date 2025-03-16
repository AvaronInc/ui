
import React from 'react';
import { ScheduleEvent } from '@/types/scheduling';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  getDay, 
  isSameMonth, 
  isToday, 
  isSameDay,
  isWithinInterval
} from 'date-fns';

interface MonthViewProps {
  date: Date;
  events: ScheduleEvent[];
  onEventClick: (event: ScheduleEvent) => void;
}

const MonthView: React.FC<MonthViewProps> = ({ date, events, onEventClick }) => {
  // Calculate the days to display in the month view
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Calculate how many blank days we need at the start
  const startDay = getDay(monthStart);
  
  // Create an array representing all the days in the calendar view (including padding)
  const calendarDays = [];
  
  // Add padding at the start
  for (let i = 0; i < startDay; i++) {
    calendarDays.push(null);
  }
  
  // Add all the days in the month
  calendarDays.push(...daysInMonth);
  
  // Check if an event is on a specific day
  const getEventsForDay = (day: Date | null) => {
    if (!day) return [];
    
    return events.filter(event => {
      // Handle all-day events
      if (event.allDay) {
        return isSameDay(event.startTime, day);
      }
      
      // Handle normal events
      const dayStart = new Date(day);
      dayStart.setHours(0, 0, 0, 0);
      
      const dayEnd = new Date(day);
      dayEnd.setHours(23, 59, 59, 999);
      
      return isWithinInterval(event.startTime, { start: dayStart, end: dayEnd }) ||
             isWithinInterval(event.endTime, { start: dayStart, end: dayEnd }) ||
             (event.startTime <= dayStart && event.endTime >= dayEnd);
    });
  };
  
  // Determine the background color for a cell
  const getCellClass = (day: Date | null) => {
    if (!day) return "bg-muted/20";
    if (isToday(day)) return "bg-accent";
    if (!isSameMonth(day, date)) return "bg-muted/30 text-muted-foreground";
    return "";
  };
  
  // Get color for event based on category
  const getEventColor = (event: ScheduleEvent) => {
    switch (event.category) {
      case 'it-maintenance':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'software-update':
        return 'bg-green-500 hover:bg-green-600';
      case 'meeting':
        return 'bg-purple-500 hover:bg-purple-600';
      case 'project':
        return 'bg-amber-500 hover:bg-amber-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };
  
  return (
    <div className="h-full overflow-auto">
      <div className="grid grid-cols-7 gap-px bg-muted">
        {/* Day names header */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
          <div key={i} className="p-2 text-center font-medium bg-background">
            {day}
          </div>
        ))}
        
        {/* Calendar cells */}
        {calendarDays.map((day, i) => {
          const dayEvents = getEventsForDay(day);
          
          return (
            <div 
              key={i} 
              className={`min-h-[100px] p-1 bg-background relative ${getCellClass(day)}`}
            >
              {day && (
                <>
                  <div className={`text-right p-1 font-medium text-sm ${isToday(day) ? 'text-primary' : ''}`}>
                    {format(day, 'd')}
                  </div>
                  
                  <div className="space-y-1 max-h-[80px] overflow-y-auto">
                    {dayEvents.slice(0, 3).map((event) => (
                      <div 
                        key={event.id}
                        onClick={() => onEventClick(event)}
                        className={`px-1 py-0.5 rounded text-xs truncate cursor-pointer text-white ${getEventColor(event)}`}
                      >
                        {event.allDay ? (
                          <span>All day: {event.title}</span>
                        ) : (
                          <span>{format(event.startTime, 'h:mm a')} {event.title}</span>
                        )}
                      </div>
                    ))}
                    
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-center text-muted-foreground">
                        +{dayEvents.length - 3} more
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthView;
