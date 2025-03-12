
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

interface IPFiltersProps {
  onFilterChange: (status: string | null) => void;
  onSearchChange: (query: string) => void;
  currentFilter: string | null;
  currentSearch: string;
}

export const IPFilters = ({ 
  onFilterChange, 
  onSearchChange,
  currentFilter,
  currentSearch
}: IPFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search IP addresses, devices, or users..."
          className="pl-9"
          value={currentSearch}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Select 
        value={currentFilter || 'all'} 
        onValueChange={(value) => onFilterChange(value === 'all' ? null : value)}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="available">Available</SelectItem>
          <SelectItem value="in-use">In Use</SelectItem>
          <SelectItem value="conflict">Conflict</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default IPFilters;
