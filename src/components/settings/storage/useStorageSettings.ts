
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { StorageSettingsFormValues, defaultStorageSettings } from './types';

export const useStorageSettings = () => {
  const { toast } = useToast();
  
  // Initialize form with saved values from localStorage or defaults
  const [formValues, setFormValues] = useState<StorageSettingsFormValues>(() => {
    const savedSettings = localStorage.getItem('storageSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultStorageSettings;
  });
  
  const form = useForm<StorageSettingsFormValues>({
    defaultValues: formValues,
  });
  
  // Save settings to localStorage when form is submitted
  const handleSave = () => {
    const values = form.getValues();
    localStorage.setItem('storageSettings', JSON.stringify(values));
    setFormValues(values);
    
    toast({
      title: "Settings saved",
      description: "File Storage settings have been updated successfully.",
    });
  };
  
  // Update form when formValues change
  useEffect(() => {
    form.reset(formValues);
  }, [form, formValues]);
  
  return {
    form,
    handleSave,
  };
};
