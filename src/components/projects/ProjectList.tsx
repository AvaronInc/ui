import React from 'react';
import { Project } from '@/types/projects';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, PlayCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ProjectListProps {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
  selectedProject: Project | null;
}

export const ProjectList = ({ 
  projects, 
  onProjectSelect,
  selectedProject 
}: ProjectListProps) => {
  
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }).format(date);
    } catch (e) {
      return 'Invalid date';
    }
  };

  const getTimeUntilDeadline = (deadline: string) => {
    try {
      return formatDistanceToNow(new Date(deadline), { addSuffix: true });
    } catch (e) {
      return 'Unknown';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'not-started':
        return <Clock className="h-4 w-4" />;
      case 'in-progress':
        return <PlayCircle className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not-started':
        return "text-slate-500 bg-slate-100";
      case 'in-progress':
        return "text-blue-500 bg-blue-50";
      case 'completed':
        return "text-green-500 bg-green-50";
      default:
        return "";
    }
  };

  return (
    <div className="h-full w-full overflow-hidden rounded-lg border bg-card">
      <ScrollArea className="h-full w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[150px]">Project Name</TableHead>
              <TableHead className="min-w-[130px]">Status</TableHead>
              <TableHead className="min-w-[130px]">Assigned Team</TableHead>
              <TableHead className="min-w-[150px]">Progress</TableHead>
              <TableHead className="min-w-[150px]">Deadline</TableHead>
              <TableHead className="text-right min-w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center p-4">
                  No projects found
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow 
                  key={project.id} 
                  className={cn(
                    "cursor-pointer hover:bg-muted/50",
                    selectedProject?.id === project.id && "bg-muted"
                  )}
                  onClick={() => onProjectSelect(project)}
                >
                  <TableCell className="font-medium whitespace-nowrap">{project.name}</TableCell>
                  <TableCell>
                    <div className={cn(
                      "flex items-center gap-2 px-2 py-1 rounded-full w-fit",
                      getStatusColor(project.status)
                    )}>
                      {getStatusIcon(project.status)}
                      <span className="capitalize whitespace-nowrap">{project.status.replace('-', ' ')}</span>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{project.team.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={project.progressPercentage} className="h-2 w-[100px]" />
                      <span className="text-sm whitespace-nowrap">{project.progressPercentage}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col whitespace-nowrap">
                      <span>{formatDate(project.deadline)}</span>
                      <span className="text-xs text-muted-foreground">{getTimeUntilDeadline(project.deadline)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right whitespace-nowrap">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        onProjectSelect(project);
                      }}
                    >
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default ProjectList;
