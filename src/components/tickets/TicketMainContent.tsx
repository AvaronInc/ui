
import React from 'react';
import TicketFilters from '@/components/tickets/TicketFilters';
import TicketList from '@/components/tickets/TicketList';
import TicketDetailPanel from '@/components/tickets/TicketDetailPanel';
import { useTickets, sampleTechnicians } from '@/context/TicketContext';

const TicketMainContent = () => {
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
    handleAddNote
  } = useTickets();

  return (
    <>
      <TicketFilters 
        filters={filters}
        onFilterChange={setFilters}
        technicians={sampleTechnicians}
      />
      
      <TicketList 
        tickets={filteredTickets}
        onTicketSelect={handleTicketSelect}
        selectedTicket={selectedTicket}
      />
      
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
