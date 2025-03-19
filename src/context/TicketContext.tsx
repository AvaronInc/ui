
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Ticket, 
  TicketFilter, 
  TicketStatus, 
  TicketStatistics,
  AITicketSuggestion,
  TicketPriority
} from '@/types/tickets';
import { useToast } from '@/hooks/use-toast';
import * as ticketService from '@/services/ticketService';

// Sample technicians (in a real app, this would come from a database)
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
  isLoading: boolean;
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
  refreshTickets: () => Promise<void>;
}

const TicketContext = createContext<TicketContextProps | undefined>(undefined);

export const TicketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [detailPanelOpen, setDetailPanelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [ticketStatistics, setTicketStatistics] = useState<TicketStatistics>({
    openTickets: 0,
    resolvedToday: 0,
    aiResolved: 0,
    awaitingAction: 0,
    avgResolutionTime: '0h',
    escalationRate: 0,
    escalationTrend: 'stable'
  });
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
  
  // Fetch tickets from the database
  const fetchTicketsData = async () => {
    setIsLoading(true);
    try {
      const ticketsData = await ticketService.fetchTickets();
      setTickets(ticketsData);
      
      // Calculate statistics
      const stats = await ticketService.calculateTicketStatistics();
      if (stats) {
        setTicketStatistics(stats);
      }
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
      toast({
        title: "Error",
        description: "Failed to load tickets. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Initial data fetch
  useEffect(() => {
    fetchTicketsData();
  }, []);
  
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
  
  const handleStatusChange = async (ticketId: string, status: TicketStatus) => {
    try {
      const success = await ticketService.updateTicketStatus(ticketId, status);
      if (success) {
        // Update local state
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
      } else {
        throw new Error("Failed to update ticket status");
      }
    } catch (error) {
      console.error('Error updating ticket status:', error);
      toast({
        title: "Error",
        description: "Failed to update ticket status. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const handlePriorityChange = async (ticketId: string, priority: string) => {
    try {
      const success = await ticketService.updateTicketPriority(ticketId, priority as TicketPriority);
      if (success) {
        // Update local state
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
      } else {
        throw new Error("Failed to update ticket priority");
      }
    } catch (error) {
      console.error('Error updating ticket priority:', error);
      toast({
        title: "Error",
        description: "Failed to update ticket priority. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const handleAssignTicket = async (ticketId: string, technicianName: string) => {
    try {
      const success = await ticketService.assignTicket(ticketId, technicianName);
      if (success) {
        // Update local state
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
      } else {
        throw new Error("Failed to assign ticket");
      }
    } catch (error) {
      console.error('Error assigning ticket:', error);
      toast({
        title: "Error",
        description: "Failed to assign ticket. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const handleAddNote = async (ticketId: string, content: string, isInternal: boolean) => {
    try {
      const newNote = await ticketService.addTicketNote({
        ticketId,
        content,
        author: 'Current User', // This would be the logged-in user in a real app
        isInternal
      });
      
      if (newNote) {
        // Update local state
        const updatedTickets = tickets.map(ticket => 
          ticket.id === ticketId 
            ? { 
                ...ticket, 
                notes: [...(ticket.notes || []), newNote],
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
          title: "Note added",
          description: `Note added to ticket ${ticketId}`
        });
      } else {
        throw new Error("Failed to add note");
      }
    } catch (error) {
      console.error('Error adding note:', error);
      toast({
        title: "Error",
        description: "Failed to add note. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const handleSubmitTicket = async (data: {
    title: string;
    description: string;
    priority: any;
    department?: string;
    location?: string;
    attachments?: File[];
  }) => {
    try {
      // Process attachments if any
      let attachmentUrls: string[] | undefined;
      if (data.attachments && data.attachments.length > 0) {
        attachmentUrls = [];
        for (const file of data.attachments) {
          // In a real app, you would upload the file to storage and get a URL
          // For now, we'll just create a fake URL
          const fakeUrl = URL.createObjectURL(file);
          attachmentUrls.push(fakeUrl);
        }
      }
      
      const newTicket = await ticketService.createTicket(
        {
          title: data.title,
          description: data.description,
          priority: data.priority,
          department: data.department,
          location: data.location,
          attachments: attachmentUrls
        },
        'Current User' // This would be the logged-in user in a real app
      );
      
      if (newTicket) {
        // Update local state with the new ticket
        setTickets([newTicket, ...tickets]);
        
        toast({
          title: "Ticket created",
          description: `Ticket ${newTicket.id} has been created successfully`
        });
      } else {
        throw new Error("Failed to create ticket");
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
      toast({
        title: "Error",
        description: "Failed to create ticket. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Function to refresh tickets from the database
  const refreshTickets = async () => {
    await fetchTicketsData();
  };

  const value = {
    tickets,
    filteredTickets,
    selectedTicket,
    detailPanelOpen,
    filters,
    ticketStatistics,
    aiSuggestions,
    isLoading,
    setFilters,
    setSelectedTicket,
    setDetailPanelOpen,
    handleTicketSelect,
    handleStatusChange,
    handlePriorityChange,
    handleAssignTicket,
    handleAddNote,
    handleSubmitTicket,
    refreshTickets
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
