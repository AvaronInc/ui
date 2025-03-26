import React, { createContext, useContext, useState, useEffect } from 'react';
import { Layout } from 'react-grid-layout';
import { useAuth } from '@/context/auth';

// Default dashboard layouts for different breakpoints
export const defaultLayout: Layout[] = [
  { i: 'network-status-default', x: 0, y: 0, w: 6, h: 8, minW: 3, minH: 6 },
  { i: 'security-overview-default', x: 6, y: 0, w: 6, h: 8, minW: 3, minH: 6 },
  { i: 'zone-insights-default', x: 0, y: 8, w: 6, h: 8, minW: 3, minH: 6 },
  { i: 'unverified-users-default', x: 6, y: 8, w: 6, h: 8, minW: 3, minH: 6 },
  { i: 'daily-news-default', x: 0, y: 16, w: 6, h: 10, minW: 4, minH: 8 },
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
  widgetCount: number;
  maxWidgets: number;
};

export type WidgetDefinition = {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: string;
  defaultSize: { w: number; h: number };
  category: string;
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
    category: 'Security'
  },
  {
    id: 'network-status',
    title: 'Network & Infrastructure',
    description: 'Real-time network and infrastructure status',
    icon: 'network',
    type: 'network-status',
    defaultSize: { w: 6, h: 8 },
    category: 'Network'
  },
  {
    id: 'system-performance',
    title: 'System Performance',
    description: 'IT asset and system performance metrics',
    icon: 'server',
    type: 'system-performance',
    defaultSize: { w: 6, h: 8 },
    category: 'System'
  },
  {
    id: 'active-alerts',
    title: 'Active Alerts',
    description: 'Active alerts and workflow management',
    icon: 'bell',
    type: 'active-alerts',
    defaultSize: { w: 6, h: 8 },
    category: 'Alerts'
  },
  {
    id: 'zone-insights',
    title: 'Zone Insights',
    description: 'Insights and analytics for zones',
    icon: 'layout-grid',
    type: 'zone-insights',
    defaultSize: { w: 6, h: 8 },
    category: 'Zones'
  },

  {
    id: 'mfa-login-attempts',
    title: 'MFA Login Attempts',
    description: 'Success vs Failures authentication attempts in the last 24 hours',
    icon: 'key',
    type: 'mfa-login-attempts',
    defaultSize: { w: 4, h: 6 },
    category: 'Identity'
  },
  {
    id: 'unverified-users',
    title: 'Unverified Users',
    description: 'Users without biometric MFA or with expired certificates',
    icon: 'user',
    type: 'unverified-users',
    defaultSize: { w: 4, h: 6 },
    category: 'Identity'
  },
  {
    id: 'pending-identity-approvals',
    title: 'Pending Identity Approvals',
    description: 'Tickets awaiting approval triggered by HR onboarding',
    icon: 'user-check',
    type: 'pending-identity-approvals',
    defaultSize: { w: 4, h: 6 },
    category: 'Identity'
  },

  {
    id: 'zone-storage-usage',
    title: 'Zone Storage Usage',
    description: 'Storage usage by zone showing used vs allocated space',
    icon: 'database',
    type: 'zone-storage-usage',
    defaultSize: { w: 4, h: 6 },
    category: 'Storage'
  },
  {
    id: 'cloud-sync-status',
    title: 'Cloud Sync Status',
    description: 'Wasabi sync age, delta lag, and sync failures',
    icon: 'cloud',
    type: 'cloud-sync-status',
    defaultSize: { w: 4, h: 6 },
    category: 'Storage'
  },
  {
    id: 'top-buckets-by-growth',
    title: 'Top Buckets by Growth',
    description: 'Buckets growing fastest in the last 7 days',
    icon: 'trending-up',
    type: 'top-buckets-by-growth',
    defaultSize: { w: 4, h: 6 },
    category: 'Storage'
  },

  {
    id: 'active-sites',
    title: 'Active Sites',
    description: 'Map of connected locations with health status indicators',
    icon: 'globe',
    type: 'active-sites',
    defaultSize: { w: 6, h: 6 },
    category: 'Network'
  },
  {
    id: 'top-talkers',
    title: 'Top Talkers',
    description: 'Devices generating the most bandwidth by IP and hostname',
    icon: 'activity',
    type: 'top-talkers',
    defaultSize: { w: 4, h: 6 },
    category: 'Network'
  },
  {
    id: 'link-failover-events',
    title: 'Link Failover Events',
    description: 'Timeline of SD-WAN path switches in the last 72 hours',
    icon: 'git-branch',
    type: 'link-failover-events',
    defaultSize: { w: 6, h: 6 },
    category: 'Network'
  },
  {
    id: 'latency-map',
    title: 'Latency Map',
    description: 'Average latency per site with color-coded indicators',
    icon: 'timer',
    type: 'latency-map',
    defaultSize: { w: 6, h: 6 },
    category: 'Network'
  },

  {
    id: 'threat-summary',
    title: 'Threat Summary',
    description: 'Count of security events by severity level this week',
    icon: 'alert-triangle',
    type: 'threat-summary',
    defaultSize: { w: 4, h: 6 },
    category: 'Security'
  },
  {
    id: 'top-blocked-ips',
    title: 'Top Blocked IPs',
    description: 'List with abuse scores, threat types, and last seen time',
    icon: 'shield-off',
    type: 'top-blocked-ips',
    defaultSize: { w: 4, h: 6 },
    category: 'Security'
  },
  {
    id: 'active-cves',
    title: 'Active CVEs Detected',
    description: 'Top CVEs matched against running services',
    icon: 'alert-circle',
    type: 'active-cves',
    defaultSize: { w: 4, h: 6 },
    category: 'Security'
  },
  {
    id: 'policy-violations',
    title: 'Policy Violations',
    description: 'Triggered microsegmentation or inter-zone policy breaches',
    icon: 'shield-alert',
    type: 'policy-violations',
    defaultSize: { w: 4, h: 6 },
    category: 'Security'
  },

  {
    id: 'unresolved-ai-tickets',
    title: 'Unresolved AI Tickets',
    description: 'Currently open tickets sorted by severity',
    icon: 'ticket',
    type: 'unresolved-ai-tickets',
    defaultSize: { w: 6, h: 6 },
    category: 'AI'
  },
  {
    id: 'anomaly-detections',
    title: 'Anomaly Detections',
    description: 'Timeline of detected anomalies by type',
    icon: 'scan',
    type: 'anomaly-detections',
    defaultSize: { w: 6, h: 6 },
    category: 'AI'
  },
  {
    id: 'ai-system-summary',
    title: 'AI System Summary',
    description: 'Mixtral-generated summary of activity this week',
    icon: 'cpu',
    type: 'ai-system-summary',
    defaultSize: { w: 6, h: 4 },
    category: 'AI'
  },
  {
    id: 'top-ai-topics',
    title: 'Top AI Topics',
    description: 'Tags or topic clusters generated from observed activity',
    icon: 'hash',
    type: 'top-ai-topics',
    defaultSize: { w: 4, h: 6 },
    category: 'AI'
  },

  {
    id: 'compliance-scorecard',
    title: 'Compliance Scorecard',
    description: 'Compliance status for HIPAA, PCI, SOC2 frameworks',
    icon: 'check-circle',
    type: 'compliance-scorecard',
    defaultSize: { w: 4, h: 6 },
    category: 'Compliance'
  },
  {
    id: 'log-retention-status',
    title: 'Log Retention Status',
    description: 'Percentage of logs meeting retention rules per Zone',
    icon: 'archive',
    type: 'log-retention-status',
    defaultSize: { w: 4, h: 6 },
    category: 'Compliance'
  },
  {
    id: 'export-activity',
    title: 'Export Activity',
    description: 'Recent log/data exports with VaultID authorization',
    icon: 'download',
    type: 'export-activity',
    defaultSize: { w: 6, h: 6 },
    category: 'Compliance'
  },
  {
    id: 'pending-compliance-expirations',
    title: 'Pending Compliance Expirations',
    description: 'Certifications or audit cycles nearing renewal',
    icon: 'calendar',
    type: 'pending-compliance-expirations',
    defaultSize: { w: 4, h: 6 },
    category: 'Compliance'
  },

  {
    id: 'daily-news',
    title: 'Daily AI News Feed',
    description: 'Curated cybersecurity and IT news with AI-powered insights',
    icon: 'newspaper',
    type: 'daily-news',
    defaultSize: { w: 6, h: 10 },
    category: 'AI'
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
  widgetCount: 0,
  maxWidgets: 6,
});

export const useGridLayout = () => useContext(GridLayoutContext);

export const GridLayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [layouts, setLayouts] = useState<{ [key: string]: Layout[] }>({ lg: defaultLayout });
  const [editMode, setEditMode] = useState(false);
  const userId = user?.id || 'anonymous';
  const maxWidgets = 12;

  const widgetCount = layouts.lg?.length || 0;

  useEffect(() => {
    try {
      const savedLayouts = localStorage.getItem(`dashboard-layout-${userId}`);
      if (savedLayouts) {
        const parsedLayouts = JSON.parse(savedLayouts);
        
        if (parsedLayouts.lg && parsedLayouts.lg.length > maxWidgets) {
          parsedLayouts.lg = parsedLayouts.lg.slice(0, maxWidgets);
        }
        
        setLayouts(parsedLayouts);
      } else {
        console.log("No saved layout found, using default layout");
        setLayouts({ lg: defaultLayout });
      }
    } catch (error) {
      console.error('Error loading layouts:', error);
      setLayouts({ lg: defaultLayout });
    }
  }, [userId]);

  const saveLayout = (newLayouts: { [key: string]: Layout[] }) => {
    try {
      const sanitizedLayouts = { ...newLayouts };
      
      if (sanitizedLayouts.lg && sanitizedLayouts.lg.length > maxWidgets) {
        sanitizedLayouts.lg = sanitizedLayouts.lg.slice(0, maxWidgets);
      }
      
      localStorage.setItem(`dashboard-layout-${userId}`, JSON.stringify(sanitizedLayouts));
      setLayouts(sanitizedLayouts);
    } catch (error) {
      console.error('Error saving layouts:', error);
    }
  };

  const resetToDefaultLayout = () => {
    const resetLayout = { lg: defaultLayout };
    localStorage.setItem(`dashboard-layout-${userId}`, JSON.stringify(resetLayout));
    setLayouts(resetLayout);
  };

  const removeWidget = (widgetId: string) => {
    console.log("Removing widget:", widgetId);
    const updatedLayouts = Object.keys(layouts).reduce((acc, breakpoint) => {
      acc[breakpoint] = layouts[breakpoint].filter((item) => item.i !== widgetId);
      return acc;
    }, {} as { [key: string]: Layout[] });
    
    console.log("Updated layouts after removal:", updatedLayouts);
    saveLayout(updatedLayouts);
  };

  const addWidget = (widgetId: string, widgetType: string) => {
    console.log("Adding widget:", { widgetId, widgetType });
    
    if (widgetCount >= maxWidgets) {
      console.warn(`Maximum widget limit (${maxWidgets}) reached. Remove widgets before adding more.`);
      return;
    }
    
    const widget = availableWidgets.find(w => w.type === widgetType);
    
    if (!widget) {
      console.error(`Widget type "${widgetType}" not found in available widgets.`);
      return;
    }
    
    const updatedLayouts = { ...layouts };
    
    Object.keys(updatedLayouts).forEach(breakpoint => {
      const exists = updatedLayouts[breakpoint].some(item => item.i === widgetId);
      
      if (!exists) {
        const maxY = updatedLayouts[breakpoint].reduce(
          (max, item) => Math.max(max, item.y + item.h), 
          0
        );
        
        const newWidget: Layout = {
          i: widgetId,
          x: 0,
          y: maxY,
          w: widget.defaultSize.w,
          h: widget.defaultSize.h,
          minW: 3,
          minH: 4
        };
        
        if (updatedLayouts[breakpoint].length < maxWidgets) {
          updatedLayouts[breakpoint] = [...updatedLayouts[breakpoint], newWidget];
        }
      }
    });
    
    console.log("Updated layouts after addition:", updatedLayouts);
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
        widgetCount,
        maxWidgets,
      }}
    >
      {children}
    </GridLayoutContext.Provider>
  );
};
