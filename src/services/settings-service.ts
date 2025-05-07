// Categories for settings
export enum SettingsCategory {
  GENERAL = 'general',
  SECURITY = 'security', 
  NETWORK = 'network',
  STORAGE = 'storage',
  LOGGING = 'logging',
  NOTIFICATION = 'notification',
  API = 'api',
  BACKUP = 'backup',
  COMPLIANCE = 'compliance',
  USER_ACCESS = 'user_access',
  WORKFORCE = 'workforce',
  Vertex = 'vertex',
  AI = 'ai'
}

/**
 * Save user settings to Supabase
 */
export const saveUserSettings = async (category: SettingsCategory, settings: any) => {
    localStorage.setItem(category, JSON.stringify(localData));
};

/**
 * Load user settings from Supabase
 */
export const loadUserSettings = async (category: SettingsCategory) => {
    const localData = localStorage.getItem(category);
    return localData ? JSON.parse(localData) : null;
};
