
export type TicketStatus = 'open' | 'in-progress' | 'pending-customer' | 'ai-resolved' | 'escalated' | 'resolved';
export type TicketPriority = 'low' | 'medium' | 'high' | 'critical';
export type ResolutionMethod = 'manual' | 'ai-resolved' | 'customer-resolved' | 'escalated' | 'pending';

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
  department?: string;
  location?: string;
  resolutionMethod?: ResolutionMethod;
  isAIGenerated?: boolean;
  slaDeadline?: string;
}

export interface TicketNote {
  id: string;
  content: string;
  author: string;
  timestamp: string;
  isInternal: boolean;
  isAIGenerated?: boolean;
}

export interface TicketFilter {
  search: string;
  status: TicketStatus | 'all';
  priority: TicketPriority | 'all';
  technician: string | 'all';
  department?: string | 'all';
  location?: string | 'all';
  showAIResolved: boolean;
  aiGeneratedOnly: boolean;
}

export interface TicketStatistics {
  openTickets: number;
  resolvedToday: number;
  aiResolved: number;
  awaitingAction: number;
  avgResolutionTime: string;
  escalationRate: number;
  escalationTrend: 'up' | 'down' | 'stable';
}

export interface AITicketSuggestion {
  id: string;
  type: 'apply-fix' | 'escalate' | 'follow-up' | 'bulk-resolution';
  description: string;
  relatedTickets?: string[];
  suggestedAction: string;
}
