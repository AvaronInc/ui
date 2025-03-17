
import React, { useState } from 'react';
import { PageTransition } from '@/components/transitions/PageTransition';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import EndpointDetailPanel from '@/components/workforce/EndpointDetailPanel';
import NetworkReportDialog from '@/components/workforce/NetworkReportDialog';
import WorkforceHeader from '@/components/workforce/WorkforceHeader';
import WorkforceDashboard from '@/components/workforce/WorkforceDashboard';
import WorkforceTabs from '@/components/workforce/WorkforceTabs';
import { toast } from '@/hooks/use-toast';
import { useWorkforceFilters } from '@/hooks/use-workforce-filters';
import { useWorkforceHealth } from '@/hooks/use-workforce-health';
import { 
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
          <WorkforceHeader 
            isAdmin={isAdmin} 
            onGenerateReport={handleGenerateReport} 
          />

          <WorkforceDashboard healthData={healthData} />

          <WorkforceTabs 
            filters={filters}
            setFilters={setFilters}
            departments={departments}
            roles={roles}
            locations={locations}
            groupBy={groupBy}
            setGroupBy={setGroupBy}
            groupedDevices={groupedDevices}
            filteredDevices={filteredDevices}
            onSelectDevice={setSelectedDeviceId}
            vpnSessions={vpnSessions}
            onDisconnectVPN={handleDisconnectVPN}
            isAdmin={isAdmin}
          />
          
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
