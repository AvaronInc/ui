
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import TicketStatCards from '@/components/tickets/TicketStatCards';
import AIAssistantPanel from '@/components/tickets/AIAssistantPanel';
import TicketFilters from '@/components/tickets/TicketFilters';
import TicketList from '@/components/tickets/TicketList';
import { TicketStatistics, AITicketSuggestion, Ticket, TicketFilter } from '@/types/tickets';
import EmptyTicketState from '@/components/tickets/EmptyTicketState';

interface DesktopTicketViewProps {
  statistics: TicketStatistics;
  aiSuggestions: AITicketSuggestion[];
  filters: TicketFilter;
  filteredTickets: Ticket[];
  showEmptyState: boolean;
  selectedTicket: Ticket | null;
  technicians: string[];
  onApplySuggestion: (suggestionId: string) => void;
  onFilterChange: (filters: TicketFilter) => void;
  onTicketSelect: (ticket: Ticket) => void;
  onEscalateTicket: (ticketId: string) => void;
  onCloseTicket: (ticketId: string) => void;
  onRefresh: () => void;
}

const DesktopTicketView: React.FC<DesktopTicketViewProps> = ({
  statistics,
  aiSuggestions,
  filters,
  filteredTickets,
  showEmptyState,
  selectedTicket,
  technicians,
  onApplySuggestion,
  onFilterChange,
  onTicketSelect,
  onEscalateTicket,
  onCloseTicket,
  onRefresh
}) => {
  return (
    <>
      <div className="flex justify-end mb-4">
        <Button variant="outline" size="sm" onClick={onRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>
      
      <TicketStatCards statistics={statistics} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 space-y-6">
          <TicketFilters 
            filters={filters}
            onFilterChange={onFilterChange}
            technicians={technicians}
          />
          
          {showEmptyState ? (
            <EmptyTicketState onRefresh={onRefresh} />
          ) : (
            <TicketList 
              tickets={filteredTickets || []}
              onTicketSelect={onTicketSelect}
              selectedTicket={selectedTicket}
              onEscalateTicket={onEscalateTicket}
              onCloseTicket={onCloseTicket}
            />
          )}
        </div>
        
        <div>
          <AIAssistantPanel 
            suggestions={aiSuggestions || []}
            onApplySuggestion={onApplySuggestion}
          />
        </div>
      </div>
    </>
  );
};

export default DesktopTicketView;
