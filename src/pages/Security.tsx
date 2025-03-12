
import React, { useState } from 'react';
import { SecurityEvent, SecurityStats } from '@/types/security';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SecurityMetrics from '@/components/security/SecurityMetrics';
import SecurityEventsTable from '@/components/security/SecurityEventsTable';
import SecurityEventDetail from '@/components/security/SecurityEventDetail';
import { Input } from '@/components/ui/input';
import { Shield } from 'lucide-react';
import { PageTransition } from '@/components/transitions/PageTransition';

// Dummy data
const dummyStats: SecurityStats = {
  total24h: 157,
  bySeverity: {
    critical: 3,
    high: 12,
    medium: 45,
    low: 97
  },
  activeThreats: 5
};

const dummyEvents: SecurityEvent[] = [
  {
    id: '1',
    timestamp: new Date().toISOString(),
    eventType: 'intrusion',
    severity: 'critical',
    affectedDevice: 'Main Server (192.168.1.100)',
    description: 'Multiple failed login attempts detected',
    userAffected: 'admin',
    actionTaken: 'IP blocked',
    remediationSteps: [
      'Review authentication logs',
      'Check for suspicious activity',
      'Update firewall rules'
    ],
    logs: [
      '2024-02-20 10:15:23 - Failed login attempt from IP 203.0.113.1',
      '2024-02-20 10:15:25 - Account locked due to multiple failures',
      '2024-02-20 10:15:26 - IP automatically blocked by security system'
    ],
    acknowledged: false
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    eventType: 'malware',
    severity: 'high',
    affectedDevice: 'Workstation-15',
    description: 'Suspicious file activity detected',
    actionTaken: 'File quarantined',
    acknowledged: false
  }
];

const Security = () => {
  const [selectedEvent, setSelectedEvent] = useState<SecurityEvent | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = dummyEvents.filter(event => 
    event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.affectedDevice.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="container mx-auto p-6 space-y-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Shield className="h-8 w-8" />
              Security Center
            </h1>
            <p className="text-muted-foreground">
              Monitor and manage security events across your infrastructure
            </p>
          </div>

          <SecurityMetrics stats={dummyStats} />

          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Security Events</h2>
              <Input
                placeholder="Search events..."
                className="max-w-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-6">
              <div className="flex-1 overflow-hidden">
                <SecurityEventsTable 
                  events={filteredEvents}
                  onSelectEvent={setSelectedEvent}
                />
              </div>
              {selectedEvent && (
                <div className="w-[400px] border rounded-lg">
                  <SecurityEventDetail event={selectedEvent} />
                </div>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default Security;
