
import { NetworkDevice, NetworkConnection, NetworkLog, NetworkAlert, DiagnosticData } from '@/types/topology';

// Generate mock devices
const mockNetworkDevices: NetworkDevice[] = [
  {
    id: 'fw-1',
    name: 'Main Firewall',
    type: 'firewall',
    status: 'online',
    ipAddress: '10.0.0.1',
    macAddress: '00:1A:2B:3C:4D:5E',
    connections: ['rtr-1', 'sw-1', 'sw-2'],
    lastRestart: '2023-07-15T08:30:00Z',
    uptime: '45 days, 12 hours',
    location: 'Main Server Room',
    description: 'Fortinet FortiGate 200F Firewall'
  },
  {
    id: 'rtr-1',
    name: 'Core Router',
    type: 'router',
    status: 'online',
    ipAddress: '10.0.0.2',
    macAddress: '00:1A:2B:3C:4D:5F',
    connections: ['fw-1', 'sw-1', 'sw-2', 'sw-3'],
    lastRestart: '2023-06-28T10:15:00Z',
    uptime: '62 days, 8 hours',
    location: 'Main Server Room',
    description: 'Cisco Catalyst 9500 Router'
  },
  {
    id: 'sw-1',
    name: 'Floor 1 Switch',
    type: 'switch',
    status: 'warning',
    ipAddress: '10.0.0.3',
    macAddress: '00:1A:2B:3C:4D:60',
    connections: ['fw-1', 'rtr-1', 'pc-1', 'pc-2', 'srv-1'],
    lastRestart: '2023-08-05T16:45:00Z',
    uptime: '24 days, 2 hours',
    location: 'Floor 1 Comms Cabinet',
    description: 'Cisco Catalyst 2960 48-Port Switch'
  },
  {
    id: 'sw-2',
    name: 'Floor 2 Switch',
    type: 'switch',
    status: 'online',
    ipAddress: '10.0.0.4',
    macAddress: '00:1A:2B:3C:4D:61',
    connections: ['fw-1', 'rtr-1', 'pc-3', 'pc-4', 'cam-1'],
    lastRestart: '2023-08-10T14:20:00Z',
    uptime: '19 days, 4 hours',
    location: 'Floor 2 Comms Cabinet',
    description: 'Cisco Catalyst 2960 48-Port Switch'
  },
  {
    id: 'sw-3',
    name: 'Floor 3 Switch',
    type: 'switch',
    status: 'offline',
    ipAddress: '10.0.0.5',
    macAddress: '00:1A:2B:3C:4D:62',
    connections: ['rtr-1'],
    lastRestart: '2023-08-25T09:10:00Z',
    uptime: '0 days, 0 hours',
    location: 'Floor 3 Comms Cabinet',
    description: 'Cisco Catalyst 2960 48-Port Switch'
  },
  {
    id: 'srv-1',
    name: 'Primary File Server',
    type: 'server',
    status: 'online',
    ipAddress: '10.0.1.10',
    macAddress: '00:1A:2B:3C:4D:70',
    connections: ['sw-1'],
    lastRestart: '2023-07-30T20:00:00Z',
    uptime: '30 days, 22 hours',
    location: 'Main Server Room',
    description: 'Dell PowerEdge R740 Server'
  },
  {
    id: 'pc-1',
    name: 'Reception PC',
    type: 'workstation',
    status: 'online',
    ipAddress: '10.0.1.101',
    macAddress: '00:1A:2B:3C:4D:80',
    connections: ['sw-1'],
    lastRestart: '2023-08-28T08:00:00Z',
    uptime: '1 day, 10 hours',
    location: 'Reception Desk',
    description: 'Dell OptiPlex 7090 Desktop'
  },
  {
    id: 'pc-2',
    name: 'HR Workstation',
    type: 'workstation',
    status: 'online',
    ipAddress: '10.0.1.102',
    macAddress: '00:1A:2B:3C:4D:81',
    connections: ['sw-1'],
    lastRestart: '2023-08-27T09:15:00Z',
    uptime: '2 days, 9 hours',
    location: 'HR Office',
    description: 'Dell OptiPlex 7090 Desktop'
  },
  {
    id: 'pc-3',
    name: 'Finance Workstation',
    type: 'workstation',
    status: 'warning',
    ipAddress: '10.0.1.103',
    macAddress: '00:1A:2B:3C:4D:82',
    connections: ['sw-2'],
    lastRestart: '2023-08-26T10:30:00Z',
    uptime: '3 days, 8 hours',
    location: 'Finance Department',
    description: 'HP EliteDesk 800 G6 Desktop'
  },
  {
    id: 'pc-4',
    name: 'Marketing Laptop',
    type: 'workstation',
    status: 'offline',
    ipAddress: '10.0.1.104',
    macAddress: '00:1A:2B:3C:4D:83',
    connections: ['sw-2'],
    lastRestart: '2023-08-25T15:45:00Z',
    uptime: '0 days, 0 hours',
    location: 'Marketing Department',
    description: 'Lenovo ThinkPad X1 Carbon'
  },
  {
    id: 'cam-1',
    name: 'Reception Camera',
    type: 'camera',
    status: 'online',
    ipAddress: '10.0.2.50',
    macAddress: '00:1A:2B:3C:4D:90',
    connections: ['sw-2'],
    lastRestart: '2023-08-01T00:00:00Z',
    uptime: '28 days, 18 hours',
    location: 'Reception Area',
    description: 'Axis P3225-LV Network Camera'
  },
  {
    id: 'vpn-1',
    name: 'Remote User - Sarah',
    type: 'vpn',
    status: 'online',
    ipAddress: '45.132.242.121',
    macAddress: '00:1A:2B:3C:4D:A1',
    connections: ['fw-1'],
    lastRestart: '2023-08-29T08:30:00Z',
    uptime: '0 days, 10 hours',
    description: 'VPN User - Marketing'
  },
  {
    id: 'vpn-2',
    name: 'Remote User - Alex',
    type: 'vpn',
    status: 'online',
    ipAddress: '87.65.43.210',
    macAddress: '00:1A:2B:3C:4D:A2',
    connections: ['fw-1'],
    lastRestart: '2023-08-29T09:15:00Z',
    uptime: '0 days, 9 hours',
    description: 'VPN User - IT Support'
  }
];

// Generate mock connections
const mockNetworkConnections: NetworkConnection[] = [
  // Firewall connections
  { id: 'conn-1', source: 'fw-1', target: 'rtr-1', type: 'wired' },
  { id: 'conn-2', source: 'fw-1', target: 'sw-1', type: 'wired' },
  { id: 'conn-3', source: 'fw-1', target: 'sw-2', type: 'wired' },
  
  // Router connections
  { id: 'conn-4', source: 'rtr-1', target: 'sw-1', type: 'wired' },
  { id: 'conn-5', source: 'rtr-1', target: 'sw-2', type: 'wired' },
  { id: 'conn-6', source: 'rtr-1', target: 'sw-3', type: 'wired' },
  
  // Switch 1 connections
  { id: 'conn-7', source: 'sw-1', target: 'pc-1', type: 'wired' },
  { id: 'conn-8', source: 'sw-1', target: 'pc-2', type: 'wired' },
  { id: 'conn-9', source: 'sw-1', target: 'srv-1', type: 'wired' },
  
  // Switch 2 connections
  { id: 'conn-10', source: 'sw-2', target: 'pc-3', type: 'wired' },
  { id: 'conn-11', source: 'sw-2', target: 'pc-4', type: 'wired' },
  { id: 'conn-12', source: 'sw-2', target: 'cam-1', type: 'wired' },
  
  // VPN connections
  { id: 'conn-13', source: 'vpn-1', target: 'fw-1', type: 'vpn' },
  { id: 'conn-14', source: 'vpn-2', target: 'fw-1', type: 'vpn' }
];

// Generate mock logs
const mockNetworkLogs: NetworkLog[] = [
  {
    id: 'log-1',
    deviceId: 'sw-1',
    timestamp: '2023-08-29T13:45:20Z',
    message: 'Port 24 experiencing intermittent connectivity',
    level: 'warning'
  },
  {
    id: 'log-2',
    deviceId: 'fw-1',
    timestamp: '2023-08-29T13:40:15Z',
    message: 'Blocked suspicious traffic from IP 185.234.52.173',
    level: 'info'
  },
  {
    id: 'log-3',
    deviceId: 'rtr-1',
    timestamp: '2023-08-29T13:35:30Z',
    message: 'BGP session established with ISP router',
    level: 'info'
  },
  {
    id: 'log-4',
    deviceId: 'pc-3',
    timestamp: '2023-08-29T13:30:05Z',
    message: 'High CPU usage detected (95%)',
    level: 'warning'
  },
  {
    id: 'log-5',
    deviceId: 'sw-3',
    timestamp: '2023-08-29T13:25:45Z',
    message: 'Device unreachable - connection timed out',
    level: 'error'
  }
];

// Generate mock alerts
const mockNetworkAlerts: NetworkAlert[] = [
  {
    id: 'alert-1',
    deviceId: 'sw-1',
    timestamp: '2023-08-29T13:45:20Z',
    message: 'High error rate on port 24',
    severity: 'warning',
    acknowledged: false
  },
  {
    id: 'alert-2',
    deviceId: 'pc-3',
    timestamp: '2023-08-29T13:30:05Z',
    message: 'System resources critically low',
    severity: 'warning',
    acknowledged: true
  },
  {
    id: 'alert-3',
    deviceId: 'sw-3',
    timestamp: '2023-08-29T13:25:45Z',
    message: 'Device offline - connection lost',
    severity: 'critical',
    acknowledged: false
  }
];

// Generate mock diagnostic data
const generateTimeSeriesData = (): BandwidthData[] => {
  const data: BandwidthData[] = [];
  const now = new Date();
  for (let i = 0; i < 24; i++) {
    const time = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000);
    data.push({
      time: time.toISOString(),
      value: Math.floor(Math.random() * 100)
    });
  }
  return data;
};

// Generate mock data functions
export const getMockNetworkDevices = async (): Promise<NetworkDevice[]> => {
  return Promise.resolve(mockNetworkDevices);
};

export const getMockNetworkConnections = async (): Promise<NetworkConnection[]> => {
  return Promise.resolve(mockNetworkConnections);
};

export const getMockNetworkLogs = async (deviceId?: string): Promise<NetworkLog[]> => {
  if (deviceId) {
    return Promise.resolve(mockNetworkLogs.filter(log => log.deviceId === deviceId));
  }
  return Promise.resolve(mockNetworkLogs);
};

export const getMockNetworkAlerts = async (): Promise<NetworkAlert[]> => {
  return Promise.resolve(mockNetworkAlerts);
};

export const getMockDiagnosticData = async (deviceId?: string): Promise<DiagnosticData[]> => {
  const deviceIds = deviceId ? [deviceId] : mockNetworkDevices.map(d => d.id);
  
  return Promise.resolve(deviceIds.map(id => ({
    deviceId: id,
    bandwidth: generateTimeSeriesData(),
    packetLoss: generateTimeSeriesData().map(d => ({ ...d, value: d.value / 10 })), // Lower values for packet loss
    latency: generateTimeSeriesData().map(d => ({ ...d, value: d.value / 5 })) // Lower values for latency
  })));
};

export const getNetworkOverallBandwidth = async (): Promise<BandwidthData[]> => {
  return Promise.resolve(generateTimeSeriesData().map(d => ({ ...d, value: d.value * 5 })));
};

export const getNetworkOverallPacketLoss = async (): Promise<BandwidthData[]> => {
  return Promise.resolve(generateTimeSeriesData().map(d => ({ ...d, value: d.value / 10 })));
};

export const getNetworkOverallLatency = async (): Promise<BandwidthData[]> => {
  return Promise.resolve(generateTimeSeriesData().map(d => ({ ...d, value: d.value / 5 })));
};
