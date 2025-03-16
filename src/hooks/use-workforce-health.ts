
import { useMemo } from 'react';
import { departments } from '@/data/workforceData';

export function useWorkforceHealth() {
  // In a real app, this would fetch data from an API
  const healthData = useMemo(() => {
    return departments.map(dept => {
      // Generate random data for demo purposes
      const totalDevices = Math.floor(Math.random() * 50) + 20;
      const compliantDevices = Math.floor(totalDevices * (Math.random() * 0.4 + 0.6)); // 60-100% compliant
      
      const totalUsers = Math.floor(Math.random() * 30) + 10;
      const activeUsers = Math.floor(totalUsers * (Math.random() * 0.5 + 0.5)); // 50-100% active
      
      return {
        name: dept,
        compliant: compliantDevices,
        nonCompliant: totalDevices - compliantDevices,
        active: activeUsers,
        inactive: totalUsers - activeUsers,
        total: totalDevices
      };
    });
  }, []);

  return healthData;
}
