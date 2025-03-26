
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

export function normalizeUserStatus(status: any): 'active' | 'suspended' | 'pending' {
  if (!status) return 'pending';
  
  // Debug output for original input
  console.log(`normalizeUserStatus input: '${status}' (type: ${typeof status})`);
  
  // Convert to string if not already
  const statusStr = String(status).toLowerCase().trim();
  
  // Debug output for string conversion
  console.log(`Converted to string: '${statusStr}'`);
  
  // Map to allowed values
  if (statusStr === 'active') return 'active';
  if (statusStr === 'suspended') return 'suspended';
  
  // Everything else defaults to pending for safety
  console.log(`WARNING: Unrecognized status value: '${status}', defaulting to 'pending'`);
  return 'pending';
}

export function processZoneUsers(users: any[]): ZoneUser[] {
  console.log('Processing zone users, count:', users.length);
  
  return users.map(user => {
    // Ensure status is properly normalized to one of the allowed values
    const originalStatus = user.status;
    const normalizedStatus = normalizeUserStatus(originalStatus);
    
    if (originalStatus !== normalizedStatus) {
      console.log(`Normalized user status from '${originalStatus}' to '${normalizedStatus}'`);
    }
    
    // Create a properly typed ZoneUser object
    const normalizedUser: ZoneUser = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      lastLogin: user.lastLogin,
      mfaStatus: user.mfaStatus,
      biometricEnrolled: user.biometricEnrolled,
      status: normalizedStatus,
      certificateIssued: user.certificateIssued || null,
      certificateExpiry: user.certificateExpiry || null
    };
    
    return normalizedUser;
  });
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

// For debugging ServiceType issues
export function logServiceTypeDebug(serviceType: ServiceType | string): void {
  console.log('ServiceType Debug:');
  console.log('- Type:', typeof serviceType);
  
  if (typeof serviceType === 'string') {
    console.log('- String value:', serviceType);
    const converted = getServiceTypeFromString(serviceType);
    console.log('- Converted:', converted);
  } else if (typeof serviceType === 'object') {
    console.log('- Object value:', JSON.stringify(serviceType));
    console.log('- Is ServiceType:', isServiceType(serviceType));
    console.log('- Key:', getServiceTypeKey(serviceType));
  }
}

// For debugging StorageStatus issues
export function logStorageStatusDebug(status: StorageStatus | string): void {
  console.log('StorageStatus Debug:');
  console.log('- Type:', typeof status);
  
  if (typeof status === 'string') {
    console.log('- String value:', status);
    const converted = getStorageStatusFromString(status);
    console.log('- Converted:', converted);
  } else if (typeof status === 'object') {
    console.log('- Object value:', JSON.stringify(status));
    console.log('- Is StorageStatus:', isStorageStatus(status));
  }
}

// For debugging StorageTier issues
export function logStorageTierDebug(tier: StorageTier | string): void {
  console.log('StorageTier Debug:');
  console.log('- Type:', typeof tier);
  
  if (typeof tier === 'string') {
    console.log('- String value:', tier);
    const converted = getStorageTierFromString(tier);
    console.log('- Converted:', converted);
  } else if (typeof tier === 'object') {
    console.log('- Object value:', JSON.stringify(tier));
    console.log('- Is StorageTier:', isStorageTier(tier));
  }
}
