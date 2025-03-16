
import { ScheduleEvent, SchedulingLink, SchedulingSettings, SchedulingStats } from '@/types/scheduling';
import { addDays, addHours, addMinutes, setHours, setMinutes, startOfDay, endOfDay } from 'date-fns';

// Helper function to create dates relative to now
const now = new Date();
const today = startOfDay(now);
const createDate = (days: number, hours: number, minutes = 0) => {
  return setMinutes(setHours(addDays(today, days), hours), minutes);
};

// Mock scheduling links
export const mockSchedulingLinks: SchedulingLink[] = [
  {
    id: '1',
    name: 'IT Support Meetings',
    owner: 'John Smith',
    ownerEmail: 'john.smith@company.com',
    url: 'schedule.company.com/john-smith',
    meetingType: 'one-on-one',
    durationOptions: [15, 30, 60],
    visibility: 'team',
    availableDays: [1, 2, 3, 4, 5], // Monday to Friday
    availableTimeStart: '09:00',
    availableTimeEnd: '17:00',
    bufferTime: 10,
    createdAt: new Date('2023-05-15'),
    updatedAt: new Date('2023-06-20'),
    isActive: true,
    description: 'Book time with IT support for technical issues',
    customDomain: 'meet.company.com/support'
  },
  {
    id: '2',
    name: 'Security Consultation',
    owner: 'Emma Johnson',
    ownerEmail: 'emma.johnson@company.com',
    url: 'schedule.company.com/emma-johnson',
    meetingType: 'one-on-one',
    durationOptions: [30, 60],
    visibility: 'public',
    availableDays: [1, 3, 5], // Monday, Wednesday, Friday
    availableTimeStart: '10:00',
    availableTimeEnd: '16:00',
    bufferTime: 15,
    createdAt: new Date('2023-07-05'),
    updatedAt: new Date('2023-08-12'),
    isActive: true,
    description: 'Schedule a security consultation session'
  },
  {
    id: '3',
    name: 'Project Planning',
    owner: 'Michael Chen',
    ownerEmail: 'michael.chen@company.com',
    url: 'schedule.company.com/michael-chen',
    meetingType: 'group',
    durationOptions: [30, 60, 90],
    visibility: 'team',
    availableDays: [2, 4], // Tuesday, Thursday
    availableTimeStart: '13:00',
    availableTimeEnd: '17:00',
    bufferTime: 5,
    createdAt: new Date('2023-04-10'),
    updatedAt: new Date('2023-08-01'),
    isActive: true,
    description: 'Plan and discuss ongoing and upcoming projects'
  }
];

// Mock scheduled events
export const mockScheduleEvents: ScheduleEvent[] = [
  {
    id: '1',
    title: 'Weekly Server Maintenance',
    description: 'Routine server maintenance and updates',
    startTime: createDate(1, 22, 0), // Tomorrow at 10 PM
    endTime: createDate(1, 23, 0),   // Tomorrow at 11 PM
    allDay: false,
    organizer: 'System Admin',
    attendees: ['IT Team'],
    category: 'it-maintenance',
    type: 'maintenance',
    priority: 'medium',
    status: 'scheduled',
    isRecurring: true,
    recurrencePattern: 'WEEKLY',
    reminderTime: 60,
    notes: 'All systems will be temporarily unavailable',
    createdAt: addDays(now, -7),
    updatedAt: addDays(now, -7)
  },
  {
    id: '2',
    title: 'Security Patch Deployment',
    description: 'Deploying latest security patches across all systems',
    startTime: createDate(2, 9, 0), // Day after tomorrow at 9 AM
    endTime: createDate(2, 11, 0),  // Day after tomorrow at 11 AM
    allDay: false,
    organizer: 'Security Team',
    attendees: ['IT Team', 'Security Team'],
    location: 'Remote',
    category: 'software-update',
    type: 'update',
    priority: 'high',
    status: 'scheduled',
    isRecurring: false,
    createdAt: addDays(now, -3),
    updatedAt: addDays(now, -1)
  },
  {
    id: '3',
    title: 'Project Kickoff: Network Upgrade',
    description: 'Initial meeting for the upcoming network infrastructure upgrade',
    startTime: createDate(0, 14, 0), // Today at 2 PM
    endTime: createDate(0, 15, 30),  // Today at 3:30 PM
    allDay: false,
    organizer: 'Project Manager',
    attendees: ['IT Team', 'Management', 'Vendor Representatives'],
    location: 'Conference Room A',
    category: 'meeting',
    type: 'meeting',
    priority: 'medium',
    status: 'scheduled',
    isRecurring: false,
    reminderTime: 15,
    createdAt: addDays(now, -14),
    updatedAt: addDays(now, -14)
  },
  {
    id: '4',
    title: 'Database Migration',
    description: 'Migrating customer data to new database cluster',
    startTime: createDate(5, 0, 0), // 5 days from now, midnight
    endTime: createDate(5, 4, 0),   // 5 days from now, 4 AM
    allDay: false,
    organizer: 'Database Administrator',
    attendees: ['Database Team', 'IT Support'],
    category: 'it-maintenance',
    type: 'maintenance',
    priority: 'critical',
    status: 'scheduled',
    isRecurring: false,
    notes: 'All database-dependent applications will be in read-only mode',
    createdAt: addDays(now, -10),
    updatedAt: addDays(now, -5)
  },
  {
    id: '5',
    title: 'Quarterly Planning Meeting',
    description: 'Review Q3 results and plan for Q4',
    startTime: createDate(3, 10, 0), // 3 days from now, 10 AM
    endTime: createDate(3, 12, 0),   // 3 days from now, 12 PM
    allDay: false,
    organizer: 'CTO',
    attendees: ['IT Department', 'Executive Team'],
    location: 'Main Conference Room',
    category: 'meeting',
    type: 'meeting',
    priority: 'high',
    status: 'scheduled',
    isRecurring: false,
    reminderTime: 120,
    attachments: ['Q3_Report.pdf', 'Q4_Projections.xlsx'],
    createdAt: addDays(now, -21),
    updatedAt: addDays(now, -21)
  }
];

// Mock settings
export const mockSchedulingSettings: SchedulingSettings = {
  enabled: true,
  defaultMeetingDuration: 30,
  defaultBufferTime: 10,
  customDomain: 'meet.company.com',
  autoDetectAvailability: true,
  autoSendReminders: true,
  reminderTimes: [60, 24 * 60], // 1 hour and 24 hours before
  allowExternalScheduling: true,
  requireApproval: false
};

// Mock stats
export const mockSchedulingStats: SchedulingStats = {
  totalScheduledEvents: 47,
  upcomingMaintenance: 3,
  pendingUpdates: 5,
  conflictingEvents: 2,
  meetingsThisWeek: 12,
  eventsPerCategory: {
    'it-maintenance': 15,
    'software-update': 8,
    'meeting': 20,
    'project': 4
  }
};

// Generate events for the current month
export const generateMonthEvents = (): ScheduleEvent[] => {
  const events: ScheduleEvent[] = [...mockScheduleEvents];
  const eventTypes: ScheduleEventType[] = ['meeting', 'maintenance', 'update', 'project'];
  const categories: ScheduleEventCategory[] = ['it-maintenance', 'software-update', 'meeting', 'project'];
  const priorities: ScheduleEventPriority[] = ['low', 'medium', 'high', 'critical'];
  const statuses: ScheduleEventStatus[] = ['scheduled', 'in-progress', 'completed', 'cancelled'];
  
  // Get start of month and end of month
  const startOfMonth = startOfDay(new Date(now.getFullYear(), now.getMonth(), 1));
  const endOfMonth = endOfDay(new Date(now.getFullYear(), now.getMonth() + 1, 0));
  
  // Add 20 random events throughout the month
  for (let i = 0; i < 20; i++) {
    const startDay = Math.floor(Math.random() * 28) + 1; // Random day 1-28
    const startHour = Math.floor(Math.random() * 10) + 8; // Random hour 8-17
    const duration = [30, 60, 90, 120][Math.floor(Math.random() * 4)]; // Random duration
    
    const startTime = new Date(now.getFullYear(), now.getMonth(), startDay, startHour);
    const endTime = addMinutes(startTime, duration);
    
    // Skip if outside of month
    if (startTime < startOfMonth || endTime > endOfMonth) continue;
    
    const typeIndex = Math.floor(Math.random() * eventTypes.length);
    
    events.push({
      id: `generated-${i}`,
      title: `${eventTypes[typeIndex].charAt(0).toUpperCase() + eventTypes[typeIndex].slice(1)} #${i+1}`,
      description: `Automatically generated ${eventTypes[typeIndex]} event`,
      startTime,
      endTime,
      allDay: Math.random() > 0.9, // 10% chance of all-day event
      organizer: ['System Admin', 'IT Manager', 'Project Lead', 'Security Officer'][Math.floor(Math.random() * 4)],
      attendees: ['IT Team', 'Management'][Math.floor(Math.random() * 2)].split(','),
      category: categories[Math.floor(Math.random() * categories.length)],
      type: eventTypes[typeIndex],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      isRecurring: Math.random() > 0.8, // 20% chance of recurring
      createdAt: addDays(now, -Math.floor(Math.random() * 30)),
      updatedAt: addDays(now, -Math.floor(Math.random() * 10))
    });
  }
  
  return events;
};
