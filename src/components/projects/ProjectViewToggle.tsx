
import React from 'react';
import { Button } from '@/components/ui/button';
import { GanttChart, BarChart } from 'lucide-react';

interface ProjectViewToggleProps {
  viewMode: 'list' | 'gantt';
  setViewMode: (mode: 'list' | 'gantt') => void;
}

const ProjectViewToggle: React.FC<ProjectViewToggleProps> = ({ viewMode, setViewMode }) => {
  return (
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
  );
};

export default ProjectViewToggle;
