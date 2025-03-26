
import { ServiceType, StorageStatus, StorageTier } from '../types';
import { 
  getServiceTypeFromString,
  getStorageStatusFromString, 
  getStorageTierFromString,
  safeRenderText
} from './typeAdapters';

/**
 * Helper functions specifically for ZonesOverview component
 */

// Type-safe comparison of storage status
export function isStorageStatus(status: string | StorageStatus, target: string): boolean {
  const statusObj = getStorageStatusFromString(status);
  const targetObj = getStorageStatusFromString(target);
  return statusObj.id === targetObj.id;
}

// Type-safe comparison of storage tier
export function isStorageTier(tier: string | StorageTier, target: string): boolean {
  const tierObj = getStorageTierFromString(tier);
  const targetObj = getStorageTierFromString(target);
  return tierObj.id === targetObj.id;
}

// Safe render functions for different types
export function renderServiceType(type: string | ServiceType): React.ReactNode {
  const typeObj = getServiceTypeFromString(type);
  return typeObj.name;
}

export function renderStorageStatus(status: string | StorageStatus): React.ReactNode {
  const statusObj = getStorageStatusFromString(status);
  return statusObj.name;
}

export function renderStorageTier(tier: string | StorageTier): React.ReactNode {
  const tierObj = getStorageTierFromString(tier);
  return tierObj.name;
}

// Safe text rendering for any value
export function renderSafeText(value: unknown): string {
  return safeRenderText(value);
}
