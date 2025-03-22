import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { 
  saveUserSettings, 
  loadUserSettings, 
  SettingsCategory,
  saveOrgSettings,
  loadOrgSettings,
  OrgSettingsCategory
} from '@/services/settings-service';
import { useToast } from '@/hooks/use-toast';

export function useSettings<T>(
  category: SettingsCategory, 
  defaultValues: T, 
  options: { 
    updateLocalStorage?: boolean,
    loadOnMount?: boolean 
  } = { updateLocalStorage: true, loadOnMount: true }
) {
  const [settings, setSettings] = useState<T>(defaultValues);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load settings on mount
  useEffect(() => {
    if (!options.loadOnMount) return;
    
    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        if (user) {
          const dbSettings = await loadUserSettings(category);
          if (dbSettings) {
            setSettings({ ...defaultValues, ...dbSettings });
            
            // Update localStorage if needed
            if (options.updateLocalStorage) {
              localStorage.setItem(category, JSON.stringify(dbSettings));
            }
            return;
          }
        }
        
        // Fallback to localStorage
        const localSettings = localStorage.getItem(category);
        if (localSettings) {
          setSettings({ ...defaultValues, ...JSON.parse(localSettings) });
        }
      } catch (err: any) {
        console.error(`Error loading ${category} settings:`, err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, [category, defaultValues, options.loadOnMount, options.updateLocalStorage, user]);

  // Save settings to both Supabase and localStorage
  const saveSettings = async (newSettings: Partial<T>) => {
    try {
      const updatedSettings = { ...settings, ...newSettings };
      setSettings(updatedSettings as T);
      
      if (user) {
        // Save to Supabase
        await saveUserSettings(category, updatedSettings);
      }
      
      // Also save to localStorage for fallback
      if (options.updateLocalStorage) {
        localStorage.setItem(category, JSON.stringify(updatedSettings));
      }
      
      return true;
    } catch (err: any) {
      console.error(`Error saving ${category} settings:`, err);
      setError(err);
      
      toast({
        title: "Error saving settings",
        description: err.message || "There was a problem saving your settings.",
        variant: "destructive"
      });
      
      return false;
    }
  };

  return {
    settings,
    isLoading,
    error,
    saveSettings,
    setSettings: (newSettings: T) => setSettings(newSettings)
  };
}

export function useOrgSettings<T>(
  organizationId: string,
  category: OrgSettingsCategory,
  defaultValues: T
) {
  const [settings, setSettings] = useState<T>(defaultValues);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load organization settings on mount
  useEffect(() => {
    const fetchOrgSettings = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        if (user) {
          const dbSettings = await loadOrgSettings(organizationId, category);
          if (dbSettings) {
            setSettings({ ...defaultValues, ...dbSettings });
          }
        }
      } catch (err: any) {
        console.error(`Error loading organization ${category} settings:`, err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (organizationId) {
      fetchOrgSettings();
    }
  }, [category, defaultValues, organizationId, user]);

  // Save organization settings
  const saveOrgSettingsData = async (newSettings: Partial<T>) => {
    try {
      const updatedSettings = { ...settings, ...newSettings };
      setSettings(updatedSettings as T);
      
      if (user && organizationId) {
        await saveOrgSettings(organizationId, category, updatedSettings);
      }
      
      return true;
    } catch (err: any) {
      console.error(`Error saving organization ${category} settings:`, err);
      setError(err);
      
      toast({
        title: "Error saving organization settings",
        description: err.message || "There was a problem saving the organization settings.",
        variant: "destructive"
      });
      
      return false;
    }
  };

  return {
    settings,
    isLoading,
    error,
    saveSettings: saveOrgSettingsData,
    setSettings: (newSettings: T) => setSettings(newSettings)
  };
}
