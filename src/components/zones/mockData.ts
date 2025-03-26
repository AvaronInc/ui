import { Zone, ZoneUser, ZoneAuditEvent, ZoneSummary } from './types';
import { addDays, subDays, format, subHours, subMinutes } from 'date-fns';

// Mock zone summary data for ZoneInsights
export const mockZoneSummary: ZoneSummary = {
  totalZones: 8,
  healthyZones: 5,
  warningZones: 2,
  degradedZones: 1,
  storageUsage: 65,
  securityScore: 87,
  complianceScore: 92,
  recentEvents: [
    {
      id: 'event-1',
      type: 'security',
      message: 'New security policy applied to Financial Services zone',
      timestamp: '2 hours ago'
    },
    {
      id: 'event-2',
      type: 'compliance',
      message: 'PCI compliance check passed for Production Core Services',
      timestamp: '4 hours ago'
    },
    {
      id: 'event-3',
      type: 'system',
      message: 'Storage allocation increased for Development Environment',
      timestamp: '1 day ago'
    }
  ],
  highTrustZones: 3,
  zonesWithAlerts: 2,
  storageStats: {
    totalUsed: 3.2,
    totalProvisioned: 5.0,
    mostUsedZone: 'Production Core Services',
    lowStorageAlerts: 1
  },
  aiTraffic: [
    { zoneName: 'Production Core Services', trafficPercentage: 42 },
    { zoneName: 'Development Environment', trafficPercentage: 27 },
    { zoneName: 'Financial Services', trafficPercentage: 18 },
    { zoneName: 'Data Analysis Zone', trafficPercentage: 13 }
  ],
  mixtralSummary: "Overall infrastructure health is excellent with 5 of 8 zones showing optimal performance. Storage usage trending upward with a 15% increase since last month. Consider optimizing the development zone which is generating the most alerts."
};

// Create a single mockZones export with all the required properties
export const mockZones: Zone[] = [
  {
    id: 'zone-1',
    name: 'Production Core Services',
    description: 'Primary zone for mission-critical production services',
    status: 'healthy',
    createdAt: '2023-05-15T08:00:00Z',
    updatedAt: '2023-10-20T14:35:00Z',
    serviceCount: 12,
    resourceUsage: {
      cpu: 65,
      memory: 72,
      storage: 48,
      network: 58,
      ram: 72 // Adding ram for backward compatibility
    },
    complianceStatus: {
      pci: true,
      hipaa: true,
      gdpr: true,
      sox: true
    },
    securityLevel: 'maximum',
    vaultIDSettings: {
      requireVaultID: true,
      enforceBiometricMFA: true,
      revalidationPeriod: 30, // days
      lastConfigUpdate: subDays(new Date(), 15).toISOString()
    },
    created: '2023-05-15T08:00:00Z',
    modified: '2023-10-20T14:35:00Z',
    isolationLevel: 'Maximum',
    vaultIdRequired: true,
    adminScopes: ['Global', 'Security', 'Compliance', 'Operations'],
    services: [
      { id: 'svc-1', name: 'Authentication Service', type: 'identity', status: 'healthy' },
      { id: 'svc-2', name: 'Authorization Service', type: 'identity', status: 'healthy' },
      { id: 'svc-3', name: 'Core API Gateway', type: 'network', status: 'healthy' }
    ],
    storageConfig: {
      tier: 'Enterprise',
      size: 2048,
      maxSize: 4096,
      encryption: true,
      replication: true,
      backupEnabled: true,
      backupFrequency: 'Daily',
      status: 'Operational',
      complianceFeatures: ['HIPAA', 'PCI-DSS', 'GDPR', 'SOX'],
      enabled: true,
      used: 2048,
      provisioned: 4096,
      erasureCoding: true,
      publicBucketsAllowed: false,
      customRetention: true
    },
    complianceTags: ['PCI-DSS', 'HIPAA', 'GDPR', 'SOX']
  },
  {
    id: 'zone-2',
    name: 'Development Environment',
    description: 'Isolated zone for development and testing',
    status: 'warning',
    createdAt: '2023-06-22T10:15:00Z',
    updatedAt: '2023-10-18T09:45:00Z',
    serviceCount: 8,
    resourceUsage: {
      cpu: 42,
      memory: 58,
      storage: 35,
      network: 22,
      ram: 58 // Adding ram for backward compatibility
    },
    complianceStatus: {
      pci: false,
      hipaa: false,
      gdpr: true,
      sox: false
    },
    securityLevel: 'standard',
    vaultIDSettings: {
      requireVaultID: true,
      enforceBiometricMFA: false,
      revalidationPeriod: 60, // days
      lastConfigUpdate: subDays(new Date(), 30).toISOString()
    },
    created: '2023-06-22T10:15:00Z',
    modified: '2023-10-18T09:45:00Z',
    isolationLevel: 'Standard',
    vaultIdRequired: true,
    adminScopes: ['Development', 'Testing'],
    services: [
      { id: 'svc-4', name: 'Dev API Gateway', type: 'network', status: 'warning' },
      { id: 'svc-5', name: 'Test Database', type: 'database', status: 'healthy' }
    ],
    storageConfig: {
      tier: 'Standard',
      size: 1024,
      maxSize: 2048,
      encryption: true,
      replication: false,
      backupEnabled: true,
      backupFrequency: 'Weekly',
      status: 'Warning',
      complianceFeatures: ['GDPR'],
      enabled: true,
      used: 768,
      provisioned: 1024,
      erasureCoding: false,
      publicBucketsAllowed: true,
      customRetention: false
    },
    complianceTags: ['GDPR']
  },
  {
    id: 'zone-3',
    name: 'Financial Services',
    description: 'Secure zone for financial and payment processing',
    status: 'healthy',
    createdAt: '2023-07-10T14:30:00Z',
    updatedAt: '2023-10-21T11:20:00Z',
    serviceCount: 6,
    resourceUsage: {
      cpu: 38,
      memory: 45,
      storage: 60,
      network: 32,
      ram: 45 // Adding ram for backward compatibility
    },
    complianceStatus: {
      pci: true,
      hipaa: false,
      gdpr: true,
      sox: true
    },
    securityLevel: 'enhanced',
    vaultIDSettings: {
      requireVaultID: true,
      enforceBiometricMFA: true,
      revalidationPeriod: 45, // days
      lastConfigUpdate: subDays(new Date(), 5).toISOString()
    },
    created: '2023-07-10T14:30:00Z',
    modified: '2023-10-21T11:20:00Z',
    isolationLevel: 'Enhanced',
    vaultIdRequired: true,
    adminScopes: ['Finance', 'Compliance', 'Security'],
    services: [
      { id: 'svc-6', name: 'Payment Processing', type: 'finance', status: 'healthy' },
      { id: 'svc-7', name: 'Financial Database', type: 'database', status: 'healthy' }
    ],
    storageConfig: {
      tier: 'Business',
      size: 1536,
      maxSize: 3072,
      encryption: true,
      replication: true,
      backupEnabled: true,
      backupFrequency: 'Daily',
      status: 'Operational',
      complianceFeatures: ['PCI-DSS', 'GDPR', 'SOX'],
      enabled: true,
      used: 1024,
      provisioned: 1536,
      erasureCoding: true,
      publicBucketsAllowed: false,
      customRetention: true
    },
    complianceTags: ['PCI-DSS', 'GDPR', 'SOX']
  }
];

// Mock Zone Users data
export const mockZoneUsers: Record<string, ZoneUser[]> = {
  'zone-1': [
    {
      id: 'user-1',
      fullName: 'Alex Mercer',
      email: 'alex.mercer@avaron.com',
      role: 'Owner',
      lastLogin: subHours(new Date(), 2).toISOString(),
      mfaStatus: 'enforced',
      biometricEnrolled: true,
      certificateIssued: subDays(new Date(), 45).toISOString(),
      certificateExpiry: addDays(new Date(), 320).toISOString(),
      status: 'active'
    },
    {
      id: 'user-2',
      fullName: 'Sarah Lin',
      email: 'sarah.lin@avaron.com',
      role: 'Admin',
      lastLogin: subDays(new Date(), 1).toISOString(),
      mfaStatus: 'enabled',
      biometricEnrolled: true,
      certificateIssued: subDays(new Date(), 30).toISOString(),
      certificateExpiry: addDays(new Date(), 335).toISOString(),
      status: 'active'
    },
    {
      id: 'user-3',
      fullName: 'Marcus Chen',
      email: 'marcus.chen@avaron.com',
      role: 'Engineer',
      lastLogin: subHours(new Date(), 6).toISOString(),
      mfaStatus: 'enabled',
      biometricEnrolled: false,
      certificateIssued: subDays(new Date(), 60).toISOString(),
      certificateExpiry: addDays(new Date(), 305).toISOString(),
      status: 'active'
    },
    {
      id: 'user-4',
      fullName: 'Elena Cortez',
      email: 'elena.cortez@avaron.com',
      role: 'User',
      lastLogin: subDays(new Date(), 3).toISOString(),
      mfaStatus: 'disabled',
      biometricEnrolled: false,
      certificateIssued: null,
      certificateExpiry: null,
      status: 'pending'
    },
    {
      id: 'user-5',
      fullName: 'Raj Patel',
      email: 'raj.patel@avaron.com',
      role: 'Auditor',
      lastLogin: subDays(new Date(), 5).toISOString(),
      mfaStatus: 'enforced',
      biometricEnrolled: true,
      certificateIssued: subDays(new Date(), 15).toISOString(),
      certificateExpiry: addDays(new Date(), 350).toISOString(),
      status: 'active'
    }
  ],
  'zone-2': [
    {
      id: 'user-6',
      fullName: 'David Kim',
      email: 'david.kim@avaron.com',
      role: 'Admin',
      lastLogin: subHours(new Date(), 4).toISOString(),
      mfaStatus: 'enforced',
      biometricEnrolled: true,
      certificateIssued: subDays(new Date(), 10).toISOString(),
      certificateExpiry: addDays(new Date(), 355).toISOString(),
      status: 'active'
    },
    {
      id: 'user-7',
      fullName: 'Naomi Wells',
      email: 'naomi.wells@avaron.com',
      role: 'Engineer',
      lastLogin: subDays(new Date(), 2).toISOString(),
      mfaStatus: 'enabled',
      biometricEnrolled: true,
      certificateIssued: subDays(new Date(), 20).toISOString(),
      certificateExpiry: addDays(new Date(), 345).toISOString(),
      status: 'active'
    }
  ],
  'zone-3': [
    {
      id: 'user-8',
      fullName: 'Grace Wong',
      email: 'grace.wong@avaron.com',
      role: 'Owner',
      lastLogin: subHours(new Date(), 1).toISOString(),
      mfaStatus: 'enforced',
      biometricEnrolled: true,
      certificateIssued: subDays(new Date(), 5).toISOString(),
      certificateExpiry: addDays(new Date(), 360).toISOString(),
      status: 'active'
    },
    {
      id: 'user-9',
      fullName: 'Omar Hassan',
      email: 'omar.hassan@avaron.com',
      role: 'Engineer',
      lastLogin: subDays(new Date(), 4).toISOString(),
      mfaStatus: 'enabled',
      biometricEnrolled: false,
      certificateIssued: subDays(new Date(), 30).toISOString(),
      certificateExpiry: addDays(new Date(), 335).toISOString(),
      status: 'suspended'
    }
  ]
};

// Mock Zone Audit Events
export const mockZoneAuditEvents: Record<string, ZoneAuditEvent[]> = {
  'zone-1': [
    {
      id: 'event-1',
      timestamp: subMinutes(new Date(), 15).toISOString(),
      userId: 'user-1',
      userEmail: 'alex.mercer@avaron.com',
      action: 'Certificate Issued',
      details: 'Issued new KyberSafe™ certificate',
      ipAddress: '192.168.1.45'
    },
    {
      id: 'event-2',
      timestamp: subHours(new Date(), 2).toISOString(),
      userId: 'user-1',
      userEmail: 'alex.mercer@avaron.com',
      action: 'Enforced Biometric MFA',
      details: 'Enabled biometric MFA requirement for all zone users',
      ipAddress: '192.168.1.45'
    },
    {
      id: 'event-3',
      timestamp: subHours(new Date(), 6).toISOString(),
      userId: 'user-2',
      userEmail: 'sarah.lin@avaron.com',
      action: 'User Role Changed',
      details: 'Changed user "Marcus Chen" role from User to Engineer',
      ipAddress: '192.168.1.72'
    },
    {
      id: 'event-4',
      timestamp: subDays(new Date(), 1).toISOString(),
      userId: 'user-1',
      userEmail: 'alex.mercer@avaron.com',
      action: 'Identity Revalidation',
      details: 'Triggered identity revalidation for all zone users',
      ipAddress: '192.168.1.45'
    },
    {
      id: 'event-5',
      timestamp: subDays(new Date(), 2).toISOString(),
      userId: 'user-2',
      userEmail: 'sarah.lin@avaron.com',
      action: 'User Added',
      details: 'Added user "Elena Cortez" to zone with User role',
      ipAddress: '192.168.1.72'
    }
  ],
  'zone-2': [
    {
      id: 'event-6',
      timestamp: subHours(new Date(), 12).toISOString(),
      userId: 'user-6',
      userEmail: 'david.kim@avaron.com',
      action: 'VaultID Requirement Enabled',
      details: 'Enabled VaultID requirement for zone access',
      ipAddress: '192.168.2.10'
    },
    {
      id: 'event-7',
      timestamp: subDays(new Date(), 1).toISOString(),
      userId: 'user-6',
      userEmail: 'david.kim@avaron.com',
      action: 'Certificate Revoked',
      details: 'Revoked certificate for former employee',
      ipAddress: '192.168.2.10'
    }
  ],
  'zone-3': [
    {
      id: 'event-8',
      timestamp: subHours(new Date(), 3).toISOString(),
      userId: 'user-8',
      userEmail: 'grace.wong@avaron.com',
      action: 'User Suspended',
      details: 'Suspended user "Omar Hassan" due to security policy violation',
      ipAddress: '192.168.3.22'
    },
    {
      id: 'event-9',
      timestamp: subDays(new Date(), 2).toISOString(),
      userId: 'user-8',
      userEmail: 'grace.wong@avaron.com',
      action: 'MFA Reset',
      details: 'Reset MFA for user "Omar Hassan"',
      ipAddress: '192.168.3.22'
    }
  ]
};
