
import React, { useEffect } from 'react';
import { TicketDetailPanel } from '@/components/tickets/detail';
import { useTickets } from '@/context/ticket/TicketContext';
import { sampleTechnicians } from '@/context/ticket/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTicketActions } from '@/components/tickets/hooks/useTicketActions';
import TicketLoadingState from '@/components/tickets/TicketLoadingState';
import EmptyTicketState from '@/components/tickets/EmptyTicketState';
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
    isLoading,
    tickets
  } = useTickets();

  const {
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
  } = useTicketActions();

  useEffect(() => {
    console.log('💡 TicketMainContent - Detailed state check:', {
      isLoading,
      isInitialLoad,
      hasLoadError: !!loadError,
      loadError,
      hasFilteredTickets: filteredTickets?.length > 0,
      filteredTicketsCount: filteredTickets?.length,
      rawTicketsCount: tickets?.length,
      hasStatistics: !!ticketStatistics,
      isTicketsNull: tickets === null,
      isTicketsUndefined: tickets === undefined,
      loadingTime
    });
  }, [isLoading, isInitialLoad, loadError, filteredTickets, tickets, ticketStatistics, loadingTime]);

  // Force debug display of empty state
  const forceDebug = false;

  // Show loading state if we're in the initial loading phase
  if (isLoading || isInitialLoad) {
    console.log('💡 SHOWING LOADING STATE - isLoading:', isLoading, 'isInitialLoad:', isInitialLoad);
    return <TicketLoadingState 
      onCancel={handleCancelLoading} 
      loadingTime={loadingTime} 
    />;
  }

  // Make sure tickets array exists
  if (!tickets) {
    console.log('💡 TICKETS ARRAY IS NULL OR UNDEFINED - showing empty state');
    return <EmptyTicketState onRefresh={handleRefresh} error="No ticket data was returned" />;
  }

  // Show empty state if there's a load error
  if (loadError) {
    console.log('💡 SHOWING ERROR STATE - error:', loadError);
    return <EmptyTicketState onRefresh={handleRefresh} error={loadError} />;
  }

  // Determine if we should show empty state
  // Only show empty state when we're not loading and have no tickets
  const showEmptyState = forceDebug || (!isLoading && !isInitialLoad && (!filteredTickets || filteredTickets.length === 0));
  
  if (showEmptyState) {
    console.log('💡 SHOWING EMPTY STATE - no tickets after filtering');
    return <EmptyTicketState onRefresh={handleRefresh} />;
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

  console.log('💡 TicketMainContent - RENDERING MAIN CONTENT with stats:', stats);
  console.log('💡 TicketMainContent - Tickets available:', filteredTickets?.length);

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
          showEmptyState={false} // Already handled above
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
          showEmptyState={false} // Already handled above
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
