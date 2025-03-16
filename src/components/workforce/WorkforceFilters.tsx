
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { PatchStatus, Role, WorkforceFilter } from '@/types/workforce';
import { X, Search, Filter } from 'lucide-react';

interface WorkforceFiltersProps {
  filters: WorkforceFilter;
  onFilterChange: (filters: WorkforceFilter) => void;
  departments: string[];
  roles: Role[];
  locations: string[];
  groupBy: string;
  onGroupByChange: (value: string) => void;
}

const WorkforceFilters = ({
  filters,
  onFilterChange,
  departments,
  roles,
  locations,
  groupBy,
  onGroupByChange
}: WorkforceFiltersProps) => {
  const updateSearchQuery = (value: string) => {
    onFilterChange({ ...filters, searchQuery: value });
  };
  
  const updateDepartmentFilter = (value: string) => {
    const currentDepts = filters.department || [];
    const newDepts = currentDepts.includes(value)
      ? currentDepts.filter(d => d !== value)
      : [...currentDepts, value];
    
    onFilterChange({ ...filters, department: newDepts.length ? newDepts : undefined });
  };
  
  const updateRoleFilter = (value: Role) => {
    const currentRoles = filters.role || [];
    const newRoles = currentRoles.includes(value)
      ? currentRoles.filter(r => r !== value)
      : [...currentRoles, value];
    
    onFilterChange({ ...filters, role: newRoles.length ? newRoles : undefined });
  };
  
  const updateLocationFilter = (value: string) => {
    const currentLocations = filters.location || [];
    const newLocations = currentLocations.includes(value)
      ? currentLocations.filter(l => l !== value)
      : [...currentLocations, value];
    
    onFilterChange({ ...filters, location: newLocations.length ? newLocations : undefined });
  };
  
  const updateStatusFilter = (value: PatchStatus) => {
    const currentStatuses = filters.status || [];
    const newStatuses = currentStatuses.includes(value)
      ? currentStatuses.filter(s => s !== value)
      : [...currentStatuses, value];
    
    onFilterChange({ ...filters, status: newStatuses.length ? newStatuses : undefined });
  };
  
  const clearFilters = () => {
    onFilterChange({});
  };
  
  const hasFilters = Object.values(filters).some(value => 
    Array.isArray(value) ? value.length > 0 : !!value
  );
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search devices or users..."
            className="pl-9"
            value={filters.searchQuery || ''}
            onChange={(e) => updateSearchQuery(e.target.value)}
          />
          {filters.searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1.5 h-6 w-6"
              onClick={() => updateSearchQuery('')}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
        
        <Select
          value={groupBy}
          onValueChange={onGroupByChange}
        >
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Group by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="department">Group by Department</SelectItem>
            <SelectItem value="location">Group by Location</SelectItem>
            <SelectItem value="status">Group by Status</SelectItem>
            <SelectItem value="role">Group by Role</SelectItem>
            <SelectItem value="">No Grouping</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <div className="flex gap-1.5 flex-wrap">
          {departments.map(dept => (
            <Badge
              key={dept}
              variant={filters.department?.includes(dept) ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => updateDepartmentFilter(dept)}
            >
              {dept}
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-1.5 flex-wrap ml-1">
          {roles.map(role => (
            <Badge
              key={role}
              variant={filters.role?.includes(role) ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => updateRoleFilter(role)}
            >
              {role === 'admin' ? 'Admin' : role === 'manager' ? 'Manager' : 'User'}
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-1.5 flex-wrap ml-1">
          {['up_to_date', 'needs_patch', 'security_issue'].map((status) => (
            <Badge
              key={status}
              variant={filters.status?.includes(status as PatchStatus) ? 'default' : 'outline'}
              className={`cursor-pointer ${
                status === 'up_to_date' 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : status === 'needs_patch'
                    ? 'bg-amber-500 hover:bg-amber-600' 
                    : 'bg-red-500 hover:bg-red-600'
              }`}
              onClick={() => updateStatusFilter(status as PatchStatus)}
            >
              {status === 'up_to_date' ? 'Up to Date' : status === 'needs_patch' ? 'Needs Patch' : 'Security Issue'}
            </Badge>
          ))}
        </div>
        
        {hasFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
            className="ml-auto"
          >
            <X className="mr-1 h-3.5 w-3.5" /> Clear
          </Button>
        )}
      </div>
    </div>
  );
};

export default WorkforceFilters;
