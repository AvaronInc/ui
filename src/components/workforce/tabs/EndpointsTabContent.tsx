
import React from 'react';
import WorkforceFilters from '@/components/workforce/WorkforceFilters';
import EndpointDevicesSection from '@/components/workforce/EndpointDevicesSection';
import { WorkforceFilter } from '@/types/workforce';

interface EndpointsTabContentProps {
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
}

const EndpointsTabContent = ({
  filters,
  setFilters,
  departments,
  roles,
  locations,
  groupBy,
  setGroupBy,
  groupedDevices,
  filteredDevices,
  onSelectDevice
}: EndpointsTabContentProps) => {
  return (
    <div className="space-y-4">
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
        onSelectDevice={onSelectDevice}
        onClearFilters={() => setFilters({})}
      />
    </div>
  );
};

export default EndpointsTabContent;
