
import React, { useEffect } from 'react';
import { TicketDetailPanel } from '@/components/tickets/detail';
import { useTickets, sampleTechnicians } from '@/context/TicketContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTicketActions } from '@/components/tickets/hooks/useTicketActions';
import TicketLoadingState from '@/components/tickets/TicketLoadingState';
import MobileTicketTabs from '@/components/tickets/MobileTicketTabs';
import DesktopTicketView from '@/components/tickets/DesktopTicketView';

const TicketMainContent = () => {
  const isMobile = useIsMobile();
  
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
    isLoading
  } = useTickets();

  const {
    activeTab,
    setActiveTab,
    isInitialLoad,
    handleEscalateTicket,
    handleCloseTicket,
    handleApplySuggestion,
    handleRefresh
  } = useTicketActions();

  // Log state changes for debugging
  useEffect(() => {
    console.log('TicketMainContent - isLoading state:', isLoading, 'isInitialLoad:', isInitialLoad);
  }, [isLoading, isInitialLoad]);

  // Log filtered tickets for debugging
  useEffect(() => {
    console.log('TicketMainContent - filteredTickets:', filteredTickets?.length);
  }, [filteredTickets]);

  // Show empty state if we're not in initial load and not loading but have no tickets
  const showEmptyState = !isLoading && !isInitialLoad && (!filteredTickets || filteredTickets.length === 0);

  if (isLoading) {
    console.log('Rendering TicketLoadingState...');
    return <TicketLoadingState />;
  }

  // Ensure we have the statistics object with all required properties
  const stats = ticketStatistics || {
    openTickets: 0,
    resolvedToday: 0,
    aiResolved: 0,
    awaitingAction: 0,
    avgResolutionTime: '0h',
    escalationRate: 0,
    escalationTrend: 'stable' as const
  };

  console.log('TicketMainContent - rendering main content with stats:', stats);

  return (
    <>
      {isMobile ? (
        <MobileTicketTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          statistics={stats}
          aiSuggestions={aiSuggestions || []}
          filters={filters}
          filteredTickets={filteredTickets || []}
          showEmptyState={showEmptyState}
          selectedTicket={selectedTicket}
          technicians={sampleTechnicians}
          onApplySuggestion={handleApplySuggestion}
          onFilterChange={setFilters}
          onTicketSelect={handleTicketSelect}
          onEscalateTicket={handleEscalateTicket}
          onCloseTicket={handleCloseTicket}
          onRefresh={handleRefresh}
        />
      ) : (
        <DesktopTicketView 
          statistics={stats}
          aiSuggestions={aiSuggestions || []}
          filters={filters}
          filteredTickets={filteredTickets || []}
          showEmptyState={showEmptyState}
          selectedTicket={selectedTicket}
          technicians={sampleTechnicians}
          onApplySuggestion={handleApplySuggestion}
          onFilterChange={setFilters}
          onTicketSelect={handleTicketSelect}
          onEscalateTicket={handleEscalateTicket}
          onCloseTicket={handleCloseTicket}
          onRefresh={handleRefresh}
        />
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
