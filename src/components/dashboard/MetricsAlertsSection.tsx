
import React from 'react';
import MetricsChart from './MetricsChart';
import AlertsTable, { Alert, AlertSeverity } from './AlertsTable';

// Sample data for metrics chart
const metricsData = [
  { name: 'Mon', value: 65 },
  { name: 'Tue', value: 59 },
  { name: 'Wed', value: 80 },
  { name: 'Thu', value: 81 },
  { name: 'Fri', value: 56 },
  { name: 'Sat', value: 55 },
  { name: 'Sun', value: 40 }
];

// Sample alerts data
const alertsData: Alert[] = [
  { 
    id: '1', 
    severity: 'critical' as AlertSeverity, 
    status: 'active',
    message: 'Server CPU usage at 92%', 
    source: 'System Monitor',
    timestamp: '2 min ago' 
  },
  { 
    id: '2', 
    severity: 'warning' as AlertSeverity, 
    status: 'acknowledged',
    message: 'Storage space below 15%', 
    source: 'Storage Monitor',
    timestamp: '15 min ago' 
  },
  { 
    id: '3', 
    severity: 'info' as AlertSeverity, 
    status: 'resolved',
    message: 'Backup completed successfully', 
    source: 'Backup Service',
    timestamp: '1 hour ago' 
  }
];

const MetricsAlertsSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <MetricsChart 
          title="System Performance" 
          type="area" 
          data={metricsData} 
        />
      </div>
      <div>
        <AlertsTable alerts={alertsData} />
      </div>
    </div>
  );
};

export default MetricsAlertsSection;
