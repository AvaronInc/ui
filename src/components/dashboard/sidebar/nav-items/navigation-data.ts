
import { NavSection } from './types';
import { coreSystemItems } from './core-items';
import { networkItems } from './network-items';
import { monitoringItems } from './monitoring-items';
import { endUserItems } from './end-user-items';
import { operationsItems } from './operations-items';
import { identityItems } from './identity-items';
import { securityItems } from './security-items';
import { assetItems } from './asset-items';
import { storageItems } from './storage-items';
import { adminItems } from './admin-items';

// Export all nav item arrays for direct access
export * from './types';
export * from './core-items';
export * from './network-items';
export * from './monitoring-items';
export * from './end-user-items';
export * from './operations-items';
export * from './identity-items';
export * from './security-items';
export * from './asset-items';
export * from './storage-items';
export * from './admin-items';

// Complete navigation structure
export const navSections: NavSection[] = [
  { title: "Core System", items: coreSystemItems },
  { title: "Network", items: networkItems },
  { title: "Monitoring", items: monitoringItems },
  { title: "End User", items: endUserItems },
  { title: "IT Operations", items: operationsItems },
  { title: "Identity", items: identityItems },
  { title: "Security & Compliance", items: securityItems },
  { title: "IT Assets", items: assetItems },
  { title: "Storage", items: storageItems },
  { title: "Admin", items: adminItems },
];
