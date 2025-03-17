
import React, { useState } from 'react';
import { Project, Task, TeamMember } from '@/types/projects';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  AlertOctagon,
  AlertTriangle,
  Calendar, 
  CheckCircle2, 
  ChevronLeft, 
  Clock, 
  Edit,
  FileText,
  Plus, 
  Rocket,
  Share2,
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
import { Badge } from '@/components/ui/badge';

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'not-started':
        return <Clock className="h-3.5 w-3.5" />;
      case 'in-progress':
        return <Clock className="h-3.5 w-3.5" />;
      case 'at-risk':
        return <AlertTriangle className="h-3.5 w-3.5" />;
      case 'blocked':
        return <AlertOctagon className="h-3.5 w-3.5" />;
      case 'completed':
        return <CheckCircle2 className="h-3.5 w-3.5" />;
      default:
        return null;
    }
  };

  const findAssignee = (assigneeId?: string): TeamMember | undefined => {
    if (!assigneeId) return undefined;
    return project.team.members.find(member => member.id === assigneeId);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-3 border-b">
        <Button variant="ghost" size="sm" onClick={onClose} className="h-8 px-2">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold line-clamp-1">{project.name}</h2>
          <div className="flex items-center gap-2 mt-1">
            <div className={cn(
              "flex items-center gap-1 px-2 py-0.5 rounded-full text-xs",
              getStatusColor(project.status)
            )}>
              {getStatusIcon(project.status)}
              <span className="capitalize">{project.status.replace('-', ' ')}</span>
            </div>
            
            <span className="text-xs text-muted-foreground">
              Due {getTimeUntilDeadline(project.deadline)}
            </span>
            
            {project.aiRiskScore !== undefined && (
              <Badge className={cn(
                "ml-auto text-xs",
                project.aiRiskScore > 70 ? "bg-red-100 text-red-800 hover:bg-red-100" : 
                project.aiRiskScore > 40 ? "bg-amber-100 text-amber-800 hover:bg-amber-100" : 
                "bg-green-100 text-green-800 hover:bg-green-100"
              )}>
                Risk: {project.aiRiskScore}
              </Badge>
            )}
          </div>
        </div>

        <div className="p-4">
          <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-3 h-8">
              <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
              <TabsTrigger value="tasks" className="text-xs">Tasks</TabsTrigger>
              <TabsTrigger value="team" className="text-xs">Team</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4 pt-4">
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">{project.description}</p>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-semibold">Timeline</h3>
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span>Progress</span>
                    <span className="font-medium">{project.progressPercentage}%</span>
                  </div>
                  <Progress 
                    value={project.progressPercentage} 
                    className="h-2"
                    indicatorClassName={
                      project.status === 'blocked' ? "bg-red-500" :
                      project.status === 'at-risk' ? "bg-amber-500" :
                      project.status === 'completed' ? "bg-green-500" :
                      "bg-primary"
                    }
                  />
                </div>
                <div className="flex justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>Started: {formatDate(project.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>Due: {formatDate(project.deadline)}</span>
                  </div>
                </div>
              </div>

              {project.nextMilestone && (
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold">Next Milestone</h3>
                  <div className="bg-blue-50 border border-blue-100 rounded-md p-2">
                    <p className="text-xs font-medium text-blue-700">{project.nextMilestone.title}</p>
                    <p className="text-xs text-blue-600 mt-1">
                      Due {formatDistanceToNow(new Date(project.nextMilestone.dueDate), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              )}
              
              {project.blockers && project.blockers.length > 0 && (
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold">Current Blockers</h3>
                  <div className="bg-red-50 border border-red-100 rounded-md p-2">
                    <ul className="text-xs text-red-700 space-y-1">
                      {project.blockers.map((blocker, index) => (
                        <li key={index} className="flex items-start gap-1">
                          <AlertOctagon className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                          <span>{blocker}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Recent Tasks</h3>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab('tasks')} className="h-7 text-xs">
                    View All
                  </Button>
                </div>
                <ul className="space-y-1.5">
                  {project.tasks.slice(0, 3).map(task => (
                    <li key={task.id} className="flex items-start gap-2 p-2 rounded-md hover:bg-muted/50 border">
                      <Checkbox 
                        id={`task-${task.id}`}
                        checked={task.completed}
                        onCheckedChange={() => onTaskToggle(task)}
                        className="mt-0.5"
                      />
                      <div className="flex-1 min-w-0">
                        <label 
                          htmlFor={`task-${task.id}`}
                          className={cn(
                            "text-xs font-medium cursor-pointer line-clamp-2",
                            task.completed && "line-through text-muted-foreground"
                          )}
                        >
                          {task.title}
                        </label>
                        {task.assigneeId && (
                          <div className="flex items-center mt-1 text-xs text-muted-foreground">
                            <span>
                              {findAssignee(task.assigneeId)?.name || 'Unknown'}
                            </span>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-2">
                <Button size="sm" className="w-full h-8 text-xs">
                  <Rocket className="h-3.5 w-3.5 mr-1.5" />
                  Generate Project Report
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="tasks" className="space-y-4 pt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold">Tasks</h3>
                <Button size="sm" className="h-7 text-xs">
                  <Plus className="h-3.5 w-3.5 mr-1.5" />
                  Add Task
                </Button>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span>Overall Progress</span>
                  <span className="font-medium">{project.progressPercentage}%</span>
                </div>
                <Progress 
                  value={project.progressPercentage} 
                  className="h-2"
                  indicatorClassName={
                    project.status === 'blocked' ? "bg-red-500" :
                    project.status === 'at-risk' ? "bg-amber-500" :
                    project.status === 'completed' ? "bg-green-500" :
                    "bg-primary"
                  }
                />
              </div>

              <Separator />
              
              <ul className="space-y-2">
                {project.tasks.map(task => (
                  <li key={task.id} className="flex items-start gap-2 p-2 rounded-md hover:bg-muted/50 border bg-card">
                    <Checkbox 
                      id={`task-detail-${task.id}`}
                      checked={task.completed}
                      onCheckedChange={() => onTaskToggle(task)}
                      className="mt-0.5"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <label 
                          htmlFor={`task-detail-${task.id}`}
                          className={cn(
                            "text-xs font-medium cursor-pointer line-clamp-2",
                            task.completed && "line-through text-muted-foreground"
                          )}
                        >
                          {task.title}
                        </label>
                        <div className="flex gap-1 ml-1 flex-shrink-0">
                          <Button variant="ghost" size="icon" className="h-5 w-5">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      {task.description && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {task.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between mt-1.5">
                        {task.assigneeId ? (
                          <div className="flex items-center gap-1.5 text-xs">
                            <Avatar className="h-4 w-4">
                              <AvatarImage src={findAssignee(task.assigneeId)?.avatar} />
                              <AvatarFallback className="text-[8px]">
                                {getInitials(findAssignee(task.assigneeId)?.name || 'U')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-muted-foreground">{findAssignee(task.assigneeId)?.name}</span>
                          </div>
                        ) : (
                          <Button variant="ghost" size="sm" className="h-5 px-2 text-xs">
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
                      
                      {task.dependencies && task.dependencies.length > 0 && (
                        <div className="mt-1.5 text-xs">
                          <span className="text-amber-600 flex items-center">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Dependencies: {task.dependencies.length}
                          </span>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="team" className="space-y-4 pt-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-semibold">{project.team.name}</h3>
                  <p className="text-xs text-muted-foreground">{project.team.members.length} team members</p>
                </div>
                <Button size="sm" className="h-7 text-xs">
                  <Users className="h-3.5 w-3.5 mr-1.5" />
                  Manage
                </Button>
              </div>
              
              <Separator />
              
              <ul className="space-y-2">
                {project.team.members.map(member => (
                  <li key={member.id} className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 border">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-medium">{member.name}</h4>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                    {member.workload !== undefined && (
                      <div className="flex items-center gap-1">
                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full",
                              member.workload > 80 ? "bg-red-500" :
                              member.workload > 60 ? "bg-amber-500" :
                              "bg-green-500"
                            )}
                            style={{ width: `${member.workload}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{member.workload}%</span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPanel;
