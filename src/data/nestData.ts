
import { NestLocation, SecurityAlert } from '@/types/nest';

// Generate mock security alerts
const generateMockSecurityAlerts = (count: number): SecurityAlert[] => {
  const alerts: SecurityAlert[] = [];
  const severityLevels: ('low' | 'medium' | 'high' | 'critical')[] = ['low', 'medium', 'high', 'critical'];
  const alertMessages = [
    'Unauthorized access attempt detected',
    'Unusual network traffic pattern',
    'Hardware tampering detected',
    'Power supply fluctuation',
    'Environmental anomaly detected',
    'Security update failed to install',
    'Firewall breach attempt'
  ];
  
  for (let i = 0; i < count; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    alerts.push({
      id: `alert-${i}`,
      timestamp: date.toISOString(),
      severity: severityLevels[Math.floor(Math.random() * severityLevels.length)],
      message: alertMessages[Math.floor(Math.random() * alertMessages.length)],
      acknowledged: Math.random() > 0.5
    });
  }
  
  return alerts;
};

// Mock N.E.S.T. locations
export const mockNestLocations: NestLocation[] = [
  {
    id: 'nest-001',
    name: 'San Francisco Data Center',
    status: 'online',
    lastCheckIn: '2023-08-29T13:45:20Z',
    hardwareModel: 'CyberNest Pro X1',
    temperature: 22.5,
    uptime: '45 days, 12 hours',
    hasLiveStream: true,
    latitude: 37.7749,
    longitude: -122.4194,
    region: 'North America',
    hardwareInventory: {
      cpu: 'Intel Xeon Platinum 8380, 40 cores @ 2.8 GHz',
      ram: '128 GB DDR4 ECC',
      storage: '8 TB NVMe SSD RAID-10',
      networkAdapters: ['Cisco UCS VIC 1400, 100 Gbps', 'Intel X710, 10 Gbps']
    },
    environmentalData: {
      humidity: 45,
      powerUsage: 1250,
      coolingStatus: 'normal'
    },
    resourceUsage: {
      cpuLoad: 42,
      storageUsed: 35,
      networkTraffic: 28
    },
    lastRestart: '2023-07-15T08:30:00Z',
    lastMaintenance: {
      date: '2023-07-15T08:00:00Z',
      technician: 'Sarah Johnson',
      notes: 'Replaced cooling fans, updated firmware, cleaned dust'
    },
    securityAlerts: generateMockSecurityAlerts(2)
  },
  {
    id: 'nest-002',
    name: 'New York Edge Node',
    status: 'online',
    lastCheckIn: '2023-08-29T13:50:10Z',
    hardwareModel: 'CyberNest Lite',
    temperature: 24.1,
    uptime: '67 days, 3 hours',
    hasLiveStream: true,
    latitude: 40.7128,
    longitude: -74.0060,
    region: 'North America',
    hardwareInventory: {
      cpu: 'AMD EPYC 7763, 24 cores @ 2.6 GHz',
      ram: '64 GB DDR4 ECC',
      storage: '4 TB NVMe SSD RAID-5',
      networkAdapters: ['Mellanox ConnectX-6, 25 Gbps', 'Intel I350, 1 Gbps']
    },
    environmentalData: {
      humidity: 42,
      powerUsage: 850,
      coolingStatus: 'normal'
    },
    resourceUsage: {
      cpuLoad: 28,
      storageUsed: 22,
      networkTraffic: 15
    },
    lastRestart: '2023-06-23T10:15:00Z',
    lastMaintenance: {
      date: '2023-06-23T09:30:00Z',
      technician: 'Michael Chen',
      notes: 'Upgraded RAM modules, installed security patches'
    },
    securityAlerts: []
  },
  {
    id: 'nest-003',
    name: 'London Gateway',
    status: 'degraded',
    lastCheckIn: '2023-08-29T13:30:45Z',
    hardwareModel: 'CyberNest Pro X1',
    temperature: 28.3,
    uptime: '12 days, 7 hours',
    hasLiveStream: true,
    latitude: 51.5074,
    longitude: -0.1278,
    region: 'Europe',
    hardwareInventory: {
      cpu: 'Intel Xeon Gold 6338, 32 cores @ 2.4 GHz',
      ram: '96 GB DDR4 ECC',
      storage: '6 TB NVMe SSD RAID-10',
      networkAdapters: ['Cisco UCS VIC 1400, 100 Gbps', 'Intel X710, 10 Gbps']
    },
    environmentalData: {
      humidity: 52,
      powerUsage: 1150,
      coolingStatus: 'warning'
    },
    resourceUsage: {
      cpuLoad: 76,
      storageUsed: 49,
      networkTraffic: 64
    },
    lastRestart: '2023-08-17T14:20:00Z',
    lastMaintenance: {
      date: '2023-07-10T11:45:00Z',
      technician: 'Emma Watson',
      notes: 'Replaced damaged power supply, updated firmware'
    },
    securityAlerts: generateMockSecurityAlerts(1)
  },
  {
    id: 'nest-004',
    name: 'Singapore Hub',
    status: 'online',
    lastCheckIn: '2023-08-29T13:55:30Z',
    hardwareModel: 'CyberNest Ultra',
    temperature: 25.7,
    uptime: '103 days, 22 hours',
    hasLiveStream: true,
    latitude: 1.3521,
    longitude: 103.8198,
    region: 'Asia',
    hardwareInventory: {
      cpu: 'AMD EPYC 9654, 64 cores @ 3.7 GHz',
      ram: '256 GB DDR5 ECC',
      storage: '16 TB NVMe SSD RAID-10',
      networkAdapters: ['Mellanox ConnectX-7, 200 Gbps', 'Intel X710, 10 Gbps']
    },
    environmentalData: {
      humidity: 68,
      powerUsage: 1850,
      coolingStatus: 'normal'
    },
    resourceUsage: {
      cpuLoad: 31,
      storageUsed: 29,
      networkTraffic: 42
    },
    lastRestart: '2023-05-18T06:10:00Z',
    lastMaintenance: {
      date: '2023-05-18T05:30:00Z',
      technician: 'Lee Ming',
      notes: 'Full system audit, dust cleaning, cooling optimization'
    },
    securityAlerts: []
  },
  {
    id: 'nest-005',
    name: 'Sydney Edge Point',
    status: 'offline',
    lastCheckIn: '2023-08-28T22:15:12Z',
    hardwareModel: 'CyberNest Pro',
    temperature: null,
    uptime: '0 days, 0 hours',
    hasLiveStream: false,
    latitude: -33.8688,
    longitude: 151.2093,
    region: 'Australia',
    hardwareInventory: {
      cpu: 'Intel Xeon Silver 4316, 16 cores @ 2.3 GHz',
      ram: '64 GB DDR4 ECC',
      storage: '4 TB NVMe SSD RAID-5',
      networkAdapters: ['Cisco UCS VIC 1200, 40 Gbps', 'Intel I350, 1 Gbps']
    },
    environmentalData: {
      humidity: null,
      powerUsage: 0,
      coolingStatus: 'critical'
    },
    resourceUsage: {
      cpuLoad: 0,
      storageUsed: 32,
      networkTraffic: 0
    },
    lastRestart: '2023-08-28T18:45:00Z',
    lastMaintenance: {
      date: '2023-07-05T14:30:00Z',
      technician: 'Alice Cooper',
      notes: 'Routine maintenance and software updates'
    },
    securityAlerts: generateMockSecurityAlerts(3)
  },
  {
    id: 'nest-006',
    name: 'Tokyo Data Center',
    status: 'online',
    lastCheckIn: '2023-08-29T14:01:05Z',
    hardwareModel: 'CyberNest Ultra',
    temperature: 21.9,
    uptime: '89 days, 14 hours',
    hasLiveStream: true,
    latitude: 35.6762,
    longitude: 139.6503,
    region: 'Asia',
    hardwareInventory: {
      cpu: 'AMD EPYC 9554, 48 cores @ 3.1 GHz',
      ram: '192 GB DDR5 ECC',
      storage: '12 TB NVMe SSD RAID-10',
      networkAdapters: ['Mellanox ConnectX-7, 200 Gbps', 'Intel X710, 10 Gbps']
    },
    environmentalData: {
      humidity: 44,
      powerUsage: 1650,
      coolingStatus: 'normal'
    },
    resourceUsage: {
      cpuLoad: 45,
      storageUsed: 38,
      networkTraffic: 52
    },
    lastRestart: '2023-06-01T22:30:00Z',
    lastMaintenance: {
      date: '2023-06-01T21:45:00Z',
      technician: 'Tanaka Hiro',
      notes: 'Upgraded storage system, optimized network configuration'
    },
    securityAlerts: generateMockSecurityAlerts(1)
  }
];

// API mock functions
export const getNestLocations = async (): Promise<NestLocation[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockNestLocations;
};

export const getNestLocationById = async (id: string): Promise<NestLocation | undefined> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockNestLocations.find(location => location.id === id);
};

export const restartNest = async (id: string): Promise<{ success: boolean, message: string }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Check if the N.E.S.T. exists
  const nest = mockNestLocations.find(location => location.id === id);
  if (!nest) {
    return { success: false, message: 'N.E.S.T. not found' };
  }
  
  // Check if the N.E.S.T. is online
  if (nest.status === 'offline') {
    return { success: false, message: 'Cannot restart offline N.E.S.T.' };
  }
  
  return { success: true, message: `${nest.name} restart initiated successfully` };
};

export const runNestDiagnostics = async (id: string): Promise<{ success: boolean, message: string, results?: any }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Check if the N.E.S.T. exists
  const nest = mockNestLocations.find(location => location.id === id);
  if (!nest) {
    return { success: false, message: 'N.E.S.T. not found' };
  }
  
  // Check if the N.E.S.T. is online
  if (nest.status === 'offline') {
    return { success: false, message: 'Cannot run diagnostics on offline N.E.S.T.' };
  }
  
  // Mock diagnostics results
  const results = {
    networkLatency: Math.floor(Math.random() * 50) + 10,
    diskHealthStatus: Math.random() > 0.2 ? 'Healthy' : 'Warning',
    memoryTests: 'Passed',
    cpuTests: 'Passed',
    securityScan: Math.random() > 0.3 ? 'No issues found' : 'Minor issues detected'
  };
  
  return { 
    success: true, 
    message: `Diagnostics completed for ${nest.name}`,
    results
  };
};
