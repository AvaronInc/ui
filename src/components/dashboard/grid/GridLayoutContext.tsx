
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Layout } from 'react-grid-layout';
import { useAuth } from '@/context/auth';

// Default dashboard layouts for different breakpoints
export const defaultLayout: Layout[] = [
  { i: 'security-overview', x: 0, y: 0, w: 6, h: 8, minW: 3, minH: 6 },
  { i: 'network-status', x: 6, y: 0, w: 6, h: 8, minW: 3, minH: 6 },
  { i: 'system-performance', x: 0, y: 8, w: 6, h: 8, minW: 3, minH: 6 },
  { i: 'active-alerts', x: 6, y: 8, w: 6, h: 8, minW: 3, minH: 6 },
];

type GridLayoutContextType = {
  layouts: { [key: string]: Layout[] };
  currentLayout: Layout[];
  saveLayout: (newLayouts: { [key: string]: Layout[] }) => void;
  resetToDefaultLayout: () => void;
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
  removeWidget: (widgetId: string) => void;
  addWidget: (widgetId: string, widgetType: string) => void;
  availableWidgets: WidgetDefinition[];
};

export type WidgetDefinition = {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: string;
  defaultSize: { w: number; h: number };
};

// Available widgets for the library
export const availableWidgets: WidgetDefinition[] = [
  {
    id: 'security-overview',
    title: 'Security & Compliance',
    description: 'Overview of security posture and compliance status',
    icon: 'shield',
    type: 'security-overview',
    defaultSize: { w: 6, h: 8 },
  },
  {
    id: 'network-status',
    title: 'Network & Infrastructure',
    description: 'Real-time network and infrastructure status',
    icon: 'network',
    type: 'network-status',
    defaultSize: { w: 6, h: 8 },
  },
  {
    id: 'system-performance',
    title: 'System Performance',
    description: 'IT asset and system performance metrics',
    icon: 'server',
    type: 'system-performance',
    defaultSize: { w: 6, h: 8 },
  },
  {
    id: 'active-alerts',
    title: 'Active Alerts',
    description: 'Active alerts and workflow management',
    icon: 'bell',
    type: 'active-alerts',
    defaultSize: { w: 6, h: 8 },
  },
  {
    id: 'zone-insights',
    title: 'Zone Insights',
    description: 'Insights and analytics for zones',
    icon: 'layout-grid',
    type: 'zone-insights',
    defaultSize: { w: 6, h: 8 },
  },
];

export const GridLayoutContext = createContext<GridLayoutContextType>({
  layouts: { lg: defaultLayout },
  currentLayout: defaultLayout,
  saveLayout: () => {},
  resetToDefaultLayout: () => {},
  editMode: false,
  setEditMode: () => {},
  removeWidget: () => {},
  addWidget: () => {},
  availableWidgets,
});

export const useGridLayout = () => useContext(GridLayoutContext);

export const GridLayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [layouts, setLayouts] = useState<{ [key: string]: Layout[] }>({ lg: defaultLayout });
  const [editMode, setEditMode] = useState(false);
  const userId = user?.id || 'anonymous';

  // Load saved layout from localStorage on mount
  useEffect(() => {
    try {
      const savedLayouts = localStorage.getItem(`dashboard-layout-${userId}`);
      if (savedLayouts) {
        setLayouts(JSON.parse(savedLayouts));
      }
    } catch (error) {
      console.error('Error loading layouts:', error);
      // Fall back to default layout
      setLayouts({ lg: defaultLayout });
    }
  }, [userId]);

  // Save layout to localStorage when it changes
  const saveLayout = (newLayouts: { [key: string]: Layout[] }) => {
    try {
      localStorage.setItem(`dashboard-layout-${userId}`, JSON.stringify(newLayouts));
      setLayouts(newLayouts);
    } catch (error) {
      console.error('Error saving layouts:', error);
    }
  };

  // Reset to default layout
  const resetToDefaultLayout = () => {
    const resetLayout = { lg: defaultLayout };
    localStorage.setItem(`dashboard-layout-${userId}`, JSON.stringify(resetLayout));
    setLayouts(resetLayout);
  };

  // Remove a widget from the layout
  const removeWidget = (widgetId: string) => {
    const updatedLayouts = Object.keys(layouts).reduce((acc, breakpoint) => {
      acc[breakpoint] = layouts[breakpoint].filter((item) => item.i !== widgetId);
      return acc;
    }, {} as { [key: string]: Layout[] });
    
    saveLayout(updatedLayouts);
  };

  // Add a widget to the layout
  const addWidget = (widgetId: string, widgetType: string) => {
    const widget = availableWidgets.find(w => w.type === widgetType);
    
    if (!widget) return;
    
    const updatedLayouts = { ...layouts };
    
    Object.keys(updatedLayouts).forEach(breakpoint => {
      // Check if widget already exists
      const exists = updatedLayouts[breakpoint].some(item => item.i === widgetId);
      
      if (!exists) {
        // Find a position for the new widget (top left corner of available space)
        const newWidget: Layout = {
          i: widgetId,
          x: 0,
          y: 0,
          w: widget.defaultSize.w,
          h: widget.defaultSize.h,
          minW: 3,
          minH: 4
        };
        
        updatedLayouts[breakpoint] = [...updatedLayouts[breakpoint], newWidget];
      }
    });
    
    saveLayout(updatedLayouts);
  };

  return (
    <GridLayoutContext.Provider
      value={{
        layouts,
        currentLayout: layouts.lg || defaultLayout,
        saveLayout,
        resetToDefaultLayout,
        editMode,
        setEditMode,
        removeWidget,
        addWidget,
        availableWidgets,
      }}
    >
      {children}
    </GridLayoutContext.Provider>
  );
};
