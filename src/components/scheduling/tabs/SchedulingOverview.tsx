
import React from 'react';
import { useScheduling } from '@/hooks/use-scheduling';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, AlertTriangle, CalendarClock, Link, Users, CheckCircle2, XCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { format, isPast, isToday, addDays } from 'date-fns';
import UpcomingEventsList from '../components/UpcomingEventsList';
import { ScheduleEventCategory } from '@/types/scheduling';
import StatsCards from '../components/StatsCards';

interface SchedulingOverviewProps {
  schedulingData: ReturnType<typeof useScheduling>;
  onNewEvent: () => void;
}

const SchedulingOverview: React.FC<SchedulingOverviewProps> = ({ schedulingData, onNewEvent }) => {
  const { events, stats, links, loading } = schedulingData;
  
  // Get today's events
  const todayEvents = events.filter(event => isToday(event.startTime));
  
  // Get upcoming events (next 7 days)
  const upcomingEvents = events.filter(event => 
    !isPast(event.endTime) && 
    event.startTime <= addDays(new Date(), 7)
  ).sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
  
  // Get maintenance events
  const maintenanceEvents = events.filter(event => 
    event.category === 'it-maintenance' && !isPast(event.startTime)
  );
  
  // Get events needing attention (conflicts or high priority)
  const attentionEvents = events.filter(event => 
    event.priority === 'high' || event.priority === 'critical'
  );
  
  const getCategoryLabel = (category: ScheduleEventCategory) => {
    switch(category) {
      case 'it-maintenance': return 'IT Maintenance';
      case 'software-update': return 'Software Updates';
      case 'meeting': return 'Meetings';
      case 'project': return 'Projects';
      default: return category;
    }
  };
  
  const getCategoryColor = (category: ScheduleEventCategory) => {
    switch(category) {
      case 'it-maintenance': return 'bg-blue-500';
      case 'software-update': return 'bg-green-500';
      case 'meeting': return 'bg-purple-500';
      case 'project': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };
  
  if (loading) {
    return <div className="p-6">Loading scheduling data...</div>;
  }
  
  return (
    <div className="p-6 space-y-6 overflow-auto h-full">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Scheduling Overview</h2>
        <Button onClick={onNewEvent}>
          <Calendar className="mr-2 h-4 w-4" />
          Create New Event
        </Button>
      </div>
      
      {/* Stats Overview */}
      <StatsCards stats={stats} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Clock className="mr-2 h-5 w-5 text-blue-500" />
              Today's Schedule
            </CardTitle>
            <CardDescription>
              {todayEvents.length} events scheduled for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            {todayEvents.length > 0 ? (
              <div className="space-y-3">
                {todayEvents.map(event => (
                  <div key={event.id} className="flex items-center p-2 border rounded-md hover:bg-accent">
                    <div className={`w-3 h-3 rounded-full mr-3 ${getCategoryColor(event.category)}`} />
                    <div className="flex-1">
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(event.startTime, 'h:mm a')} - {format(event.endTime, 'h:mm a')}
                      </p>
                    </div>
                    <Badge variant={event.priority === 'high' || event.priority === 'critical' ? 'destructive' : 'outline'}>
                      {event.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                No events scheduled for today
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => schedulingData.setCalendarView('day')}>
              <CalendarClock className="mr-2 h-4 w-4" />
              View Full Day
            </Button>
          </CardFooter>
        </Card>
        
        {/* Event Distribution */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              Event Type Distribution
            </CardTitle>
            <CardDescription>
              Breakdown of scheduled events by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(stats.eventsPerCategory).map(([category, count]) => (
                <div key={category} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{getCategoryLabel(category as ScheduleEventCategory)}</span>
                    <span className="text-sm text-muted-foreground">{count} events</span>
                  </div>
                  <Progress 
                    value={(count / stats.totalScheduledEvents) * 100} 
                    className="h-2" 
                    indicatorClassName={`${getCategoryColor(category as ScheduleEventCategory)}`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Active Scheduling Links */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Link className="mr-2 h-5 w-5 text-indigo-500" />
              Active Scheduling Links
            </CardTitle>
            <CardDescription>
              {links.filter(link => link.isActive).length} active scheduling links
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {links.filter(link => link.isActive).map(link => (
                <div key={link.id} className="p-3 border rounded-md hover:bg-accent">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{link.name}</h4>
                    <Badge variant="outline">{link.meetingType}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{link.url}</p>
                  <div className="flex items-center text-sm mt-2">
                    <Users className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    <span className="text-muted-foreground">{link.owner}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Link className="mr-2 h-4 w-4" />
              Manage Scheduling Links
            </Button>
          </CardFooter>
        </Card>
        
        {/* Upcoming Maintenance */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
              Upcoming Maintenance
            </CardTitle>
            <CardDescription>
              {maintenanceEvents.length} scheduled maintenance events
            </CardDescription>
          </CardHeader>
          <CardContent>
            {maintenanceEvents.length > 0 ? (
              <div className="space-y-3">
                {maintenanceEvents.slice(0, 3).map(event => (
                  <div key={event.id} className="flex items-center p-2 border rounded-md hover:bg-accent">
                    <div className={`w-3 h-3 rounded-full mr-3 ${getCategoryColor(event.category)}`} />
                    <div className="flex-1">
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(event.startTime, 'MMM dd, h:mm a')}
                      </p>
                    </div>
                    <Badge variant={event.priority === 'critical' ? 'destructive' : 'outline'}>
                      {event.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                No maintenance events scheduled
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Upcoming Events */}
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarClock className="mr-2 h-5 w-5 text-green-500" />
              Upcoming Events
            </CardTitle>
            <CardDescription>
              Next 7 days of scheduled events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UpcomingEventsList events={upcomingEvents} />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => schedulingData.setCalendarView('week')}>
              View Week Calendar
            </Button>
            <Button onClick={onNewEvent}>
              Schedule Event
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Attention Required */}
      {attentionEvents.length > 0 && (
        <Card className="border-amber-200 dark:border-amber-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center text-amber-600 dark:text-amber-400">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Attention Required
            </CardTitle>
            <CardDescription>
              {attentionEvents.length} events need attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {attentionEvents.slice(0, 3).map(event => (
                <div key={event.id} className="flex items-center p-3 border border-amber-200 dark:border-amber-800 rounded-md bg-amber-50 dark:bg-amber-950/30">
                  <div className="flex-1">
                    <div className="flex items-center">
                      {event.priority === 'critical' ? (
                        <XCircle className="h-5 w-5 text-red-500 mr-2" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                      )}
                      <p className="font-medium">{event.title}</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {format(event.startTime, 'MMM dd, h:mm a')}
                    </p>
                  </div>
                  <Badge variant={event.priority === 'critical' ? 'destructive' : 'secondary'}>
                    {event.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Review All Issues
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default SchedulingOverview;
