
import { useEffect } from 'react';
import { useAlerts } from '@/context/AlertsContext';

export const useDemoNotifications = () => {
  const { addAlert, alerts } = useAlerts();
  
  useEffect(() => {
    // Only add demo notifications if there are no existing notifications
    if (alerts.length === 0) {
      const demoAlerts = [
        {
          title: 'Security Alert',
          message: 'Multiple failed login attempts detected from IP 192.168.1.105',
          type: 'error' as const
        },
        {
          title: 'System Update',
          message: 'Network Pulse Management v2.4.0 is now available',
          type: 'info' as const
        },
        {
          title: 'Backup Complete',
          message: 'Weekly system backup completed successfully',
          type: 'success' as const
        },
        {
          title: 'Disk Space Warning',
          message: 'Server FS-01 is running low on disk space (85% used)',
          type: 'warning' as const
        },
        {
          title: 'Service Status',
          message: 'Email delivery service has been restored',
          type: 'info' as const
        }
      ];
      
      // Add with slight delay to simulate notifications coming in
      demoAlerts.forEach((alert, index) => {
        setTimeout(() => {
          addAlert(alert);
        }, index * 300);
      });
    }
  }, [addAlert, alerts.length]);
};
