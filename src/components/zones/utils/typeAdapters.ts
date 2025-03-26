
import { ServiceType, StorageStatus, StorageTier, ZoneUser } from '../types';

/**
 * Centralized type adapter functions to convert string values to typed objects
 */

// SERVICE TYPE ADAPTERS
export function isServiceType(value: any): value is ServiceType {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    'icon' in value
  );
}

export function getServiceTypeFromString(typeString: string | ServiceType): ServiceType {
  // If it's already a ServiceType object, return it
  if (isServiceType(typeString)) {
    return typeString;
  }
  
  // Convert string to ServiceType object
  const typeMap: Record<string, ServiceType> = {
    'identity': {
      id: 'identity',
      name: 'Identity & Access',
      icon: 'shield-check'
    },
    'network': {
      id: 'network',
      name: 'Network',
      icon: 'network'
    },
    'database': {
      id: 'database',
      name: 'Database',
      icon: 'database'
    },
    'storage': {
      id: 'storage',
      name: 'Storage',
      icon: 'hard-drive'
    },
    'ai': {
      id: 'ai',
      name: 'AI & ML',
      icon: 'brain'
    },
    'finance': {
      id: 'finance',
      name: 'Financial',
      icon: 'currency-dollar'
    }
  };
  
  return typeMap[typeString as string] || {
    id: typeString as string,
    name: (typeString as string).charAt(0).toUpperCase() + (typeString as string).slice(1),
    icon: 'circle'
  };
}

// STORAGE STATUS ADAPTERS
export function isStorageStatus(value: any): value is StorageStatus {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    'color' in value
  );
}

export function getStorageStatusFromString(statusString: string | StorageStatus): StorageStatus {
  // If it's already a StorageStatus object, return it
  if (isStorageStatus(statusString)) {
    return statusString;
  }
  
  // Convert string status to StorageStatus object
  const statusMap: Record<string, StorageStatus> = {
    'Operational': { id: 'operational', name: 'Operational', color: 'green' },
    'operational': { id: 'operational', name: 'Operational', color: 'green' },
    'Warning': { id: 'warning', name: 'Warning', color: 'orange' },
    'warning': { id: 'warning', name: 'Warning', color: 'orange' },
    'Critical': { id: 'critical', name: 'Critical', color: 'red' },
    'critical': { id: 'critical', name: 'Critical', color: 'red' },
    'Maintenance': { id: 'maintenance', name: 'Maintenance', color: 'blue' },
    'maintenance': { id: 'maintenance', name: 'Maintenance', color: 'blue' }
  };
  
  // Case insensitive lookup in case status strings vary in casing
  const normalizedString = typeof statusString === 'string' ? statusString.toLowerCase() : '';
  return statusMap[statusString as string] || 
         statusMap[normalizedString] || 
         { id: 'unknown', name: statusString as string, color: 'gray' };
}

// STORAGE TIER ADAPTERS
export function isStorageTier(value: any): value is StorageTier {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    'description' in value &&
    'features' in value &&
    Array.isArray(value.features)
  );
}

export function getStorageTierFromString(tierString: string | StorageTier): StorageTier {
  // If it's already a StorageTier object, return it
  if (isStorageTier(tierString)) {
    return tierString;
  }
  
  // Convert string tier to StorageTier object
  const tierMap: Record<string, StorageTier> = {
    'Standard': { 
      id: 'standard', 
      name: 'Standard', 
      description: 'Basic storage tier with essential features',
      features: ['Daily Backups', 'Standard Encryption']
    },
    'standard': { 
      id: 'standard', 
      name: 'Standard', 
      description: 'Basic storage tier with essential features',
      features: ['Daily Backups', 'Standard Encryption']
    },
    'Business': { 
      id: 'business', 
      name: 'Business', 
      description: 'Enhanced storage tier for business workloads',
      features: ['Hourly Backups', 'Advanced Encryption', 'Replication']
    },
    'business': { 
      id: 'business', 
      name: 'Business', 
      description: 'Enhanced storage tier for business workloads',
      features: ['Hourly Backups', 'Advanced Encryption', 'Replication']
    },
    'Enterprise': { 
      id: 'enterprise', 
      name: 'Enterprise', 
      description: 'High-performance storage tier with advanced features',
      features: ['Continuous Backups', 'Military-grade Encryption', 'Global Replication', 'Custom Retention']
    },
    'enterprise': { 
      id: 'enterprise', 
      name: 'Enterprise', 
      description: 'High-performance storage tier with advanced features',
      features: ['Continuous Backups', 'Military-grade Encryption', 'Global Replication', 'Custom Retention']
    }
  };
  
  // Case insensitive lookup in case tier strings vary in casing
  const normalizedString = typeof tierString === 'string' ? tierString.toLowerCase() : '';
  return tierMap[tierString as string] || 
         tierMap[normalizedString] || 
         { 
           id: 'custom', 
           name: tierString as string, 
           description: 'Custom storage tier',
           features: ['Custom Configuration']
         };
}

// ZONE USER ADAPTERS
export function isZoneUser(value: any): value is ZoneUser {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'fullName' in value &&
    'email' in value &&
    'role' in value &&
    'status' in value
  );
}

export function normalizeUserStatus(status: string): 'active' | 'suspended' | 'pending' {
  // Case-insensitive status normalization
  const lowerStatus = status.toLowerCase();
  if (lowerStatus === 'active' || lowerStatus === 'suspended' || lowerStatus === 'pending') {
    return lowerStatus as 'active' | 'suspended' | 'pending';
  }
  return 'pending';
}

export function processZoneUsers(users: any[]): ZoneUser[] {
  return users.map(user => ({
    ...user,
    status: normalizeUserStatus(user.status || 'pending'),
    certificateIssued: user.certificateIssued || null,
    certificateExpiry: user.certificateExpiry || null
  }));
}

// A unified adapter function to ensure we have a properly formatted object
export function ensureProperType<T>(value: string | T, converter: (value: string | T) => T): T {
  return converter(value);
}

// String key safe version of service type
export type ServiceTypeKey = 'identity' | 'network' | 'database' | 'storage' | 'ai' | 'finance' | string;

// Helper to get a safe string key from ServiceType
export function getServiceTypeKey(serviceType: ServiceType | string): string {
  if (typeof serviceType === 'string') {
    return serviceType;
  }
  return serviceType.id;
}

// Safe comparison for storage status
export function matchesStorageStatus(status: string | StorageStatus, targetStatus: StorageStatus): boolean {
  const normalizedStatus = getStorageStatusFromString(status);
  return normalizedStatus.id === targetStatus.id;
}

// Safe comparison for storage tier
export function matchesStorageTier(tier: string | StorageTier, targetTier: StorageTier): boolean {
  const normalizedTier = getStorageTierFromString(tier);
  return normalizedTier.id === targetTier.id;
}

// Safe string renderer for React nodes
export function safeRenderText(value: unknown): string {
  if (value === null || value === undefined) {
    return '';
  }
  
  if (typeof value === 'string') {
    return value;
  }
  
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  
  if (typeof value === 'object') {
    // Handle specific known objects
    if (value && 'name' in value && typeof value.name === 'string') {
      return value.name;
    }
    
    try {
      return JSON.stringify(value);
    } catch (e) {
      return '[Object]';
    }
  }
  
  return String(value);
}
