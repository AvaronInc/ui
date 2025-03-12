
import { useState, useMemo } from 'react';
import { EndpointDevice, WorkforceFilter } from '@/types/workforce';

export const useWorkforceFilters = (devices: EndpointDevice[]) => {
  const [filters, setFilters] = useState<WorkforceFilter>({});
  const [groupBy, setGroupBy] = useState('department');
  
  const filteredDevices = useMemo(() => {
    return devices.filter(device => {
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
  }, [devices, filters]);
  
  const groupedDevices = useMemo(() => {
    const grouped: Record<string, EndpointDevice[]> = {};
    
    if (groupBy) {
      filteredDevices.forEach(device => {
        const key = device[groupBy as keyof EndpointDevice] as string;
        if (!grouped[key]) {
          grouped[key] = [];
        }
        grouped[key].push(device);
      });
    }
    
    return grouped;
  }, [filteredDevices, groupBy]);
  
  return {
    filters,
    setFilters,
    groupBy,
    setGroupBy,
    filteredDevices,
    groupedDevices
  };
};
