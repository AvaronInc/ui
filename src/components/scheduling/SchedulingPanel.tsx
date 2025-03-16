
import React, { useState } from 'react';
import { useScheduling } from '@/hooks/use-scheduling';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Settings, Users, CalendarClock } from 'lucide-react';
import SchedulingOverview from './tabs/SchedulingOverview';
import SchedulingCalendar from './tabs/SchedulingCalendar';
import SchedulingConfig from './tabs/SchedulingConfig';
import LinkManagement from './tabs/LinkManagement';
import { ScheduleEvent } from '@/types/scheduling';
import EventDetailDrawer from './components/EventDetailDrawer';
import NewEventModal from './components/NewEventModal';

const SchedulingPanel: React.FC = () => {
  const schedulingData = useScheduling();
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);
  
  const onEventClick = (event: ScheduleEvent) => {
    schedulingData.setSelectedEvent(event);
  };
  
  const closeEventDetail = () => {
    schedulingData.setSelectedEvent(null);
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-6 pb-2">
        <h1 className="text-2xl font-bold">Scheduling System</h1>
        <p className="text-muted-foreground">
          Manage meetings, maintenance, and IT operations scheduling
        </p>
      </div>
      
      <Tabs defaultValue="overview" className="flex-1 flex flex-col">
        <div className="px-6">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <CalendarClock className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Calendar</span>
            </TabsTrigger>
            <TabsTrigger value="links" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Scheduling Links</span>
            </TabsTrigger>
            <TabsTrigger value="config" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Configuration</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <TabsContent 
            value="overview" 
            className="h-full"
          >
            <SchedulingOverview 
              schedulingData={schedulingData} 
              onNewEvent={() => setIsNewEventModalOpen(true)} 
            />
          </TabsContent>
          
          <TabsContent 
            value="calendar" 
            className="h-full"
          >
            <SchedulingCalendar 
              schedulingData={schedulingData} 
              onEventClick={onEventClick}
              onNewEvent={() => setIsNewEventModalOpen(true)}
            />
          </TabsContent>
          
          <TabsContent 
            value="links" 
            className="h-full"
          >
            <LinkManagement schedulingData={schedulingData} />
          </TabsContent>
          
          <TabsContent 
            value="config" 
            className="h-full"
          >
            <SchedulingConfig schedulingData={schedulingData} />
          </TabsContent>
        </div>
      </Tabs>
      
      {/* Event Detail Drawer */}
      <EventDetailDrawer 
        event={schedulingData.selectedEvent} 
        isOpen={!!schedulingData.selectedEvent} 
        onClose={closeEventDetail}
        onUpdate={schedulingData.updateEvent}
        onDelete={schedulingData.deleteEvent}
        checkConflicts={schedulingData.checkConflicts}
      />
      
      {/* New Event Modal */}
      <NewEventModal 
        isOpen={isNewEventModalOpen}
        onClose={() => setIsNewEventModalOpen(false)}
        onCreate={schedulingData.createEvent}
        checkConflicts={schedulingData.checkConflicts}
        aiSuggestions={schedulingData.getAISuggestions}
      />
    </div>
  );
};

export default SchedulingPanel;
