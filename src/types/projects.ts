
export type ProjectStatus = 'not-started' | 'in-progress' | 'at-risk' | 'blocked' | 'completed';
export type ProjectComplexity = 'small' | 'medium' | 'large' | 'critical';

export interface Team {
  id: string;
  name: string;
  members: TeamMember[];
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  workload?: number; // 0-100% representing current workload
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  assigneeId?: string;
  dueDate?: string;
  createdAt: string;
  dependencies?: string[]; // IDs of tasks this task depends on
  blockedBy?: string[]; // IDs of tasks blocking this one
  estimatedHours?: number;
  actualHours?: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  team: Team;
  tasks: Task[];
  progressPercentage: number;
  deadline: string;
  createdAt: string;
  updatedAt: string;
  complexity: ProjectComplexity;
  aiRiskScore?: number; // 0-100 risk assessment score
  isAtRisk?: boolean;
  blockers?: string[]; // Description of current blockers
  nextMilestone?: {
    title: string;
    dueDate: string;
  };
}

export interface ProjectFilter {
  status?: ProjectStatus | 'all';
  teamId?: string | 'all';
  searchQuery?: string;
  complexity?: ProjectComplexity | 'all';
  showAtRisk?: boolean;
}

export interface ProjectStatistics {
  activeProjects: number;
  atRiskProjects: number;
  upcomingDeadlines: number;
  completedProjects: number;
  trendDirection: 'up' | 'down' | 'stable';
  trendPercentage: number;
}

export interface AIProjectSuggestion {
  id: string;
  type: 'deadline' | 'resource' | 'dependency' | 'report';
  title: string;
  description: string;
  projectId: string;
  actionType: 'adjust-timeline' | 'reassign-tasks' | 'generate-report' | 'send-reminder';
  severity: 'low' | 'medium' | 'high';
}
