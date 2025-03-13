
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { NotificationSettingsFormValues, defaultNotificationSettings } from './types';

export function useNotificationSettings() {
  const { toast } = useToast();
  
  // Initialize form with saved values from localStorage or defaults
  const [formValues, setFormValues] = useState<NotificationSettingsFormValues>(() => {
    const savedSettings = localStorage.getItem('notificationSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultNotificationSettings;
  });
  
  const form = useForm<NotificationSettingsFormValues>({
    defaultValues: formValues,
  });
  
  // Save settings to localStorage when form is submitted
  const handleSave = () => {
    const values = form.getValues();
    localStorage.setItem('notificationSettings', JSON.stringify(values));
    setFormValues(values);
    
    toast({
      title: "Settings saved",
      description: "Notification & Alert settings have been updated successfully.",
    });
  };
  
  // Update form when formValues change
  useEffect(() => {
    form.reset(formValues);
  }, [form, formValues]);

  return {
    form,
    handleSave
  };
}
