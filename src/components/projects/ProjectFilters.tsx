
import React from 'react';
import { ProjectFilter, ProjectStatus, ProjectComplexity } from '@/types/projects';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  AlertOctagon,
  AlertTriangle,
  CheckCircle, 
  Clock, 
  Filter, 
  PlayCircle, 
  Plus, 
  Search, 
  X,
  Gauge
} from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

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

  const handleComplexityChange = (value: string) => {
    onFilterChange({ 
      ...filter, 
      complexity: value as ProjectComplexity | 'all'
    });
  };

  const handleAtRiskToggle = (checked: boolean) => {
    onFilterChange({
      ...filter,
      showAtRisk: checked
    });
  };

  const handleResetFilters = () => {
    onFilterChange({
      status: 'all',
      teamId: 'all',
      searchQuery: '',
      complexity: 'all',
      showAtRisk: false
    });
  };

  const isFiltersActive = 
    filter.status !== 'all' || 
    filter.teamId !== 'all' || 
    !!filter.searchQuery || 
    filter.complexity !== 'all' ||
    filter.showAtRisk;

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
              <SelectItem value="at-risk">
                <span className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  At Risk
                </span>
              </SelectItem>
              <SelectItem value="blocked">
                <span className="flex items-center gap-2">
                  <AlertOctagon className="h-4 w-4 text-red-500" />
                  Blocked
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
          
          <Select value={filter.complexity || 'all'} onValueChange={handleComplexityChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Complexity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                <span className="flex items-center gap-2">
                  <Gauge className="h-4 w-4" />
                  All Complexity
                </span>
              </SelectItem>
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="large">Large</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex items-center gap-2 px-2">
            <Switch 
              id="at-risk" 
              checked={filter.showAtRisk}
              onCheckedChange={handleAtRiskToggle}
            />
            <Label htmlFor="at-risk" className="text-sm cursor-pointer">At Risk Only</Label>
          </div>
          
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
