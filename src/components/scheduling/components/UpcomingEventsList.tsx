
import React from 'react';
import { ScheduleEvent } from '@/types/scheduling';
import { format, isToday, isTomorrow, isThisWeek } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, Users, MapPin, Clock } from 'lucide-react';

interface UpcomingEventsListProps {
  events: ScheduleEvent[];
}

const UpcomingEventsList: React.FC<UpcomingEventsListProps> = ({ events }) => {
  // Group events by day
  const groupedEvents = events.reduce((acc, event) => {
    const dateKey = format(event.startTime, 'yyyy-MM-dd');
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {} as Record<string, ScheduleEvent[]>);
  
  // Sort dates
  const sortedDates = Object.keys(groupedEvents).sort();
  
  // Format date heading
  const formatDateHeading = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    if (isThisWeek(date)) return format(date, 'EEEE');
    return format(date, 'MMMM d, yyyy');
  };
  
  // Get event category color
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'it-maintenance': return 'bg-blue-500';
      case 'software-update': return 'bg-green-500';
      case 'meeting': return 'bg-purple-500';
      case 'project': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };
  
  // Get priority badge variant
  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'critical': return 'destructive';
      case 'high': return 'secondary';
      case 'medium': return 'outline';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };
  
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Clock className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No upcoming events</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Your schedule is clear for the next 7 days
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {sortedDates.map((dateKey, index) => (
        <div key={dateKey}>
          {index > 0 && <Separator className="my-6" />}
          
          <div className="mb-4">
            <h3 className="font-medium text-lg">{formatDateHeading(dateKey)}</h3>
            <p className="text-sm text-muted-foreground">
              {format(new Date(dateKey), 'MMMM d, yyyy')}
            </p>
          </div>
          
          <div className="space-y-3">
            {groupedEvents[dateKey].map(event => (
              <div 
                key={event.id} 
                className="border rounded-md p-3 hover:bg-accent transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${getCategoryColor(event.category)}`} />
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        <span>
                          {event.allDay 
                            ? 'All day' 
                            : `${format(event.startTime, 'h:mm a')} - ${format(event.endTime, 'h:mm a')}`}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Badge variant={getPriorityBadge(event.priority)}>
                    {event.priority}
                  </Badge>
                </div>
                
                {(event.location || event.attendees.length > 0 || event.priority === 'critical' || event.priority === 'high') && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3 text-sm">
                    {event.location && (
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        <span>{event.location}</span>
                      </div>
                    )}
                    
                    {event.attendees.length > 0 && (
                      <div className="flex items-center text-muted-foreground">
                        <Users className="h-3.5 w-3.5 mr-1" />
                        <span>
                          {event.attendees.length > 2 
                            ? `${event.attendees[0]} +${event.attendees.length - 1} more` 
                            : event.attendees.join(', ')}
                        </span>
                      </div>
                    )}
                    
                    {(event.priority === 'critical' || event.priority === 'high') && (
                      <div className="flex items-center text-amber-600 dark:text-amber-400 col-span-full">
                        <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                        {event.priority === 'critical' 
                          ? 'Requires immediate attention'
                          : 'High priority event'}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingEventsList;
