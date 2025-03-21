
import { useState, useEffect } from 'react';
import { fetchHealthData, HealthData } from './healthData';

export const useHealthData = () => {
  const [data, setData] = useState<HealthData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = async (showRefreshing = false) => {
    if (showRefreshing) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    
    setError(null);
    
    try {
      const healthData = await fetchHealthData();
      setData(healthData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load health data'));
      // Don't show a toast here - let the component handle error display
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const refresh = () => loadData(true);

  useEffect(() => {
    loadData();
  }, []);

  return {
    data,
    isLoading,
    error,
    isRefreshing,
    refresh
  };
};
