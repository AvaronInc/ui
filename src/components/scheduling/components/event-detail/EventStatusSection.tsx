
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ScheduleEvent, ScheduleEventCategory } from '@/types/scheduling';

interface EventStatusSectionProps {
  event: ScheduleEvent;
}

const EventStatusSection: React.FC<EventStatusSectionProps> = ({ event }) => {
  const getCategoryLabel = (category: ScheduleEventCategory) => {
    switch(category) {
      case 'it-maintenance': return 'IT Maintenance';
      case 'software-update': return 'Software Update';
      case 'meeting': return 'Meeting';
      case 'project': return 'Project';
      default: return category;
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Badge variant={
          event.status === 'scheduled' ? "outline" :
          event.status === 'in-progress' ? "default" :
          event.status === 'completed' ? "default" : 
          "secondary"
        }>
          {event.status}
        </Badge>
        
        <Badge variant={
          event.priority === 'low' ? "outline" :
          event.priority === 'medium' ? "secondary" :
          event.priority === 'high' ? "warning" : "destructive"
        }>
          {event.priority}
        </Badge>
      </div>
      
      <Badge variant="outline" className="capitalize">
        {getCategoryLabel(event.category)}
      </Badge>
    </div>
  );
};

export default EventStatusSection;
