
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { 
  formSchema, 
  defaultSettings 
} from '../utils/emailSecurityFormConfig';
import { EmailSecuritySettings } from '@/types/emailSecurity';

export const useEmailSecurityForm = () => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const form = useForm<EmailSecuritySettings>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultSettings,
  });

  const handleSave = (values: EmailSecuritySettings) => {
    setIsSaving(true);
    console.log('Saving settings:', values);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Settings saved",
        description: "Email security settings have been updated successfully.",
      });
    }, 1500);
  };

  const handleExport = (format: 'pdf' | 'json') => {
    const values = form.getValues();
    console.log(`Exporting settings as ${format}:`, values);
    
    toast({
      title: `Export as ${format.toUpperCase()}`,
      description: `Email security settings exported as ${format.toUpperCase()} successfully.`,
    });
  };

  return {
    form,
    isSaving,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    handleSave,
    handleExport
  };
};
