
import React, { useState, useEffect } from 'react';
import TicketFilters from '@/components/tickets/TicketFilters';
import TicketList from '@/components/tickets/TicketList';
import TicketStatCards from '@/components/tickets/TicketStatCards';
import AIAssistantPanel from '@/components/tickets/AIAssistantPanel';
import { TicketDetailPanel } from '@/components/tickets/detail';
import { useTickets, sampleTechnicians } from '@/context/TicketContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const TicketMainContent = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const { 
    filteredTickets,
    selectedTicket,
    detailPanelOpen,
    filters,
    setFilters,
    handleTicketSelect,
    setDetailPanelOpen,
    handleStatusChange,
    handlePriorityChange,
    handleAssignTicket,
    handleAddNote,
    ticketStatistics,
    aiSuggestions,
    isLoading,
    refreshTickets
  } = useTickets();

  // Track when initial load completes
  useEffect(() => {
    console.log('TicketMainContent - isLoading state changed:', isLoading);
    if (!isLoading && isInitialLoad) {
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
    const suggestion = aiSuggestions.find(s => s.id === suggestionId);
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

  const renderLoading = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-[200px]" />
        <Skeleton className="h-10 w-[100px]" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {Array(4).fill(null).map((_, i) => (
          <Skeleton key={i} className="h-[100px]" />
        ))}
      </div>
      <Skeleton className="h-[400px]" />
    </div>
  );

  console.log('TicketMainContent render - isLoading:', isLoading, 'filteredTickets:', filteredTickets?.length);

  // Show empty state if we're not in initial load and not loading but have no tickets
  const showEmptyState = !isLoading && !isInitialLoad && (!filteredTickets || filteredTickets.length === 0);

  if (isLoading) {
    console.log('Rendering loading state...');
    return renderLoading();
  }

  return (
    <>
      {isMobile ? (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="mt-4 space-y-6">
            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
            <TicketStatCards statistics={ticketStatistics} />
            <AIAssistantPanel 
              suggestions={aiSuggestions || []}
              onApplySuggestion={handleApplySuggestion}
            />
          </TabsContent>
          
          <TabsContent value="tickets" className="mt-4 space-y-6">
            <TicketFilters 
              filters={filters}
              onFilterChange={setFilters}
              technicians={sampleTechnicians}
            />
            
            {showEmptyState ? (
              <div className="text-center p-8 bg-muted rounded-lg">
                <h3 className="text-xl font-medium mb-2">No tickets found</h3>
                <p className="text-muted-foreground mb-4">
                  There are no tickets matching your current filters or no tickets have been created yet.
                </p>
                <Button onClick={handleRefresh}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            ) : (
              <TicketList 
                tickets={filteredTickets || []}
                onTicketSelect={handleTicketSelect}
                selectedTicket={selectedTicket}
                onEscalateTicket={handleEscalateTicket}
                onCloseTicket={handleCloseTicket}
              />
            )}
          </TabsContent>
        </Tabs>
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
          
          <TicketStatCards statistics={ticketStatistics || {
            total: 0,
            open: 0,
            resolved: 0,
            escalated: 0
          }} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 space-y-6">
              <TicketFilters 
                filters={filters}
                onFilterChange={setFilters}
                technicians={sampleTechnicians}
              />
              
              {showEmptyState ? (
                <div className="text-center p-8 bg-muted rounded-lg">
                  <h3 className="text-xl font-medium mb-2">No tickets found</h3>
                  <p className="text-muted-foreground mb-4">
                    There are no tickets matching your current filters or no tickets have been created yet.
                  </p>
                  <Button onClick={handleRefresh}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              ) : (
                <TicketList 
                  tickets={filteredTickets || []}
                  onTicketSelect={handleTicketSelect}
                  selectedTicket={selectedTicket}
                  onEscalateTicket={handleEscalateTicket}
                  onCloseTicket={handleCloseTicket}
                />
              )}
            </div>
            
            <div>
              <AIAssistantPanel 
                suggestions={aiSuggestions || []}
                onApplySuggestion={handleApplySuggestion}
              />
            </div>
          </div>
        </>
      )}
      
      <TicketDetailPanel 
        ticket={selectedTicket}
        isOpen={detailPanelOpen}
        onClose={() => setDetailPanelOpen(false)}
        onStatusChange={handleStatusChange}
        onPriorityChange={handlePriorityChange}
        onAssignTicket={handleAssignTicket}
        onAddNote={handleAddNote}
        technicians={sampleTechnicians}
      />
    </>
  );
};

export default TicketMainContent;
