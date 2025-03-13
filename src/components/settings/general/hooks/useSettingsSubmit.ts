
import { useToast } from '@/hooks/use-toast';
import { UseFormReturn } from 'react-hook-form';
import { FormValues, defaultSettings } from '../schema';

interface UseSettingsSubmitProps {
  form: UseFormReturn<FormValues>;
  companyLogo: string | null;
  setCompanyLogo: (logo: string | null) => void;
  maintenanceMode: boolean;
  setMaintenanceMode: (mode: boolean) => void;
}

export const useSettingsSubmit = ({
  form,
  companyLogo,
  setCompanyLogo,
  maintenanceMode,
  setMaintenanceMode
}: UseSettingsSubmitProps) => {
  const { toast } = useToast();
  
  const onSubmit = async (data: FormValues) => {
    try {
      console.log('Submitting settings:', data);
      
      // Validate and provide fallbacks for all required fields
      const safeData = {
        ...data,
        // Ensure required fields are never empty
        companyName: data.companyName || defaultSettings.companyName,
        systemName: data.systemName || defaultSettings.systemName,
        timeZone: data.timeZone || defaultSettings.timeZone,
        dateFormat: data.dateFormat || defaultSettings.dateFormat,
        language: data.language || defaultSettings.language,
        // Optional fields can be empty
        supportEmail: data.supportEmail || '',
        helpdeskPhone: data.helpdeskPhone || ''
      };
      
      // Log the safe data we're about to save
      console.log('Saving settings with safe values:', safeData);
      
      // Store validated data in localStorage
      localStorage.setItem('companyName', safeData.companyName);
      localStorage.setItem('systemName', safeData.systemName);
      localStorage.setItem('timeZone', safeData.timeZone);
      localStorage.setItem('dateFormat', safeData.dateFormat);
      localStorage.setItem('language', safeData.language);
      localStorage.setItem('supportEmail', safeData.supportEmail);
      localStorage.setItem('helpdeskPhone', safeData.helpdeskPhone);
      localStorage.setItem('maintenanceMode', maintenanceMode.toString());
      
      if (companyLogo) {
        localStorage.setItem('companyLogo', companyLogo);
      }
      
      // Update the form with the validated data
      form.reset(safeData);
      
      toast({
        title: "Settings updated",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error saving settings",
        description: "There was a problem saving your changes.",
        variant: "destructive",
      });
    }
  };
  
  const handleReset = () => {
    // Reset the form to its default values
    form.reset(defaultSettings);
    
    // Also clear any logo that might have been uploaded
    setCompanyLogo(localStorage.getItem('companyLogo'));
    
    // Reset maintenance mode from localStorage or default to false
    setMaintenanceMode(localStorage.getItem('maintenanceMode') === 'true');
    
    toast({
      title: "Settings reset",
      description: "Your changes have been discarded.",
    });
  };
  
  return {
    onSubmit,
    handleReset
  };
};
