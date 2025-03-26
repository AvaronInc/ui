
import { ZoneUser, ServiceType, StorageStatus, StorageTier } from '../types';
import { 
  normalizeUserStatus, 
  processZoneUsers, 
  getServiceTypeFromString,
  getStorageStatusFromString,
  getStorageTierFromString,
  getServiceTypeKey
} from './typeAdapters';

/**
 * Helper functions specifically for Zone components to ensure proper type safety
 */

// Process and normalize users from API or mock data
export function prepareZoneUsers(users: any[]): ZoneUser[] {
  return processZoneUsers(users);
}

// Helper to get safe string keys for service types
export function getServiceKeys(services: any[]): string[] {
  return services.map(service => {
    if (typeof service.type === 'string') {
      return service.type;
    }
    if (typeof service.type === 'object' && service.type !== null && 'id' in service.type) {
      return service.type.id;
    }
    return 'unknown';
  });
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
