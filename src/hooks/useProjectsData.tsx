import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Project, ProjectFilter, Task, AIProjectSuggestion, ProjectStatistics } from '@/types/projects';

// Sample data to be moved from Projects.tsx
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

const projectStatistics: ProjectStatistics = {
  activeProjects: 3,
  atRiskProjects: 1,
  upcomingDeadlines: 2,
  completedProjects: 1,
  trendDirection: 'up',
  trendPercentage: 15
};

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

export const useProjectsData = () => {
  const { toast } = useToast();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>(() => {
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

  return {
    projects,
    selectedProject,
    filter,
    viewMode,
    teams,
    filteredProjects,
    projectStatistics,
    aiSuggestions,
    setViewMode,
    handleProjectSelect,
    handleClosePanel,
    handleFilterChange,
    handleTaskToggle,
    handleNewProject,
    handleArchiveCompleted,
    handleAISuggestionAction
  };
};
