
import { toast } from 'sonner';
import { UserProfile, AuthError } from './types';

export const logAuthError = (error: any, context: string) => {
  const timestamp = new Date().toISOString();
  const errorMessage = error?.message || 'Unknown error';
  const errorDetails = error?.details || error?.stack || JSON.stringify(error);
  
  console.error(`[${timestamp}] Authentication error in ${context}:`, errorMessage, error);
  
  return {
    message: errorMessage,
    details: errorDetails,
    timestamp
  };
};

export const setDevFallbackProfile = (isDev: boolean): UserProfile | null => {
  if (isDev) {
    console.log('[Auth] Development mode: Creating fallback admin profile');
    return {
      id: 'dev-user',
      role: 'admin' as 'admin', // Explicitly type as 'admin'
    };
  }
  return null;
};
