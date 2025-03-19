
import { useMemo } from 'react';
import { Ticket, TicketFilter } from '@/types/tickets';

export const useTicketFilters = (tickets: Ticket[], filters: TicketFilter) => {
  // Filter tickets based on the current filters
  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
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
  }, [tickets, filters]);

  return filteredTickets;
};
