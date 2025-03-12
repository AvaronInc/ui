
export type ProjectStatus = 'not-started' | 'in-progress' | 'completed';

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
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  assigneeId?: string;
  dueDate?: string;
  createdAt: string;
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
}

export interface ProjectFilter {
  status?: ProjectStatus | 'all';
  teamId?: string | 'all';
  searchQuery?: string;
}
