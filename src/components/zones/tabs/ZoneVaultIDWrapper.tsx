
import React from 'react';
import { Zone, ZoneUser } from '../types';
import { normalizeZoneVaultIDUsers } from '../utils/zoneVaultIDHelpers';

interface ZoneVaultIDWrapperProps {
  zone: Zone;
}

// This is a wrapper component that will handle the users data and properly normalize it
const ZoneVaultIDWrapper: React.FC<ZoneVaultIDWrapperProps> = ({ zone }) => {
  // Placeholder for the actual zone vault ID component
  // This component would fetch users data and then pass properly normalized data
  // to the actual implementation
  
  const mockVaultUsers = [
    {
      id: "v1",
      fullName: "Alice Smith",
      email: "alice@example.com",
      role: "Admin" as const,
      lastLogin: "2023-03-15T14:23:45Z",
      mfaStatus: "enabled" as const,
      biometricEnrolled: true,
      status: "active",
      certificateIssued: "2023-01-10T09:15:30Z",
      certificateExpiry: "2024-01-10T09:15:30Z",
    },
    {
      id: "v2",
      fullName: "Bob Johnson",
      email: "bob@example.com",
      role: "Engineer" as const,
      lastLogin: "2023-03-14T10:12:33Z",
      mfaStatus: "disabled" as const,
      biometricEnrolled: false,
      status: "pending",
      certificateIssued: null,
      certificateExpiry: null,
    },
  ];
  
  // Use the helper function to normalize users
  const normalizedUsers: ZoneUser[] = normalizeZoneVaultIDUsers(mockVaultUsers);
  
  console.log("Normalized VaultID users:", normalizedUsers);
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">VaultID User Management</h2>
      <p className="text-muted-foreground">
        This component would manage biometric authentication and certificate issuance for zone access.
      </p>
      
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-medium mb-2">Vault Users</h3>
        <div className="divide-y">
          {normalizedUsers.map(user => (
            <div key={user.id} className="py-3">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{user.fullName}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">Role: {user.role}</p>
                  <p className="text-sm">Status: {user.status}</p>
                </div>
              </div>
              <div className="mt-2 text-sm">
                <p>MFA: {user.mfaStatus}</p>
                <p>Biometric: {user.biometricEnrolled ? 'Enrolled' : 'Not enrolled'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground">
        <p>Note: This is a placeholder component. The full implementation would include:</p>
        <ul className="list-disc list-inside ml-4">
          <li>User enrollment and management</li>
          <li>Certificate issuance and renewal</li>
          <li>Biometric authentication settings</li>
          <li>Access logs and audit trails</li>
        </ul>
      </div>
    </div>
  );
};

export default ZoneVaultIDWrapper;
