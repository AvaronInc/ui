
import { ZoneUser } from '../types';
import { normalizeUserStatus, processZoneUsers } from './typeAdapters';

/**
 * Helper functions for the ZoneVaultID component
 */

// Helper function specifically for the ZoneVaultID component
export const normalizeZoneVaultIDUsers = (users: any[]): ZoneUser[] => {
  console.log("Input to normalizeZoneVaultIDUsers:", users);
  
  return users.map(user => {
    // Ensure status is properly normalized to the expected type
    // This ensures we get one of the three valid statuses: 'active', 'suspended', or 'pending'
    const status = normalizeUserStatus(user.status || 'pending');
    
    // Handle certificate fields - ensure they're either strings or null
    const certificateIssued = user.certificateIssued || null;
    const certificateExpiry = user.certificateExpiry || null;
    
    // Create a properly typed user object
    const normalizedUser: ZoneUser = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      lastLogin: user.lastLogin,
      mfaStatus: user.mfaStatus,
      biometricEnrolled: user.biometricEnrolled,
      status: status, // This is now guaranteed to be 'active', 'suspended', or 'pending'
      certificateIssued: certificateIssued,
      certificateExpiry: certificateExpiry
    };
    
    console.log("Normalized user:", normalizedUser);
    return normalizedUser;
  });
};

// For debugging purposes
export const logZoneUserTypeError = (users: any[]): void => {
  console.log('ZoneUser input validation:');
  users.forEach((user, index) => {
    const statusType = typeof user.status;
    const statusValue = user.status;
    console.log(`User[${index}] status: ${statusValue} (type: ${statusType})`);
    
    if (typeof statusValue === 'string') {
      const normalizedStatus = normalizeUserStatus(statusValue);
      console.log(`User[${index}] normalized status: ${normalizedStatus}`);
    }
  });
};
