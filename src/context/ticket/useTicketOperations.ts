
import { useCallback } from 'react';
import { Ticket, TicketStatus, TicketPriority, AITicketSuggestion } from '@/types/tickets';
import { useToast } from '@/hooks/use-toast';
import * as ticketService from '@/services/ticketService';

export const useTicketOperations = (
  tickets: Ticket[],
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>,
  selectedTicket: Ticket | null,
  setSelectedTicket: React.Dispatch<React.SetStateAction<Ticket | null>>,
  aiSuggestions: AITicketSuggestion[]
) => {
  const { toast } = useToast();

  const handleStatusChange = useCallback(async (ticketId: string, status: TicketStatus) => {
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
  }, [tickets, selectedTicket, setTickets, setSelectedTicket, toast]);
  
  const handlePriorityChange = useCallback(async (ticketId: string, priority: string) => {
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
  }, [tickets, selectedTicket, setTickets, setSelectedTicket, toast]);
  
  const handleAssignTicket = useCallback(async (ticketId: string, technicianName: string) => {
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
  }, [tickets, selectedTicket, setTickets, setSelectedTicket, toast]);
  
  const handleAddNote = useCallback(async (ticketId: string, content: string, isInternal: boolean) => {
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
  }, [tickets, selectedTicket, setTickets, setSelectedTicket, toast]);
  
  const handleSubmitTicket = useCallback(async (data: {
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
  }, [tickets, setTickets, toast]);

  return {
    handleStatusChange,
    handlePriorityChange,
    handleAssignTicket,
    handleAddNote,
    handleSubmitTicket
  };
};
