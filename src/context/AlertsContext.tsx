
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: Date;
  read: boolean;
}

interface AlertsContextType {
  alerts: Alert[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAlert: (id: string) => void;
  addAlert: (alert: Omit<Alert, 'id' | 'timestamp' | 'read'>) => void;
}

const AlertsContext = createContext<AlertsContextType | undefined>(undefined);

export const useAlerts = () => {
  const context = useContext(AlertsContext);
  if (!context) {
    throw new Error('useAlerts must be used within an AlertsProvider');
  }
  return context;
};

export const AlertsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>(() => {
    // Load alerts from localStorage if available
    const savedAlerts = localStorage.getItem('alerts');
    return savedAlerts ? JSON.parse(savedAlerts) : [];
  });

  // Calculate unread count
  const unreadCount = alerts.filter(alert => !alert.read).length;

  // Save alerts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('alerts', JSON.stringify(alerts));
  }, [alerts]);

  const markAsRead = (id: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === id ? { ...alert, read: true } : alert
      )
    );
  };

  const markAllAsRead = () => {
    setAlerts(prev => 
      prev.map(alert => ({ ...alert, read: true }))
    );
  };

  const clearAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const addAlert = (alert: Omit<Alert, 'id' | 'timestamp' | 'read'>) => {
    const newAlert: Alert = {
      ...alert,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date(),
      read: false,
    };

    setAlerts(prev => [newAlert, ...prev]);
  };

  return (
    <AlertsContext.Provider value={{ 
      alerts, 
      unreadCount, 
      markAsRead, 
      markAllAsRead, 
      clearAlert,
      addAlert
    }}>
      {children}
    </AlertsContext.Provider>
  );
};
