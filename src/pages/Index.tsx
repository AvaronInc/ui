
import React from 'react';
import { PageTransition } from '@/components/transitions/PageTransition';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { StatusCard } from '@/components/dashboard/StatusCard';
import { AlertsTable, Alert } from '@/components/dashboard/AlertsTable';
import { MetricsChart } from '@/components/dashboard/MetricsChart';
import { NavigationTile } from '@/components/dashboard/NavigationTile';
import { 
  Monitor, 
  Map, 
  Ticket, 
  Briefcase, 
  Users, 
  HardDrive,
  Shield,
  Laptop
} from 'lucide-react';

// Sample data
const systemStatuses = [
  {
    title: 'Network Infrastructure',
    status: 'healthy',
    description: 'All systems functioning normally',
    updated: '5 min ago'
  },
  {
    title: 'Server Cluster',
    status: 'warning',
    description: 'Increased latency detected',
    updated: '10 min ago'
  },
  {
    title: 'Database',
    status: 'healthy',
    description: 'Operating within normal parameters',
    updated: '3 min ago'
  },
  {
    title: 'Security Services',
    status: 'critical',
    description: 'Unusual authentication attempts detected',
    updated: '2 min ago'
  }
];

const recentAlerts: Alert[] = [
  {
    id: '1',
    message: 'Network switch in Building A experiencing packet loss',
    severity: 'warning',
    status: 'active',
    source: 'Network',
    timestamp: '10:45 AM'
  },
  {
    id: '2',
    message: 'Failed login attempts detected on admin portal',
    severity: 'critical',
    status: 'acknowledged',
    source: 'Security',
    timestamp: '09:32 AM'
  },
  {
    id: '3',
    message: 'Server CPU utilization exceeding 90%',
    severity: 'warning',
    status: 'active',
    source: 'Servers',
    timestamp: '08:17 AM'
  },
  {
    id: '4',
    message: 'Backup job completed successfully',
    severity: 'info',
    status: 'resolved',
    source: 'Backup',
    timestamp: '03:45 AM'
  },
  {
    id: '5',
    message: 'Database replication lag detected',
    severity: 'warning',
    status: 'acknowledged',
    source: 'Database',
    timestamp: 'Yesterday'
  }
];

const networkUptimeData = [
  { name: 'Mon', value: 99.9 },
  { name: 'Tue', value: 100 },
  { name: 'Wed', value: 99.5 },
  { name: 'Thu', value: 99.8 },
  { name: 'Fri', value: 99.9 },
  { name: 'Sat', value: 100 },
  { name: 'Sun', value: 99.7 }
];

const ticketsData = [
  { name: 'Critical', value: 5 },
  { name: 'High', value: 12 },
  { name: 'Medium', value: 20 },
  { name: 'Low', value: 8 }
];

const projectProgressData = [
  { name: 'Complete', value: 65 },
  { name: 'In Progress', value: 25 },
  { name: 'Pending', value: 10 }
];

const navigationTiles = [
  {
    title: 'Remote Monitoring',
    description: 'Manage and monitor all network devices',
    icon: Monitor,
    href: '/rmm',
    color: 'bg-info/10 text-info'
  },
  {
    title: 'IP Management',
    description: 'Manage IP addresses and subnets',
    icon: Map,
    href: '/ipam',
    color: 'bg-success/10 text-success'
  },
  {
    title: 'Ticketing System',
    description: 'Create and manage support tickets',
    icon: Ticket,
    href: '/tickets',
    color: 'bg-warning/10 text-warning'
  },
  {
    title: 'Project Management',
    description: 'Track and manage ongoing projects',
    icon: Briefcase,
    href: '/projects',
    color: 'bg-primary/10 text-primary'
  },
  {
    title: 'Identity Management',
    description: 'Manage users and access controls',
    icon: Users,
    href: '/identity',
    color: 'bg-error/10 text-error'
  },
  {
    title: 'File Storage',
    description: 'Access and manage stored files',
    icon: HardDrive,
    href: '/storage',
    color: 'bg-muted/20 text-foreground'
  },
  {
    title: 'Security',
    description: 'Monitor and respond to security events',
    icon: Shield,
    href: '/security',
    color: 'bg-destructive/10 text-destructive'
  },
  {
    title: 'Workforce EMS',
    description: 'Manage endpoints and VPN sessions',
    icon: Laptop,
    href: '/workforce',
    color: 'bg-secondary/10 text-secondary'
  }
];

const Index = () => {
  return (
    <PageTransition>
      <DashboardLayout>
        <div className="p-6 space-y-6 animate-fade-in">
          <section className="space-y-2">
            <h2 className="text-xl font-medium tracking-tight">System Status Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {systemStatuses.map((status, index) => (
                <StatusCard
                  key={index}
                  title={status.title}
                  status={status.status as any}
                  description={status.description}
                  updated={status.updated}
                  className="animate-fade-in [animation-delay:var(--delay)]"
                  style={{ '--delay': `${index * 100}ms` } as React.CSSProperties}
                />
              ))}
            </div>
          </section>
          
          <section className="space-y-2">
            <h2 className="text-xl font-medium tracking-tight">Recent Alerts</h2>
            <AlertsTable alerts={recentAlerts} />
          </section>
          
          <section className="space-y-2">
            <h2 className="text-xl font-medium tracking-tight">Key Metrics</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <MetricsChart
                title="Network Uptime"
                type="area"
                data={networkUptimeData}
                percentage={true}
                className="animate-fade-in [animation-delay:100ms]"
              />
              <MetricsChart
                title="Active Support Tickets"
                type="bar"
                data={ticketsData}
                className="animate-fade-in [animation-delay:200ms]"
              />
              <MetricsChart
                title="Project Completion"
                type="pie"
                data={projectProgressData}
                colors={['#10B981', '#3B82F6', '#F59E0B']}
                percentage={true}
                className="animate-fade-in [animation-delay:300ms]"
              />
            </div>
          </section>
          
          <section className="space-y-2">
            <h2 className="text-xl font-medium tracking-tight">Quick Navigation</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {navigationTiles.map((tile, index) => (
                <NavigationTile
                  key={index}
                  title={tile.title}
                  description={tile.description}
                  icon={tile.icon}
                  href={tile.href}
                  color={tile.color}
                  className="animate-fade-in [animation-delay:var(--delay)]"
                  style={{ '--delay': `${index * 100}ms` } as React.CSSProperties}
                />
              ))}
            </div>
          </section>
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default Index;
