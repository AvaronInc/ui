
import { ZoneUser } from '../types';
import { normalizeUserStatus, processZoneUsers } from './typeAdapters';

/**
 * Helper functions for the ZoneVaultID component
 */

// Helper function specifically for the ZoneVaultID component
export const normalizeZoneVaultIDUsers = (users: any[]): ZoneUser[] => {
  return users.map(user => {
    // Ensure status is properly normalized to the expected type
    const status = normalizeUserStatus(user.status || 'pending');
    
    // Ensure all required properties conform to ZoneUser type
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      lastLogin: user.lastLogin,
      mfaStatus: user.mfaStatus,
      biometricEnrolled: user.biometricEnrolled,
      status: status,
      certificateIssued: user.certificateIssued || null,
      certificateExpiry: user.certificateExpiry || null
    };
  });
};
