
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { UserFilter, UserRole, UserStatus } from '@/types/identity';
import { Search, UserPlus, RefreshCw } from 'lucide-react';

interface UserFiltersProps {
  filters: UserFilter;
  onFilterChange: (filters: UserFilter) => void;
  onOpenNewUserForm: () => void;
  isLoading?: boolean;
  onRefresh: () => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({ 
  filters, 
  onFilterChange, 
  onOpenNewUserForm, 
  isLoading = false,
  onRefresh
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, searchQuery: e.target.value });
  };

  const handleRoleChange = (value: string) => {
    onFilterChange({ 
      ...filters, 
      role: value === 'all' ? 'all' : value as UserRole 
    });
  };

  const handleStatusChange = (value: string) => {
    onFilterChange({ 
      ...filters, 
      status: value === 'all' ? 'all' : value as UserStatus 
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <h2 className="text-2xl font-semibold">Users</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            disabled={isLoading}
            onClick={onRefresh}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={onOpenNewUserForm} size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            New User
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={filters.searchQuery || ''}
            onChange={handleSearchChange}
            className="pl-8"
          />
        </div>
        
        <Select
          value={filters.role || 'all'}
          onValueChange={handleRoleChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Engineer">Engineer</SelectItem>
            <SelectItem value="User">User</SelectItem>
          </SelectContent>
        </Select>
        
        <Select
          value={filters.status || 'all'}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Suspended">Suspended</SelectItem>
            <SelectItem value="Revoked">Revoked</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default UserFilters;
