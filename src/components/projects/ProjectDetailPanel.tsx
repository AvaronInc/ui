
import React, { useState } from 'react';
import { Project, Task, TeamMember } from '@/types/projects';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Calendar, 
  CheckCircle2, 
  ChevronLeft, 
  Clock, 
  Edit, 
  Plus, 
  Trash2, 
  Users, 
  X
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface ProjectDetailPanelProps {
  project: Project | null;
  onClose: () => void;
  onTaskToggle: (task: Task) => void;
}

export const ProjectDetailPanel = ({ 
  project, 
  onClose,
  onTaskToggle
}: ProjectDetailPanelProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!project) return null;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', { 
        year: 'numeric', 
        month: 'long', 
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

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
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

  const findAssignee = (assigneeId?: string): TeamMember | undefined => {
    if (!assigneeId) return undefined;
    return project.team.members.find(member => member.id === assigneeId);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <Button variant="ghost" size="sm" onClick={onClose}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Button>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-6 overflow-y-auto">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">{project.name}</h2>
            <div className="flex items-center gap-2 mt-2">
              <div className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-full text-sm",
                getStatusColor(project.status)
              )}>
                {project.status === 'not-started' && <Clock className="h-3 w-3" />}
                {project.status === 'in-progress' && <Clock className="h-3 w-3" />}
                {project.status === 'completed' && <CheckCircle2 className="h-3 w-3" />}
                <span className="capitalize">{project.status.replace('-', ' ')}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                Due {getTimeUntilDeadline(project.deadline)}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 pt-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="text-muted-foreground">{project.description}</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Timeline</h3>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Progress</span>
                  <span className="text-sm font-medium">{project.progressPercentage}%</span>
                </div>
                <Progress value={project.progressPercentage} className="h-2" />
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Started: {formatDate(project.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Due: {formatDate(project.deadline)}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Recent Tasks</h3>
                <Button variant="ghost" size="sm" onClick={() => setActiveTab('tasks')}>
                  View All
                </Button>
              </div>
              <ul className="space-y-2">
                {project.tasks.slice(0, 3).map(task => (
                  <li key={task.id} className="flex items-start gap-2 p-2 rounded-md hover:bg-muted/50">
                    <Checkbox 
                      id={`task-${task.id}`}
                      checked={task.completed}
                      onCheckedChange={() => onTaskToggle(task)}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <label 
                        htmlFor={`task-${task.id}`}
                        className={cn(
                          "font-medium cursor-pointer",
                          task.completed && "line-through text-muted-foreground"
                        )}
                      >
                        {task.title}
                      </label>
                      {task.assigneeId && (
                        <div className="flex items-center mt-1 text-xs text-muted-foreground">
                          <span>Assigned to: {findAssignee(task.assigneeId)?.name || 'Unknown'}</span>
                        </div>
                      )}
                    </div>
                    {task.dueDate && (
                      <div className="text-xs text-muted-foreground whitespace-nowrap">
                        Due {formatDistanceToNow(new Date(task.dueDate), { addSuffix: true })}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="tasks" className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Tasks</h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm">Overall Progress</span>
                <span className="text-sm font-medium">{project.progressPercentage}%</span>
              </div>
              <Progress value={project.progressPercentage} className="h-2" />
            </div>

            <Separator />
            
            <ul className="space-y-2">
              {project.tasks.map(task => (
                <li key={task.id} className="flex items-start gap-2 p-3 rounded-md hover:bg-muted/50 border bg-card">
                  <Checkbox 
                    id={`task-detail-${task.id}`}
                    checked={task.completed}
                    onCheckedChange={() => onTaskToggle(task)}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <label 
                        htmlFor={`task-detail-${task.id}`}
                        className={cn(
                          "font-medium cursor-pointer",
                          task.completed && "line-through text-muted-foreground"
                        )}
                      >
                        {task.title}
                      </label>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    {task.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {task.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between mt-2">
                      {task.assigneeId ? (
                        <div className="flex items-center gap-2 text-xs">
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={findAssignee(task.assigneeId)?.avatar} />
                            <AvatarFallback className="text-[10px]">
                              {getInitials(findAssignee(task.assigneeId)?.name || 'U')}
                            </AvatarFallback>
                          </Avatar>
                          <span>{findAssignee(task.assigneeId)?.name}</span>
                        </div>
                      ) : (
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                          <Plus className="h-3 w-3 mr-1" />
                          Assign
                        </Button>
                      )}
                      
                      {task.dueDate && (
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(task.dueDate)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </TabsContent>
          
          <TabsContent value="team" className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{project.team.name}</h3>
                <p className="text-sm text-muted-foreground">{project.team.members.length} team members</p>
              </div>
              <Button size="sm">
                <Users className="h-4 w-4 mr-2" />
                Manage Team
              </Button>
            </div>
            
            <Separator />
            
            <ul className="space-y-3">
              {project.team.members.map(member => (
                <li key={member.id} className="flex items-center gap-3 p-3 rounded-md hover:bg-muted/50">
                  <Avatar>
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-medium">{member.name}</h4>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <span className="mr-1">Contact</span>
                  </Button>
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProjectDetailPanel;
