
import React from 'react';
import { 
  Filter, 
  Search,
  Users,
  MapPin,
  BadgeCheck,
  ArrowDownUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { WorkforceFilter, PatchStatus, Role } from '@/types/workforce';

interface WorkforceFiltersProps {
  filters: WorkforceFilter;
  onFilterChange: (filters: WorkforceFilter) => void;
  departments: string[];
  roles: string[];
  locations: string[];
  groupBy: string;
  onGroupByChange: (groupBy: string) => void;
}

const WorkforceFilters: React.FC<WorkforceFiltersProps> = ({
  filters,
  onFilterChange,
  departments,
  roles,
  locations,
  groupBy,
  onGroupByChange
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      searchQuery: e.target.value
    });
  };
  
  const handleDepartmentChange = (value: string) => {
    // If the value is 'all', clear the department filter
    if (value === 'all') {
      const { department, ...rest } = filters;
      onFilterChange(rest);
    } else {
      onFilterChange({
        ...filters,
        department: [value]
      });
    }
  };
  
  const handleRoleChange = (value: string) => {
    if (value === 'all') {
      const { role, ...rest } = filters;
      onFilterChange(rest);
    } else {
      onFilterChange({
        ...filters,
        role: [value as Role]
      });
    }
  };
  
  const handleLocationChange = (value: string) => {
    if (value === 'all') {
      const { location, ...rest } = filters;
      onFilterChange(rest);
    } else {
      onFilterChange({
        ...filters,
        location: [value]
      });
    }
  };
  
  const handleStatusChange = (value: string) => {
    if (value === 'all') {
      const { status, ...rest } = filters;
      onFilterChange(rest);
    } else {
      onFilterChange({
        ...filters,
        status: [value as PatchStatus]
      });
    }
  };
  
  return (
    <div className="bg-card border rounded-md p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium flex items-center">
          <Filter className="mr-2 h-5 w-5 text-muted-foreground" />
          Filters
        </h3>
        
        <Select 
          value={groupBy || 'none'} 
          onValueChange={onGroupByChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Group by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="none">No Grouping</SelectItem>
              <SelectItem value="department">Department</SelectItem>
              <SelectItem value="location">Location</SelectItem>
              <SelectItem value="role">Role</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search devices..."
              className="pl-8"
              value={filters.searchQuery || ''}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        
        <div>
          <Select 
            value={filters.department?.[0] || 'all'} 
            onValueChange={handleDepartmentChange}
          >
            <SelectTrigger>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Department</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map(dept => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Select 
            value={filters.role?.[0] || 'all'} 
            onValueChange={handleRoleChange}
          >
            <SelectTrigger>
              <div className="flex items-center">
                <BadgeCheck className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Role</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {roles.map(role => (
                <SelectItem key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Select 
            value={filters.location?.[0] || 'all'} 
            onValueChange={handleLocationChange}
          >
            <SelectTrigger>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Location</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map(location => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Select 
            value={filters.status?.[0] || 'all'} 
            onValueChange={handleStatusChange}
          >
            <SelectTrigger>
              <div className="flex items-center">
                <ArrowDownUp className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Status</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="up_to_date">Up to date</SelectItem>
              <SelectItem value="needs_patch">Needs patch</SelectItem>
              <SelectItem value="security_issue">Security issue</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {Object.keys(filters).length > 0 && filters.searchQuery === undefined && (
        <div className="flex flex-wrap gap-2 mt-2">
          {filters.department && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
              Department: {filters.department[0]}
            </Badge>
          )}
          {filters.role && (
            <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
              Role: {filters.role[0]}
            </Badge>
          )}
          {filters.location && (
            <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
              Location: {filters.location[0]}
            </Badge>
          )}
          {filters.status && (
            <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400">
              Status: {filters.status[0].replace('_', ' ')}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default WorkforceFilters;
