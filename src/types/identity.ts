
export type UserRole = 'Admin' | 'Engineer' | 'User';
export type UserStatus = 'Active' | 'Suspended' | 'Revoked';

export interface UserActivity {
  action: string;
  timestamp: string;
  ipAddress?: string;
  deviceInfo?: string;
}

export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastLogin: string;
  mfaEnabled: boolean;
  biometricsEnrolled: boolean;
  kyberCertHash?: string;
  activities: UserActivity[];
  createdAt: string;
}

export interface UserFilter {
  role?: UserRole | 'all';
  status?: UserStatus | 'all';
  searchQuery?: string;
}
