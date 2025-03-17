
import React, { useState } from 'react';
import TicketFilters from '@/components/tickets/TicketFilters';
import TicketList from '@/components/tickets/TicketList';
import TicketStatCards from '@/components/tickets/TicketStatCards';
import AIAssistantPanel from '@/components/tickets/AIAssistantPanel';
import { TicketDetailPanel } from '@/components/tickets/detail';
import { useTickets, sampleTechnicians } from '@/context/TicketContext';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';

const TicketMainContent = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("dashboard");

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
    aiSuggestions
  } = useTickets();

  const handleEscalateTicket = (ticketId: string) => {
    handleStatusChange(ticketId, 'escalated');
    toast({
      title: "Ticket Escalated",
      description: `Ticket ${ticketId} has been escalated`
    });
  };

  const handleCloseTicket = (ticketId: string) => {
    handleStatusChange(ticketId, 'resolved');
    toast({
      title: "Ticket Closed",
      description: `Ticket ${ticketId} has been marked as resolved`
    });
  };

  const handleApplySuggestion = (suggestionId: string) => {
    const suggestion = aiSuggestions.find(s => s.id === suggestionId);
    if (!suggestion) return;

    switch (suggestion.type) {
      case 'apply-fix':
        toast({
          title: "Fix Applied",
          description: `Solution automatically applied to ticket(s)`
        });
        break;
      case 'escalate':
        if (suggestion.relatedTickets && suggestion.relatedTickets.length > 0) {
          suggestion.relatedTickets.forEach(id => handleStatusChange(id, 'escalated'));
          toast({
            title: "Tickets Escalated",
            description: `${suggestion.relatedTickets.length} tickets have been escalated`
          });
        }
        break;
      case 'follow-up':
        toast({
          title: "Follow-up Sent",
          description: "Automated follow-up message has been sent to the customer"
        });
        break;
      case 'bulk-resolution':
        toast({
          title: "Bulk Resolution Started",
          description: "Created bulk resolution ticket for similar issues"
        });
        break;
    }
  };

  return (
    <>
      {isMobile ? (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="mt-4 space-y-6">
            <TicketStatCards statistics={ticketStatistics} />
            <AIAssistantPanel 
              suggestions={aiSuggestions}
              onApplySuggestion={handleApplySuggestion}
            />
          </TabsContent>
          
          <TabsContent value="tickets" className="mt-4 space-y-6">
            <TicketFilters 
              filters={filters}
              onFilterChange={setFilters}
              technicians={sampleTechnicians}
            />
            
            <TicketList 
              tickets={filteredTickets}
              onTicketSelect={handleTicketSelect}
              selectedTicket={selectedTicket}
              onEscalateTicket={handleEscalateTicket}
              onCloseTicket={handleCloseTicket}
            />
          </TabsContent>
        </Tabs>
      ) : (
        <>
          <TicketStatCards statistics={ticketStatistics} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 space-y-6">
              <TicketFilters 
                filters={filters}
                onFilterChange={setFilters}
                technicians={sampleTechnicians}
              />
              
              <TicketList 
                tickets={filteredTickets}
                onTicketSelect={handleTicketSelect}
                selectedTicket={selectedTicket}
                onEscalateTicket={handleEscalateTicket}
                onCloseTicket={handleCloseTicket}
              />
            </div>
            
            <div>
              <AIAssistantPanel 
                suggestions={aiSuggestions}
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
