
import React from 'react';
import { Ticket, TicketStatus } from '@/types/tickets';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import TicketDetails from './TicketDetails';
import TicketActions from './TicketActions';
import TicketNotes from './TicketNotes';

interface TicketDetailPanelProps {
  ticket: Ticket | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (ticketId: string, status: TicketStatus) => void;
  onPriorityChange: (ticketId: string, priority: string) => void;
  onAssignTicket: (ticketId: string, technicianName: string) => void;
  onAddNote: (ticketId: string, note: string, isInternal: boolean) => void;
  technicians: string[];
}

const TicketDetailPanel = ({
  ticket,
  isOpen,
  onClose,
  onStatusChange,
  onPriorityChange,
  onAssignTicket,
  onAddNote,
  technicians
}: TicketDetailPanelProps) => {
  if (!ticket) return null;
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="pr-10">Ticket #{ticket.id}</SheetTitle>
        </SheetHeader>
        
        <div className="py-6 space-y-6">
          <div>
            <h3 className="text-lg font-medium">{ticket.title}</h3>
            <p className="text-muted-foreground mt-1">{ticket.description}</p>
          </div>
          
          <TicketDetails ticket={ticket} />
          
          <TicketActions 
            ticket={ticket}
            onStatusChange={onStatusChange}
            onPriorityChange={onPriorityChange}
            onAssignTicket={onAssignTicket}
            technicians={technicians}
          />
          
          <TicketNotes 
            ticket={ticket}
            onAddNote={onAddNote}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TicketDetailPanel;
