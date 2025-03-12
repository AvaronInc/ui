
import React from 'react';
import { Ticket } from '@/types/tickets';
import { Calendar, Clock, Flag, User, CheckCircle2, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';

interface TicketDetailsProps {
  ticket: Ticket;
}

const TicketDetails = ({ ticket }: TicketDetailsProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <Clock className="h-5 w-5 text-info" />;
      case 'in-progress':
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case 'resolved':
        return <CheckCircle2 className="h-5 w-5 text-success" />;
      default:
        return null;
    }
  };
  
  const getPriorityIcon = (priority: string) => {
    const props = { className: "h-5 w-5" };
    
    switch (priority) {
      case 'low':
        return <Flag {...props} className="h-5 w-5 text-success" />;
      case 'medium':
        return <Flag {...props} className="h-5 w-5 text-info" />;
      case 'high':
        return <Flag {...props} className="h-5 w-5 text-warning" />;
      case 'critical':
        return <Flag {...props} className="h-5 w-5 text-destructive" />;
      default:
        return null;
    }
  };
  
  const formatDateTime = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy h:mm a');
    } catch (e) {
      return 'Unknown';
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-1">
        <div className="text-sm text-muted-foreground">Status</div>
        <div className="flex items-center gap-2">
          {getStatusIcon(ticket.status)}
          <span className="capitalize">{ticket.status.replace('-', ' ')}</span>
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="text-sm text-muted-foreground">Priority</div>
        <div className="flex items-center gap-2">
          {getPriorityIcon(ticket.priority)}
          <span className="capitalize">{ticket.priority}</span>
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="text-sm text-muted-foreground">Created</div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{formatDateTime(ticket.createdAt)}</span>
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="text-sm text-muted-foreground">Last Updated</div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{formatDateTime(ticket.updatedAt)}</span>
        </div>
      </div>
      
      <div className="space-y-1 col-span-2">
        <div className="text-sm text-muted-foreground">Assigned To</div>
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span>{ticket.assignedTo || 'Unassigned'}</span>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
