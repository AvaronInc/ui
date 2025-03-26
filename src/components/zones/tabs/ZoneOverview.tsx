
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zone } from '../types';
import { ZoneStatusBadge } from '../ZonesPanel';
import { Clock, Server, ShieldAlert, Users, AlertTriangle, Activity, CheckCircle2, Ticket, Cpu, Memory, HardDrive } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import StatusBadge from '@/components/aim/system-health/StatusBadge';

interface ZoneOverviewProps {
  zone: Zone;
}

// Format date function
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const ZoneOverview: React.FC<ZoneOverviewProps> = ({ zone }) => {
  // Sample mock data for the overview (would come from API in a real implementation)
  const mockData = {
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

  // Convert service types to more readable format
  const formatServiceName = (service: string) => {
    const serviceMap: {[key: string]: string} = {
      'sdwan': 'SD-WAN',
      'identity': 'Identity',
      'vault': 'Vault',
      'ai': 'AI Core',
      'rmm': 'RMM',
      'mixtral': 'Mixtral',
      'nestvault': 'NestVault'
    };
    return serviceMap[service] || service;
  };

  return (
    <div className="space-y-6">
      {/* Zone Header Information */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl font-semibold">Zone Overview</CardTitle>
                  <CardDescription>{zone.description}</CardDescription>
                </div>
                <ZoneStatusBadge status={zone.status} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Created</span>
                    <span>{formatDate(zone.created)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last Modified</span>
                    <span>{formatDate(zone.modified)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Isolation Level</span>
                    <Badge variant="outline" className="capitalize">{zone.isolationLevel}</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Uptime</span>
                    <span className="font-medium text-green-500">{mockData.uptime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last 24h</span>
                    <span className="font-medium text-green-500">{mockData.uptimeLast24h}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Vault ID Required</span>
                    <span>{zone.vaultIdRequired ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Resource Usage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <Cpu className="h-4 w-4 text-blue-500" />
                    <span>CPU</span>
                  </span>
                  <span className="font-medium">{zone.resourceUsage.cpu}%</span>
                </div>
                <Progress value={zone.resourceUsage.cpu} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <Memory className="h-4 w-4 text-purple-500" />
                    <span>RAM</span>
                  </span>
                  <span className="font-medium">{zone.resourceUsage.ram}%</span>
                </div>
                <Progress value={zone.resourceUsage.ram} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <HardDrive className="h-4 w-4 text-amber-500" />
                    <span>Storage</span>
                  </span>
                  <span className="font-medium">{zone.resourceUsage.storage}%</span>
                </div>
                <Progress value={zone.resourceUsage.storage} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Services and Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Enabled Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {zone.services.map((service) => (
                  <Badge key={service} variant="secondary" className="justify-center py-1.5">
                    {formatServiceName(service)}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Compliance & Security</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {zone.complianceTags.map((tag) => (
                    <Badge key={tag} variant="outline" className="justify-center py-1.5 border-green-500 text-green-500">
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="text-sm text-muted-foreground mt-2">
                  All compliance checks are passing. Last audit: {formatDate(zone.modified)}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Admins and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Zone Administrators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockData.primaryAdmins.map((admin, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="bg-primary/10 h-8 w-8 rounded-full flex items-center justify-center text-primary font-medium">
                      {admin.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{admin}</div>
                      <div className="text-xs text-muted-foreground">Primary Admin</div>
                    </div>
                  </div>
                ))}
                <div className="text-sm text-muted-foreground mt-2">
                  Admin scopes: {zone.adminScopes.join(', ')}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Recent Incidents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockData.lastIncidents.length === 0 ? (
                  <div className="text-center text-muted-foreground py-2">
                    No recent incidents reported
                  </div>
                ) : (
                  mockData.lastIncidents.map((incident) => (
                    <div key={incident.id} className="flex items-center justify-between py-1 border-b last:border-0">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className={`h-4 w-4 ${incident.severity === 'critical' ? 'text-red-500' : 'text-amber-500'}`} />
                        <span className="font-medium text-sm">{incident.title}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">{formatDate(incident.timestamp)}</span>
                        <StatusBadge status={incident.severity as any} />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Activity and Support Tickets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockData.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-3 py-1 border-b last:border-0">
                    <div className="bg-secondary h-8 w-8 rounded-full flex items-center justify-center">
                      <Activity className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div className="font-medium text-sm">{activity.action}</div>
                        <div className="text-xs text-muted-foreground">{formatDate(activity.timestamp)}</div>
                      </div>
                      <div className="text-xs text-muted-foreground">by {activity.user}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Support Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockData.supportTickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-center gap-3 py-1 border-b last:border-0">
                    <div className="bg-secondary h-8 w-8 rounded-full flex items-center justify-center">
                      <Ticket className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div className="font-medium text-sm">{ticket.title}</div>
                        <Badge variant={ticket.status === 'open' ? 'default' : 'secondary'} className="text-xs">
                          {ticket.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <div className="text-xs text-muted-foreground">Priority: {ticket.priority}</div>
                        <div className="text-xs text-muted-foreground">{formatDate(ticket.created)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI System Summary */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Server className="h-5 w-5 text-primary" />
            AI System Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm">{mockData.aiSummary}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZoneOverview;
