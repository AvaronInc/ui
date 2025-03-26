
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GripVertical, X } from 'lucide-react';
import { useGridLayout } from './GridLayoutContext';
import { toast } from 'sonner';

interface GridItemProps {
  id: string;
  children: React.ReactNode;
  editMode: boolean;
}

export const GridItem: React.FC<GridItemProps> = ({ id, children, editMode }) => {
  const { removeWidget } = useGridLayout();

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    removeWidget(id);
    toast.info("Widget removed");
  };

  return (
    <Card 
      className={`h-full transition-shadow ${editMode ? 'shadow-md ring-1 ring-primary/10' : ''}`}
    >
      {editMode && (
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-1 z-10 bg-secondary/80 backdrop-blur-sm">
          <div 
            className="grid-item-drag-handle p-1 cursor-move rounded hover:bg-background/50 flex items-center"
            title="Drag to move"
          >
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-full hover:bg-destructive/10 hover:text-destructive"
            onClick={handleRemove}
            title="Remove widget"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
      
      <div className={editMode ? 'pt-8' : ''}>
        {children}
      </div>
    </Card>
  );
};
