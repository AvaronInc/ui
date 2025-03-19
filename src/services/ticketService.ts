import { supabase } from '@/integrations/supabase/client';
import { Ticket, TicketNote, TicketStatus, TicketPriority, ResolutionMethod, TicketStatistics } from '@/types/tickets';

// Type for creating a new ticket
interface CreateTicketPayload {
  title: string;
  description: string;
  priority: TicketPriority;
  department?: string;
  location?: string;
  attachments?: string[];
}

// Type for creating a new note
interface CreateNotePayload {
  ticketId: string;
  content: string;
  author: string;
  isInternal: boolean;
  isAIGenerated?: boolean;
}

// Fetch all tickets
export const fetchTickets = async (): Promise<Ticket[]> => {
  try {
    console.log('fetchTickets: Starting database query');
    
    // For troubleshooting, let's first try to get the count of tickets
    const countResult = await supabase
      .from('tickets')
      .select('*', { count: 'exact', head: true });
    
    console.log(`fetchTickets: Count check - found ${countResult.count} tickets`);
    
    if (countResult.error) {
      console.error('Error checking ticket count:', countResult.error);
      console.error('Error details:', countResult.error.message, countResult.error.details);
      
      // Generate some mock tickets for development/testing if there's an error
      if (import.meta.env.DEV) {
        console.log('DEV MODE: Generating mock tickets since table access failed');
        return generateMockTickets();
      }
      
      return [];
    }
    
    // Then do the full query with all the data
    const { data, error } = await supabase
      .from('tickets')
      .select(`
        *
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching tickets:', error);
      console.error('Error details:', error.message, error.details);
      
      // Generate some mock tickets for development/testing if there's an error
      if (import.meta.env.DEV) {
        console.log('DEV MODE: Generating mock tickets since fetching failed');
        return generateMockTickets();
      }
      
      // Return empty array instead of throwing to prevent UI from breaking
      return [];
    }

    if (!data || data.length === 0) {
      console.log('fetchTickets: No tickets found in database');
      
      // Generate some mock tickets for development/testing if no tickets exist
      if (import.meta.env.DEV) {
        console.log('DEV MODE: Generating mock tickets since none found');
        return generateMockTickets();
      }
      
      return [];
    }

    console.log(`fetchTickets: Retrieved ${data.length} tickets from database`, data);

    // Fetch notes separately for better performance
    const { data: notesData, error: notesError } = await supabase
      .from('ticket_notes')
      .select('*');
      
    if (notesError) {
      console.error('Error fetching ticket notes:', notesError);
    }
    
    // Group notes by ticket ID for easier mapping
    const notesByTicketId = (notesData || []).reduce((acc, note) => {
      const ticketId = note.ticket_id;
      if (!acc[ticketId]) {
        acc[ticketId] = [];
      }
      acc[ticketId].push({
        id: note.id,
        content: note.content || '',
        author: note.author || 'System',
        timestamp: note.timestamp || note.created_at,
        isInternal: note.is_internal || false,
        isAIGenerated: note.is_ai_generated || false
      });
      return acc;
    }, {});

    // Transform the data to match our frontend types
    const tickets: Ticket[] = data.map(item => ({
      id: item.id || 'unknown-id',
      title: item.title || 'Untitled Ticket',
      description: item.description || '',
      status: item.status || 'open',
      priority: item.priority || 'medium',
      assignedTo: item.assigned_to || null,
      createdBy: item.created_by || null,
      createdAt: item.created_at || new Date().toISOString(),
      updatedAt: item.updated_at || new Date().toISOString(),
      department: item.department || null,
      location: item.location || null,
      resolutionMethod: item.resolution_method || 'pending',
      isAIGenerated: item.is_ai_generated || false,
      slaDeadline: item.sla_deadline || null,
      attachments: item.attachments || [],
      notes: notesByTicketId[item.id] || []
    }));

    console.log('fetchTickets: Processed tickets data', tickets);
    return tickets;
  } catch (error) {
    console.error('Error in fetchTickets:', error);
    
    // Generate some mock tickets for development/testing if there's an exception
    if (import.meta.env.DEV) {
      console.log('DEV MODE: Generating mock tickets due to exception');
      return generateMockTickets();
    }
    
    // Return empty array to prevent UI from breaking
    return [];
  }
};

// Helper function to generate mock tickets for development/testing
const generateMockTickets = (): Ticket[] => {
  console.log('Generating mock tickets for development');
  
  const mockTickets: Ticket[] = [
    {
      id: 'TK-1001',
      title: 'Server Access Issue',
      description: 'Unable to access the file server from remote location.',
      status: 'open',
      priority: 'high',
      assignedTo: 'James Wilson',
      createdBy: 'Maria Garcia',
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      updatedAt: new Date(Date.now() - 1800000).toISOString(),
      department: 'IT',
      location: 'Headquarters',
      resolutionMethod: 'pending',
      notes: [
        {
          id: 'note-1',
          content: 'Checking VPN logs now',
          author: 'James Wilson',
          timestamp: new Date(Date.now() - 2700000).toISOString(),
          isInternal: true
        }
      ]
    },
    {
      id: 'TK-1002',
      title: 'Email Not Working',
      description: 'Cannot send or receive emails since this morning.',
      status: 'in-progress',
      priority: 'medium',
      assignedTo: 'Sophia Lee',
      createdBy: 'Robert Davis',
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      updatedAt: new Date(Date.now() - 3600000).toISOString(),
      department: 'Marketing',
      location: 'East Branch',
      resolutionMethod: 'pending',
      notes: []
    },
    {
      id: 'TK-1003',
      title: 'New Software Installation',
      description: 'Need latest version of Adobe Creative Suite installed.',
      status: 'pending-customer',
      priority: 'low',
      assignedTo: 'Alex Johnson',
      createdBy: 'James Wilson',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      updatedAt: new Date(Date.now() - 43200000).toISOString(),
      department: 'Design',
      location: 'Remote',
      resolutionMethod: 'pending',
      notes: [
        {
          id: 'note-2',
          content: 'License key required, waiting for purchase approval',
          author: 'Alex Johnson',
          timestamp: new Date(Date.now() - 43200000).toISOString(),
          isInternal: false
        }
      ]
    }
  ];
  
  return mockTickets;
};

// Get a single ticket by ID
export const getTicketById = async (ticketId: string): Promise<Ticket | null> => {
  try {
    const { data, error } = await supabase
      .from('tickets')
      .select(`
        *,
        ticket_notes(*)
      `)
      .eq('id', ticketId)
      .single();

    if (error) {
      console.error('Error fetching ticket:', error);
      throw error;
    }

    // Transform the data to match our frontend types
    const ticket: Ticket = {
      id: data.id,
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      assignedTo: data.assigned_to,
      createdBy: data.created_by,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      department: data.department,
      location: data.location,
      resolutionMethod: data.resolution_method,
      isAIGenerated: data.is_ai_generated,
      slaDeadline: data.sla_deadline,
      attachments: data.attachments,
      notes: data.ticket_notes.map(note => ({
        id: note.id,
        content: note.content,
        author: note.author,
        timestamp: note.timestamp,
        isInternal: note.is_internal,
        isAIGenerated: note.is_ai_generated
      }))
    };

    return ticket;
  } catch (error) {
    console.error('Error in getTicketById:', error);
    return null;
  }
};

// Create a new ticket
export const createTicket = async (ticketData: CreateTicketPayload, currentUser: string): Promise<Ticket | null> => {
  try {
    const { data, error } = await supabase
      .from('tickets')
      .insert([
        {
          title: ticketData.title,
          description: ticketData.description,
          priority: ticketData.priority,
          department: ticketData.department,
          location: ticketData.location,
          attachments: ticketData.attachments,
          created_by: currentUser,
          status: 'open',
          resolution_method: 'pending'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating ticket:', error);
      throw error;
    }

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      assignedTo: data.assigned_to,
      createdBy: data.created_by,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      department: data.department,
      location: data.location,
      resolutionMethod: data.resolution_method,
      isAIGenerated: data.is_ai_generated,
      slaDeadline: data.sla_deadline,
      attachments: data.attachments,
      notes: []
    };
  } catch (error) {
    console.error('Error in createTicket:', error);
    return null;
  }
};

// Update ticket status
export const updateTicketStatus = async (ticketId: string, status: TicketStatus): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('tickets')
      .update({
        status,
        resolution_method: 
          status === 'resolved' ? 'manual' :
          status === 'ai-resolved' ? 'ai-resolved' :
          status === 'escalated' ? 'escalated' :
          status === 'pending-customer' ? 'pending' :
          'pending',
        updated_at: new Date().toISOString()
      })
      .eq('id', ticketId);

    if (error) {
      console.error('Error updating ticket status:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error in updateTicketStatus:', error);
    return false;
  }
};

// Update ticket priority
export const updateTicketPriority = async (ticketId: string, priority: TicketPriority): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('tickets')
      .update({
        priority,
        updated_at: new Date().toISOString()
      })
      .eq('id', ticketId);

    if (error) {
      console.error('Error updating ticket priority:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error in updateTicketPriority:', error);
    return false;
  }
};

// Assign ticket to technician
export const assignTicket = async (ticketId: string, technicianName: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('tickets')
      .update({
        assigned_to: technicianName,
        updated_at: new Date().toISOString()
      })
      .eq('id', ticketId);

    if (error) {
      console.error('Error assigning ticket:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error in assignTicket:', error);
    return false;
  }
};

// Add note to ticket
export const addTicketNote = async (noteData: CreateNotePayload): Promise<TicketNote | null> => {
  try {
    const { data, error } = await supabase
      .from('ticket_notes')
      .insert([
        {
          ticket_id: noteData.ticketId,
          content: noteData.content,
          author: noteData.author,
          is_internal: noteData.isInternal,
          is_ai_generated: noteData.isAIGenerated || false
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error adding ticket note:', error);
      throw error;
    }

    // Update the ticket's updated_at timestamp
    await supabase
      .from('tickets')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', noteData.ticketId);

    return {
      id: data.id,
      content: data.content,
      author: data.author,
      timestamp: data.timestamp,
      isInternal: data.is_internal,
      isAIGenerated: data.is_ai_generated
    };
  } catch (error) {
    console.error('Error in addTicketNote:', error);
    return null;
  }
};

// Calculate ticket statistics
export const calculateTicketStatistics = async (): Promise<TicketStatistics> => {
  try {
    console.log('calculateTicketStatistics: Starting database query');
    const { data, error } = await supabase
      .from('tickets')
      .select('*');

    if (error) {
      console.error('Error fetching tickets for statistics:', error);
      // Return default values with the correct type for escalationTrend
      return {
        openTickets: 0,
        resolvedToday: 0,
        aiResolved: 0,
        awaitingAction: 0,
        avgResolutionTime: '0h',
        escalationRate: 0,
        escalationTrend: 'stable' as const
      };
    }

    if (!data || data.length === 0) {
      console.log('calculateTicketStatistics: No tickets found in database');
      return {
        openTickets: 0,
        resolvedToday: 0,
        aiResolved: 0,
        awaitingAction: 0,
        avgResolutionTime: '0h',
        escalationRate: 0,
        escalationTrend: 'stable' as const
      };
    }

    console.log(`calculateTicketStatistics: Retrieved ${data.length} tickets for stats calculation`);
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // Basic statistics
    const openTickets = data.filter(t => t.status === 'open' || t.status === 'in-progress' || t.status === 'escalated').length;
    const resolvedToday = data.filter(t => 
      (t.status === 'resolved' || t.status === 'ai-resolved') && 
      new Date(t.updated_at) >= today
    ).length;
    const aiResolved = data.filter(t => t.status === 'ai-resolved' || t.resolution_method === 'ai-resolved').length;
    const awaitingAction = data.filter(t => t.status === 'pending-customer' || !t.assigned_to).length;
    
    // Calculate escalation rate
    const totalTickets = data.length;
    const escalatedTickets = data.filter(t => t.status === 'escalated' || t.resolution_method === 'escalated').length;
    const escalationRate = totalTickets > 0 ? Math.round((escalatedTickets / totalTickets) * 100) : 0;
    
    // Calculate average resolution time for resolved tickets
    const resolvedTickets = data.filter(t => t.status === 'resolved' || t.status === 'ai-resolved');
    let totalResolutionTimeHours = 0;
    
    resolvedTickets.forEach(ticket => {
      const createdAt = new Date(ticket.created_at);
      const resolvedAt = new Date(ticket.updated_at);
      const resolutionTimeHours = (resolvedAt.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
      totalResolutionTimeHours += resolutionTimeHours;
    });
    
    const avgResolutionTime = resolvedTickets.length > 0
      ? `${Math.round(totalResolutionTimeHours / resolvedTickets.length)}h`
      : '0h';

    // Fixed the escalationTrend to be one of the allowed literal types
    // Using 'as const' to ensure type safety
    const escalationTrend: 'up' | 'down' | 'stable' = 'down' as const;

    return {
      openTickets,
      resolvedToday,
      aiResolved,
      awaitingAction,
      avgResolutionTime,
      escalationRate,
      escalationTrend
    };
  } catch (error) {
    console.error('Error calculating ticket statistics:', error);
    // Return default values with the correct type for escalationTrend
    return {
      openTickets: 0,
      resolvedToday: 0,
      aiResolved: 0,
      awaitingAction: 0,
      avgResolutionTime: '0h',
      escalationRate: 0,
      escalationTrend: 'stable' as const
    };
  }
};
