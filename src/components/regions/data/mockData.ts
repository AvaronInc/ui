
import { Region, Zone, RegionConnection, NetworkPolicy, AutomationFlow } from '@/types/regions';

// Mock regions data
export const mockRegions: Region[] = [
  {
    id: 'reg-01',
    name: 'North America East',
    location: {
      lat: 40.7128,
      lng: -74.0060,
      address: 'New York, NY, USA',
      country: 'USA'
    },
    status: 'active',
    zones: ['zone-01', 'zone-02', 'zone-03'],
    provisionDate: '2023-10-15',
    specs: {
      cores: 64,
      memory: 256,
      storage: 4000,
      bandwidth: 10000
    },
    metrics: {
      cpuUtilization: 42,
      memoryUtilization: 38,
      networkUtilization: 55,
      availability: 99.99
    }
  },
  {
    id: 'reg-02',
    name: 'Europe West',
    location: {
      lat: 51.5074,
      lng: -0.1278,
      address: 'London, UK',
      country: 'United Kingdom'
    },
    status: 'active',
    zones: ['zone-04', 'zone-05'],
    provisionDate: '2023-11-22',
    specs: {
      cores: 48,
      memory: 192,
      storage: 3000,
      bandwidth: 8000
    },
    metrics: {
      cpuUtilization: 35,
      memoryUtilization: 42,
      networkUtilization: 48,
      availability: 99.97
    }
  },
  {
    id: 'reg-03',
    name: 'Asia Pacific',
    location: {
      lat: 35.6762,
      lng: 139.6503,
      address: 'Tokyo, Japan',
      country: 'Japan'
    },
    status: 'degraded',
    zones: ['zone-06', 'zone-07'],
    provisionDate: '2024-01-05',
    specs: {
      cores: 32,
      memory: 128,
      storage: 2000,
      bandwidth: 5000
    },
    metrics: {
      cpuUtilization: 78,
      memoryUtilization: 85,
      networkUtilization: 72,
      availability: 98.45
    }
  }
];

// Mock zones data
export const mockZones: Zone[] = [
  {
    id: 'zone-01',
    name: 'NAE Zone 1',
    regionId: 'reg-01',
    status: 'active',
    purpose: 'General Computing',
    provisionDate: '2023-10-20',
    specs: {
      cores: 24,
      memory: 96,
      storage: 1500
    },
    metrics: {
      cpuUtilization: 45,
      memoryUtilization: 40,
      diskUtilization: 38,
      activeServices: 12
    }
  },
  {
    id: 'zone-02',
    name: 'NAE Zone 2',
    regionId: 'reg-01',
    status: 'active',
    purpose: 'Database',
    provisionDate: '2023-10-25',
    specs: {
      cores: 20,
      memory: 128,
      storage: 2000
    },
    metrics: {
      cpuUtilization: 38,
      memoryUtilization: 45,
      diskUtilization: 65,
      activeServices: 8
    }
  },
  {
    id: 'zone-03',
    name: 'NAE Zone 3',
    regionId: 'reg-01',
    status: 'maintenance',
    purpose: 'AI/ML Workloads',
    provisionDate: '2023-11-01',
    specs: {
      cores: 20,
      memory: 32,
      storage: 500
    },
    metrics: {
      cpuUtilization: 0,
      memoryUtilization: 0,
      diskUtilization: 22,
      activeServices: 0
    }
  },
  {
    id: 'zone-04',
    name: 'EUW Zone 1',
    regionId: 'reg-02',
    status: 'active',
    purpose: 'General Computing',
    provisionDate: '2023-11-24',
    specs: {
      cores: 24,
      memory: 96,
      storage: 1500
    },
    metrics: {
      cpuUtilization: 35,
      memoryUtilization: 42,
      diskUtilization: 28,
      activeServices: 15
    }
  },
  {
    id: 'zone-05',
    name: 'EUW Zone 2',
    regionId: 'reg-02',
    status: 'active',
    purpose: 'Content Delivery',
    provisionDate: '2023-11-26',
    specs: {
      cores: 24,
      memory: 96,
      storage: 1500
    },
    metrics: {
      cpuUtilization: 52,
      memoryUtilization: 48,
      diskUtilization: 75,
      activeServices: 18
    }
  },
  {
    id: 'zone-06',
    name: 'APAC Zone 1',
    regionId: 'reg-03',
    status: 'degraded',
    purpose: 'General Computing',
    provisionDate: '2024-01-08',
    specs: {
      cores: 16,
      memory: 64,
      storage: 1000
    },
    metrics: {
      cpuUtilization: 82,
      memoryUtilization: 88,
      diskUtilization: 72,
      activeServices: 10
    }
  },
  {
    id: 'zone-07',
    name: 'APAC Zone 2',
    regionId: 'reg-03',
    status: 'active',
    purpose: 'Backup & Storage',
    provisionDate: '2024-01-10',
    specs: {
      cores: 16,
      memory: 64,
      storage: 1000
    },
    metrics: {
      cpuUtilization: 25,
      memoryUtilization: 30,
      diskUtilization: 85,
      activeServices: 5
    }
  }
];

// Mock connections data
export const mockConnections: RegionConnection[] = [
  {
    id: 'conn-01',
    sourceRegionId: 'reg-01',
    targetRegionId: 'reg-02',
    type: 'fiber',
    status: 'active',
    bandwidth: 5000,
    latency: 85,
    packetLoss: 0.02,
    encryptionEnabled: true,
    lastUpdated: '2024-03-25T08:15:30Z'
  },
  {
    id: 'conn-02',
    sourceRegionId: 'reg-01',
    targetRegionId: 'reg-03',
    type: 'fiber',
    status: 'degraded',
    bandwidth: 3000,
    latency: 145,
    packetLoss: 1.25,
    encryptionEnabled: true,
    lastUpdated: '2024-03-25T08:15:30Z'
  },
  {
    id: 'conn-03',
    sourceRegionId: 'reg-02',
    targetRegionId: 'reg-03',
    type: 'satellite',
    status: 'active',
    bandwidth: 1000,
    latency: 220,
    packetLoss: 0.08,
    encryptionEnabled: false,
    lastUpdated: '2024-03-25T08:15:30Z'
  }
];

// Mock network policies
export const mockPolicies: NetworkPolicy[] = [
  {
    id: 'policy-01',
    name: 'Secure Database Access',
    description: 'Allow secure database access between regions',
    sourceRegionId: 'reg-01',
    targetRegionId: 'reg-02',
    direction: 'bidirectional',
    priority: 1,
    rules: [
      { protocol: 'tcp', destinationPort: '3306', action: 'allow' },
      { protocol: 'tcp', destinationPort: '5432', action: 'allow' },
      { protocol: 'tcp', destinationPort: '27017', action: 'allow' }
    ],
    enabled: true,
    createdAt: '2024-02-15T10:30:00Z',
    updatedAt: '2024-03-01T14:45:22Z'
  },
  {
    id: 'policy-02',
    name: 'Web Services',
    description: 'Allow web traffic between regions',
    sourceRegionId: 'reg-01',
    targetRegionId: 'reg-03',
    direction: 'east-west',
    priority: 2,
    rules: [
      { protocol: 'tcp', destinationPort: '80', action: 'allow' },
      { protocol: 'tcp', destinationPort: '443', action: 'allow' }
    ],
    enabled: true,
    createdAt: '2024-02-18T09:15:00Z',
    updatedAt: '2024-02-18T09:15:00Z'
  },
  {
    id: 'policy-03',
    name: 'Monitoring & Metrics',
    description: 'Allow monitoring traffic',
    sourceRegionId: 'reg-02',
    targetRegionId: 'reg-03',
    direction: 'bidirectional',
    priority: 3,
    rules: [
      { protocol: 'tcp', destinationPort: '9090-9100', action: 'allow' },
      { protocol: 'udp', destinationPort: '9125', action: 'allow' }
    ],
    enabled: true,
    createdAt: '2024-02-20T11:45:00Z',
    updatedAt: '2024-03-10T16:22:45Z'
  },
  {
    id: 'policy-04',
    name: 'Block Suspicious Traffic',
    description: 'Block potentially malicious traffic',
    sourceRegionId: 'reg-03',
    targetRegionId: 'reg-01',
    direction: 'east-west',
    priority: 1,
    rules: [
      { protocol: 'any', action: 'deny' }
    ],
    enabled: false,
    createdAt: '2024-03-05T13:20:00Z',
    updatedAt: '2024-03-15T09:10:18Z'
  }
];

// Mock automation flows data
export const mockAutomationFlows: AutomationFlow[] = [
  {
    id: 'flow-01',
    name: 'Network Degradation Response',
    description: 'Automatically respond to network degradation events',
    nodes: [
      {
        id: 'trigger-1',
        type: 'trigger',
        subType: 'connectivity_issue',
        position: { x: 100, y: 150 },
        data: {
          threshold: '5 minutes',
          severity: 'high'
        }
      },
      {
        id: 'action-1',
        type: 'action',
        subType: 'restart_service',
        position: { x: 350, y: 100 },
        data: {
          service: 'sd-wan-controller',
          timeout: '30s'
        }
      },
      {
        id: 'action-2',
        type: 'action',
        subType: 'switch_region',
        position: { x: 350, y: 200 },
        data: {
          targetRegion: 'backup',
          gracePeriod: '5m'
        }
      },
      {
        id: 'outcome-1',
        type: 'outcome',
        subType: 'email',
        position: { x: 600, y: 150 },
        data: {
          recipients: 'operations@example.com',
          subject: 'Network Degradation Incident'
        }
      }
    ],
    edges: [
      {
        id: 'edge-1',
        source: 'trigger-1',
        target: 'action-1',
        animated: true
      },
      {
        id: 'edge-2',
        source: 'trigger-1',
        target: 'action-2',
        animated: true
      },
      {
        id: 'edge-3',
        source: 'action-1',
        target: 'outcome-1'
      },
      {
        id: 'edge-4',
        source: 'action-2',
        target: 'outcome-1'
      }
    ],
    enabled: true,
    createdAt: '2024-02-10T09:00:00Z',
    updatedAt: '2024-03-15T14:30:00Z'
  },
  {
    id: 'flow-02',
    name: 'CPU Threshold Alert',
    description: 'Send alerts when CPU usage exceeds threshold',
    nodes: [
      {
        id: 'trigger-1',
        type: 'trigger',
        subType: 'cpu_threshold',
        position: { x: 100, y: 150 },
        data: {
          threshold: '85%',
          duration: '5m'
        }
      },
      {
        id: 'action-1',
        type: 'action',
        subType: 'scale_resources',
        position: { x: 350, y: 150 },
        data: {
          scaleFactor: '2x',
          resource: 'cpu'
        }
      },
      {
        id: 'outcome-1',
        type: 'outcome',
        subType: 'push_notification',
        position: { x: 600, y: 150 },
        data: {
          channel: 'operations',
          priority: 'high'
        }
      }
    ],
    edges: [
      {
        id: 'edge-1',
        source: 'trigger-1',
        target: 'action-1',
        animated: true
      },
      {
        id: 'edge-2',
        source: 'action-1',
        target: 'outcome-1'
      }
    ],
    enabled: false,
    createdAt: '2024-02-15T11:20:00Z',
    updatedAt: '2024-02-16T09:45:00Z'
  },
  {
    id: 'flow-03',
    name: 'Storage Unavailable Response',
    description: 'Handle storage unavailability events',
    nodes: [
      {
        id: 'trigger-1',
        type: 'trigger',
        subType: 'storage_issue',
        position: { x: 100, y: 150 },
        data: {
          storageType: 'primary',
          threshold: '10m'
        }
      },
      {
        id: 'action-1',
        type: 'action',
        subType: 'enable_failover',
        position: { x: 350, y: 150 },
        data: {
          target: 'backup-storage',
          mode: 'read-write'
        }
      },
      {
        id: 'outcome-1',
        type: 'outcome',
        subType: 'sms',
        position: { x: 600, y: 100 },
        data: {
          recipients: '+1234567890',
          message: 'Storage system failover activated'
        }
      },
      {
        id: 'outcome-2',
        type: 'outcome',
        subType: 'ticket',
        position: { x: 600, y: 200 },
        data: {
          priority: 'urgent',
          assignee: 'storage-team'
        }
      }
    ],
    edges: [
      {
        id: 'edge-1',
        source: 'trigger-1',
        target: 'action-1',
        animated: true
      },
      {
        id: 'edge-2',
        source: 'action-1',
        target: 'outcome-1'
      },
      {
        id: 'edge-3',
        source: 'action-1',
        target: 'outcome-2'
      }
    ],
    enabled: true,
    createdAt: '2024-03-01T15:30:00Z',
    updatedAt: '2024-03-01T15:30:00Z'
  }
];
