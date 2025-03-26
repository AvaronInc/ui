
import React from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGridLayout } from './GridLayoutContext';
import { toast } from 'sonner';
import { PlusCircle, Shield, Network, Server, Bell, LayoutGrid } from 'lucide-react';

interface WidgetLibraryDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const WidgetLibraryDrawer: React.FC<WidgetLibraryDrawerProps> = ({ open, onClose }) => {
  const { availableWidgets, addWidget } = useGridLayout();

  const getWidgetIcon = (iconName: string) => {
    switch (iconName) {
      case 'shield':
        return <Shield className="h-5 w-5" />;
      case 'network':
        return <Network className="h-5 w-5" />;
      case 'server':
        return <Server className="h-5 w-5" />;
      case 'bell':
        return <Bell className="h-5 w-5" />;
      case 'layout-grid':
        return <LayoutGrid className="h-5 w-5" />;
      default:
        return <LayoutGrid className="h-5 w-5" />;
    }
  };

  const handleAddWidget = (widget: any) => {
    const uniqueId = `${widget.type}-${Date.now()}`;
    addWidget(uniqueId, widget.type);
    toast.success(`Added ${widget.title} widget`);
    onClose();
  };

  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Widget Library</DrawerTitle>
          <DrawerDescription>
            Select widgets to add to your dashboard
          </DrawerDescription>
        </DrawerHeader>
        
        <ScrollArea className="h-[50vh] px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
            {availableWidgets.map((widget) => (
              <div
                key={widget.id}
                className="border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => handleAddWidget(widget)}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-primary/10 text-primary">
                    {getWidgetIcon(widget.icon)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{widget.title}</h3>
                    <p className="text-sm text-muted-foreground">{widget.description}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddWidget(widget);
                    }}
                  >
                    <PlusCircle className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <DrawerFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
