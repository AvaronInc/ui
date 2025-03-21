
import { useState, useEffect } from 'react';
import { HealthData, fetchHealthData } from './healthData';

export const useHealthData = () => {
  const [data, setData] = useState<HealthData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const healthData = await fetchHealthData();
        
        if (isMounted) {
          setData(healthData);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    // Refresh every 60 seconds
    const intervalId = setInterval(loadData, 60000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  const refreshData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const healthData = await fetchHealthData();
      setData(healthData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    data, 
    isLoading, 
    error, 
    refreshData,
    networkHealth: {
      data: data?.networkStatus || null,
      isLoading,
      error
    },
    securityPosture: {
      data: data?.securityPosture || null,
      isLoading,
      error
    },
    systemPerformance: {
      data: data?.systemPerformance || null,
      isLoading,
      error
    }
  };
};
