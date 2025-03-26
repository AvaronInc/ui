
import React, { useState } from 'react';
import { Ticket, ResolutionMethod } from '@/types/tickets';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  PanelRight, 
  ArrowUpRight,
  XCircle,
  Bot,
  User,
  AlertTriangle,
  FileSearch
} from 'lucide-react';
import { cn } from '@/lib/utils';
import RootCauseAnalysisDialog from './dialogs/RootCauseAnalysisDialog';

interface TicketListProps {
  tickets: Ticket[];
  onTicketSelect: (ticket: Ticket) => void;
  selectedTicket: Ticket | null;
  onEscalateTicket?: (ticketId: string) => void;
  onCloseTicket?: (ticketId: string) => void;
}

export const TicketList = ({ 
  tickets, 
  onTicketSelect,
  selectedTicket,
  onEscalateTicket,
  onCloseTicket
}: TicketListProps) => {
  const [analysisTicket, setAnalysisTicket] = useState<Ticket | null>(null);
  const [analysisDialogOpen, setAnalysisDialogOpen] = useState(false);
  
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
      case 'pending-customer':
        return <User className="h-4 w-4" />;
      case 'ai-resolved':
        return <Bot className="h-4 w-4" />;
      case 'escalated':
        return <AlertTriangle className="h-4 w-4" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return "text-blue-500 bg-blue-50";
      case 'in-progress':
        return "text-yellow-500 bg-yellow-50";
      case 'pending-customer':
        return "text-purple-500 bg-purple-50";
      case 'ai-resolved':
        return "text-green-600 bg-green-50";
      case 'escalated':
        return "text-red-500 bg-red-50";
      case 'resolved':
        return "text-green-600 bg-green-50";
      default:
        return "";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return "text-green-600";
      case 'medium':
        return "text-blue-600";
      case 'high':
        return "text-yellow-600";
      case 'critical':
        return "text-red-600";
      default:
        return "";
    }
  };

  const getResolutionMethodIcon = (method?: ResolutionMethod) => {
    switch (method) {
      case 'ai-resolved':
        return <Bot className="h-4 w-4 text-green-500" />;
      case 'customer-resolved':
        return <User className="h-4 w-4 text-blue-500" />;
      case 'manual':
        return <User className="h-4 w-4 text-purple-500" />;
      case 'escalated':
        return <ArrowUpRight className="h-4 w-4 text-red-500" />;
      case 'pending':
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const handleRootCauseAnalysis = (ticket: Ticket, e: React.MouseEvent) => {
    e.stopPropagation();
    setAnalysisTicket(ticket);
    setAnalysisDialogOpen(true);
  };

  return (
    <>
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
                <TableHead>Resolution</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center p-4">
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
                    <TableCell>
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <span className="underline underline-offset-4 decoration-dotted">
                            {ticket.title}
                          </span>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <div className="space-y-2">
                            <h4 className="font-medium">{ticket.title}</h4>
                            <p className="text-sm text-muted-foreground">{ticket.description}</p>
                            {ticket.department && (
                              <div className="text-xs">
                                <span className="font-medium">Department:</span> {ticket.department}
                              </div>
                            )}
                            {ticket.location && (
                              <div className="text-xs">
                                <span className="font-medium">Location:</span> {ticket.location}
                              </div>
                            )}
                            <div className="text-xs">
                              <span className="font-medium">Created:</span> {formatTime(ticket.createdAt)}
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </TableCell>
                    <TableCell>
                      <div className={cn(
                        "flex items-center gap-2 px-2 py-1 rounded-full w-fit",
                        getStatusColor(ticket.status)
                      )}>
                        {getStatusIcon(ticket.status)}
                        <span className="capitalize text-xs">{ticket.status.replace('-', ' ')}</span>
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
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getResolutionMethodIcon(ticket.resolutionMethod)}
                        <span className="text-xs capitalize">
                          {ticket.resolutionMethod ? ticket.resolutionMethod.replace('-', ' ') : 'Pending'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            onTicketSelect(ticket);
                          }}
                          title="View details"
                        >
                          <PanelRight className="h-4 w-4" />
                          <span className="sr-only">Details</span>
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => handleRootCauseAnalysis(ticket, e)}
                          title="Root Cause Analysis"
                        >
                          <FileSearch className="h-4 w-4" />
                          <span className="sr-only">Root Cause Analysis</span>
                        </Button>
                        
                        {onEscalateTicket && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onEscalateTicket(ticket.id);
                            }}
                            title="Escalate ticket"
                          >
                            <ArrowUpRight className="h-4 w-4" />
                            <span className="sr-only">Escalate</span>
                          </Button>
                        )}
                        
                        {onCloseTicket && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onCloseTicket(ticket.id);
                            }}
                            title="Close ticket"
                          >
                            <XCircle className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      <RootCauseAnalysisDialog 
        ticket={analysisTicket}
        open={analysisDialogOpen}
        onOpenChange={setAnalysisDialogOpen}
      />
    </>
  );
};

export default TicketList;
