
import { Zone, ZoneSummary } from './types';

export const mockZones: Zone[] = [
  {
    id: '1',
    name: 'HR Zone',
    description: 'Human Resources dedicated zone with enhanced privacy controls',
    status: 'warning',
    services: ['identity', 'vault', 'ai', 'mixtral', 'nestvault'],
    adminScopes: ['HR Admin', 'Global Admin'],
    resourceUsage: {
      cpu: 45,
      ram: 78,
      storage: 32
    },
    vaultIdRequired: true,
    created: '2023-06-15T14:22:10Z',
    modified: '2023-09-22T08:45:33Z',
    isolationLevel: 'high',
    complianceTags: ['HIPAA', 'Internal'],
    storageConfig: {
      enabled: true,
      provisioned: 5,
      used: 3.7,
      tier: 'hot',
      status: 'near-limit',
      erasureCoding: true,
      publicBucketsAllowed: false,
      customRetention: true
    }
  },
  {
    id: '2',
    name: 'Finance Zone',
    description: 'Financial systems and operations zone with strict access controls',
    status: 'healthy',
    services: ['identity', 'vault', 'ai', 'sdwan', 'nestvault'],
    adminScopes: ['Finance Admin', 'Global Admin'],
    resourceUsage: {
      cpu: 35,
      ram: 50,
      storage: 65
    },
    vaultIdRequired: true,
    created: '2023-05-20T10:12:45Z',
    modified: '2023-10-05T16:30:22Z',
    isolationLevel: 'high',
    complianceTags: ['PCI-DSS', 'SOX'],
    storageConfig: {
      enabled: true,
      provisioned: 10,
      used: 6.2,
      tier: 'hot',
      status: 'normal',
      erasureCoding: true,
      publicBucketsAllowed: false,
      customRetention: true
    }
  },
  {
    id: '3',
    name: 'Development Zone',
    description: 'Software development environment with CI/CD integrations',
    status: 'healthy',
    services: ['identity', 'ai', 'rmm', 'mixtral', 'nestvault'],
    adminScopes: ['DevOps Admin', 'Global Admin'],
    resourceUsage: {
      cpu: 70,
      ram: 85,
      storage: 45
    },
    vaultIdRequired: false,
    created: '2023-04-10T09:15:33Z',
    modified: '2023-10-01T14:22:45Z',
    isolationLevel: 'normal',
    complianceTags: ['Internal'],
    storageConfig: {
      enabled: true,
      provisioned: 20,
      used: 8.5,
      tier: 'cold',
      status: 'normal',
      erasureCoding: true,
      publicBucketsAllowed: true,
      customRetention: false
    }
  },
  {
    id: '4',
    name: 'Executive Zone',
    description: 'Executive leadership secure communications environment',
    status: 'healthy',
    services: ['sdwan', 'identity', 'vault', 'ai', 'nestvault'],
    adminScopes: ['Executive Admin', 'Global Admin'],
    resourceUsage: {
      cpu: 25,
      ram: 40,
      storage: 30
    },
    vaultIdRequired: true,
    created: '2023-07-05T11:45:12Z',
    modified: '2023-09-15T15:10:08Z',
    isolationLevel: 'airgapped',
    complianceTags: ['Confidential', 'Board Level'],
    storageConfig: {
      enabled: true,
      provisioned: 3,
      used: 0.8,
      tier: 'hot',
      status: 'normal',
      erasureCoding: true,
      publicBucketsAllowed: false,
      customRetention: true
    }
  },
  {
    id: '5',
    name: 'Marketing Zone',
    description: 'Marketing operations and content development zone',
    status: 'degraded',
    services: ['identity', 'ai', 'mixtral', 'nestvault'],
    adminScopes: ['Marketing Admin', 'Global Admin'],
    resourceUsage: {
      cpu: 90,
      ram: 95,
      storage: 80
    },
    vaultIdRequired: false,
    created: '2023-08-18T13:30:25Z',
    modified: '2023-10-10T09:45:30Z',
    isolationLevel: 'normal',
    complianceTags: ['Internal'],
    storageConfig: {
      enabled: true,
      provisioned: 15,
      used: 13.1,
      tier: 'hot',
      status: 'warning',
      erasureCoding: false,
      publicBucketsAllowed: true,
      customRetention: false
    }
  },
  {
    id: '6',
    name: 'Customer Support Zone',
    description: 'Customer support operations with ticketing integrations',
    status: 'healthy',
    services: ['identity', 'ai', 'rmm'],
    adminScopes: ['Support Admin', 'Global Admin'],
    resourceUsage: {
      cpu: 55,
      ram: 60,
      storage: 40
    },
    vaultIdRequired: false,
    created: '2023-09-01T10:20:15Z',
    modified: '2023-10-12T11:35:42Z',
    isolationLevel: 'normal',
    complianceTags: ['Internal', 'Customer Data'],
    storageConfig: {
      enabled: false,
      provisioned: 0,
      used: 0,
      tier: 'cold',
      status: 'unavailable',
      erasureCoding: false,
      publicBucketsAllowed: false,
      customRetention: false
    }
  },
];

export const mockZoneSummary: ZoneSummary = {
  totalZones: 12,
  highTrustZones: 3,
  zonesWithAlerts: 2,
  aiTraffic: [
    { zoneName: 'Marketing Zone', trafficPercentage: 38 },
    { zoneName: 'Development Zone', trafficPercentage: 27 },
    { zoneName: 'HR Zone', trafficPercentage: 18 },
    { zoneName: 'Finance Zone', trafficPercentage: 10 },
    { zoneName: 'Customer Support Zone', trafficPercentage: 7 }
  ],
  mixtralSummary: "HR Zone experiencing degraded AI response, likely due to memory constraints.",
  storageStats: {
    totalProvisioned: 53,
    totalUsed: 32.3,
    mostUsedZone: 'Marketing Zone',
    lowStorageAlerts: 2
  }
};
