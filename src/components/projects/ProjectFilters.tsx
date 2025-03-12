
import React from 'react';
import { ProjectFilter, ProjectStatus } from '@/types/projects';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  Clock, 
  Filter, 
  PlayCircle, 
  Plus, 
  Search, 
  X
} from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface ProjectFiltersProps {
  filter: ProjectFilter;
  onFilterChange: (filter: ProjectFilter) => void;
  teams: { id: string; name: string }[];
  onNewProject: () => void;
}

export const ProjectFilters = ({ 
  filter, 
  onFilterChange,
  teams,
  onNewProject
}: ProjectFiltersProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filter, searchQuery: e.target.value });
  };

  const handleStatusChange = (value: string) => {
    onFilterChange({ 
      ...filter, 
      status: value as ProjectStatus | 'all'
    });
  };

  const handleTeamChange = (value: string) => {
    onFilterChange({ 
      ...filter, 
      teamId: value
    });
  };

  const handleResetFilters = () => {
    onFilterChange({
      status: 'all',
      teamId: 'all',
      searchQuery: ''
    });
  };

  const isFiltersActive = filter.status !== 'all' || filter.teamId !== 'all' || !!filter.searchQuery;

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={filter.searchQuery || ''}
            onChange={handleSearchChange}
            className="pl-9"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <Select value={filter.status || 'all'} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                <span className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  All Status
                </span>
              </SelectItem>
              <SelectItem value="not-started">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-500" />
                  Not Started
                </span>
              </SelectItem>
              <SelectItem value="in-progress">
                <span className="flex items-center gap-2">
                  <PlayCircle className="h-4 w-4 text-blue-500" />
                  In Progress
                </span>
              </SelectItem>
              <SelectItem value="completed">
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Completed
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filter.teamId || 'all'} onValueChange={handleTeamChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Team" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teams</SelectItem>
              {teams.map(team => (
                <SelectItem key={team.id} value={team.id}>
                  {team.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {isFiltersActive && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleResetFilters}
              title="Reset filters"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <Button onClick={onNewProject}>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>
    </div>
  );
};

export default ProjectFilters;
