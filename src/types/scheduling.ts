
export type SchedulingVisibility = 'public' | 'team' | 'private';
export type MeetingType = 'one-on-one' | 'group' | 'webinar';
export type ScheduleEventType = 'meeting' | 'maintenance' | 'update' | 'project';
export type ScheduleEventPriority = 'low' | 'medium' | 'high' | 'critical';
export type ScheduleEventStatus = 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
export type ScheduleEventCategory = 'it-maintenance' | 'software-update' | 'meeting' | 'project';
export type CalendarView = 'day' | 'week' | 'month';

export interface SchedulingLink {
  id: string;
  name: string;
  owner: string;
  ownerEmail: string;
  url: string;
  meetingType: MeetingType;
  durationOptions: number[]; // in minutes
  visibility: SchedulingVisibility;
  availableDays: number[]; // 0-6 (Sunday-Saturday)
  availableTimeStart: string; // HH:MM format
  availableTimeEnd: string; // HH:MM format
  bufferTime: number; // in minutes
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  description?: string;
  customDomain?: string;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  allDay: boolean;
  organizer: string;
  attendees: string[];
  location?: string;
  category: ScheduleEventCategory;
  type: ScheduleEventType;
  priority: ScheduleEventPriority;
  status: ScheduleEventStatus;
  isRecurring: boolean;
  recurrencePattern?: string;
  reminderTime?: number; // minutes before event
  notes?: string;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SchedulingSettings {
  enabled: boolean;
  defaultMeetingDuration: number; // in minutes
  defaultBufferTime: number; // in minutes
  customDomain?: string;
  autoDetectAvailability: boolean;
  autoSendReminders: boolean;
  reminderTimes: number[]; // in minutes
  allowExternalScheduling: boolean;
  requireApproval: boolean;
}

export interface SchedulingStats {
  totalScheduledEvents: number;
  upcomingMaintenance: number;
  pendingUpdates: number;
  conflictingEvents: number;
  meetingsThisWeek: number;
  eventsPerCategory: Record<ScheduleEventCategory, number>;
}
