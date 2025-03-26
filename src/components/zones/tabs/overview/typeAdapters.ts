
import { StorageStatus, StorageTier } from '../../types';

/**
 * Type adapter functions to convert string values to typed objects
 */

export function getStorageStatusFromString(statusString: string): StorageStatus {
  // Convert string status to StorageStatus object
  const statusMap: Record<string, StorageStatus> = {
    'Operational': { id: 'operational', name: 'Operational', color: 'green' },
    'Warning': { id: 'warning', name: 'Warning', color: 'orange' },
    'Critical': { id: 'critical', name: 'Critical', color: 'red' },
    'Maintenance': { id: 'maintenance', name: 'Maintenance', color: 'blue' }
  };
  
  return statusMap[statusString] || { id: 'unknown', name: statusString, color: 'gray' };
}

export function getStorageTierFromString(tierString: string): StorageTier {
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
