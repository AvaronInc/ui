
import React from 'react';
import { Project, ProjectStatus } from '@/types/projects';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, Clock, Eye, PlayCircle, AlertOctagon, BarChart, Calendar } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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

  const isDeadlineSoon = (deadline: string) => {
    try {
      const deadlineDate = new Date(deadline);
      const now = new Date();
      const diffDays = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays <= 7 && diffDays > 0;
    } catch (e) {
      return false;
    }
  };

  const isDeadlinePassed = (deadline: string) => {
    try {
      const deadlineDate = new Date(deadline);
      const now = new Date();
      return deadlineDate < now;
    } catch (e) {
      return false;
    }
  };

  const getStatusIcon = (status: ProjectStatus) => {
    switch (status) {
      case 'not-started':
        return <Clock className="h-4 w-4" />;
      case 'in-progress':
        return <PlayCircle className="h-4 w-4" />;
      case 'at-risk':
        return <AlertTriangle className="h-4 w-4" />;
      case 'blocked':
        return <AlertOctagon className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case 'not-started':
        return "text-slate-500 bg-slate-100";
      case 'in-progress':
        return "text-blue-500 bg-blue-50";
      case 'at-risk':
        return "text-amber-500 bg-amber-50";
      case 'blocked':
        return "text-red-500 bg-red-50";
      case 'completed':
        return "text-green-500 bg-green-50";
      default:
        return "";
    }
  };

  const getComplexityBadge = (complexity: string) => {
    switch (complexity) {
      case 'small':
        return <Badge variant="outline" className="bg-slate-50">Small</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Medium</Badge>;
      case 'large':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Large</Badge>;
      case 'critical':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Critical</Badge>;
      default:
        return null;
    }
  };

  const getProgressColor = (progress: number, status: ProjectStatus) => {
    if (status === 'blocked') return "bg-red-500";
    if (status === 'at-risk') return "bg-amber-500";
    if (status === 'completed') return "bg-green-500";
    return progress < 25 ? "bg-slate-500" : 
           progress < 50 ? "bg-blue-500" : 
           progress < 75 ? "bg-indigo-500" : 
           "bg-violet-500";
  };

  return (
    <div className="h-full w-full overflow-hidden rounded-lg border bg-card">
      <ScrollArea className="h-full w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[180px]">Project Name</TableHead>
              <TableHead className="min-w-[130px]">Status</TableHead>
              <TableHead className="min-w-[130px]">Team</TableHead>
              <TableHead className="min-w-[150px]">Progress</TableHead>
              <TableHead className="min-w-[150px]">Deadline</TableHead>
              <TableHead className="min-w-[120px]">Complexity</TableHead>
              <TableHead className="text-center min-w-[100px]">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="flex items-center justify-center gap-1">
                        Risk <BarChart className="h-3.5 w-3.5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>AI Risk Assessment Score (0-100)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableHead>
              <TableHead className="text-right min-w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center p-4">
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
                  <TableCell className="font-medium whitespace-nowrap">
                    <div className="flex flex-col">
                      <span>{project.name}</span>
                      {project.isAtRisk && (
                        <span className="text-xs text-amber-500 flex items-center mt-0.5">
                          <AlertTriangle className="h-3 w-3 mr-1" /> At risk
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={cn(
                      "flex items-center gap-2 px-2 py-1 rounded-full w-fit",
                      getStatusColor(project.status)
                    )}>
                      {getStatusIcon(project.status)}
                      <span className="capitalize whitespace-nowrap">{project.status.replace('-', ' ')}</span>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center">
                      <span>{project.team.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        ({project.team.members.length})
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={project.progressPercentage} 
                        className="h-2 w-[100px]"
                        indicatorClassName={getProgressColor(project.progressPercentage, project.status)}
                      />
                      <span className="text-sm whitespace-nowrap">{project.progressPercentage}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        <span>{formatDate(project.deadline)}</span>
                      </div>
                      <span className={cn(
                        "text-xs mt-0.5",
                        isDeadlinePassed(project.deadline) ? "text-red-500" : 
                        isDeadlineSoon(project.deadline) ? "text-amber-500" : 
                        "text-muted-foreground"
                      )}>
                        {getTimeUntilDeadline(project.deadline)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getComplexityBadge(project.complexity)}
                  </TableCell>
                  <TableCell className="text-center">
                    {project.aiRiskScore !== undefined ? (
                      <Badge className={cn(
                        "font-mono",
                        project.aiRiskScore > 70 ? "bg-red-100 text-red-800 hover:bg-red-100" : 
                        project.aiRiskScore > 40 ? "bg-amber-100 text-amber-800 hover:bg-amber-100" : 
                        "bg-green-100 text-green-800 hover:bg-green-100"
                      )}>
                        {project.aiRiskScore}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground text-sm">N/A</span>
                    )}
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
                      <Eye className="h-4 w-4 mr-2" />
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
