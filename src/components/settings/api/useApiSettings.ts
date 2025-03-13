
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { APISettingsFormValues, defaultApiSettings } from './types';

export function useApiSettings() {
  const { toast } = useToast();
  
  // Initialize form with saved values from localStorage or defaults
  const [formValues, setFormValues] = useState<APISettingsFormValues>(() => {
    const savedSettings = localStorage.getItem('apiSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultApiSettings;
  });
  
  const form = useForm<APISettingsFormValues>({
    defaultValues: formValues,
  });
  
  // Save settings to localStorage when form is submitted
  const handleSave = () => {
    const values = form.getValues();
    localStorage.setItem('apiSettings', JSON.stringify(values));
    setFormValues(values);
    
    toast({
      title: "Settings saved",
      description: "API & Integration settings have been updated successfully.",
    });
  };

  // Generate a new API key
  const handleGenerateApiKey = () => {
    // Simple random API key generator
    const apiKey = 'api_' + Math.random().toString(36).substring(2, 15) + 
                  Math.random().toString(36).substring(2, 15);
    
    const currentValues = form.getValues();
    const updatedApiKeys = [...currentValues.apiKeys, apiKey];
    
    form.setValue('apiKeys', updatedApiKeys);
    
    toast({
      title: "API Key Generated",
      description: "A new API key has been generated. Keep it secure!",
    });
  };
  
  // Remove API key
  const handleRemoveApiKey = (keyToRemove: string) => {
    const currentValues = form.getValues();
    const updatedApiKeys = currentValues.apiKeys.filter(key => key !== keyToRemove);
    
    form.setValue('apiKeys', updatedApiKeys);
  };
  
  // Update form when formValues change
  useEffect(() => {
    form.reset(formValues);
  }, [form, formValues]);

  return {
    form,
    handleSave,
    handleGenerateApiKey,
    handleRemoveApiKey
  };
}
