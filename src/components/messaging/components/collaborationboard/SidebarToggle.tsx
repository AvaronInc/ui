
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarToggleProps {
  position: 'left' | 'right';
  isVisible: boolean;
  onToggle: () => void;
}

const SidebarToggle = ({ position, isVisible, onToggle }: SidebarToggleProps) => {
  return (
    <div className={`absolute ${position}-0 top-1/2 transform -translate-y-1/2 z-10`}>
      <Button
        variant="secondary"
        size="icon"
        className="h-8 w-8 rounded-full shadow-md"
        onClick={onToggle}
      >
        {position === 'left' ? (
          isVisible ? <ArrowLeft size={16} /> : <ArrowRight size={16} />
        ) : (
          isVisible ? <ArrowRight size={16} /> : <ArrowLeft size={16} />
        )}
      </Button>
    </div>
  );
};

export default SidebarToggle;
