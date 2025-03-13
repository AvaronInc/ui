
import React, { useState } from 'react';
import { Ticket, TicketStatus } from '@/types/tickets';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface TicketActionsProps {
  ticket: Ticket;
  onStatusChange: (ticketId: string, status: TicketStatus) => void;
  onPriorityChange: (ticketId: string, priority: string) => void;
  onAssignTicket: (ticketId: string, technicianName: string) => void;
  technicians: string[];
}

const TicketActions = ({
  ticket,
  onStatusChange,
  onPriorityChange,
  onAssignTicket,
  technicians
}: TicketActionsProps) => {
  const [selectedTechnician, setSelectedTechnician] = useState<string>('unassigned');
  
  const handleAssignTicket = () => {
    if (selectedTechnician && selectedTechnician !== "unassigned") {
      onAssignTicket(ticket.id, selectedTechnician);
      setSelectedTechnician('unassigned');
    }
  };

  // Filter out any potentially empty technician values and ensure there's always at least one valid option
  const validTechnicians = technicians.filter(tech => tech && tech.trim() !== '');
  
  // If no valid technicians, add a default "None available" option
  const displayTechnicians = validTechnicians.length > 0 
    ? validTechnicians 
    : ['No technicians available'];

  return (
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
              <SelectItem value="unassigned">Select a technician</SelectItem>
              {displayTechnicians.map(tech => (
                <SelectItem key={tech} value={tech}>{tech}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button 
          onClick={handleAssignTicket} 
          disabled={!selectedTechnician || selectedTechnician === "unassigned"}
          size="sm"
        >
          Assign
        </Button>
      </div>
    </div>
  );
};

export default TicketActions;
