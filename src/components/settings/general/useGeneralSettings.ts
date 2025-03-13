
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, defaultSettings } from './schema';
import { 
  useLoadSettings, 
  useLogoManagement, 
  useSettingsSubmit 
} from './hooks';

export const useGeneralSettings = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(
    localStorage.getItem('maintenanceMode') === 'true'
  );
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultSettings,
  });

  // Load settings
  const { isLoading, loadError, loadSettings, progress } = useLoadSettings(form);
  
  // Logo management
  const { companyLogo, setCompanyLogo, handleLogoUpload } = useLogoManagement();
  
  // Form submission and reset
  const { onSubmit, handleReset } = useSettingsSubmit({
    form,
    companyLogo,
    setCompanyLogo,
    maintenanceMode,
    setMaintenanceMode
  });

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  return {
    form,
    isLoading,
    loadError,
    progress,
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
