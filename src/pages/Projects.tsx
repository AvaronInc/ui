
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTransition from '@/components/transitions/PageTransition';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Archive, BarChart, Calendar, GanttChart } from 'lucide-react';
import { 
  ProjectFilter, 
  Project, 
  Task, 
  ProjectStatistics, 
  AIProjectSuggestion 
} from '@/types/projects';
import ProjectList from '@/components/projects/ProjectList';
import ProjectDetailPanel from '@/components/projects/ProjectDetailPanel';
import ProjectFilters from '@/components/projects/ProjectFilters';
import ProjectStatCards from '@/components/projects/ProjectStatCards';
import AIProjectPanel from '@/components/projects/AIProjectPanel';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// This is just sample data - in a real application, this would come from an API
const sampleProjects: Project[] = [
  {
    id: '1',
    name: 'Network Infrastructure Upgrade',
    description: 'Upgrading the entire office network infrastructure to support 10Gb speeds, improving connectivity and reliability for all staff.',
    status: 'in-progress',
    team: {
      id: 'team-1',
      name: 'Network Team',
      members: [
        {
          id: 'user-1',
          name: 'John Smith',
          email: 'john@example.com',
          role: 'Network Engineer',
          avatar: '/placeholder.svg'
        },
        {
          id: 'user-2',
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          role: 'Network Administrator',
          avatar: '/placeholder.svg'
        },
        {
          id: 'user-3',
          name: 'Mike Lee',
          email: 'mike@example.com',
          role: 'IT Specialist',
          avatar: '/placeholder.svg'
        }
      ]
    },
    tasks: [
      {
        id: 'task-1',
        title: 'Network Assessment',
        description: 'Evaluate current network performance and document findings',
        completed: true,
        assigneeId: 'user-1',
        dueDate: '2023-11-15T00:00:00.000Z',
        createdAt: '2023-11-01T00:00:00.000Z'
      },
      {
        id: 'task-2',
        title: 'Purchase New Equipment',
        description: 'Order new switches, routers, and cabling required for the upgrade',
        completed: true,
        assigneeId: 'user-2',
        dueDate: '2023-12-01T00:00:00.000Z',
        createdAt: '2023-11-10T00:00:00.000Z'
      },
      {
        id: 'task-3',
        title: 'Install New Switches',
        description: 'Replace existing switches with new 10Gb models',
        completed: false,
        assigneeId: 'user-3',
        dueDate: '2024-01-15T00:00:00.000Z',
        createdAt: '2023-12-15T00:00:00.000Z'
      },
      {
        id: 'task-4',
        title: 'Rewire Server Room',
        description: 'Reorganize and label all cabling in the server room',
        completed: false,
        assigneeId: 'user-1',
        dueDate: '2024-01-30T00:00:00.000Z',
        createdAt: '2023-12-20T00:00:00.000Z'
      },
      {
        id: 'task-5',
        title: 'Test Network Speed',
        description: 'Conduct speed tests across all departments to verify improvements',
        completed: false,
        assigneeId: 'user-2',
        dueDate: '2024-02-15T00:00:00.000Z',
        createdAt: '2023-12-30T00:00:00.000Z'
      }
    ],
    progressPercentage: 40,
    deadline: '2024-03-01T00:00:00.000Z',
    createdAt: '2023-11-01T00:00:00.000Z',
    updatedAt: '2024-01-05T00:00:00.000Z',
    complexity: 'large'
  },
  {
    id: '2',
    name: 'Security Compliance Audit',
    description: 'Conduct a comprehensive security audit to ensure compliance with industry regulations and identify potential vulnerabilities.',
    status: 'not-started',
    team: {
      id: 'team-2',
      name: 'Security Team',
      members: [
        {
          id: 'user-4',
          name: 'Alex Williams',
          email: 'alex@example.com',
          role: 'Security Analyst',
          avatar: '/placeholder.svg'
        },
        {
          id: 'user-5',
          name: 'Emily Chen',
          email: 'emily@example.com',
          role: 'Compliance Officer',
          avatar: '/placeholder.svg'
        }
      ]
    },
    tasks: [
      {
        id: 'task-6',
        title: 'Define Audit Scope',
        description: 'Identify systems and processes to be included in the audit',
        completed: false,
        assigneeId: 'user-4',
        dueDate: '2024-02-15T00:00:00.000Z',
        createdAt: '2024-01-15T00:00:00.000Z'
      },
      {
        id: 'task-7',
        title: 'Prepare Audit Checklist',
        description: 'Create comprehensive checklist based on compliance requirements',
        completed: false,
        assigneeId: 'user-5',
        dueDate: '2024-02-28T00:00:00.000Z',
        createdAt: '2024-01-20T00:00:00.000Z'
      }
    ],
    progressPercentage: 0,
    deadline: '2024-05-30T00:00:00.000Z',
    createdAt: '2024-01-15T00:00:00.000Z',
    updatedAt: '2024-01-15T00:00:00.000Z',
    complexity: 'medium'
  },
  {
    id: '3',
    name: 'Office 365 Migration',
    description: 'Migrate all email accounts and documents to Office 365 cloud services to improve collaboration and accessibility.',
    status: 'completed',
    team: {
      id: 'team-3',
      name: 'Cloud Services Team',
      members: [
        {
          id: 'user-6',
          name: 'David Wilson',
          email: 'david@example.com',
          role: 'Cloud Architect',
          avatar: '/placeholder.svg'
        },
        {
          id: 'user-7',
          name: 'Lisa Brown',
          email: 'lisa@example.com',
          role: 'Systems Administrator',
          avatar: '/placeholder.svg'
        }
      ]
    },
    tasks: [
      {
        id: 'task-8',
        title: 'Set Up Office 365 Tenant',
        description: 'Configure new Office 365 tenant for the organization',
        completed: true,
        assigneeId: 'user-6',
        dueDate: '2023-09-15T00:00:00.000Z',
        createdAt: '2023-09-01T00:00:00.000Z'
      },
      {
        id: 'task-9',
        title: 'Migrate Email Accounts',
        description: 'Transfer all email accounts and archives to Exchange Online',
        completed: true,
        assigneeId: 'user-7',
        dueDate: '2023-10-15T00:00:00.000Z',
        createdAt: '2023-09-20T00:00:00.000Z'
      },
      {
        id: 'task-10',
        title: 'Migrate File Server',
        description: 'Move all shared documents to SharePoint Online',
        completed: true,
        assigneeId: 'user-6',
        dueDate: '2023-11-30T00:00:00.000Z',
        createdAt: '2023-10-01T00:00:00.000Z'
      },
      {
        id: 'task-11',
        title: 'Train Staff',
        description: 'Conduct training sessions for all staff on using Office 365 tools',
        completed: true,
        assigneeId: 'user-7',
        dueDate: '2023-12-15T00:00:00.000Z',
        createdAt: '2023-11-15T00:00:00.000Z'
      }
    ],
    progressPercentage: 100,
    deadline: '2023-12-31T00:00:00.000Z',
    createdAt: '2023-09-01T00:00:00.000Z',
    updatedAt: '2023-12-20T00:00:00.000Z',
    complexity: 'small'
  }
];

// Sample project statistics
const projectStatistics: ProjectStatistics = {
  activeProjects: 3,
  atRiskProjects: 1,
  upcomingDeadlines: 2,
  completedProjects: 1,
  trendDirection: 'up',
  trendPercentage: 15
};

// Sample AI suggestions
const aiSuggestions: AIProjectSuggestion[] = [
  {
    id: 'sugg-1',
    type: 'deadline',
    title: 'Network Infrastructure Upgrade at risk',
    description: 'This project is delayed due to dependency issues with task "Rewire Server Room". Consider adjusting the timeline.',
    projectId: '1',
    actionType: 'adjust-timeline',
    severity: 'high'
  },
  {
    id: 'sugg-2',
    type: 'resource',
    title: 'Team members overloaded',
    description: 'John Smith is assigned to 3 critical tasks with overlapping deadlines. Consider reassigning some tasks.',
    projectId: '1',
    actionType: 'reassign-tasks',
    severity: 'medium'
  },
  {
    id: 'sugg-3',
    type: 'report',
    title: 'Office 365 Migration completed',
    description: 'This project is now 100% complete. Would you like to generate a completion report?',
    projectId: '3',
    actionType: 'generate-report',
    severity: 'low'
  }
];

const Projects = () => {
  const { toast } = useToast();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>(() => {
    // Add AI risk scores and complexity to sample data
    return sampleProjects.map(project => ({
      ...project,
      complexity: (project.id === '1' ? 'large' : project.id === '2' ? 'medium' : 'small') as any,
      aiRiskScore: project.id === '1' ? 75 : project.id === '2' ? 25 : 10,
      isAtRisk: project.id === '1'
    }));
  });
  const [filter, setFilter] = useState<ProjectFilter>({
    status: 'all',
    teamId: 'all',
    searchQuery: '',
    complexity: 'all',
    showAtRisk: false
  });
  const [viewMode, setViewMode] = useState<'list' | 'gantt'>('list');

  const teams = Array.from(
    new Set(projects.map(project => project.team.id))
  ).map(teamId => {
    const team = projects.find(project => project.team.id === teamId)?.team;
    return {
      id: teamId,
      name: team?.name || 'Unknown Team'
    };
  });

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
  };

  const handleClosePanel = () => {
    setSelectedProject(null);
  };

  const handleFilterChange = (newFilter: ProjectFilter) => {
    setFilter(newFilter);
  };

  const handleTaskToggle = (task: Task) => {
    if (!selectedProject) return;
    
    const updatedProjects = projects.map(project => {
      if (project.id !== selectedProject.id) return project;
      
      const updatedTasks = project.tasks.map(t => {
        if (t.id !== task.id) return t;
        return { ...t, completed: !t.completed };
      });
      
      const totalTasks = updatedTasks.length;
      const completedTasks = updatedTasks.filter(t => t.completed).length;
      const newProgressPercentage = totalTasks > 0 
        ? Math.round((completedTasks / totalTasks) * 100) 
        : 0;
      
      const updatedProject = {
        ...project,
        tasks: updatedTasks,
        progressPercentage: newProgressPercentage,
        updatedAt: new Date().toISOString()
      };
      
      setSelectedProject(updatedProject);
      
      return updatedProject;
    });
    
    setProjects(updatedProjects);
    
    toast({
      title: task.completed ? "Task marked incomplete" : "Task completed",
      description: task.title,
    });
  };

  const handleNewProject = () => {
    toast({
      title: "Create New Project",
      description: "This feature is not implemented yet.",
    });
  };

  const handleArchiveCompleted = () => {
    const completedProjects = projects.filter(p => p.status === 'completed');
    if (completedProjects.length === 0) {
      toast({
        title: "No projects to archive",
        description: "There are no completed projects to archive.",
      });
      return;
    }
    
    toast({
      title: `${completedProjects.length} projects archived`,
      description: "All completed projects have been archived.",
    });
  };

  const handleAISuggestionAction = (suggestion: AIProjectSuggestion) => {
    toast({
      title: "AI Suggestion Action",
      description: `Applied "${suggestion.title}" action.`,
    });
  };

  const filteredProjects = projects.filter(project => {
    if (filter.status && filter.status !== 'all' && project.status !== filter.status) {
      return false;
    }
    
    if (filter.teamId && filter.teamId !== 'all' && project.team.id !== filter.teamId) {
      return false;
    }
    
    if (filter.complexity && filter.complexity !== 'all' && project.complexity !== filter.complexity) {
      return false;
    }
    
    if (filter.showAtRisk && !project.isAtRisk) {
      return false;
    }
    
    if (filter.searchQuery) {
      const query = filter.searchQuery.toLowerCase();
      return (
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.team.name.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  return (
    <PageTransition>
      <DashboardLayout className="p-6">
        <div className="flex flex-col h-full space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Projects</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <h1 className="text-2xl font-bold mt-2">Projects</h1>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => setViewMode(viewMode === 'list' ? 'gantt' : 'list')}
              >
                {viewMode === 'list' ? (
                  <>
                    <GanttChart className="h-4 w-4" />
                    Show Gantt
                  </>
                ) : (
                  <>
                    <BarChart className="h-4 w-4" />
                    Show List
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={handleArchiveCompleted}
              >
                <Archive className="h-4 w-4" />
                Archive Completed
              </Button>
              <Button
                className="gap-2"
                onClick={() => {
                  window.open('https://github.com/some-project-repo', '_blank');
                }}
              >
                <ArrowUpRight className="h-4 w-4" />
                Project Repository
              </Button>
            </div>
          </div>
          
          <ProjectStatCards 
            statistics={projectStatistics}
            aiSuggestions={aiSuggestions} 
          />
          
          <ProjectFilters 
            filter={filter} 
            onFilterChange={handleFilterChange} 
            teams={teams} 
            onNewProject={handleNewProject}
          />
          
          <Tabs defaultValue="projects" className="flex-1">
            <TabsList className="mb-4">
              <TabsTrigger value="projects" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                All Projects
              </TabsTrigger>
              <TabsTrigger value="timeline" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Timeline
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="projects" className="flex-1 h-full">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
                <div className={cn(
                  "overflow-auto",
                  selectedProject ? "lg:col-span-3" : "lg:col-span-4"
                )}>
                  {viewMode === 'list' ? (
                    <ProjectList 
                      projects={filteredProjects} 
                      onProjectSelect={handleProjectSelect}
                      selectedProject={selectedProject}
                    />
                  ) : (
                    <div className="border rounded-lg bg-card p-6 h-64 flex items-center justify-center">
                      <p className="text-muted-foreground">
                        Gantt chart view would be implemented here
                      </p>
                    </div>
                  )}
                </div>
                
                {selectedProject && (
                  <div className="space-y-4 lg:col-span-1">
                    <div className="border rounded-lg bg-card overflow-hidden h-[calc(50%-0.5rem)]">
                      <ProjectDetailPanel 
                        project={selectedProject} 
                        onClose={handleClosePanel}
                        onTaskToggle={handleTaskToggle}
                      />
                    </div>
                    <div className="h-[calc(50%-0.5rem)]">
                      <AIProjectPanel 
                        suggestions={aiSuggestions}
                        onAction={handleAISuggestionAction}
                        selectedProject={selectedProject}
                      />
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="timeline">
              <div className="border rounded-lg bg-card p-6 h-64 flex items-center justify-center">
                <p className="text-muted-foreground">
                  Project timeline view would be implemented here
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default Projects;

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
