
import { ZoneUser } from '../types';

/**
 * Helper functions for the ZoneVaultID component
 */

// Convert string status to valid ZoneUser status
export const normalizeUserStatus = (status: string): 'active' | 'suspended' | 'pending' => {
  if (status === 'active' || status === 'suspended' || status === 'pending') {
    return status;
  }
  // Default to a valid status if the input is not recognized
  return 'pending';
};

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
