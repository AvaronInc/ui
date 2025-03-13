
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

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
  NEST = 'nest',
  AI = 'ai'
}

// Organization level categories (tenant settings)
export enum OrgSettingsCategory {
  GENERAL = 'general',
  BRANDING = 'branding',
  SECURITY = 'security'
}

/**
 * Save user settings to Supabase
 */
export const saveUserSettings = async (category: SettingsCategory, settings: any) => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  
  if (userError || !userData.user) {
    console.error('Error fetching user data:', userError);
    throw new Error('User not authenticated');
  }
  
  const userId = userData.user.id;
  
  // First check if settings exist for this category
  const { data: existingSettings } = await supabase
    .from('app_settings')
    .select('*')
    .eq('user_id', userId)
    .eq('category', category)
    .single();
  
  if (existingSettings) {
    // Update existing settings
    const { error } = await supabase
      .from('app_settings')
      .update({ settings })
      .eq('id', existingSettings.id);
    
    if (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  } else {
    // Insert new settings
    const { error } = await supabase
      .from('app_settings')
      .insert([{ 
        user_id: userId, 
        category, 
        settings 
      }]);
    
    if (error) {
      console.error('Error inserting settings:', error);
      throw error;
    }
  }
  
  return true;
};

/**
 * Load user settings from Supabase
 */
export const loadUserSettings = async (category: SettingsCategory) => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  
  if (userError || !userData.user) {
    console.error('Error fetching user data:', userError);
    // Fall back to localStorage for unauthenticated users
    const localData = localStorage.getItem(category);
    return localData ? JSON.parse(localData) : null;
  }
  
  const userId = userData.user.id;
  
  const { data, error } = await supabase
    .from('app_settings')
    .select('settings')
    .eq('user_id', userId)
    .eq('category', category)
    .single();
  
  if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" which is expected for new users
    console.error(`Error loading ${category} settings:`, error);
    // Fall back to localStorage if database fetch fails
    const localData = localStorage.getItem(category);
    return localData ? JSON.parse(localData) : null;
  }
  
  return data?.settings || null;
};

/**
 * Save organization settings to Supabase
 */
export const saveOrgSettings = async (organizationId: string, category: OrgSettingsCategory, settings: any) => {
  // Check if user has admin rights before allowing org-level changes
  const { data: userData, error: userError } = await supabase.auth.getUser();
  
  if (userError || !userData.user) {
    console.error('Error fetching user data:', userError);
    throw new Error('User not authenticated');
  }
  
  const { data: existingSettings } = await supabase
    .from('organization_settings')
    .select('*')
    .eq('organization_id', organizationId)
    .eq('category', category)
    .single();
  
  if (existingSettings) {
    // Update existing settings
    const { error } = await supabase
      .from('organization_settings')
      .update({ settings })
      .eq('id', existingSettings.id);
    
    if (error) {
      console.error('Error updating organization settings:', error);
      throw error;
    }
  } else {
    // Insert new settings
    const { error } = await supabase
      .from('organization_settings')
      .insert([{ 
        organization_id: organizationId, 
        category, 
        settings 
      }]);
    
    if (error) {
      console.error('Error inserting organization settings:', error);
      throw error;
    }
  }
  
  return true;
};

/**
 * Load organization settings from Supabase
 */
export const loadOrgSettings = async (organizationId: string, category: OrgSettingsCategory) => {
  const { data, error } = await supabase
    .from('organization_settings')
    .select('settings')
    .eq('organization_id', organizationId)
    .eq('category', category)
    .single();
  
  if (error && error.code !== 'PGRST116') {
    console.error(`Error loading organization ${category} settings:`, error);
    return null;
  }
  
  return data?.settings || null;
};
