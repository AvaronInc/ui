
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EndpointsTabContent from './tabs/EndpointsTabContent';
import VPNTabContent from './tabs/VPNTabContent';
import AnalyticsTabContent from './tabs/AnalyticsTabContent';
import { VPNSession, WorkforceFilter } from '@/types/workforce';

interface WorkforceTabsProps {
  filters: WorkforceFilter;
  setFilters: (filters: WorkforceFilter) => void;
  departments: string[];
  roles: string[];
  locations: string[];
  groupBy: string;
  setGroupBy: (groupBy: string) => void;
  groupedDevices: Record<string, any[]>;
  filteredDevices: any[];
  onSelectDevice: (deviceId: string) => void;
  vpnSessions: VPNSession[];
  onDisconnectVPN: (sessionId: string) => void;
  isAdmin: boolean;
}

const WorkforceTabs = ({
  filters,
  setFilters,
  departments,
  roles,
  locations,
  groupBy,
  setGroupBy,
  groupedDevices,
  filteredDevices,
  onSelectDevice,
  vpnSessions,
  onDisconnectVPN,
  isAdmin
}: WorkforceTabsProps) => {
  return (
    <Tabs defaultValue="endpoints" className="space-y-4">
      <TabsList>
        <TabsTrigger value="endpoints">Endpoint Management</TabsTrigger>
        <TabsTrigger value="vpn">VPN Sessions</TabsTrigger>
        <TabsTrigger value="analytics">Security Analytics</TabsTrigger>
      </TabsList>
      
      <TabsContent value="endpoints">
        <EndpointsTabContent 
          filters={filters}
          setFilters={setFilters}
          departments={departments}
          roles={roles}
          locations={locations}
          groupBy={groupBy}
          setGroupBy={setGroupBy}
          groupedDevices={groupedDevices}
          filteredDevices={filteredDevices}
          onSelectDevice={onSelectDevice}
        />
      </TabsContent>
      
      <TabsContent value="vpn">
        <VPNTabContent 
          sessions={vpnSessions}
          onDisconnect={onDisconnectVPN}
          isAdmin={isAdmin}
        />
      </TabsContent>
      
      <TabsContent value="analytics">
        <AnalyticsTabContent />
      </TabsContent>
    </Tabs>
  );
};

export default WorkforceTabs;
