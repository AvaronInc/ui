
import React from 'react';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Search, Filter } from 'lucide-react';
import { TicketFilter } from '@/types/tickets';

interface TicketFiltersProps {
  filters: TicketFilter;
  onFilterChange: (filters: TicketFilter) => void;
  technicians: string[];
  departments?: string[];
  locations?: string[];
}

export const TicketFilters = ({ 
  filters, 
  onFilterChange,
  technicians,
  departments = [],
  locations = []
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

  const handleDepartmentChange = (value: string) => {
    onFilterChange({ ...filters, department: value });
  };

  const handleLocationChange = (value: string) => {
    onFilterChange({ ...filters, location: value });
  };

  const handleShowAIResolvedChange = (checked: boolean) => {
    onFilterChange({ ...filters, showAIResolved: checked });
  };

  const handleAIGeneratedOnlyChange = (checked: boolean) => {
    onFilterChange({ ...filters, aiGeneratedOnly: checked });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by ticket ID, title, or description..."
            className="pl-9"
            value={filters.search}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium hidden md:block">Filters:</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        <Select 
          value={filters.status} 
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="pending-customer">Pending Customer</SelectItem>
            <SelectItem value="ai-resolved">AI Resolved</SelectItem>
            <SelectItem value="escalated">Escalated</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
        
        <Select 
          value={filters.priority} 
          onValueChange={handlePriorityChange}
        >
          <SelectTrigger className="w-full">
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
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Assigned To" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Technicians</SelectItem>
            {technicians.map(tech => (
              <SelectItem key={tech} value={tech}>{tech}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {departments.length > 0 && (
          <Select 
            value={filters.department || 'all'} 
            onValueChange={handleDepartmentChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map(dept => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        
        {locations.length > 0 && (
          <Select 
            value={filters.location || 'all'} 
            onValueChange={handleLocationChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map(loc => (
                <SelectItem key={loc} value={loc}>{loc}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      
      <div className="flex flex-wrap gap-4 sm:gap-6">
        <div className="flex items-center space-x-2">
          <Switch 
            id="show-ai-resolved" 
            checked={filters.showAIResolved}
            onCheckedChange={handleShowAIResolvedChange}
          />
          <Label htmlFor="show-ai-resolved">Show AI-Resolved Tickets</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="ai-generated-only" 
            checked={filters.aiGeneratedOnly}
            onCheckedChange={handleAIGeneratedOnlyChange}
          />
          <Label htmlFor="ai-generated-only">AI-Generated Tickets Only</Label>
        </div>
      </div>
    </div>
  );
};

export default TicketFilters;
