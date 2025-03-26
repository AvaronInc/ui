
import React, { useState } from 'react';
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
import { 
  PlusCircle, Shield, Network, Server, Bell, LayoutGrid, 
  Key, Database, Globe, AlertTriangle, Cpu, CheckCircle 
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface WidgetLibraryDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const WidgetLibraryDrawer: React.FC<WidgetLibraryDrawerProps> = ({ open, onClose }) => {
  const { availableWidgets, addWidget, widgetCount, maxWidgets } = useGridLayout();
  const [activeCategory, setActiveCategory] = useState("all");
  const hasReachedLimit = widgetCount >= maxWidgets;

  const categories = [
    { id: "all", name: "All Widgets", icon: <LayoutGrid className="h-4 w-4" /> },
    { id: "Identity", name: "Identity & Access", icon: <Key className="h-4 w-4" /> },
    { id: "Storage", name: "Storage", icon: <Database className="h-4 w-4" /> },
    { id: "Network", name: "Network", icon: <Network className="h-4 w-4" /> },
    { id: "System", name: "System", icon: <Server className="h-4 w-4" /> },
    { id: "Security", name: "Security", icon: <Shield className="h-4 w-4" /> },
    { id: "AI", name: "AI & Observability", icon: <Cpu className="h-4 w-4" /> },
    { id: "Compliance", name: "Compliance & Logging", icon: <CheckCircle className="h-4 w-4" /> },
    { id: "Alerts", name: "Alerts", icon: <Bell className="h-4 w-4" /> },
  ];

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
      case 'key':
        return <Key className="h-5 w-5" />;
      case 'database':
        return <Database className="h-5 w-5" />;
      case 'globe':
        return <Globe className="h-5 w-5" />;
      case 'alert-triangle':
        return <AlertTriangle className="h-5 w-5" />;
      case 'cpu':
        return <Cpu className="h-5 w-5" />;
      case 'check-circle':
        return <CheckCircle className="h-5 w-5" />;
      default:
        return <LayoutGrid className="h-5 w-5" />;
    }
  };

  const handleAddWidget = (widget: any) => {
    if (hasReachedLimit) {
      toast.error(`Maximum of ${maxWidgets} widgets allowed. Remove some widgets first.`);
      return;
    }
    
    const uniqueId = `${widget.type}-${Date.now()}`;
    addWidget(uniqueId, widget.type);
    toast.success(`Added ${widget.title} widget`);
    onClose();
  };

  const filteredWidgets = activeCategory === "all" 
    ? availableWidgets 
    : availableWidgets.filter(widget => widget.category === activeCategory);

  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader>
          <DrawerTitle>Widget Library</DrawerTitle>
          <DrawerDescription>
            Select widgets to add to your dashboard ({widgetCount}/{maxWidgets} widgets)
            {hasReachedLimit && (
              <div className="mt-2 text-amber-500 font-medium">
                You've reached the maximum number of widgets. Remove some widgets first.
              </div>
            )}
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="px-4">
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="grid grid-cols-3 md:grid-cols-9 mb-4">
              {categories.map(category => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="flex items-center gap-1 text-xs px-2 py-1"
                >
                  {category.icon}
                  <span className="hidden md:inline">{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
        <ScrollArea className="px-4 h-[50vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-2">
            {filteredWidgets.map((widget) => (
              <div
                key={widget.id}
                className={`border rounded-lg p-4 transition-colors cursor-pointer ${
                  hasReachedLimit ? 'opacity-50 hover:bg-accent/20' : 'hover:bg-accent/50'
                }`}
                onClick={() => !hasReachedLimit && handleAddWidget(widget)}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-primary/10 text-primary">
                    {getWidgetIcon(widget.icon)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{widget.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{widget.description}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={`h-8 w-8 rounded-full ${
                      hasReachedLimit ? 'opacity-50' : ''
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddWidget(widget);
                    }}
                    disabled={hasReachedLimit}
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
