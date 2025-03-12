
import React, { useState } from 'react';
import { PageTransition } from '@/components/transitions/PageTransition';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import WorkforceMetrics from '@/components/workforce/WorkforceMetrics';
import VPNSessionsTable from '@/components/workforce/VPNSessionsTable';
import EndpointDetailPanel from '@/components/workforce/EndpointDetailPanel';
import WorkforceFilters from '@/components/workforce/WorkforceFilters';
import NetworkReportDialog from '@/components/workforce/NetworkReportDialog';
import EndpointDevicesSection from '@/components/workforce/EndpointDevicesSection';
import WorkforceActions from '@/components/workforce/WorkforceActions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { useWorkforceFilters } from '@/hooks/use-workforce-filters';
import { 
  workforceStats, 
  vpnSessions, 
  endpointDevices, 
  endpointDetails, 
  departments, 
  roles, 
  locations 
} from '@/data/workforceData';

const WorkforceEMS = () => {
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [isAdmin] = useState(true);
  
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
