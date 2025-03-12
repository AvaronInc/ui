
export type DeviceStatus = 'online' | 'offline' | 'warning';

export type DeviceType = 'server' | 'workstation' | 'laptop' | 'network' | 'other';

export type AlertSeverity = 'critical' | 'warning' | 'info';

export interface MetricPoint {
  time: string;
  value: number;
}

export interface DeviceAlert {
  id: string;
  message: string;
  severity: AlertSeverity;
  timestamp: string;
}

export interface DeviceMetrics {
  cpu: MetricPoint[];
  memory: MetricPoint[];
  network: MetricPoint[];
}

export interface Device {
  id: string;
  name: string;
  status: DeviceStatus;
  lastCheckIn: string;
  performanceScore: number;
  type: DeviceType;
  ip: string;
  os: string;
  location: string;
  metrics: DeviceMetrics;
  alerts: DeviceAlert[];
}
