
/**
 * Mock data interface for the overview sections
 */
export interface MockOverviewData {
  uptime: string;
  uptimeLast24h: string;
  primaryAdmins: string[];
  lastIncidents: {
    id: number;
    title: string;
    severity: 'critical' | 'warning';
    timestamp: string;
    resolved: boolean;
  }[];
  recentActivity: {
    id: number;
    action: string;
    user: string;
    timestamp: string;
  }[];
  supportTickets: {
    id: number;
    title: string;
    status: string;
    priority: string;
    created: string;
  }[];
  aiSummary: string;
}
