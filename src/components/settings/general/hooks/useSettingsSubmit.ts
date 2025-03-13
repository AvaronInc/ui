
import { useToast } from '@/hooks/use-toast';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../schema';

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
      
      // Store data in localStorage (for simplicity in this example)
      localStorage.setItem('companyName', data.companyName);
      localStorage.setItem('timeZone', data.timeZone);
      localStorage.setItem('dateFormat', data.dateFormat);
      localStorage.setItem('businessStartTime', data.businessStartTime);
      localStorage.setItem('businessEndTime', data.businessEndTime);
      localStorage.setItem('maintenanceMode', maintenanceMode.toString());
      if (companyLogo) {
        localStorage.setItem('companyLogo', companyLogo);
      }
      
      // In a real app, you would also persist to a database here
      
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
    form.reset();
    
    // Also clear any logo that might have been uploaded
    setCompanyLogo(localStorage.getItem('companyLogo'));
    
    // Reset maintenance mode from localStorage
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
