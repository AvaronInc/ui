
import { ZoneUser } from '../types';
import { normalizeUserStatus } from './typeAdapters';

/**
 * Helper functions for the ZoneVaultID component
 */

// Process users to ensure they have valid status values
export const processZoneUsers = (users: any[]): ZoneUser[] => {
  return users.map(user => ({
    ...user,
    status: normalizeUserStatus(user.status),
    // Ensure these are nullable as per the interface
    certificateIssued: user.certificateIssued || null,
    certificateExpiry: user.certificateExpiry || null
  }));
};

// Helper function specifically for the ZoneVaultID component
export const normalizeZoneVaultIDUsers = (users: any[]): ZoneUser[] => {
  return users.map(user => {
    // Ensure all required properties conform to ZoneUser type
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      lastLogin: user.lastLogin,
      mfaStatus: user.mfaStatus,
      biometricEnrolled: user.biometricEnrolled,
      status: normalizeUserStatus(user.status),
      certificateIssued: user.certificateIssued || null,
      certificateExpiry: user.certificateExpiry || null
    };
  });
};
