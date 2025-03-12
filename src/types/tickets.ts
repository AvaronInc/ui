
export type TicketStatus = 'open' | 'in-progress' | 'resolved';
export type TicketPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  assignedTo?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  attachments?: string[];
  notes?: TicketNote[];
}

export interface TicketNote {
  id: string;
  content: string;
  author: string;
  timestamp: string;
  isInternal: boolean;
}

export interface TicketFilter {
  search: string;
  status: TicketStatus | 'all';
  priority: TicketPriority | 'all';
  technician: string | 'all';
}
