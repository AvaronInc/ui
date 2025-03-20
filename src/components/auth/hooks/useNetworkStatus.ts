
import { useState, useEffect } from 'react';

export const useNetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState(navigator.onLine);
  
  // Update network status
  useEffect(() => {
    const handleOnline = () => setNetworkStatus(true);
    const handleOffline = () => setNetworkStatus(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  return networkStatus;
};
