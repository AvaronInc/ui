
import React from 'react';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CommunityButton = () => {
  const handleCommunityClick = () => {
    window.open('https://avaron-community.lovable.app', '_blank');
  };
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleCommunityClick}
          title="Avaron Community"
        >
          <Users className="h-4 w-4" />
          <span className="sr-only">Avaron Community</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Avaron Community</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default CommunityButton;
