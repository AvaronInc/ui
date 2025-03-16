
import { useState, useEffect } from 'react';
import { 
  ScheduleEvent, 
  SchedulingLink, 
  SchedulingSettings, 
  SchedulingStats, 
  CalendarView 
} from '@/types/scheduling';
import { 
  mockScheduleEvents, 
  mockSchedulingLinks, 
  mockSchedulingSettings, 
  mockSchedulingStats,
  generateMonthEvents 
} from '@/data/scheduling/mockData';
import { startOfDay, endOfDay, isWithinInterval, addDays } from 'date-fns';
import { toast } from 'sonner';

export const useScheduling = () => {
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [links, setLinks] = useState<SchedulingLink[]>([]);
  const [settings, setSettings] = useState<SchedulingSettings>(mockSchedulingSettings);
  const [stats, setStats] = useState<SchedulingStats>(mockSchedulingStats);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [calendarView, setCalendarView] = useState<CalendarView>('week');
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);
  
  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        // In a real application, you would fetch this data from an API
        setEvents(generateMonthEvents());
        setLinks(mockSchedulingLinks);
        setSettings(mockSchedulingSettings);
        setStats(mockSchedulingStats);
      } catch (error) {
        console.error('Error loading scheduling data:', error);
        toast.error('Failed to load scheduling data');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  // Filter events for the selected view
  const getFilteredEvents = (date: Date, view: CalendarView): ScheduleEvent[] => {
    let startDate: Date;
    let endDate: Date;
    
    switch (view) {
      case 'day':
        startDate = startOfDay(date);
        endDate = endOfDay(date);
        break;
      case 'week':
        // Get the start of the week (Sunday)
        const dayOfWeek = date.getDay();
        startDate = startOfDay(addDays(date, -dayOfWeek));
        endDate = endOfDay(addDays(startDate, 6));
        break;
      case 'month':
        // Get the start and end of the month
        startDate = startOfDay(new Date(date.getFullYear(), date.getMonth(), 1));
        endDate = endOfDay(new Date(date.getFullYear(), date.getMonth() + 1, 0));
        break;
      default:
        startDate = startOfDay(date);
        endDate = endOfDay(date);
    }
    
    return events.filter(event => 
      event.allDay || 
      isWithinInterval(event.startTime, { start: startDate, end: endDate }) ||
      isWithinInterval(event.endTime, { start: startDate, end: endDate })
    );
  };
  
  // Get events for current view
  const currentViewEvents = getFilteredEvents(selectedDate, calendarView);
  
  // Create a new event
  const createEvent = (newEvent: Omit<ScheduleEvent, 'id' | 'createdAt' | 'updatedAt'>) => {
    const event: ScheduleEvent = {
      ...newEvent,
      id: `event-${events.length + 1}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setEvents(prev => [...prev, event]);
    toast.success('Event created successfully');
    return event;
  };
  
  // Update an existing event
  const updateEvent = (id: string, updates: Partial<ScheduleEvent>) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === id 
          ? { ...event, ...updates, updatedAt: new Date() } 
          : event
      )
    );
    toast.success('Event updated successfully');
  };
  
  // Delete an event
  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
    toast.success('Event deleted successfully');
  };
  
  // Create a new scheduling link
  const createSchedulingLink = (newLink: Omit<SchedulingLink, 'id' | 'createdAt' | 'updatedAt'>) => {
    const link: SchedulingLink = {
      ...newLink,
      id: `link-${links.length + 1}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setLinks(prev => [...prev, link]);
    toast.success('Scheduling link created successfully');
    return link;
  };
  
  // Update scheduling settings
  const updateSettings = (newSettings: Partial<SchedulingSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    toast.success('Settings updated successfully');
  };
  
  // Check for scheduling conflicts
  const checkConflicts = (startTime: Date, endTime: Date, excludeEventId?: string): ScheduleEvent[] => {
    return events.filter(event => 
      event.id !== excludeEventId &&
      (
        (startTime >= event.startTime && startTime < event.endTime) || // Start during another event
        (endTime > event.startTime && endTime <= event.endTime) || // End during another event
        (startTime <= event.startTime && endTime >= event.endTime) // Encompasses another event
      )
    );
  };
  
  // Get AI suggestions for scheduling
  const getAISuggestions = (duration: number, numberOfOptions = 3): Date[] => {
    // In a real application, this would use AI to analyze patterns and suggest times
    // For this demo, we'll just return some reasonable times
    const suggestions: Date[] = [];
    const now = new Date();
    
    // Start from tomorrow
    const baseDate = addDays(now, 1);
    baseDate.setHours(9, 0, 0, 0); // Start at 9 AM
    
    for (let i = 0; i < numberOfOptions; i++) {
      // Add 2 hours between each suggestion
      const suggestionTime = new Date(baseDate);
      suggestionTime.setHours(baseDate.getHours() + (i * 2));
      
      // Check if this time has conflicts
      const endTime = new Date(suggestionTime);
      endTime.setMinutes(suggestionTime.getMinutes() + duration);
      
      const conflicts = checkConflicts(suggestionTime, endTime);
      
      if (conflicts.length === 0) {
        suggestions.push(suggestionTime);
      } else {
        // If there's a conflict, try later in the day
        const laterTime = new Date(suggestionTime);
        laterTime.setHours(laterTime.getHours() + 3);
        suggestions.push(laterTime);
      }
    }
    
    return suggestions;
  };
  
  return {
    events,
    links,
    settings,
    stats,
    loading,
    selectedDate,
    calendarView,
    selectedEvent,
    currentViewEvents,
    setSelectedDate,
    setCalendarView,
    setSelectedEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    createSchedulingLink,
    updateSettings,
    checkConflicts,
    getAISuggestions
  };
};
