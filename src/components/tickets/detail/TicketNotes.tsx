
import React, { useState } from 'react';
import { Ticket } from '@/types/tickets';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, User } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TicketNotesProps {
  ticket: Ticket;
  onAddNote: (ticketId: string, note: string, isInternal: boolean) => void;
}

const TicketNotes = ({ ticket, onAddNote }: TicketNotesProps) => {
  const [note, setNote] = useState('');
  const [isInternalNote, setIsInternalNote] = useState(false);
  
  const handleAddNote = () => {
    if (note.trim()) {
      onAddNote(ticket.id, note, isInternalNote);
      setNote('');
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
    <div className="space-y-3">
      <h4 className="font-medium">Notes & Updates</h4>
      
      {ticket.notes && ticket.notes.length > 0 ? (
        <div className="space-y-3">
          {ticket.notes.map((noteItem) => (
            <div 
              key={noteItem.id} 
              className={cn(
                "p-3 rounded-lg text-sm", 
                noteItem.isInternal 
                  ? "bg-muted border border-muted-foreground/20" 
                  : "bg-primary/10"
              )}
            >
              <div className="flex justify-between items-start mb-1">
                <div className="font-medium flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {noteItem.author}
                  {noteItem.isInternal && (
                    <span className="text-xs px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">
                      Internal
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatDateTime(noteItem.timestamp)}
                </div>
              </div>
              <p>{noteItem.content}</p>
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
  );
};

export default TicketNotes;
