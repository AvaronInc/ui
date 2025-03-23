
import React from 'react';
import { Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useCliModal } from '@/hooks/use-cli-modal';

export const CLIButton = () => {
  const { openCliModal } = useCliModal();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={openCliModal}
            className="h-9 w-9"
            aria-label="System CLI"
          >
            <Terminal className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>System CLI</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
