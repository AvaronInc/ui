import { Zone, ZoneUser, ZoneAuditEvent } from './types';
import { addDays, subDays, format, subHours, subMinutes } from 'date-fns';

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
      network: 58
    },
    complianceStatus: {
      pci: true,
      hipaa: true,
      gdpr: true,
      sox: true
    },
    securityLevel: 'maximum',
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
      network: 22
    },
    complianceStatus: {
      pci: false,
      hipaa: false,
      gdpr: true,
      sox: false
    },
    securityLevel: 'standard'
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
      network: 32
    },
    complianceStatus: {
      pci: true,
      hipaa: false,
      gdpr: true,
      sox: true
    },
    securityLevel: 'enhanced'
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

// Update mock zones with VaultID settings
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
      network: 58
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
    }
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
      network: 22
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
    }
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
      network: 32
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
    }
  }
];
