
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { AITicketSuggestion } from '@/types/tickets';
import { useTickets } from '@/context/ticket/TicketContext';

export const useTicketActions = () => {
  const { toast } = useToast();
  const { refreshTickets } = useTickets();
  
  const [activeTab, setActiveTab] = useState<string>('tickets');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loadingTime, setLoadingTime] = useState(0);
  const [loadingTimer, setLoadingTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Set initial loading to false after a delay
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
      console.log('💡 useTicketActions - Initial load complete');
    }, 1000);
    
    // Start a timer to track loading time
    const loadTimer = setInterval(() => {
      setLoadingTime(prev => prev + 1);
    }, 1000);
    
    setLoadingTimer(loadTimer);
    
    return () => {
      clearTimeout(timer);
      if (loadTimer) clearInterval(loadTimer);
    };
  }, []);
  
  // Clear loading timer when initial load is complete
  useEffect(() => {
    if (!isInitialLoad && loadingTimer) {
      clearInterval(loadingTimer);
      setLoadingTimer(null);
    }
  }, [isInitialLoad, loadingTimer]);
  
  const handleEscalateTicket = (ticketId: string) => {
    toast({
      title: "Ticket Escalated",
      description: `Ticket ${ticketId} has been escalated to the next level.`
    });
  };
  
  const handleCloseTicket = (ticketId: string) => {
    toast({
      title: "Ticket Closed",
      description: `Ticket ${ticketId} has been closed.`
    });
  };
  
  const handleApplySuggestion = (suggestion: AITicketSuggestion) => {
    toast({
      title: "AI Suggestion Applied",
      description: `Applied suggestion for ${suggestion.relatedTickets.join(', ')}`
    });
  };
  
  const handleRefresh = async () => {
    try {
      console.log('💡 useTicketActions - Refreshing tickets...');
      setLoadError(null);
      await refreshTickets(true); // Force using mock data
      toast({
        title: "Data Refreshed",
        description: "Ticket data has been refreshed."
      });
    } catch (error) {
      console.error('Error refreshing tickets:', error);
      setLoadError('Failed to refresh ticket data');
      toast({
        title: "Refresh Failed",
        description: "Failed to refresh ticket data. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const handleCancelLoading = async () => {
    try {
      console.log('💡 useTicketActions - Cancelling loading, switching to mock data...');
      await refreshTickets(true); // Force using mock data
      setIsInitialLoad(false);
    } catch (error) {
      console.error('Error loading mock data:', error);
      setLoadError('Failed to load mock ticket data');
    }
  };
  
  return {
    activeTab,
    setActiveTab,
    isInitialLoad,
    loadError,
    loadingTime,
    handleEscalateTicket,
    handleCloseTicket,
    handleApplySuggestion,
    handleRefresh,
    handleCancelLoading
  };
};
