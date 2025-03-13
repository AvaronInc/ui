
import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { loadUserSettings, SettingsCategory } from '@/services/settings-service';
import { FormValues, defaultSettings } from '../schema';

export const useLoadSettings = (form: ReturnType<typeof useForm<FormValues>>) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  
  const loadSettings = useCallback(async () => {
    try {
      setIsLoading(true);
      setLoadError(null);
      
      console.log("Loading general settings...");
      
      // Always default to localStorage values first
      const localStorage_dateFormat = localStorage.getItem('dateFormat');
      const typedDateFormat = localStorage_dateFormat === "DD/MM/YYYY" ? 
        "DD/MM/YYYY" : "MM/DD/YYYY";
        
      // Pre-populate form with localStorage values to ensure we always have something
      form.reset({
        companyName: localStorage.getItem('companyName') || defaultSettings.companyName,
        systemName: localStorage.getItem('systemName') || defaultSettings.systemName,
        timeZone: localStorage.getItem('timeZone') || defaultSettings.timeZone,
        dateFormat: typedDateFormat,
        language: localStorage.getItem('language') || defaultSettings.language,
        supportEmail: localStorage.getItem('supportEmail') || defaultSettings.supportEmail,
        helpdeskPhone: localStorage.getItem('helpdeskPhone') || defaultSettings.helpdeskPhone,
      });
      
      // Try to load from database
      const isDevelopment = import.meta.env.DEV;
      
      if (isDevelopment) {
        console.log("Development mode: using localStorage settings");
        // In development, prioritize localStorage to speed up testing
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
        return;
      }
      
      if (user) {
        try {
          console.log("Attempting to load settings from database...");
          const generalSettings = await loadUserSettings(SettingsCategory.GENERAL);
          
          if (generalSettings) {
            console.log("Settings loaded from database:", generalSettings);
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
          } else {
            console.log("No settings found in database, using localStorage");
          }
        } catch (dbError) {
          console.error('Error loading settings from database:', dbError);
          // Already using localStorage values, so just continue
        }
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      setLoadError('Failed to load settings. Please try again.');
      toast({
        title: "Error loading settings",
        description: "There was a problem loading your settings.",
        variant: "destructive"
      });
    } finally {
      console.log("Settings loading complete, isLoading set to false");
      setIsLoading(false);
    }
  }, [form, toast, user]);

  return {
    isLoading,
    loadError,
    loadSettings
  };
};
