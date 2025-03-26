
import { MockOverviewData } from './types';

/**
 * Mock data for the zone overview sections
 */
export const mockOverviewData: MockOverviewData = {
  uptime: '99.8%',
  uptimeLast24h: '100%',
  primaryAdmins: ['Sarah Johnson', 'Alex Chen'],
  lastIncidents: [
    { id: 1, title: 'CPU Spike', severity: 'warning', timestamp: '2023-06-15T14:30:00Z', resolved: true },
    { id: 2, title: 'Network Latency', severity: 'warning', timestamp: '2023-06-14T09:15:00Z', resolved: true },
    { id: 3, title: 'Memory Usage High', severity: 'critical', timestamp: '2023-06-10T22:45:00Z', resolved: true }
  ],
  recentActivity: [
    { id: 1, action: 'Service Restart', user: 'system', timestamp: '2023-06-15T16:22:00Z' },
    { id: 2, action: 'Config Update', user: 'Sarah Johnson', timestamp: '2023-06-15T11:05:00Z' },
    { id: 3, action: 'Security Scan', user: 'Alex Chen', timestamp: '2023-06-14T19:30:00Z' }
  ],
  supportTickets: [
    { id: 101, title: 'Increase storage allocation', status: 'open', priority: 'medium', created: '2023-06-14T08:20:00Z' },
    { id: 98, title: 'Add new admin account', status: 'closed', priority: 'low', created: '2023-06-10T14:15:00Z' }
  ],
  aiSummary: "Zone is operating within normal parameters. Storage usage is trending upward and may require attention in the next 30 days. Security posture is strong with all compliance checks passing. Consider optimizing the mixtral service which is consuming 35% more resources than similar deployments."
};
