
// Re-export all widgets
import MFALoginAttempts from './identity/MFALoginAttempts';
import UnverifiedUsers from './identity/UnverifiedUsers';
import PendingIdentityApprovals from './identity/PendingIdentityApprovals';
import ZoneStorageUsage from './storage/ZoneStorageUsage';
import CloudSyncStatus from './storage/CloudSyncStatus';
import TopBucketsByGrowth from './storage/TopBucketsByGrowth';
import ThreatSummary from './security/ThreatSummary';
import TopBlockedIPs from './security/TopBlockedIPs';
import ActiveCVEs from './security/ActiveCVEs';

export {
  MFALoginAttempts,
  UnverifiedUsers,
  PendingIdentityApprovals,
  ZoneStorageUsage,
  CloudSyncStatus,
  TopBucketsByGrowth,
  ThreatSummary,
  TopBlockedIPs,
  ActiveCVEs
};
