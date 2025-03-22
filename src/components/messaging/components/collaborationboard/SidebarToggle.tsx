
import { ArrowLeft, ArrowRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, SafeTooltipWrapper } from '@/components/ui/tooltip';

interface SidebarToggleProps {
  position: 'left' | 'right';
  isVisible: boolean;
  onToggle: () => void;
}

const SidebarToggle = ({ position, isVisible, onToggle }: SidebarToggleProps) => {
  const tooltipText = isVisible 
    ? (position === 'left' ? 'Close Filters' : 'Close Details') 
    : (position === 'left' ? 'Open Filters' : 'Open Details');
  
  return (
    <div className={`absolute ${position}-0 top-1/2 transform -translate-y-1/2 z-10`}>
      <SafeTooltipWrapper>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              onClick={onToggle}
              className="h-10 w-10 rounded-full shadow-md flex flex-col items-center justify-center"
            >
              {position === 'left' ? (
                <>
                  {isVisible ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                  {position === 'left' && <Filter size={14} className="mt-1" />}
                </>
              ) : (
                isVisible ? <ArrowRight size={18} /> : <ArrowLeft size={18} />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{tooltipText}</p>
          </TooltipContent>
        </Tooltip>
      </SafeTooltipWrapper>
    </div>
  );
};

export default SidebarToggle;
