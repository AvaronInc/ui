
import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { saveUserSettings, loadUserSettings, SettingsCategory } from '@/services/settings-service';
import { formSchema, defaultSettings, FormValues } from './schema';

export const useGeneralSettings = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultSettings,
  });

  const loadSettings = useCallback(async () => {
    try {
      setIsLoading(true);
      setLoadError(null);
      
      let generalSettings;
      
      // Development mode check
      const isDevelopment = import.meta.env.DEV;
      
      if (isDevelopment && !user) {
        console.log("Development mode: bypassing authentication checks");
        // Load from localStorage only
        try {
          const storedSettings = {
            companyName: localStorage.getItem('companyName') || defaultSettings.companyName,
            systemName: localStorage.getItem('systemName') || defaultSettings.systemName,
            timeZone: localStorage.getItem('timeZone') || defaultSettings.timeZone,
            dateFormat: (localStorage.getItem('dateFormat') as "MM/DD/YYYY" | "DD/MM/YYYY") || defaultSettings.dateFormat,
            language: localStorage.getItem('language') || defaultSettings.language,
            supportEmail: localStorage.getItem('supportEmail') || defaultSettings.supportEmail,
            helpdeskPhone: localStorage.getItem('helpdeskPhone') || defaultSettings.helpdeskPhone,
            maintenanceMode: localStorage.getItem('maintenanceMode') === 'true',
            companyLogo: localStorage.getItem('companyLogo')
          };
          
          generalSettings = storedSettings;
        } catch (localError) {
          console.error('Error loading settings from localStorage:', localError);
          generalSettings = defaultSettings;
        }
      } else {
        // User is authenticated, try loading from database
        try {
          generalSettings = await loadUserSettings(SettingsCategory.GENERAL);
        } catch (dbError) {
          console.error('Error loading settings from database:', dbError);
          // Fall back to localStorage on DB error
          generalSettings = null;
        }
      }
      
      if (generalSettings) {
        // Parse dateFormat to ensure it's typed correctly
        const dateFormat = generalSettings.dateFormat === "DD/MM/YYYY" ? 
          "DD/MM/YYYY" : "MM/DD/YYYY";
          
        // Update form with loaded values
        form.reset({
          companyName: generalSettings.companyName || defaultSettings.companyName,
          systemName: generalSettings.systemName || defaultSettings.systemName,
          timeZone: generalSettings.timeZone || defaultSettings.timeZone,
          dateFormat: dateFormat,
          language: generalSettings.language || defaultSettings.language,
          supportEmail: generalSettings.supportEmail || defaultSettings.supportEmail,
          helpdeskPhone: generalSettings.helpdeskPhone || defaultSettings.helpdeskPhone,
        });
        
        // Also update other state values
        setMaintenanceMode(generalSettings.maintenanceMode || false);
        setCompanyLogo(generalSettings.companyLogo || null);
        
        // Update localStorage for header component to use (for real-time updates)
        localStorage.setItem('companyName', generalSettings.companyName || defaultSettings.companyName);
      } else {
        // Fallback to localStorage for backward compatibility
        const localStorage_dateFormat = localStorage.getItem('dateFormat');
        const typedDateFormat = localStorage_dateFormat === "DD/MM/YYYY" ? 
          "DD/MM/YYYY" : "MM/DD/YYYY";
          
        form.reset({
          companyName: localStorage.getItem('companyName') || defaultSettings.companyName,
          systemName: localStorage.getItem('systemName') || defaultSettings.systemName,
          timeZone: localStorage.getItem('timeZone') || defaultSettings.timeZone,
          dateFormat: typedDateFormat,
          language: localStorage.getItem('language') || defaultSettings.language,
          supportEmail: localStorage.getItem('supportEmail') || defaultSettings.supportEmail,
          helpdeskPhone: localStorage.getItem('helpdeskPhone') || defaultSettings.helpdeskPhone,
        });
        
        setMaintenanceMode(localStorage.getItem('maintenanceMode') === 'true');
        setCompanyLogo(localStorage.getItem('companyLogo'));
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      setLoadError('Failed to load settings. Please try again.');
      toast({
        title: "Error loading settings",
        description: "There was a problem loading your settings.",
        variant: "destructive"
      });
      
      // Set default values in form to ensure the UI is usable
      form.reset(defaultSettings);
    } finally {
      setIsLoading(false);
    }
  }, [form, toast, user]);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const logoData = e.target?.result as string;
        setCompanyLogo(logoData);
        
        // Also update localStorage for backward compatibility
        localStorage.setItem('companyLogo', logoData);
        
        toast({
          title: "Logo updated",
          description: "Your company logo has been updated successfully.",
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const onSubmit = async (data: FormValues) => {
    try {
      // Combine all settings into one object
      const combinedSettings = {
        ...data,
        maintenanceMode,
        companyLogo
      };
      
      // Save to database if user is authenticated
      if (user) {
        await saveUserSettings(SettingsCategory.GENERAL, combinedSettings);
      }
      
      // Still save to localStorage for backward compatibility
      Object.entries(data).forEach(([key, value]) => {
        localStorage.setItem(key, value as string);
      });
      localStorage.setItem('maintenanceMode', maintenanceMode.toString());
      if (companyLogo) localStorage.setItem('companyLogo', companyLogo);
      
      toast({
        title: "Settings saved",
        description: "Your general settings have been updated successfully.",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error saving settings",
        description: "There was a problem saving your settings.",
        variant: "destructive"
      });
    }
  };
  
  const handleReset = async () => {
    const defaultSettingsWithExtras = {
      ...defaultSettings,
      maintenanceMode: false,
      companyLogo: null
    };
    
    // Reset form values
    form.reset(defaultSettings);
    
    // Reset other settings
    setCompanyLogo(null);
    setMaintenanceMode(false);
    
    // Save reset values to database
    if (user) {
      try {
        await saveUserSettings(SettingsCategory.GENERAL, defaultSettingsWithExtras);
      } catch (error) {
        console.error("Error resetting settings:", error);
      }
    }
    
    // Reset localStorage
    localStorage.removeItem('companyLogo');
    Object.entries(defaultSettings).forEach(([key, value]) => {
      localStorage.setItem(key, value as string);
    });
    localStorage.setItem('maintenanceMode', 'false');
    
    toast({
      title: "Settings reset",
      description: "Your general settings have been reset to defaults.",
    });
  };

  return {
    form,
    isLoading,
    loadError,
    maintenanceMode,
    setMaintenanceMode,
    companyLogo,
    setCompanyLogo,
    handleLogoUpload,
    onSubmit,
    handleReset,
    loadSettings
  };
};
