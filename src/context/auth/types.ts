export interface UserProfile {
  id: string;
  full_name?: string;
  role: 'admin' | 'manager' | 'user';
  company_id?: string;
  avatar_url?: string;
}

export interface AuthError {
  message: string;
  details?: string;
  timestamp: string;
}

export type AuthContextType = {
  session: {} | null;
  user: {} | null;
  profile: UserProfile | null;
  isAdmin: boolean;
  isLoading: boolean;
  authError: AuthError | null;
  signOut: () => Promise<void>;
};
