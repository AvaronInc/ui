
import React, { useMemo } from 'react';
import { Project, Task } from '@/types/projects';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow, format, differenceInDays, addDays, isAfter, isBefore, isSameDay } from 'date-fns';
import { ChevronRight, ChevronDown, AlertTriangle, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface GanttChartViewProps {
  projects: Project[];
}

const GanttChartView: React.FC<GanttChartViewProps> = ({ projects }) => {
  const [expandedProjects, setExpandedProjects] = React.useState<string[]>([]);
  
  // Calculate the full date range across all projects
  const { startDate, endDate, dateRange } = useMemo(() => {
    const now = new Date();
    let minDate = now;
    let maxDate = now;
    
    // Find the earliest and latest dates in all projects
    projects.forEach(project => {
      try {
        const projectStartDate = new Date(project.createdAt);
        if (isBefore(projectStartDate, minDate)) {
          minDate = projectStartDate;
        }
        
        const projectEndDate = new Date(project.deadline);
        if (isAfter(projectEndDate, maxDate)) {
          maxDate = projectEndDate;
        }
        
        // Also check all tasks
        project.tasks.forEach(task => {
          if (task.createdAt) {
            const taskStartDate = new Date(task.createdAt);
            if (isBefore(taskStartDate, minDate)) {
              minDate = taskStartDate;
            }
          }
          
          if (task.dueDate) {
            const taskDueDate = new Date(task.dueDate);
            if (isAfter(taskDueDate, maxDate)) {
              maxDate = taskDueDate;
            }
          }
        });
      } catch (error) {
        console.error('Error parsing dates for project', project.id, error);
      }
    });
    
    // Add some buffer days
    minDate = addDays(minDate, -7);
    maxDate = addDays(maxDate, 7);
    
    // Calculate total days for the chart
    const totalDays = differenceInDays(maxDate, minDate) + 1;
    
    // Generate array of all dates in range
    const dates = Array.from({ length: totalDays }, (_, i) => 
      addDays(new Date(minDate), i)
    );
    
    return { startDate: minDate, endDate: maxDate, dateRange: dates };
  }, [projects]);
  
  const toggleProject = (projectId: string) => {
    setExpandedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };
  
  const isProjectExpanded = (projectId: string) => {
    return expandedProjects.includes(projectId);
  };
  
  const getTaskBarStyle = (task: Task, project: Project) => {
    try {
      const taskStart = task.createdAt ? new Date(task.createdAt) : new Date(project.createdAt);
      const taskEnd = task.dueDate ? new Date(task.dueDate) : new Date(project.deadline);
      
      // Calculate position and width
      const startOffset = differenceInDays(taskStart, startDate);
      const duration = differenceInDays(taskEnd, taskStart) + 1;
      const totalWidth = dateRange.length;
      
      const left = `${(startOffset / totalWidth) * 100}%`;
      const width = `${(duration / totalWidth) * 100}%`;
      
      // Determine color based on completion status
      const colorClass = task.completed 
        ? 'bg-green-500' 
        : isAfter(new Date(), taskEnd) 
          ? 'bg-red-400' 
          : 'bg-blue-400';
      
      return { left, width, colorClass };
    } catch (error) {
      console.error('Error calculating task bar style', error);
      return { left: '0%', width: '5%', colorClass: 'bg-gray-300' };
    }
  };
  
  const getProjectBarStyle = (project: Project) => {
    try {
      const projectStart = new Date(project.createdAt);
      const projectEnd = new Date(project.deadline);
      
      // Calculate position and width
      const startOffset = differenceInDays(projectStart, startDate);
      const duration = differenceInDays(projectEnd, projectStart) + 1;
      const totalWidth = dateRange.length;
      
      const left = `${(startOffset / totalWidth) * 100}%`;
      const width = `${(duration / totalWidth) * 100}%`;
      
      // Determine color based on status
      let colorClass = 'bg-blue-300';
      if (project.status === 'completed') {
        colorClass = 'bg-green-300';
      } else if (project.status === 'at-risk' || project.status === 'blocked') {
        colorClass = 'bg-orange-300';
      }
      
      return { left, width, colorClass };
    } catch (error) {
      console.error('Error calculating project bar style', error);
      return { left: '0%', width: '10%', colorClass: 'bg-gray-300' };
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-3 w-3 text-green-500" />;
      case 'at-risk':
      case 'blocked':
        return <AlertTriangle className="h-3 w-3 text-orange-500" />;
      default:
        return <Clock className="h-3 w-3 text-blue-500" />;
    }
  };
  
  // Helper function to format dates for the chart header
  const formatHeaderDate = (date: Date, index: number) => {
    // Show full date for first day of month or first day of range
    if (index === 0 || date.getDate() === 1) {
      return format(date, 'MMM d');
    }
    // Just show the day for other dates
    return format(date, 'd');
  };
  
  const isToday = (date: Date) => {
    return isSameDay(date, new Date());
  };
  
  // Expand first project by default
  React.useEffect(() => {
    if (projects.length > 0 && expandedProjects.length === 0) {
      setExpandedProjects([projects[0].id]);
    }
  }, [projects]);
  
  if (projects.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">No projects available for Gantt view</p>
      </Card>
    );
  }
  
  return (
    <Card className="border rounded-lg bg-card overflow-hidden h-full">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-medium">Project Timeline (Gantt Chart)</h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-blue-400 mr-1"></div>
            <span>In Progress</span>
          </div>
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-green-400 mr-1"></div>
            <span>Completed</span>
          </div>
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-orange-400 mr-1"></div>
            <span>At Risk</span>
          </div>
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-red-400 mr-1"></div>
            <span>Overdue</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-[250px_1fr]">
        {/* Left side: Project & Task names */}
        <div className="border-r bg-muted/30">
          <div className="h-8 border-b flex items-center px-4 font-medium text-sm">
            Projects & Tasks
          </div>
          <ScrollArea className="h-[calc(100vh-300px)]">
            {projects.map(project => (
              <div key={project.id}>
                <button 
                  className="w-full px-4 py-3 text-left flex items-center gap-2 hover:bg-muted/50 border-b"
                  onClick={() => toggleProject(project.id)}
                >
                  {isProjectExpanded(project.id) ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="font-medium">{project.name}</span>
                  {getStatusIcon(project.status)}
                </button>
                
                {isProjectExpanded(project.id) && project.tasks.map(task => (
                  <div 
                    key={task.id} 
                    className="px-8 py-2 text-sm border-b flex items-center"
                  >
                    <div className={cn(
                      "h-2 w-2 rounded-full mr-2",
                      task.completed ? "bg-green-400" : "bg-blue-400"
                    )}></div>
                    <span>{task.title}</span>
                  </div>
                ))}
              </div>
            ))}
          </ScrollArea>
        </div>
        
        {/* Right side: Chart area */}
        <div className="overflow-x-auto">
          {/* Date headers */}
          <div className="h-8 border-b flex text-xs font-medium">
            {dateRange.map((date, index) => (
              <div 
                key={index} 
                className={cn(
                  "min-w-8 w-10 flex-shrink-0 text-center border-r px-1",
                  isToday(date) ? "bg-blue-50" : ""
                )}
              >
                {formatHeaderDate(date, index)}
              </div>
            ))}
          </div>
          
          {/* Chart body */}
          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="relative">
              {projects.map(project => (
                <React.Fragment key={project.id}>
                  {/* Project timeline bar */}
                  <div className="h-12 relative border-b">
                    {/* Today marker */}
                    <div 
                      className="absolute top-0 bottom-0 border-l-2 border-blue-500 z-10"
                      style={{ 
                        left: `${(differenceInDays(new Date(), startDate) / dateRange.length) * 100}%` 
                      }}
                    ></div>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div 
                            className={cn(
                              "absolute h-6 top-3 rounded-md opacity-70 hover:opacity-100 transition-opacity z-5",
                              getProjectBarStyle(project).colorClass
                            )}
                            style={{ 
                              left: getProjectBarStyle(project).left, 
                              width: getProjectBarStyle(project).width 
                            }}
                          ></div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="text-xs">
                            <p className="font-bold">{project.name}</p>
                            <p>Start: {format(new Date(project.createdAt), 'MMM d, yyyy')}</p>
                            <p>End: {format(new Date(project.deadline), 'MMM d, yyyy')}</p>
                            <p className="mt-1">Status: {project.status}</p>
                            <div className="flex items-center mt-1">
                              <div className="w-20 h-2 bg-gray-200 rounded-full mr-2">
                                <div 
                                  className="h-full bg-blue-500 rounded-full" 
                                  style={{ width: `${project.progressPercentage}%` }}
                                ></div>
                              </div>
                              <span>{project.progressPercentage}% complete</span>
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  
                  {/* Task timeline bars */}
                  {isProjectExpanded(project.id) && project.tasks.map(task => (
                    <div key={task.id} className="h-9 relative border-b">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div 
                              className={cn(
                                "absolute h-5 top-2 rounded-sm opacity-80 hover:opacity-100 transition-opacity",
                                getTaskBarStyle(task, project).colorClass
                              )}
                              style={{ 
                                left: getTaskBarStyle(task, project).left, 
                                width: getTaskBarStyle(task, project).width 
                              }}
                            ></div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="text-xs">
                              <p className="font-bold">{task.title}</p>
                              <p>{task.description}</p>
                              <div className="flex items-center gap-1 mt-1">
                                <Clock className="h-3 w-3" />
                                <span>
                                  {task.createdAt && format(new Date(task.createdAt), 'MMM d')}
                                  <ArrowRight className="inline h-3 w-3 mx-1" />
                                  {task.dueDate && format(new Date(task.dueDate), 'MMM d')}
                                </span>
                              </div>
                              <p className="mt-1">
                                {task.completed ? 
                                  <span className="text-green-500 flex items-center gap-1">
                                    <CheckCircle className="h-3 w-3" /> Completed
                                  </span> : 
                                  <span>In progress</span>
                                }
                              </p>
                              {task.assigneeId && (
                                <p className="mt-1">
                                  Assigned to: {
                                    project.team.members.find(m => m.id === task.assigneeId)?.name || 'Unknown'
                                  }
                                </p>
                              )}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </Card>
  );
};

export default GanttChartView;
