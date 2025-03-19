
import { 
  Ticket, 
  TicketFilter, 
  TicketStatus, 
  TicketStatistics,
  AITicketSuggestion,
  TicketPriority
} from '@/types/tickets';

// Sample technicians
export const sampleTechnicians = [
  'Alex Johnson',
  'James Wilson',
  'Robert Davis',
  'Maria Garcia',
  'Sophia Lee'
];

// Sample departments
export const sampleDepartments = [
  'IT',
  'Marketing',
  'Sales',
  'Design',
  'Administration',
  'Finance',
  'HR'
];

// Sample locations
export const sampleLocations = [
  'Headquarters',
  'East Branch',
  'West Branch',
  'Remote',
  'Data Center'
];

// Sample AI suggestions
export const initialAISuggestions: AITicketSuggestion[] = [
  {
    id: 'sugg-1',
    type: 'apply-fix',
    description: 'Similar printer issues were resolved by resetting the print spooler service.',
    relatedTickets: ['TK-1004'],
    suggestedAction: 'Apply this fix to similar tickets'
  },
  {
    id: 'sugg-2',
    type: 'escalate',
    description: 'VPN ticket has been open for more than 4 hours and approaching SLA deadline.',
    relatedTickets: ['TK-1005'],
    suggestedAction: 'Escalate to network team'
  },
  {
    id: 'sugg-3',
    type: 'follow-up',
    description: 'Customer has not responded about their account access in over 24 hours.',
    relatedTickets: ['TK-1007'],
    suggestedAction: 'Send automated follow-up'
  },
  {
    id: 'sugg-4',
    type: 'bulk-resolution',
    description: 'Multiple file server access issues detected from the same department.',
    relatedTickets: ['TK-1001'],
    suggestedAction: 'Create bulk resolution ticket'
  }
];

export interface TicketContextProps {
  tickets: Ticket[];
  filteredTickets: Ticket[];
  selectedTicket: Ticket | null;
  detailPanelOpen: boolean;
  filters: TicketFilter;
  ticketStatistics: TicketStatistics;
  aiSuggestions: AITicketSuggestion[];
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  setFilters: (filters: TicketFilter) => void;
  setSelectedTicket: (ticket: Ticket | null) => void;
  setDetailPanelOpen: (open: boolean) => void;
  handleTicketSelect: (ticket: Ticket) => void;
  handleStatusChange: (ticketId: string, status: TicketStatus) => void;
  handlePriorityChange: (ticketId: string, priority: string) => void;
  handleAssignTicket: (ticketId: string, technicianName: string) => void;
  handleAddNote: (ticketId: string, content: string, isInternal: boolean) => void;
  handleSubmitTicket: (data: {
    title: string;
    description: string;
    priority: any;
    department?: string;
    location?: string;
    attachments?: File[];
  }) => void;
  refreshTickets: (forceMock?: boolean) => Promise<void>;
}

// Re-export types from the main types file to make them available to other modules
export type { 
  Ticket, 
  TicketFilter, 
  TicketStatus, 
  TicketStatistics,
  AITicketSuggestion,
  TicketPriority 
};
