
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Ticket, 
  TicketFilter, 
  TicketStatus, 
  TicketStatistics,
  AITicketSuggestion
} from '@/types/tickets';
import { useToast } from '@/hooks/use-toast';

// Sample data for tickets
const sampleTickets: Ticket[] = [
  {
    id: 'TK-1001',
    title: 'Cannot access file server',
    description: 'Users in the marketing department are unable to access the shared file server since this morning.',
    status: 'open',
    priority: 'high',
    assignedTo: 'Alex Johnson',
    createdBy: 'Sarah Miller',
    createdAt: '2023-06-15T09:30:00Z',
    updatedAt: '2023-06-15T10:15:00Z',
    department: 'Marketing',
    location: 'Headquarters',
    resolutionMethod: 'pending',
    notes: [
      {
        id: 'note-1',
        content: 'Checked network connectivity, all seems normal.',
        author: 'Alex Johnson',
        timestamp: '2023-06-15T10:15:00Z',
        isInternal: true
      }
    ]
  },
  {
    id: 'TK-1002',
    title: 'Email delivery delayed',
    description: 'External emails are taking over 30 minutes to be delivered. Internal emails work fine.',
    status: 'in-progress',
    priority: 'medium',
    assignedTo: 'James Wilson',
    createdBy: 'David Chen',
    createdAt: '2023-06-14T15:20:00Z',
    updatedAt: '2023-06-15T09:45:00Z',
    department: 'IT',
    slaDeadline: '2023-06-16T15:20:00Z',
    resolutionMethod: 'manual',
    notes: [
      {
        id: 'note-2',
        content: 'Investigating mail server logs for potential issues.',
        author: 'James Wilson',
        timestamp: '2023-06-14T16:30:00Z',
        isInternal: false
      },
      {
        id: 'note-3',
        content: 'Found high volume of spam emails causing delay. Working on filter adjustment.',
        author: 'James Wilson',
        timestamp: '2023-06-15T09:45:00Z',
        isInternal: true
      }
    ]
  },
  {
    id: 'TK-1003',
    title: 'New software installation request',
    description: 'Need Adobe Creative Suite installed on design team computers.',
    status: 'open',
    priority: 'low',
    createdBy: 'Lisa Wang',
    createdAt: '2023-06-15T11:00:00Z',
    updatedAt: '2023-06-15T11:00:00Z',
    department: 'Design',
    location: 'East Branch',
    resolutionMethod: 'pending'
  },
  {
    id: 'TK-1004',
    title: 'Printer not working',
    description: 'The main office printer is showing error code E-723 and not responding to print jobs.',
    status: 'resolved',
    priority: 'medium',
    assignedTo: 'Robert Davis',
    createdBy: 'Emma Thompson',
    createdAt: '2023-06-13T14:10:00Z',
    updatedAt: '2023-06-14T08:30:00Z',
    department: 'Administration',
    resolutionMethod: 'manual',
    notes: [
      {
        id: 'note-4',
        content: 'Checked printer, found paper jam in tray 2.',
        author: 'Robert Davis',
        timestamp: '2023-06-13T15:45:00Z',
        isInternal: false
      },
      {
        id: 'note-5',
        content: 'Cleared paper jam and reset printer. Working now.',
        author: 'Robert Davis',
        timestamp: '2023-06-14T08:30:00Z',
        isInternal: false
      }
    ]
  },
  {
    id: 'TK-1005',
    title: 'VPN connection issues',
    description: 'Remote workers are experiencing intermittent VPN disconnections.',
    status: 'in-progress',
    priority: 'critical',
    assignedTo: 'Alex Johnson',
    createdBy: 'Michael Brown',
    createdAt: '2023-06-15T08:00:00Z',
    updatedAt: '2023-06-15T11:30:00Z',
    department: 'IT',
    location: 'Remote',
    slaDeadline: '2023-06-15T20:00:00Z',
    resolutionMethod: 'manual',
    notes: [
      {
        id: 'note-6',
        content: 'Initial investigation shows possible ISP routing issue.',
        author: 'Alex Johnson',
        timestamp: '2023-06-15T09:20:00Z',
        isInternal: false
      },
      {
        id: 'note-7',
        content: 'Contacted ISP to escalate the issue. They are investigating.',
        author: 'Alex Johnson',
        timestamp: '2023-06-15T11:30:00Z',
        isInternal: true
      }
    ]
  },
  {
    id: 'TK-1006',
    title: 'Database performance degradation',
    description: 'Customer database queries are taking longer than usual to complete.',
    status: 'ai-resolved',
    priority: 'high',
    assignedTo: 'AI Assistant',
    createdBy: 'System Monitor',
    createdAt: '2023-06-15T07:15:00Z',
    updatedAt: '2023-06-15T08:45:00Z',
    department: 'IT',
    location: 'Data Center',
    resolutionMethod: 'ai-resolved',
    isAIGenerated: true,
    notes: [
      {
        id: 'note-8',
        content: 'Automated system detected high CPU usage on database server.',
        author: 'System Monitor',
        timestamp: '2023-06-15T07:15:00Z',
        isInternal: true,
        isAIGenerated: true
      },
      {
        id: 'note-9',
        content: 'AI analyzed query patterns and identified an inefficient query. Applied optimization automatically.',
        author: 'AI Assistant',
        timestamp: '2023-06-15T08:30:00Z',
        isInternal: false,
        isAIGenerated: true
      },
      {
        id: 'note-10',
        content: 'Database performance has returned to normal levels.',
        author: 'AI Assistant',
        timestamp: '2023-06-15T08:45:00Z',
        isInternal: false,
        isAIGenerated: true
      }
    ]
  },
  {
    id: 'TK-1007',
    title: 'Account locked out',
    description: 'User is unable to log in after multiple password attempts.',
    status: 'pending-customer',
    priority: 'medium',
    assignedTo: 'Maria Garcia',
    createdBy: 'John Smith',
    createdAt: '2023-06-14T16:45:00Z',
    updatedAt: '2023-06-15T09:10:00Z',
    department: 'Sales',
    location: 'West Branch',
    resolutionMethod: 'pending',
    notes: [
      {
        id: 'note-11',
        content: 'Reset user password and sent temporary credentials via email.',
        author: 'Maria Garcia',
        timestamp: '2023-06-14T17:20:00Z',
        isInternal: false
      },
      {
        id: 'note-12',
        content: 'Waiting for user to confirm they can access their account.',
        author: 'Maria Garcia',
        timestamp: '2023-06-15T09:10:00Z',
        isInternal: true
      }
    ]
  },
  {
    id: 'TK-1008',
    title: 'Software license expired',
    description: 'Photoshop license has expired for the design team.',
    status: 'escalated',
    priority: 'high',
    assignedTo: 'Sophia Lee',
    createdBy: 'Lisa Wang',
    createdAt: '2023-06-15T10:30:00Z',
    updatedAt: '2023-06-15T11:15:00Z',
    department: 'Design',
    location: 'Headquarters',
    resolutionMethod: 'escalated',
    slaDeadline: '2023-06-15T14:30:00Z',
    notes: [
      {
        id: 'note-13',
        content: 'Checked license portal, we need procurement approval for renewal.',
        author: 'Sophia Lee',
        timestamp: '2023-06-15T11:00:00Z',
        isInternal: true
      },
      {
        id: 'note-14',
        content: 'Escalating to management for immediate approval due to urgent design deadlines.',
        author: 'Sophia Lee',
        timestamp: '2023-06-15T11:15:00Z',
        isInternal: true
      }
    ]
  }
];

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

// Sample ticket statistics
const initialTicketStatistics: TicketStatistics = {
  openTickets: 0,
  resolvedToday: 0,
  aiResolved: 0,
  awaitingAction: 0,
  avgResolutionTime: '0h',
  escalationRate: 0,
  escalationTrend: 'stable'
};

// Sample AI suggestions
const initialAISuggestions: AITicketSuggestion[] = [
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

interface TicketContextProps {
  tickets: Ticket[];
  filteredTickets: Ticket[];
  selectedTicket: Ticket | null;
  detailPanelOpen: boolean;
  filters: TicketFilter;
  ticketStatistics: TicketStatistics;
  aiSuggestions: AITicketSuggestion[];
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
}

const TicketContext = createContext<TicketContextProps | undefined>(undefined);

export const TicketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [tickets, setTickets] = useState<Ticket[]>(sampleTickets);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [detailPanelOpen, setDetailPanelOpen] = useState(false);
  const [ticketStatistics, setTicketStatistics] = useState<TicketStatistics>(initialTicketStatistics);
  const [aiSuggestions, setAISuggestions] = useState<AITicketSuggestion[]>(initialAISuggestions);
  const [filters, setFilters] = useState<TicketFilter>({
    search: '',
    status: 'all',
    priority: 'all',
    technician: 'all',
    department: 'all',
    location: 'all',
    showAIResolved: false,
    aiGeneratedOnly: false
  });
  
  // Calculate ticket statistics whenever tickets change
  useEffect(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // Basic statistics
    const openTickets = tickets.filter(t => t.status === 'open' || t.status === 'in-progress' || t.status === 'escalated').length;
    const resolvedToday = tickets.filter(t => 
      (t.status === 'resolved' || t.status === 'ai-resolved') && 
      new Date(t.updatedAt) >= today
    ).length;
    const aiResolved = tickets.filter(t => t.status === 'ai-resolved' || t.resolutionMethod === 'ai-resolved').length;
    const awaitingAction = tickets.filter(t => t.status === 'pending-customer' || !t.assignedTo).length;
    
    // Calculate escalation rate
    const totalTickets = tickets.length;
    const escalatedTickets = tickets.filter(t => t.status === 'escalated' || t.resolutionMethod === 'escalated').length;
    const escalationRate = totalTickets > 0 ? Math.round((escalatedTickets / totalTickets) * 100) : 0;
    
    // Calculate average resolution time for resolved tickets
    const resolvedTickets = tickets.filter(t => t.status === 'resolved' || t.status === 'ai-resolved');
    let totalResolutionTimeHours = 0;
    
    resolvedTickets.forEach(ticket => {
      const createdAt = new Date(ticket.createdAt);
      const resolvedAt = new Date(ticket.updatedAt);
      const resolutionTimeHours = (resolvedAt.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
      totalResolutionTimeHours += resolutionTimeHours;
    });
    
    const avgResolutionTime = resolvedTickets.length > 0
      ? `${Math.round(totalResolutionTimeHours / resolvedTickets.length)}h`
      : '0h';
    
    setTicketStatistics({
      openTickets,
      resolvedToday,
      aiResolved,
      awaitingAction,
      avgResolutionTime,
      escalationRate,
      escalationTrend: 'down' // This would typically be calculated by comparing with historical data
    });
  }, [tickets]);
  
  // Filter tickets based on the current filters
  const filteredTickets = tickets.filter(ticket => {
    // Search filter
    const searchMatch = 
      filters.search === '' || 
      ticket.id.toLowerCase().includes(filters.search.toLowerCase()) ||
      ticket.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      ticket.description.toLowerCase().includes(filters.search.toLowerCase());
    
    // Status filter
    const statusMatch = 
      filters.status === 'all' || 
      ticket.status === filters.status;
    
    // Priority filter
    const priorityMatch = 
      filters.priority === 'all' || 
      ticket.priority === filters.priority;
    
    // Technician filter
    const technicianMatch = 
      filters.technician === 'all' || 
      ticket.assignedTo === filters.technician;
    
    // Department filter
    const departmentMatch =
      !filters.department || 
      filters.department === 'all' || 
      ticket.department === filters.department;
    
    // Location filter
    const locationMatch =
      !filters.location || 
      filters.location === 'all' || 
      ticket.location === filters.location;
    
    // AI-resolved filter
    const aiResolvedMatch =
      (filters.showAIResolved || 
       (ticket.status !== 'ai-resolved' && 
        ticket.resolutionMethod !== 'ai-resolved'));
    
    // AI-generated only filter
    const aiGeneratedMatch =
      !filters.aiGeneratedOnly || 
      ticket.isAIGenerated === true;
    
    return searchMatch && 
           statusMatch && 
           priorityMatch && 
           technicianMatch && 
           departmentMatch && 
           locationMatch && 
           aiResolvedMatch && 
           aiGeneratedMatch;
  });
  
  const handleTicketSelect = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setDetailPanelOpen(true);
  };
  
  const handleStatusChange = (ticketId: string, status: TicketStatus) => {
    const updatedTickets = tickets.map(ticket => 
      ticket.id === ticketId 
        ? { 
            ...ticket, 
            status, 
            updatedAt: new Date().toISOString(),
            resolutionMethod: 
              status === 'resolved' ? 'manual' :
              status === 'ai-resolved' ? 'ai-resolved' :
              status === 'escalated' ? 'escalated' :
              status === 'pending-customer' ? 'pending' :
              ticket.resolutionMethod
          } 
        : ticket
    );
    
    setTickets(updatedTickets);
    
    // Update the selected ticket if it's the one being changed
    if (selectedTicket?.id === ticketId) {
      const updatedTicket = updatedTickets.find(t => t.id === ticketId);
      if (updatedTicket) {
        setSelectedTicket(updatedTicket);
      }
    }
    
    toast({
      title: "Status updated",
      description: `Ticket ${ticketId} status changed to ${status.replace('-', ' ')}`
    });
  };
  
  const handlePriorityChange = (ticketId: string, priority: string) => {
    const updatedTickets = tickets.map(ticket => 
      ticket.id === ticketId 
        ? { 
            ...ticket, 
            priority: priority as any, 
            updatedAt: new Date().toISOString() 
          } 
        : ticket
    );
    
    setTickets(updatedTickets);
    
    // Update the selected ticket if it's the one being changed
    if (selectedTicket?.id === ticketId) {
      const updatedTicket = updatedTickets.find(t => t.id === ticketId);
      if (updatedTicket) {
        setSelectedTicket(updatedTicket);
      }
    }
    
    toast({
      title: "Priority updated",
      description: `Ticket ${ticketId} priority changed to ${priority}`
    });
  };
  
  const handleAssignTicket = (ticketId: string, technicianName: string) => {
    const updatedTickets = tickets.map(ticket => 
      ticket.id === ticketId 
        ? { 
            ...ticket, 
            assignedTo: technicianName, 
            updatedAt: new Date().toISOString() 
          } 
        : ticket
    );
    
    setTickets(updatedTickets);
    
    // Update the selected ticket if it's the one being changed
    if (selectedTicket?.id === ticketId) {
      const updatedTicket = updatedTickets.find(t => t.id === ticketId);
      if (updatedTicket) {
        setSelectedTicket(updatedTicket);
      }
    }
    
    toast({
      title: "Ticket assigned",
      description: `Ticket ${ticketId} assigned to ${technicianName}`
    });
  };
  
  const handleAddNote = (ticketId: string, content: string, isInternal: boolean) => {
    const timestamp = new Date().toISOString();
    const newNote = {
      id: `note-${Date.now()}`,
      content,
      author: 'Current User', // This would be the logged-in user in a real app
      timestamp,
      isInternal
    };
    
    const updatedTickets = tickets.map(ticket => 
      ticket.id === ticketId 
        ? { 
            ...ticket, 
            notes: [...(ticket.notes || []), newNote],
            updatedAt: timestamp
          } 
        : ticket
    );
    
    setTickets(updatedTickets);
    
    // Update the selected ticket if it's the one being changed
    if (selectedTicket?.id === ticketId) {
      const updatedTicket = updatedTickets.find(t => t.id === ticketId);
      if (updatedTicket) {
        setSelectedTicket(updatedTicket);
      }
    }
    
    toast({
      title: "Note added",
      description: `Note added to ticket ${ticketId}`
    });
  };
  
  const handleSubmitTicket = (data: {
    title: string;
    description: string;
    priority: any;
    department?: string;
    location?: string;
    attachments?: File[];
  }) => {
    const newTicket: Ticket = {
      id: `TK-${1000 + tickets.length + 1}`,
      title: data.title,
      description: data.description,
      status: 'open',
      priority: data.priority,
      department: data.department,
      location: data.location,
      createdBy: 'Current User', // This would be the logged-in user in a real app
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      resolutionMethod: 'pending',
      attachments: data.attachments ? data.attachments.map(file => URL.createObjectURL(file)) : undefined
    };
    
    setTickets([newTicket, ...tickets]);
    
    toast({
      title: "Ticket created",
      description: `Ticket ${newTicket.id} has been created successfully`
    });
  };

  const value = {
    tickets,
    filteredTickets,
    selectedTicket,
    detailPanelOpen,
    filters,
    ticketStatistics,
    aiSuggestions,
    setFilters,
    setSelectedTicket,
    setDetailPanelOpen,
    handleTicketSelect,
    handleStatusChange,
    handlePriorityChange,
    handleAssignTicket,
    handleAddNote,
    handleSubmitTicket
  };

  return (
    <TicketContext.Provider value={value}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = (): TicketContextProps => {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
};
