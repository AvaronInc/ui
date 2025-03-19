
import { useState, useEffect, useCallback } from 'react';
import { useTickets } from '@/context/TicketContext';
import { toast } from 'sonner';

export const useTicketActions = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loadingTimeout, setLoadingTimeout] = useState<NodeJS.Timeout | null>(null);

  const { 
    handleStatusChange,
    refreshTickets,
    isLoading,
    aiSuggestions,
    tickets
  } = useTickets();

  // Debug logging for state changes
  useEffect(() => {
    console.log('💡 useTicketActions - STATE CHECK:', {
      isLoading,
      isInitialLoad,
      loadError,
      ticketsLength: tickets?.length || 0
    });
  }, [isLoading, isInitialLoad, loadError, tickets]);

  // Set a timeout for loading to detect potential issues
  useEffect(() => {
    if (isLoading && !loadingTimeout) {
      console.log('💡 Setting up loading timeout detection');
      const timeout = setTimeout(() => {
        console.log('💡 Loading timeout triggered - loading is taking too long');
        if (isLoading) {
          setLoadError('Loading timed out after 15 seconds');
          setIsInitialLoad(false);
        }
      }, 15000);
      
      setLoadingTimeout(timeout);
    } else if (!isLoading && loadingTimeout) {
      console.log('💡 Clearing loading timeout as loading completed');
      clearTimeout(loadingTimeout);
      setLoadingTimeout(null);
    }
    
    return () => {
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
    };
  }, [isLoading, loadingTimeout]);

  // Use useEffect to handle the initial loading state with more precise conditions
  useEffect(() => {    
    // Only change the initial load state when we've definitely completed loading
    // and we have confirmation that tickets data has been processed (even if empty)
    if (!isLoading && tickets !== undefined && isInitialLoad) {
      console.log('💡 Initial data load completed, preparing to set isInitialLoad to false');
      
      // Force the state update to happen on the next tick to ensure UI updates correctly
      const timer = setTimeout(() => {
        console.log('💡 Setting isInitialLoad to false now');
        setIsInitialLoad(false);
        console.log('💡 isInitialLoad is now FALSE');
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, tickets, isInitialLoad]);

  const handleEscalateTicket = (ticketId: string) => {
    handleStatusChange(ticketId, 'escalated');
    toast("Ticket Escalated", {
      description: `Ticket ${ticketId} has been escalated`
    });
  };

  const handleCloseTicket = (ticketId: string) => {
    handleStatusChange(ticketId, 'resolved');
    toast("Ticket Closed", {
      description: `Ticket ${ticketId} has been marked as resolved`
    });
  };

  const handleApplySuggestion = (suggestionId: string) => {
    const suggestion = aiSuggestions?.find(s => s.id === suggestionId);
    if (!suggestion) return;

    switch (suggestion.type) {
      case 'apply-fix':
        toast("Fix Applied", {
          description: `Solution automatically applied to ticket(s)`
        });
        break;
      case 'escalate':
        if (suggestion.relatedTickets && suggestion.relatedTickets.length > 0) {
          suggestion.relatedTickets.forEach(id => handleStatusChange(id, 'escalated'));
          toast("Tickets Escalated", {
            description: `${suggestion.relatedTickets.length} tickets have been escalated`
          });
        }
        break;
      case 'follow-up':
        toast("Follow-up Sent", {
          description: "Automated follow-up message has been sent to the customer"
        });
        break;
      case 'bulk-resolution':
        toast("Bulk Resolution Started", {
          description: "Created bulk resolution ticket for similar issues"
        });
        break;
    }
  };

  const handleRefresh = useCallback(async () => {
    console.log('💡 Manually refreshing tickets...');
    try {
      // Reset state for a fresh load
      setIsInitialLoad(true);
      setLoadError(null);
      
      toast("Refreshing Tickets", {
        description: "Getting the latest ticket data..."
      });
      
      await refreshTickets();
      
      toast("Refreshed", {
        description: "Ticket data has been refreshed"
      });
    } catch (error) {
      console.error("Error refreshing tickets:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      setLoadError(errorMessage);
      
      toast("Refresh Failed", {
        description: "Could not refresh ticket data"
      });
      
      setIsInitialLoad(false); // Reset if there's an error
    }
  }, [refreshTickets]);

  const handleCancelLoading = useCallback(() => {
    console.log('💡 User canceled loading, resetting state');
    setIsInitialLoad(false);
    setLoadError('Loading canceled by user');
  }, []);

  return {
    activeTab,
    setActiveTab,
    isInitialLoad,
    loadError,
    handleEscalateTicket,
    handleCloseTicket,
    handleApplySuggestion,
    handleRefresh,
    handleCancelLoading
  };
};
