
import React from 'react';
import { Button } from '@/components/ui/button';
import { Archive, ArrowUpRight } from 'lucide-react';

interface ProjectActionsProps {
  onArchiveCompleted: () => void;
}

const ProjectActions: React.FC<ProjectActionsProps> = ({ onArchiveCompleted }) => {
  return (
    <>
      <Button 
        variant="outline" 
        className="gap-2"
        onClick={onArchiveCompleted}
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
    </>
  );
};

export default ProjectActions;
