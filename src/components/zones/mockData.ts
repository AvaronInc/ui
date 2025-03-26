
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
    complianceTags: ['HIPAA', 'Internal']
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
    complianceTags: ['PCI-DSS', 'SOX']
  },
  {
    id: '3',
    name: 'Development Zone',
    description: 'Software development environment with CI/CD integrations',
    status: 'healthy',
    services: ['identity', 'ai', 'rmm', 'mixtral'],
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
    complianceTags: ['Internal']
  },
  {
    id: '4',
    name: 'Executive Zone',
    description: 'Executive leadership secure communications environment',
    status: 'healthy',
    services: ['sdwan', 'identity', 'vault', 'ai'],
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
    complianceTags: ['Confidential', 'Board Level']
  },
  {
    id: '5',
    name: 'Marketing Zone',
    description: 'Marketing operations and content development zone',
    status: 'degraded',
    services: ['identity', 'ai', 'mixtral'],
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
    complianceTags: ['Internal']
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
    complianceTags: ['Internal', 'Customer Data']
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
  mixtralSummary: "HR Zone experiencing degraded AI response, likely due to memory constraints."
};
