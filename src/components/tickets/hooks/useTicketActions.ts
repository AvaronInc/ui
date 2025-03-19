
import { useState, useEffect } from 'react';
import { useTickets } from '@/context/TicketContext';
import { toast } from 'sonner';

export const useTicketActions = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const { 
    handleStatusChange,
    refreshTickets,
    isLoading,
    aiSuggestions
  } = useTickets();

  // Track when initial load completes
  useEffect(() => {
    console.log('useTicketActions - isLoading changed:', isLoading);
    if (!isLoading && isInitialLoad) {
      console.log('Initial load complete, setting isInitialLoad to false');
      setIsInitialLoad(false);
    }
  }, [isLoading, isInitialLoad]);

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

  const handleRefresh = async () => {
    console.log('Manually refreshing tickets...');
    try {
      await refreshTickets();
      toast("Refreshed", {
        description: "Ticket data has been refreshed"
      });
    } catch (error) {
      console.error("Error refreshing tickets:", error);
      toast("Refresh Failed", {
        description: "Could not refresh ticket data"
      });
    }
  };

  return {
    activeTab,
    setActiveTab,
    isInitialLoad,
    handleEscalateTicket,
    handleCloseTicket,
    handleApplySuggestion,
    handleRefresh
  };
};
