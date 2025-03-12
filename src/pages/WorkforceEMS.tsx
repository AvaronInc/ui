import React, { useState } from 'react';
import { PageTransition } from '@/components/transitions/PageTransition';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import WorkforceMetrics from '@/components/workforce/WorkforceMetrics';
import VPNSessionsTable from '@/components/workforce/VPNSessionsTable';
import EndpointDevicesList from '@/components/workforce/EndpointDevicesList';
import EndpointDetailPanel from '@/components/workforce/EndpointDetailPanel';
import WorkforceFilters from '@/components/workforce/WorkforceFilters';
import NetworkReportDialog from '@/components/workforce/NetworkReportDialog';
import { 
  VPNSession, 
  EndpointDevice, 
  EndpointDetails, 
  WorkforceFilter, 
  WorkforceStats, 
  PatchStatus, 
  Role
} from '@/types/workforce';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FileText, WifiOff, RefreshCw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const workforceStats: WorkforceStats = {
  totalActiveUsers: 243,
  connectedVPNSessions: 18,
  endpointsByStatus: {
    healthy: 178,
    needsUpdate: 42,
    insecure: 23
  }
};

const vpnSessions: VPNSession[] = [
  {
    id: '1',
    userId: 'u1',
    userName: 'John Doe',
    deviceName: 'Johns-MacBook-Pro',
    ipAddress: '203.0.113.1',
    connectionTime: '2023-08-18T08:30:00',
    connectionDuration: '2h 45m',
    location: 'New York, US'
  },
  {
    id: '2',
    userId: 'u2',
    userName: 'Jane Smith',
    deviceName: 'Jane-ThinkPad',
    ipAddress: '203.0.113.2',
    connectionTime: '2023-08-18T09:15:00',
    connectionDuration: '2h 0m',
    location: 'London, UK'
  },
  {
    id: '3',
    userId: 'u3',
    userName: 'Alex Johnson',
    deviceName: 'AJ-Surface',
    ipAddress: '203.0.113.3',
    connectionTime: '2023-08-18T07:45:00',
    connectionDuration: '3h 15m',
    location: 'Toronto, CA'
  },
  {
    id: '4',
    userId: 'u4',
    userName: 'Maria Garcia',
    deviceName: 'MG-Laptop',
    ipAddress: '203.0.113.4',
    connectionTime: '2023-08-18T10:30:00',
    connectionDuration: '1h 30m',
    location: 'Madrid, ES'
  },
  {
    id: '5',
    userId: 'u5',
    userName: 'David Lee',
    deviceName: 'DL-Dell-XPS',
    ipAddress: '203.0.113.5',
    connectionTime: '2023-08-18T08:00:00',
    connectionDuration: '3h 0m',
    location: 'Singapore, SG'
  }
];

const endpointDevices: EndpointDevice[] = [
  {
    id: 'd1',
    name: 'WS-DEV-001',
    assignedUser: 'John Doe',
    os: 'Windows',
    version: '11 Pro',
    status: 'up_to_date',
    lastPatchDate: '2023-08-10',
    department: 'Engineering',
    role: 'admin',
    location: 'New York'
  },
  {
    id: 'd2',
    name: 'MB-MKT-002',
    assignedUser: 'Jane Smith',
    os: 'macOS',
    version: 'Monterey',
    status: 'needs_patch',
    lastPatchDate: '2023-07-15',
    department: 'Marketing',
    role: 'user',
    location: 'London'
  },
  {
    id: 'd3',
    name: 'LT-FIN-003',
    assignedUser: 'Alex Johnson',
    os: 'Windows',
    version: '10 Enterprise',
    status: 'security_issue',
    lastPatchDate: '2023-06-20',
    department: 'Finance',
    role: 'manager',
    location: 'Toronto'
  },
  {
    id: 'd4',
    name: 'WS-HR-004',
    assignedUser: 'Maria Garcia',
    os: 'Windows',
    version: '11 Enterprise',
    status: 'up_to_date',
    lastPatchDate: '2023-08-05',
    department: 'HR',
    role: 'user',
    location: 'Madrid'
  },
  {
    id: 'd5',
    name: 'MB-DEV-005',
    assignedUser: 'David Lee',
    os: 'macOS',
    version: 'Ventura',
    status: 'needs_patch',
    lastPatchDate: '2023-07-12',
    department: 'Engineering',
    role: 'admin',
    location: 'Singapore'
  },
  {
    id: 'd6',
    name: 'LT-SAL-006',
    assignedUser: 'Sarah Johnson',
    os: 'Windows',
    version: '10 Pro',
    status: 'security_issue',
    lastPatchDate: '2023-06-10',
    department: 'Sales',
    role: 'user',
    location: 'Chicago'
  }
];

const endpointDetails: Record<string, EndpointDetails> = {
  'd1': {
    id: 'd1',
    software: [
      { name: 'Microsoft Office', version: '365', installDate: '2023-01-15', publisher: 'Microsoft', updateAvailable: false },
      { name: 'Google Chrome', version: '115.0.5790.110', installDate: '2023-07-20', publisher: 'Google', updateAvailable: false },
      { name: 'Adobe Acrobat Reader', version: '23.003.20201', installDate: '2023-05-10', publisher: 'Adobe', updateAvailable: false },
      { name: 'Visual Studio Code', version: '1.80.1', installDate: '2023-07-15', publisher: 'Microsoft', updateAvailable: false }
    ],
    securityPatchStatus: 'All security patches installed',
    updatesAvailable: false,
    lastScan: '2023-08-17',
    complianceStatus: 'Compliant'
  },
  'd2': {
    id: 'd2',
    software: [
      { name: 'Microsoft Office', version: '365', installDate: '2023-01-20', publisher: 'Microsoft', updateAvailable: false },
      { name: 'Google Chrome', version: '114.0.5735.198', installDate: '2023-06-10', publisher: 'Google', updateAvailable: true },
      { name: 'Adobe Creative Cloud', version: '5.6.0.788', installDate: '2023-04-15', publisher: 'Adobe', updateAvailable: true },
      { name: 'Slack', version: '4.29.149', installDate: '2023-07-05', publisher: 'Slack Technologies', updateAvailable: false }
    ],
    securityPatchStatus: 'Security patches needed: 2',
    updatesAvailable: true,
    lastScan: '2023-08-16',
    complianceStatus: 'Not Compliant'
  },
  'd3': {
    id: 'd3',
    software: [
      { name: 'Microsoft Office', version: '2019', installDate: '2022-08-10', publisher: 'Microsoft', updateAvailable: true },
      { name: 'Google Chrome', version: '112.0.5615.121', installDate: '2023-04-05', publisher: 'Google', updateAvailable: true },
      { name: 'QuickBooks', version: '2022', installDate: '2022-12-20', publisher: 'Intuit', updateAvailable: true },
      { name: 'Zoom', version: '5.13.5', installDate: '2023-06-10', publisher: 'Zoom Video Communications', updateAvailable: false }
    ],
    securityPatchStatus: 'Critical security vulnerabilities detected',
    updatesAvailable: true,
    lastScan: '2023-08-15',
    complianceStatus: 'Critical Non-Compliance'
  },
  'd4': {
    id: 'd4',
    software: [
      { name: 'Microsoft Office', version: '365', installDate: '2023-02-15', publisher: 'Microsoft', updateAvailable: false },
      { name: 'Google Chrome', version: '115.0.5790.110', installDate: '2023-07-25', publisher: 'Google', updateAvailable: false },
      { name: 'Adobe Acrobat Reader', version: '23.003.20201', installDate: '2023-05-15', publisher: 'Adobe', updateAvailable: false },
      { name: 'Workday', version: '2023.2', installDate: '2023-07-01', publisher: 'Workday', updateAvailable: false }
    ],
    securityPatchStatus: 'All security patches installed',
    updatesAvailable: false,
    lastScan: '2023-08-16',
    complianceStatus: 'Compliant'
  },
  'd5': {
    id: 'd5',
    software: [
      { name: 'Microsoft Office', version: '365', installDate: '2023-02-05', publisher: 'Microsoft', updateAvailable: false },
      { name: 'Google Chrome', version: '114.0.5735.198', installDate: '2023-06-15', publisher: 'Google', updateAvailable: true },
      { name: 'Visual Studio Code', version: '1.79.0', installDate: '2023-06-10', publisher: 'Microsoft', updateAvailable: true },
      { name: 'Docker Desktop', version: '4.19.0', installDate: '2023-07-01', publisher: 'Docker', updateAvailable: false }
    ],
    securityPatchStatus: 'Security patches needed: 1',
    updatesAvailable: true,
    lastScan: '2023-08-15',
    complianceStatus: 'Not Compliant'
  },
  'd6': {
    id: 'd6',
    software: [
      { name: 'Microsoft Office', version: '2019', installDate: '2022-09-10', publisher: 'Microsoft', updateAvailable: true },
      { name: 'Google Chrome', version: '110.0.5481.177', installDate: '2023-02-15', publisher: 'Google', updateAvailable: true },
      { name: 'Salesforce', version: '1.57.0', installDate: '2023-05-20', publisher: 'Salesforce', updateAvailable: false },
      { name: 'Zoom', version: '5.12.8', installDate: '2023-04-10', publisher: 'Zoom Video Communications', updateAvailable: true }
    ],
    securityPatchStatus: 'Multiple security vulnerabilities detected',
    updatesAvailable: true,
    lastScan: '2023-08-14',
    complianceStatus: 'Critical Non-Compliance'
  }
};

const departments = ['Engineering', 'Marketing', 'Finance', 'HR', 'Sales'];
const roles: Role[] = ['admin', 'user', 'manager'];
const locations = ['New York', 'London', 'Toronto', 'Madrid', 'Singapore', 'Chicago'];

const WorkforceEMS = () => {
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [filters, setFilters] = useState<WorkforceFilter>({});
  const [groupBy, setGroupBy] = useState('department');
  const [reportDialogOpen, setReportDialogOpen] = useState(false);

  const handleDisconnectVPN = (sessionId: string) => {
    toast({
      title: "VPN Session Disconnected",
      description: `Session ID: ${sessionId} has been disconnected.`,
    });
  };

  const handlePushUpdate = (deviceId: string) => {
    toast({
      title: "Update Initiated",
      description: `Patch updates are being pushed to device ${deviceId}.`,
    });
  };
  
  const handleGenerateReport = () => {
    setReportDialogOpen(true);
  };
  
  const filteredDevices = endpointDevices.filter(device => {
    if (filters.searchQuery && !device.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) && 
        !device.assignedUser.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
      return false;
    }
    
    if (filters.department?.length && !filters.department.includes(device.department)) {
      return false;
    }
    
    if (filters.role?.length && !filters.role.includes(device.role)) {
      return false;
    }
    
    if (filters.location?.length && !filters.location.includes(device.location)) {
      return false;
    }
    
    if (filters.status?.length && !filters.status.includes(device.status)) {
      return false;
    }
    
    return true;
  });
  
  const groupedDevices: Record<string, EndpointDevice[]> = {};
  
  if (groupBy) {
    filteredDevices.forEach(device => {
      const key = device[groupBy as keyof EndpointDevice] as string;
      if (!groupedDevices[key]) {
        groupedDevices[key] = [];
      }
      groupedDevices[key].push(device);
    });
  }

  const selectedDevice = selectedDeviceId ? endpointDevices.find(d => d.id === selectedDeviceId) : null;
  const selectedDeviceDetails = selectedDeviceId ? endpointDetails[selectedDeviceId] : null;

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="p-6 space-y-6 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Workforce EMS</h1>
              <p className="text-muted-foreground">
                Monitor and manage endpoint devices and VPN connections
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleGenerateReport}>
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
              {isAdmin && (
                <Button variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Push Updates
                </Button>
              )}
              {isAdmin && (
                <Button variant="outline">
                  <WifiOff className="mr-2 h-4 w-4" />
                  Disconnect All VPNs
                </Button>
              )}
            </div>
          </div>

          <section className="space-y-4">
            <WorkforceMetrics stats={workforceStats} />
          </section>

          <Tabs defaultValue="endpoints" className="space-y-4">
            <TabsList>
              <TabsTrigger value="endpoints">Endpoint Management</TabsTrigger>
              <TabsTrigger value="vpn">VPN Sessions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="endpoints" className="space-y-4">
              <WorkforceFilters 
                filters={filters}
                onFilterChange={setFilters}
                departments={departments}
                roles={roles}
                locations={locations}
                groupBy={groupBy}
                onGroupByChange={setGroupBy}
              />
              
              {groupBy && Object.keys(groupedDevices).length > 0 ? (
                <div className="space-y-6">
                  {Object.entries(groupedDevices).map(([group, devices]) => (
                    <div key={group} className="space-y-2">
                      <h3 className="text-lg font-medium">{groupBy === 'role' ? group.charAt(0).toUpperCase() + group.slice(1) : group}</h3>
                      <EndpointDevicesList 
                        devices={devices}
                        onSelectDevice={setSelectedDeviceId}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                filteredDevices.length > 0 ? (
                  <EndpointDevicesList 
                    devices={filteredDevices}
                    onSelectDevice={setSelectedDeviceId}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <p className="text-muted-foreground">No devices match your filters.</p>
                    <Button 
                      variant="link" 
                      onClick={() => setFilters({})}
                      className="mt-2"
                    >
                      Clear filters
                    </Button>
                  </div>
                )
              )}
            </TabsContent>
            
            <TabsContent value="vpn" className="space-y-4">
              <VPNSessionsTable 
                sessions={vpnSessions}
                onDisconnect={handleDisconnectVPN}
                isAdmin={isAdmin}
              />
            </TabsContent>
          </Tabs>
          
          {selectedDeviceId && (
            <EndpointDetailPanel 
              device={selectedDevice}
              details={selectedDeviceDetails}
              onClose={() => setSelectedDeviceId(null)}
              onPushUpdate={handlePushUpdate}
              isAdmin={isAdmin}
            />
          )}
        </div>
      </DashboardLayout>
      <NetworkReportDialog
        open={reportDialogOpen}
        onOpenChange={setReportDialogOpen}
      />
    </PageTransition>
  );
};

export default WorkforceEMS;
