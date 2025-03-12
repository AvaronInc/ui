
import React from 'react';
import { Ticket } from '@/types/tickets';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TicketListProps {
  tickets: Ticket[];
  onTicketSelect: (ticket: Ticket) => void;
  selectedTicket: Ticket | null;
}

export const TicketList = ({ 
  tickets, 
  onTicketSelect,
  selectedTicket 
}: TicketListProps) => {
  
  const formatTime = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (e) {
      return 'Unknown';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <Clock className="h-4 w-4" />;
      case 'in-progress':
        return <AlertCircle className="h-4 w-4" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return "text-info bg-info/10";
      case 'in-progress':
        return "text-warning bg-warning/10";
      case 'resolved':
        return "text-success bg-success/10";
      default:
        return "";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return "text-success";
      case 'medium':
        return "text-info";
      case 'high':
        return "text-warning";
      case 'critical':
        return "text-destructive";
      default:
        return "";
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket ID</TableHead>
              <TableHead>Summary</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center p-4">
                  No tickets found
                </TableCell>
              </TableRow>
            ) : (
              tickets.map((ticket) => (
                <TableRow 
                  key={ticket.id} 
                  className={cn(
                    "cursor-pointer hover:bg-muted/50",
                    selectedTicket?.id === ticket.id && "bg-muted"
                  )}
                  onClick={() => onTicketSelect(ticket)}
                >
                  <TableCell className="font-medium">{ticket.id}</TableCell>
                  <TableCell>{ticket.title}</TableCell>
                  <TableCell>
                    <div className={cn(
                      "flex items-center gap-2 px-2 py-1 rounded-full w-fit",
                      getStatusColor(ticket.status)
                    )}>
                      {getStatusIcon(ticket.status)}
                      <span className="capitalize">{ticket.status.replace('-', ' ')}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={cn(
                      "font-medium capitalize",
                      getPriorityColor(ticket.priority)
                    )}>
                      {ticket.priority}
                    </span>
                  </TableCell>
                  <TableCell>{ticket.assignedTo || 'Unassigned'}</TableCell>
                  <TableCell>{formatTime(ticket.updatedAt)}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        onTicketSelect(ticket);
                      }}
                    >
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TicketList;
