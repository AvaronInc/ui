
import React from 'react';
import { Ticket, TicketStatus } from '@/types/tickets';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import TicketDetails from './TicketDetails';
import TicketActions from './TicketActions';
import TicketNotes from './TicketNotes';
import TicketTimeline from '../TicketTimeline';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

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
  
  const isResolved = ticket.status === 'resolved' || ticket.status === 'ai-resolved';
  
  const getSLAStatusStyle = () => {
    if (!ticket.slaDeadline) return "";
    
    const deadline = new Date(ticket.slaDeadline);
    const now = new Date();
    const hoursRemaining = Math.max(0, (deadline.getTime() - now.getTime()) / (1000 * 60 * 60));
    
    if (isResolved) return "bg-green-100 text-green-800";
    if (hoursRemaining <= 4) return "bg-red-100 text-red-800";
    if (hoursRemaining <= 24) return "bg-yellow-100 text-yellow-800";
    return "bg-blue-100 text-blue-800";
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-xl w-full overflow-y-auto p-0">
        <div className="h-full flex flex-col">
          <SheetHeader className="px-6 py-4 border-b sticky top-0 bg-background z-10">
            <div className="flex items-center justify-between">
              <SheetTitle className="leading-tight">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground mb-1">
                    Ticket #{ticket.id}
                  </span>
                  <span className="mr-10 line-clamp-1">{ticket.title}</span>
                </div>
              </SheetTitle>
              
              {ticket.slaDeadline && (
                <Badge className={cn("ml-auto", getSLAStatusStyle())}>
                  {isResolved ? "SLA Met" : "SLA Deadline"}
                </Badge>
              )}
            </div>
          </SheetHeader>
          
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{ticket.description}</p>
              
              <TicketDetails ticket={ticket} />
              
              <TicketActions 
                ticket={ticket}
                onStatusChange={onStatusChange}
                onPriorityChange={onPriorityChange}
                onAssignTicket={onAssignTicket}
                technicians={technicians}
              />
              
              <TicketTimeline ticket={ticket} />
              
              <TicketNotes 
                ticket={ticket}
                onAddNote={onAddNote}
              />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TicketDetailPanel;
