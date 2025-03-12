
import React, { useState } from 'react';
import { Ticket, TicketStatus } from '@/types/tickets';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Edit, 
  Flag, 
  MessageSquare, 
  User, 
  XCircle 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { format } from 'date-fns';
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

export const TicketDetailPanel = ({
  ticket,
  isOpen,
  onClose,
  onStatusChange,
  onPriorityChange,
  onAssignTicket,
  onAddNote,
  technicians
}: TicketDetailPanelProps) => {
  const [note, setNote] = useState('');
  const [isInternalNote, setIsInternalNote] = useState(false);
  const [selectedTechnician, setSelectedTechnician] = useState<string>('');
  
  const handleAddNote = () => {
    if (ticket && note.trim()) {
      onAddNote(ticket.id, note, isInternalNote);
      setNote('');
    }
  };
  
  const handleAssignTicket = () => {
    if (ticket && selectedTechnician) {
      onAssignTicket(ticket.id, selectedTechnician);
      setSelectedTechnician('');
    }
  };
  
  const getStatusIcon = (status: TicketStatus) => {
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
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Quick Actions</h4>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Select onValueChange={(value) => onStatusChange(ticket.id, value as TicketStatus)}>
                <SelectTrigger className="w-full sm:w-auto">
                  <SelectValue placeholder="Change Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              
              <Select onValueChange={(value) => onPriorityChange(ticket.id, value)}>
                <SelectTrigger className="w-full sm:w-auto">
                  <SelectValue placeholder="Change Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <Select 
                  value={selectedTechnician} 
                  onValueChange={setSelectedTechnician}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Assign to technician" />
                  </SelectTrigger>
                  <SelectContent>
                    {technicians.map(tech => (
                      <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={handleAssignTicket} 
                disabled={!selectedTechnician}
                size="sm"
              >
                Assign
              </Button>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium">Notes & Updates</h4>
            
            {ticket.notes && ticket.notes.length > 0 ? (
              <div className="space-y-3">
                {ticket.notes.map((note) => (
                  <div 
                    key={note.id} 
                    className={cn(
                      "p-3 rounded-lg text-sm", 
                      note.isInternal 
                        ? "bg-muted border border-muted-foreground/20" 
                        : "bg-primary/10"
                    )}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="font-medium flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {note.author}
                        {note.isInternal && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">
                            Internal
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatDateTime(note.timestamp)}
                      </div>
                    </div>
                    <p>{note.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No notes yet</p>
            )}
            
            <div className="space-y-2 pt-2">
              <Textarea 
                placeholder="Add a note or update..." 
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={isInternalNote}
                    onChange={(e) => setIsInternalNote(e.target.checked)}
                    className="rounded"
                  />
                  Internal note only
                </label>
                <Button onClick={handleAddNote} disabled={!note.trim()}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Add Note
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TicketDetailPanel;
