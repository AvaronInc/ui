
import { useState, useEffect } from 'react';
import { Zone } from '../types';
import { mockZones } from '../mockData';

/**
 * Custom hook to fetch and manage zone data
 * @param zoneId - The ID of the zone to fetch
 * @returns Object containing zone data and loading state
 */
export const useZoneData = (zoneId: string) => {
  const [zone, setZone] = useState<Zone | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchZoneData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // In a real application, this would be an API call
        // For now, we simulate with a timeout and mock data
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Find the zone in our mock data
        const foundZone = mockZones.find(z => z.id === zoneId);
        
        if (foundZone) {
          setZone(foundZone);
        } else {
          setError('Zone not found');
        }
      } catch (err) {
        setError('Failed to fetch zone data');
        console.error('Error fetching zone data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (zoneId) {
      fetchZoneData();
    }
  }, [zoneId]);

  return { zone, isLoading, error };
};
