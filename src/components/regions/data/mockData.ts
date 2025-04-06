
import { Region, Zone, RegionConnection, NetworkPolicy, AutomationFlow } from '@/types/regions';

// Mock Regions
export const mockRegions: Region[] = [
  {
    id: '1',
    name: 'North America East',
    location: {
      lat: 40.7128,
      lng: -74.0060,
      address: 'New York, NY',
      country: 'USA'
    },
    status: 'active',
    zones: ['1', '2', '3'],
    provisionDate: '2024-01-10T00:00:00Z',
    specs: {
      cores: 64,
      memory: 256,
      storage: 4000,
      bandwidth: 10000
    },
    metrics: {
      cpuUtilization: 42,
      memoryUtilization: 38,
      networkUtilization: 45,
      availability: 99.98
    }
  },
  {
    id: '2',
    name: 'North America West',
    location: {
      lat: 37.7749,
      lng: -122.4194,
      address: 'San Francisco, CA',
      country: 'USA'
    },
    status: 'active',
    zones: ['4', '5'],
    provisionDate: '2024-01-15T00:00:00Z',
    specs: {
      cores: 48,
      memory: 192,
      storage: 3000,
      bandwidth: 8000
    },
    metrics: {
      cpuUtilization: 35,
      memoryUtilization: 42,
      networkUtilization: 38,
      availability: 99.95
    }
  },
  {
    id: '3',
    name: 'Europe Central',
    location: {
      lat: 52.5200,
      lng: 13.4050,
      address: 'Berlin, Germany',
      country: 'Germany'
    },
    status: 'degraded',
    zones: ['6', '7'],
    provisionDate: '2024-02-01T00:00:00Z',
    specs: {
      cores: 32,
      memory: 128,
      storage: 2000,
      bandwidth: 5000
    },
    metrics: {
      cpuUtilization: 68,
      memoryUtilization: 75,
      networkUtilization: 82,
      availability: 98.75
    }
  },
  {
    id: '4',
    name: 'Asia Pacific',
    location: {
      lat: 35.6762,
      lng: 139.6503,
      address: 'Tokyo, Japan',
      country: 'Japan'
    },
    status: 'active',
    zones: ['8', '9'],
    provisionDate: '2024-02-20T00:00:00Z',
    specs: {
      cores: 56,
      memory: 224,
      storage: 3500,
      bandwidth: 9000
    },
    metrics: {
      cpuUtilization: 45,
      memoryUtilization: 48,
      networkUtilization: 42,
      availability: 99.92
    }
  }
];

// Mock Zones
export const mockZones: Zone[] = [
  {
    id: '1',
    name: 'NYC-A',
    regionId: '1',
    status: 'active',
    purpose: 'Application Hosting',
    provisionDate: '2024-01-12T00:00:00Z',
    specs: {
      cores: 24,
      memory: 96,
      storage: 1500
    },
    metrics: {
      cpuUtilization: 48,
      memoryUtilization: 42,
      diskUtilization: 35,
      activeServices: 12
    }
  },
  {
    id: '2',
    name: 'NYC-B',
    regionId: '1',
    status: 'active',
    purpose: 'Database Services',
    provisionDate: '2024-01-14T00:00:00Z',
    specs: {
      cores: 32,
      memory: 128,
      storage: 2000
    },
    metrics: {
      cpuUtilization: 55,
      memoryUtilization: 60,
      diskUtilization: 48,
      activeServices: 8
    }
  },
  {
    id: '3',
    name: 'NYC-C',
    regionId: '1',
    status: 'maintenance',
    purpose: 'Storage & Backup',
    provisionDate: '2024-01-16T00:00:00Z',
    specs: {
      cores: 16,
      memory: 64,
      storage: 5000
    },
    metrics: {
      cpuUtilization: 15,
      memoryUtilization: 22,
      diskUtilization: 65,
      activeServices: 4
    }
  },
  {
    id: '4',
    name: 'SF-A',
    regionId: '2',
    status: 'active',
    purpose: 'Web Services',
    provisionDate: '2024-01-18T00:00:00Z',
    specs: {
      cores: 24,
      memory: 96,
      storage: 1200
    },
    metrics: {
      cpuUtilization: 38,
      memoryUtilization: 45,
      diskUtilization: 30,
      activeServices: 14
    }
  },
  {
    id: '5',
    name: 'SF-B',
    regionId: '2',
    status: 'degraded',
    purpose: 'Media Processing',
    provisionDate: '2024-01-20T00:00:00Z',
    specs: {
      cores: 28,
      memory: 112,
      storage: 1800
    },
    metrics: {
      cpuUtilization: 78,
      memoryUtilization: 82,
      diskUtilization: 65,
      activeServices: 10
    }
  }
];

// Mock Region Connections
export const mockConnections: RegionConnection[] = [
  {
    id: 'conn-1',
    sourceRegionId: '1',
    targetRegionId: '2',
    type: 'fiber',
    status: 'active',
    bandwidth: 5000,
    latency: 42,
    packetLoss: 0.05,
    encryptionEnabled: true,
    lastUpdated: '2024-03-15T12:30:00Z'
  },
  {
    id: 'conn-2',
    sourceRegionId: '1',
    targetRegionId: '3',
    type: 'fiber',
    status: 'degraded',
    bandwidth: 3000,
    latency: 85,
    packetLoss: 1.2,
    encryptionEnabled: true,
    lastUpdated: '2024-03-15T10:45:00Z'
  },
  {
    id: 'conn-3',
    sourceRegionId: '1',
    targetRegionId: '4',
    type: 'fiber',
    status: 'active',
    bandwidth: 2500,
    latency: 120,
    packetLoss: 0.08,
    encryptionEnabled: true,
    lastUpdated: '2024-03-15T11:20:00Z'
  },
  {
    id: 'conn-4',
    sourceRegionId: '2',
    targetRegionId: '3',
    type: 'fiber',
    status: 'active',
    bandwidth: 4000,
    latency: 95,
    packetLoss: 0.1,
    encryptionEnabled: true,
    lastUpdated: '2024-03-15T09:15:00Z'
  },
  {
    id: 'conn-5',
    sourceRegionId: '2',
    targetRegionId: '4',
    type: 'satellite',
    status: 'active',
    bandwidth: 1500,
    latency: 180,
    packetLoss: 0.9,
    encryptionEnabled: true,
    lastUpdated: '2024-03-15T14:10:00Z'
  },
  {
    id: 'conn-6',
    sourceRegionId: '3',
    targetRegionId: '4',
    type: 'fiber',
    status: 'down',
    bandwidth: 0,
    latency: 500,
    packetLoss: 100,
    encryptionEnabled: false,
    lastUpdated: '2024-03-15T08:45:00Z'
  }
];

// Mock Network Policies
export const mockPolicies: NetworkPolicy[] = [
  {
    id: 'pol-1',
    name: 'Database Replication',
    description: 'Allow database replication between NA East and NA West',
    sourceRegionId: '1',
    targetRegionId: '2',
    direction: 'bidirectional',
    priority: 10,
    rules: [
      {
        protocol: 'tcp',
        destinationPort: '5432',
        action: 'allow'
      },
      {
        protocol: 'tcp',
        destinationPort: '1433',
        action: 'allow'
      }
    ],
    enabled: true,
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-05T00:00:00Z'
  },
  {
    id: 'pol-2',
    name: 'Web Traffic',
    description: 'Allow HTTP/HTTPS traffic between all regions',
    sourceRegionId: '1',
    targetRegionId: '3',
    direction: 'east-west',
    priority: 20,
    rules: [
      {
        protocol: 'tcp',
        destinationPort: '80',
        action: 'allow'
      },
      {
        protocol: 'tcp',
        destinationPort: '443',
        action: 'allow'
      }
    ],
    enabled: true,
    createdAt: '2024-03-02T00:00:00Z',
    updatedAt: '2024-03-02T00:00:00Z'
  },
  {
    id: 'pol-3',
    name: 'Backup Traffic',
    description: 'Allow backup data transfer between NA East and Asia Pacific',
    sourceRegionId: '1',
    targetRegionId: '4',
    direction: 'east-west',
    priority: 15,
    rules: [
      {
        protocol: 'tcp',
        destinationPort: '8080',
        action: 'allow'
      }
    ],
    enabled: false,
    createdAt: '2024-03-10T00:00:00Z',
    updatedAt: '2024-03-12T00:00:00Z'
  }
];

// Mock Automation Flows
export const mockAutomationFlows: AutomationFlow[] = [
  {
    id: 'flow-1',
    name: 'Service Recovery',
    description: 'Automatically recover services when they go down',
    nodes: [
      {
        id: 'trigger-1',
        type: 'trigger',
        subType: 'service_down',
        position: { x: 100, y: 200 },
        data: {
          service: 'web-server',
          threshold: 60, // seconds
          consecutive: 3 // failures
        }
      },
      {
        id: 'action-1',
        type: 'action',
        subType: 'restart_service',
        position: { x: 300, y: 200 },
        data: {
          service: 'web-server',
          timeout: 30 // seconds
        }
      },
      {
        id: 'outcome-1',
        type: 'outcome',
        subType: 'email',
        position: { x: 500, y: 150 },
        data: {
          recipient: 'admin@example.com',
          subject: 'Service Recovery Attempted',
          template: 'service_recovery'
        }
      },
      {
        id: 'outcome-2',
        type: 'outcome',
        subType: 'ticket',
        position: { x: 500, y: 250 },
        data: {
          priority: 'high',
          assignee: 'operations',
          title: 'Service Recovery Report'
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
        target: 'outcome-1',
        animated: true
      },
      {
        id: 'edge-3',
        source: 'action-1',
        target: 'outcome-2',
        animated: true
      }
    ],
    enabled: true,
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-05T00:00:00Z'
  },
  {
    id: 'flow-2',
    name: 'Packet Loss Alert',
    description: 'Notify when packet loss exceeds threshold',
    nodes: [
      {
        id: 'trigger-1',
        type: 'trigger',
        subType: 'packet_loss',
        position: { x: 100, y: 200 },
        data: {
          threshold: 2.5, // percentage
          duration: 300 // seconds
        }
      },
      {
        id: 'outcome-1',
        type: 'outcome',
        subType: 'sms',
        position: { x: 300, y: 200 },
        data: {
          recipient: '+1234567890',
          message: 'High packet loss detected!'
        }
      }
    ],
    edges: [
      {
        id: 'edge-1',
        source: 'trigger-1',
        target: 'outcome-1',
        animated: true
      }
    ],
    enabled: true,
    createdAt: '2024-03-08T00:00:00Z',
    updatedAt: '2024-03-08T00:00:00Z'
  }
];
