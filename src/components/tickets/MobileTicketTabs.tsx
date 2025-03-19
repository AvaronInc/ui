
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import TicketStatCards from '@/components/tickets/TicketStatCards';
import AIAssistantPanel from '@/components/tickets/AIAssistantPanel';
import TicketFilters from '@/components/tickets/TicketFilters';
import TicketList from '@/components/tickets/TicketList';
import EmptyTicketState from '@/components/tickets/EmptyTicketState';
import { TicketStatistics, AITicketSuggestion, Ticket, TicketFilter } from '@/types/tickets';

interface MobileTicketTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
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

const MobileTicketTabs: React.FC<MobileTicketTabsProps> = ({
  activeTab,
  setActiveTab,
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
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
      <TabsList className="w-full grid grid-cols-2">
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="tickets">Tickets</TabsTrigger>
      </TabsList>
      
      <TabsContent value="dashboard" className="mt-4 space-y-6">
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={onRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
        <TicketStatCards statistics={statistics} />
        <AIAssistantPanel 
          suggestions={aiSuggestions || []}
          onApplySuggestion={onApplySuggestion}
        />
      </TabsContent>
      
      <TabsContent value="tickets" className="mt-4 space-y-6">
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
      </TabsContent>
    </Tabs>
  );
};

export default MobileTicketTabs;
