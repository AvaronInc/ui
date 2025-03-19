
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import * as ticketService from '@/services/ticketService';
import { Ticket, TicketStatistics } from '@/types/tickets';
import { initialAISuggestions, AITicketSuggestion } from './types';

export const useTicketData = () => {
  const { toast } = useToast();
  const [tickets, setTickets] = useState<Ticket[]>([]);
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
  const [aiSuggestions] = useState<AITicketSuggestion[]>(initialAISuggestions);
  
  // Fetch tickets from the database
  const fetchTicketsData = useCallback(async (forceMock = false) => {
    console.log('Starting to fetch tickets data...');
    setIsLoading(true);
    
    try {
      console.log(`Calling ticketService.fetchTickets(${forceMock ? 'true' : 'false'})`);
      const ticketsData = await ticketService.fetchTickets(forceMock);
      console.log(`Received ${ticketsData.length} tickets from service`);
      setTickets(ticketsData);
      
      // Calculate statistics
      console.log('Calculating ticket statistics...');
      const stats = await ticketService.calculateTicketStatistics();
      console.log('Ticket statistics calculated:', stats);
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
      // Set empty data so the UI can still render
      setTickets([]);
    } finally {
      console.log('Finished fetching tickets, setting loading to false');
      setIsLoading(false);
    }
  }, [toast]);
  
  // Initial data fetch
  useEffect(() => {
    console.log('TicketProvider mounted, fetching data...');
    fetchTicketsData();
  }, [fetchTicketsData]);
  
  return {
    tickets,
    setTickets,
    isLoading,
    setIsLoading,
    ticketStatistics,
    aiSuggestions,
    refreshTickets: fetchTicketsData
  };
};
