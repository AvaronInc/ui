
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { saveUserSettings, SettingsCategory } from '@/services/settings-service';
import { FormValues, defaultSettings } from '../schema';
import { UseFormReturn } from 'react-hook-form';

interface SubmitHookOptions {
  form: UseFormReturn<FormValues>;
  companyLogo: string | null;
  setCompanyLogo: (logo: string | null) => void;
  maintenanceMode: boolean;
  setMaintenanceMode: (value: boolean) => void;
}

export const useSettingsSubmit = ({
  form,
  companyLogo,
  setCompanyLogo,
  maintenanceMode,
  setMaintenanceMode
}: SubmitHookOptions) => {
  const { toast } = useToast();
  const { user } = useAuth();
  
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
    onSubmit,
    handleReset
  };
};
