import React from 'react';
import { Responsive, WidthProvider, Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useGridLayout } from './GridLayoutContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { PlusSquare, Save, RotateCcw, GripVertical } from 'lucide-react';
import { GridItem } from './GridItem';
import { WidgetLibraryDrawer } from './WidgetLibraryDrawer';
import { toast } from 'sonner';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface GridLayoutProps {
  children?: React.ReactNode;
  widgetComponents: Record<string, React.ReactNode>;
}

export const GridLayout: React.FC<GridLayoutProps> = ({ children, widgetComponents }) => {
  const {
    layouts,
    saveLayout,
    resetToDefaultLayout,
    editMode,
    setEditMode,
    widgetCount,
    maxWidgets,
  } = useGridLayout();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleLayoutChange = (currentLayout: Layout[], allLayouts: { [key: string]: Layout[] }) => {
    saveLayout(allLayouts);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (editMode) {
      toast.success("Layout saved");
    }
  };

  const handleResetLayout = () => {
    resetToDefaultLayout();
    toast.success("Layout reset to default");
  };

  const openWidgetLibrary = () => {
    setDrawerOpen(true);
  };

  const currentLayoutItems = layouts.lg || [];
  
  const activeWidgetIds = currentLayoutItems.map(item => item.i);

  React.useEffect(() => {
    if (widgetCount > maxWidgets) {
      console.warn(`Widget count (${widgetCount}) exceeds maximum (${maxWidgets}). Some widgets may not be displayed.`);
    }
  }, [widgetCount, maxWidgets]);

  const getWidgetType = (widgetId: string) => {
    const parts = widgetId.split('-');
    if (parts.length >= 2) {
      if (parts[parts.length - 1] === 'default') {
        return parts.slice(0, parts.length - 1).join('-');
      }
    }
    return parts[0];
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4 bg-background/80 backdrop-blur-sm p-3 border rounded-md shadow-sm">
        <div className="flex-1">
          {editMode && (
            <div className="p-2 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-md text-amber-800 dark:text-amber-300 text-sm">
              <p>Layout Edit Mode: Drag widgets by the handle, resize by the corners, and use "Add Widget" to add new components.</p>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          {editMode && (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={openWidgetLibrary}
                disabled={widgetCount >= maxWidgets}
              >
                <PlusSquare className="h-4 w-4 mr-2" />
                Add Widget {widgetCount}/{maxWidgets}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleResetLayout}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Layout
              </Button>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <Switch
              id="edit-mode"
              checked={editMode}
              onCheckedChange={toggleEditMode}
            />
            <Label htmlFor="edit-mode" className="cursor-pointer whitespace-nowrap">
              {editMode ? "Exit Edit Mode" : "Edit Layout"}
            </Label>
          </div>
        </div>
      </div>

      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 12, sm: 12, xs: 2, xxs: 2 }}
        rowHeight={80}
        onLayoutChange={handleLayoutChange}
        isDraggable={editMode}
        isResizable={editMode}
        useCSSTransforms={true}
        containerPadding={[10, 10]}
        margin={[16, 16]}
        draggableHandle=".grid-item-drag-handle"
      >
        {activeWidgetIds.map((widgetId) => {
          const widgetType = getWidgetType(widgetId);
          const component = widgetComponents[widgetType];
          
          if (!component) {
            console.warn(`No component found for widget type: ${widgetType}`);
            return null;
          }
          
          return (
            <div 
              key={widgetId} 
              data-grid={layouts.lg.find(item => item.i === widgetId)}
              className="overflow-hidden"
            >
              <GridItem 
                id={widgetId}
                editMode={editMode}
              >
                {component}
              </GridItem>
            </div>
          );
        })}
        {children}
      </ResponsiveGridLayout>

      <WidgetLibraryDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
};
