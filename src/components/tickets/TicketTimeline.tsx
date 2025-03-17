
import React from 'react';
import { Ticket, TicketNote } from '@/types/tickets';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Bot, User, Clock, AlertTriangle, MessageSquare } from 'lucide-react';

interface TicketTimelineProps {
  ticket: Ticket;
}

const TicketTimeline = ({ ticket }: TicketTimelineProps) => {
  type TimelineItem = {
    id: string;
    type: 'creation' | 'status-change' | 'assignment' | 'note' | 'sla';
    content: string;
    timestamp: string;
    author?: string;
    isAIGenerated?: boolean;
    isInternal?: boolean;
  };

  const formatDateTime = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy h:mm a');
    } catch (e) {
      return 'Unknown time';
    }
  };

  // Create timeline by combining notes and other events
  const createTimeline = (ticket: Ticket): TimelineItem[] => {
    const timeline: TimelineItem[] = [];
    
    // Add ticket creation
    timeline.push({
      id: `creation-${ticket.id}`,
      type: 'creation',
      content: `Ticket created: ${ticket.title}`,
      timestamp: ticket.createdAt,
      author: ticket.createdBy,
      isAIGenerated: ticket.isAIGenerated
    });
    
    // Add notes if they exist
    if (ticket.notes && ticket.notes.length > 0) {
      ticket.notes.forEach(note => {
        timeline.push({
          id: note.id,
          type: 'note',
          content: note.content,
          timestamp: note.timestamp,
          author: note.author,
          isAIGenerated: note.isAIGenerated,
          isInternal: note.isInternal
        });
      });
    }
    
    // Add SLA deadline if it exists
    if (ticket.slaDeadline) {
      const now = new Date();
      const deadline = new Date(ticket.slaDeadline);
      const isApproaching = deadline.getTime() - now.getTime() < 24 * 60 * 60 * 1000; // 24 hours
      
      timeline.push({
        id: `sla-${ticket.id}`,
        type: 'sla',
        content: isApproaching 
          ? 'SLA deadline is approaching!' 
          : 'SLA deadline',
        timestamp: ticket.slaDeadline
      });
    }
    
    // Sort by timestamp, newest first
    return timeline.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  };

  const timeline = createTimeline(ticket);

  const getTimelineIcon = (item: TimelineItem) => {
    if (item.isAIGenerated) return <Bot className="h-5 w-5 text-purple-500" />;
    
    switch (item.type) {
      case 'creation':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'status-change':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'assignment':
        return <User className="h-5 w-5 text-green-500" />;
      case 'note':
        return <MessageSquare className="h-5 w-5 text-gray-500" />;
      case 'sla':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Timeline & Activity</h3>
      
      <div className="space-y-4">
        {timeline.map((item) => (
          <div 
            key={item.id} 
            className={cn(
              "p-3 border rounded-md",
              item.isInternal && "bg-muted",
              item.type === 'sla' && "border-red-200 bg-red-50"
            )}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">{getTimelineIcon(item)}</div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                  <div>
                    {item.author && (
                      <span className="text-sm font-medium">
                        {item.author}
                        {item.isAIGenerated && " (AI)"}
                        {item.isInternal && " (Internal)"}:
                      </span>
                    )}
                    <p className="text-sm">{item.content}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatDateTime(item.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketTimeline;
