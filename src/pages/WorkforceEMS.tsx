
import React, { useState } from 'react';
import { PageTransition } from '@/components/transitions/PageTransition';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import WorkforceMetrics from '@/components/workforce/WorkforceMetrics';
import WorkforceHealthChart from '@/components/workforce/WorkforceHealthChart';
import VPNSessionsTable from '@/components/workforce/VPNSessionsTable';
import EndpointDetailPanel from '@/components/workforce/EndpointDetailPanel';
import WorkforceFilters from '@/components/workforce/WorkforceFilters';
import NetworkReportDialog from '@/components/workforce/NetworkReportDialog';
import EndpointDevicesSection from '@/components/workforce/EndpointDevicesSection';
import WorkforceActions from '@/components/workforce/WorkforceActions';
import StatusCardGrid from '@/components/dashboard/StatusCardGrid';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { useWorkforceFilters } from '@/hooks/use-workforce-filters';
import { useWorkforceHealth } from '@/hooks/use-workforce-health';
import { 
  workforceStats, 
  vpnSessions, 
  endpointDevices, 
  endpointDetails, 
  departments, 
  roles, 
  locations 
} from '@/data/workforceData';
import { Activity, AlertTriangle, Lock, Network, FileText, Server } from 'lucide-react';

const WorkforceEMS = () => {
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [isAdmin] = useState(true);
  const healthData = useWorkforceHealth();
  
  const { 
    filters, 
    setFilters, 
    groupBy, 
    setGroupBy, 
    filteredDevices, 
    groupedDevices 
  } = useWorkforceFilters(endpointDevices);

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
            <WorkforceActions 
              onGenerateReport={handleGenerateReport}
              isAdmin={isAdmin}
            />
          </div>

          <section>
            <StatusCardGrid />
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <WorkforceHealthChart 
              data={healthData}
              className="md:col-span-2"
            />
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Last 24 hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center text-amber-600">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Failed login attempt</p>
                    <p className="text-xs text-muted-foreground">John Doe from unusual location</p>
                    <p className="text-xs text-muted-foreground">15 minutes ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                    <Network className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New VPN connection</p>
                    <p className="text-xs text-muted-foreground">Sarah Johnson from Chicago</p>
                    <p className="text-xs text-muted-foreground">45 minutes ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-600">
                    <Lock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Security patch required</p>
                    <p className="text-xs text-muted-foreground">Critical update for 15 devices</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600">
                    <Server className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Patching completed</p>
                    <p className="text-xs text-muted-foreground">23 devices successfully updated</p>
                    <p className="text-xs text-muted-foreground">3 hours ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <Tabs defaultValue="endpoints" className="space-y-4">
            <TabsList>
              <TabsTrigger value="endpoints">Endpoint Management</TabsTrigger>
              <TabsTrigger value="vpn">VPN Sessions</TabsTrigger>
              <TabsTrigger value="analytics">Security Analytics</TabsTrigger>
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
              
              <EndpointDevicesSection 
                groupBy={groupBy}
                groupedDevices={groupedDevices}
                filteredDevices={filteredDevices}
                onSelectDevice={setSelectedDeviceId}
                onClearFilters={() => setFilters({})}
              />
            </TabsContent>
            
            <TabsContent value="vpn" className="space-y-4">
              <VPNSessionsTable 
                sessions={vpnSessions}
                onDisconnect={handleDisconnectVPN}
                isAdmin={isAdmin}
              />
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-primary" />
                    Security Analytics
                  </CardTitle>
                  <CardDescription>Advanced endpoint security analytics and reporting</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <FileText className="h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Security Analytics Dashboard</h3>
                    <p className="text-sm text-muted-foreground mt-2 max-w-md">
                      Generate comprehensive reports and visualize security metrics with our
                      advanced analytics tools. Track compliance, monitor vulnerabilities, and
                      identify security trends across your workforce.
                    </p>
                  </div>
                </CardContent>
              </Card>
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
