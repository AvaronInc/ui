
import React from 'react';
import { Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CLIButtonProps {
  onClick: () => void;
}

export const CLIButton: React.FC<CLIButtonProps> = ({ onClick }) => {
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={onClick}
      aria-label="Command Line Interface"
    >
      <Terminal className="h-4 w-4" />
      <span className="sr-only">CLI</span>
    </Button>
  );
};
