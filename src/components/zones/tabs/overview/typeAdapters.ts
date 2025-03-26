import { StorageStatus, StorageTier, ServiceType } from '../../types';

/**
 * Type adapter functions to convert string values to typed objects
 */

// Define a type guard for ServiceType
export function isServiceType(value: any): value is ServiceType {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    'icon' in value
  );
}

// This helper ensures that we always get a properly formatted ServiceType object
export function getServiceTypeFromString(typeString: string | ServiceType): ServiceType {
  // If it's already a ServiceType object, return it
  if (isServiceType(typeString)) {
    return typeString;
  }
  
  // Otherwise, convert string to ServiceType object
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
  
  return typeMap[typeString] || {
    id: typeString,
    name: typeString.charAt(0).toUpperCase() + typeString.slice(1),
    icon: 'circle'
  };
}

// Type guard for StorageStatus
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
    'Warning': { id: 'warning', name: 'Warning', color: 'orange' },
    'Critical': { id: 'critical', name: 'Critical', color: 'red' },
    'Maintenance': { id: 'maintenance', name: 'Maintenance', color: 'blue' }
  };
  
  return statusMap[statusString] || { id: 'unknown', name: statusString, color: 'gray' };
}

// Type guard for StorageTier
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
    'Business': { 
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
    }
  };
  
  return tierMap[tierString] || { 
    id: 'custom', 
    name: tierString, 
    description: 'Custom storage tier',
    features: ['Custom Configuration']
  };
}

// A unified adapter function to ensure we have a properly formatted object
export function ensureProperType<T>(value: string | T, converter: (value: string | T) => T): T {
  return converter(value);
}
