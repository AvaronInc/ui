
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

// Add width provider to make Responsive Grid Layout aware of container width
const ResponsiveGridLayout = WidthProvider(Responsive);

interface GridLayoutProps {
  children: React.ReactNode;
  widgetComponents: Record<string, React.ReactNode>;
}

export const GridLayout: React.FC<GridLayoutProps> = ({ children, widgetComponents }) => {
  const {
    layouts,
    saveLayout,
    resetToDefaultLayout,
    editMode,
    setEditMode,
  } = useGridLayout();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  // Handle layout change
  const handleLayoutChange = (currentLayout: Layout[], allLayouts: { [key: string]: Layout[] }) => {
    saveLayout(allLayouts);
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (editMode) {
      toast.success("Layout saved");
    }
  };

  // Reset to default layout
  const handleResetLayout = () => {
    resetToDefaultLayout();
    toast.success("Layout reset to default");
  };

  // Open widget library drawer
  const openWidgetLibrary = () => {
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="edit-mode"
            checked={editMode}
            onCheckedChange={toggleEditMode}
          />
          <Label htmlFor="edit-mode" className="cursor-pointer">
            {editMode ? "Exit Edit Mode" : "Edit Layout"}
          </Label>
        </div>
        
        {editMode && (
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={openWidgetLibrary}
            >
              <PlusSquare className="h-4 w-4 mr-2" />
              Add Widget
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
      </div>

      {editMode && (
        <div className="p-2 mb-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-md text-amber-800 dark:text-amber-300 text-sm">
          <p>Layout Edit Mode: Drag widgets by the handle, resize by the corners, and use "Add Widget" to add new components.</p>
        </div>
      )}

      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 12, sm: 12, xs: 2, xxs: 2 }}
        rowHeight={30}
        onLayoutChange={handleLayoutChange}
        isDraggable={editMode}
        isResizable={editMode}
        useCSSTransforms={true}
        containerPadding={[0, 0]}
        margin={[16, 16]}
        draggableHandle=".grid-item-drag-handle"
      >
        {Object.entries(widgetComponents).map(([widgetId, component]) => (
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
        ))}
      </ResponsiveGridLayout>

      <WidgetLibraryDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
};
