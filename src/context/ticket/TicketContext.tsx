
import React, { createContext, useContext, useState } from 'react';
import { TicketFilter, Ticket } from '@/types/tickets';
import { useTicketData } from './useTicketData';
import { useTicketFilters } from './useTicketFilters';
import { useTicketOperations } from './useTicketOperations';
import { TicketContextProps } from './types';

const TicketContext = createContext<TicketContextProps | undefined>(undefined);

export const TicketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [detailPanelOpen, setDetailPanelOpen] = useState(false);
  const [filters, setFilters] = useState<TicketFilter>({
    search: '',
    status: 'all',
    priority: 'all',
    technician: 'all',
    department: 'all',
    location: 'all',
    showAIResolved: false,
    aiGeneratedOnly: false
  });
  
  // Use our custom hooks
  const {
    tickets,
    setTickets,
    isLoading,
    setIsLoading,
    ticketStatistics,
    aiSuggestions,
    refreshTickets
  } = useTicketData();
  
  const filteredTickets = useTicketFilters(tickets, filters);
  
  const {
    handleStatusChange,
    handlePriorityChange,
    handleAssignTicket,
    handleAddNote,
    handleSubmitTicket
  } = useTicketOperations(tickets, setTickets, selectedTicket, setSelectedTicket, aiSuggestions);
  
  const handleTicketSelect = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setDetailPanelOpen(true);
  };
  
  const value: TicketContextProps = {
    tickets,
    filteredTickets,
    selectedTicket,
    detailPanelOpen,
    filters,
    ticketStatistics,
    aiSuggestions,
    isLoading,
    setLoading: setIsLoading,
    setFilters,
    setSelectedTicket,
    setDetailPanelOpen,
    handleTicketSelect,
    handleStatusChange,
    handlePriorityChange,
    handleAssignTicket,
    handleAddNote,
    handleSubmitTicket,
    refreshTickets
  };

  return (
    <TicketContext.Provider value={value}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = (): TicketContextProps => {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
};
