
import React from 'react';
import { Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const AIMButton: React.FC = () => {
  const navigate = useNavigate();
  
  const handleAIMClick = () => {
    navigate('/aim');
  };
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative"
          onClick={handleAIMClick}
        >
          <Cpu className="h-4 w-4" />
          <span className="sr-only">AIM Engine</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>AI Infrastructure Manager (AIM)</p>
      </TooltipContent>
    </Tooltip>
  );
};
