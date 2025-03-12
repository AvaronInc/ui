
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import PageTransition from '@/components/transitions/PageTransition';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import TopologyMap from '@/components/topology/TopologyMap';
import DeviceDetailPanel from '@/components/topology/DeviceDetailPanel';
import DiagnosticsSection from '@/components/topology/DiagnosticsSection';
import TopologyFilters from '@/components/topology/TopologyFilters';
import TopologyActions from '@/components/topology/TopologyActions';
import NetworkReportDialog from '@/components/workforce/NetworkReportDialog';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { NetworkDevice } from '@/types/topology';
import { getMockNetworkDevices } from '@/data/topologyData';

const Topology = () => {
  const [selectedDevice, setSelectedDevice] = useState<NetworkDevice | null>(null);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    deviceTypes: [] as string[],
    showOffline: true,
  });

  // Fetch network devices
  const { data: networkDevices = [] } = useQuery({
    queryKey: ['networkDevices'],
    queryFn: getMockNetworkDevices,
  });

  // Handle device selection
  const handleDeviceSelect = (device: NetworkDevice) => {
    setSelectedDevice(device);
  };

  // Handle device deselection
  const handleClosePanel = () => {
    setSelectedDevice(null);
  };

  // Filter devices based on search and filters
  const filteredDevices = networkDevices.filter((device) => {
    // Filter by search term
    const matchesSearch = device.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      device.ipAddress.includes(filters.search) ||
      device.macAddress.toLowerCase().includes(filters.search.toLowerCase());
    
    // Filter by device type
    const matchesType = filters.deviceTypes.length === 0 || 
      filters.deviceTypes.includes(device.type);
    
    // Filter by status
    const matchesStatus = filters.showOffline || device.status !== 'offline';
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Handle opening report dialog
  const handleGenerateReport = () => {
    setReportDialogOpen(true);
  };

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="container py-6 space-y-6">
          {/* Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Topology & Network Diagnostics</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Topology & Network Diagnostics</h1>
              <p className="text-muted-foreground">Monitor network devices, connections, and performance</p>
            </div>
            <TopologyActions onGenerateReport={handleGenerateReport} />
          </div>

          {/* Filters */}
          <TopologyFilters filters={filters} setFilters={setFilters} />

          {/* Main Content */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Topology Map */}
            <Card className="lg:col-span-3">
              <CardContent className="p-0 overflow-hidden">
                <TopologyMap 
                  devices={filteredDevices} 
                  onDeviceSelect={handleDeviceSelect} 
                />
              </CardContent>
            </Card>

            {/* Network Diagnostics */}
            <DiagnosticsSection className="lg:col-span-3" selectedDeviceId={selectedDevice?.id} />
          </div>

          {/* Device Detail Panel */}
          {selectedDevice && (
            <DeviceDetailPanel 
              device={selectedDevice} 
              open={!!selectedDevice} 
              onClose={handleClosePanel} 
            />
          )}
          
          {/* Network Report Dialog */}
          <NetworkReportDialog 
            open={reportDialogOpen} 
            onOpenChange={setReportDialogOpen} 
          />
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default Topology;
