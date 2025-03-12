
export type DeviceType = 
  | 'router' 
  | 'switch' 
  | 'firewall' 
  | 'server' 
  | 'workstation' 
  | 'printer'
  | 'camera' 
  | 'iot' 
  | 'vpn';

export type ConnectionType = 'wired' | 'wireless' | 'vpn';

export type DeviceStatus = 'online' | 'offline' | 'warning';

export interface NetworkDevice {
  id: string;
  name: string;
  type: DeviceType;
  status: DeviceStatus;
  ipAddress: string;
  macAddress: string;
  connections: string[]; // IDs of connected devices
  lastRestart: string;
  uptime: string;
  location?: string;
  description?: string;
}

export interface NetworkConnection {
  id: string;
  source: string; // Device ID
  target: string; // Device ID
  type: ConnectionType;
  bandwidth?: string;
  latency?: number;
}

export interface NetworkLog {
  id: string;
  deviceId: string;
  timestamp: string;
  message: string;
  level: 'info' | 'warning' | 'error';
}

export interface BandwidthData {
  time: string;
  value: number;
}

export interface DiagnosticData {
  deviceId: string;
  bandwidth: BandwidthData[];
  packetLoss: BandwidthData[];
  latency: BandwidthData[];
}

export interface NetworkAlert {
  id: string;
  deviceId: string;
  timestamp: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  acknowledged: boolean;
}
