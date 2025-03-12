
import React from 'react';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import { TicketFilter } from '@/types/tickets';

interface TicketFiltersProps {
  filters: TicketFilter;
  onFilterChange: (filters: TicketFilter) => void;
  technicians: string[];
}

export const TicketFilters = ({ 
  filters, 
  onFilterChange,
  technicians
}: TicketFiltersProps) => {
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleStatusChange = (value: string) => {
    onFilterChange({ ...filters, status: value as any });
  };

  const handlePriorityChange = (value: string) => {
    onFilterChange({ ...filters, priority: value as any });
  };

  const handleTechnicianChange = (value: string) => {
    onFilterChange({ ...filters, technician: value });
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by ticket ID or keyword..."
          className="pl-9"
          value={filters.search}
          onChange={handleSearchChange}
        />
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Select 
          value={filters.status} 
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="w-full sm:w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
        
        <Select 
          value={filters.priority} 
          onValueChange={handlePriorityChange}
        >
          <SelectTrigger className="w-full sm:w-[140px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
        
        <Select 
          value={filters.technician} 
          onValueChange={handleTechnicianChange}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Assigned To" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Technicians</SelectItem>
            {technicians.map(tech => (
              <SelectItem key={tech} value={tech}>{tech}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TicketFilters;
