
import React from 'react';
import { Project } from '@/types/projects';
import ProjectList from './ProjectList';
import GanttChartView from './GanttChartView';
import { cn } from '@/lib/utils';

interface ProjectListContentProps {
  viewMode: 'list' | 'gantt';
  filteredProjects: Project[];
  selectedProject: Project | null;
  onProjectSelect: (project: Project) => void;
}

const ProjectListContent: React.FC<ProjectListContentProps> = ({
  viewMode,
  filteredProjects,
  selectedProject,
  onProjectSelect,
}) => {
  return (
    <div className={cn(
      "overflow-auto",
      selectedProject ? "lg:col-span-3" : "lg:col-span-4"
    )}>
      {viewMode === 'list' ? (
        <ProjectList 
          projects={filteredProjects} 
          onProjectSelect={onProjectSelect}
          selectedProject={selectedProject}
        />
      ) : (
        <GanttChartView projects={filteredProjects} />
      )}
    </div>
  );
};

export default ProjectListContent;
