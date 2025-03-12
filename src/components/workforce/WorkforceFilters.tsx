
import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { WorkforceFilter, PatchStatus, Role } from '@/types/workforce';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

interface WorkforceFiltersProps {
  filters: WorkforceFilter;
  onFilterChange: (filters: WorkforceFilter) => void;
  departments: string[];
  roles: Role[];
  locations: string[];
  groupBy: string;
  onGroupByChange: (value: string) => void;
}

const statusOptions: { value: PatchStatus; label: string }[] = [
  { value: 'up_to_date', label: 'Up to Date' },
  { value: 'needs_patch', label: 'Needs Patch' },
  { value: 'security_issue', label: 'Security Issue' },
];

const groupByOptions = [
  { value: 'department', label: 'Department' },
  { value: 'role', label: 'Role' },
  { value: 'location', label: 'Location' },
];

const WorkforceFilters = ({ 
  filters, 
  onFilterChange,
  departments,
  roles,
  locations,
  groupBy,
  onGroupByChange
}: WorkforceFiltersProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, searchQuery: e.target.value });
  };

  const toggleDepartment = (department: string) => {
    const current = filters.department || [];
    const updated = current.includes(department)
      ? current.filter(d => d !== department)
      : [...current, department];
    onFilterChange({ ...filters, department: updated });
  };

  const toggleRole = (role: Role) => {
    const current = filters.role || [];
    const updated = current.includes(role)
      ? current.filter(r => r !== role)
      : [...current, role];
    onFilterChange({ ...filters, role: updated });
  };

  const toggleLocation = (location: string) => {
    const current = filters.location || [];
    const updated = current.includes(location)
      ? current.filter(l => l !== location)
      : [...current, location];
    onFilterChange({ ...filters, location: updated });
  };

  const toggleStatus = (status: PatchStatus) => {
    const current = filters.status || [];
    const updated = current.includes(status)
      ? current.filter(s => s !== status)
      : [...current, status];
    onFilterChange({ ...filters, status: updated });
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  const totalActiveFilters = (
    (filters.department?.length || 0) +
    (filters.role?.length || 0) +
    (filters.location?.length || 0) +
    (filters.status?.length || 0)
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users or devices..."
            className="pl-8"
            value={filters.searchQuery || ''}
            onChange={handleSearchChange}
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" />
              Filters
              {totalActiveFilters > 0 && (
                <Badge className="ml-1 h-5 w-5 rounded-full p-0 text-xs" variant="secondary">
                  {totalActiveFilters}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Filter By</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs">Status</DropdownMenuLabel>
              {statusOptions.map((status) => (
                <DropdownMenuItem key={status.value} onSelect={(e) => e.preventDefault()}>
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id={`status-${status.value}`}
                      checked={(filters.status || []).includes(status.value)}
                      onCheckedChange={() => toggleStatus(status.value)}
                    />
                    <label htmlFor={`status-${status.value}`} className="text-sm flex-1 cursor-pointer">
                      {status.label}
                    </label>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs">Department</DropdownMenuLabel>
              {departments.map((dept) => (
                <DropdownMenuItem key={dept} onSelect={(e) => e.preventDefault()}>
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id={`dept-${dept}`}
                      checked={(filters.department || []).includes(dept)}
                      onCheckedChange={() => toggleDepartment(dept)}
                    />
                    <label htmlFor={`dept-${dept}`} className="text-sm flex-1 cursor-pointer">
                      {dept}
                    </label>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs">Role</DropdownMenuLabel>
              {roles.map((role) => (
                <DropdownMenuItem key={role} onSelect={(e) => e.preventDefault()}>
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id={`role-${role}`}
                      checked={(filters.role || []).includes(role)}
                      onCheckedChange={() => toggleRole(role)}
                    />
                    <label htmlFor={`role-${role}`} className="text-sm flex-1 cursor-pointer">
                      {role}
                    </label>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs">Location</DropdownMenuLabel>
              {locations.map((loc) => (
                <DropdownMenuItem key={loc} onSelect={(e) => e.preventDefault()}>
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id={`loc-${loc}`}
                      checked={(filters.location || []).includes(loc)}
                      onCheckedChange={() => toggleLocation(loc)}
                    />
                    <label htmlFor={`loc-${loc}`} className="text-sm flex-1 cursor-pointer">
                      {loc}
                    </label>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator />
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-center"
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Group By: {groupByOptions.find(opt => opt.value === groupBy)?.label || 'None'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {groupByOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => onGroupByChange(option.value)}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {totalActiveFilters > 0 && (
        <div className="flex flex-wrap gap-2">
          {(filters.department || []).map(dept => (
            <Badge key={`dept-${dept}`} variant="secondary" className="flex gap-1 items-center">
              Department: {dept}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => toggleDepartment(dept)}
              />
            </Badge>
          ))}
          
          {(filters.role || []).map(role => (
            <Badge key={`role-${role}`} variant="secondary" className="flex gap-1 items-center">
              Role: {role}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => toggleRole(role)}
              />
            </Badge>
          ))}
          
          {(filters.location || []).map(loc => (
            <Badge key={`loc-${loc}`} variant="secondary" className="flex gap-1 items-center">
              Location: {loc}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => toggleLocation(loc)}
              />
            </Badge>
          ))}
          
          {(filters.status || []).map(status => (
            <Badge key={`status-${status}`} variant="secondary" className="flex gap-1 items-center">
              Status: {statusOptions.find(opt => opt.value === status)?.label}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => toggleStatus(status)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkforceFilters;
