
import React from 'react';
import { AIProjectSuggestion, Project, Task } from '@/types/projects';
import ProjectDetailPanel from './ProjectDetailPanel';
import AIProjectPanel from './AIProjectPanel';

interface ProjectDetailPanelsProps {
  selectedProject: Project | null;
  onClose: () => void;
  onTaskToggle: (task: Task) => void;
  aiSuggestions: AIProjectSuggestion[];
  onAISuggestionAction: (suggestion: AIProjectSuggestion) => void;
}

const ProjectDetailPanels: React.FC<ProjectDetailPanelsProps> = ({
  selectedProject,
  onClose,
  onTaskToggle,
  aiSuggestions,
  onAISuggestionAction,
}) => {
  if (!selectedProject) return null;

  return (
    <div className="space-y-4 lg:col-span-1">
      <div className="border rounded-lg bg-card overflow-hidden h-[calc(50%-0.5rem)]">
        <ProjectDetailPanel 
          project={selectedProject} 
          onClose={onClose}
          onTaskToggle={onTaskToggle}
        />
      </div>
      <div className="h-[calc(50%-0.5rem)]">
        <AIProjectPanel 
          suggestions={aiSuggestions}
          onAction={onAISuggestionAction}
          selectedProject={selectedProject}
        />
      </div>
    </div>
  );
};

export default ProjectDetailPanels;
