
import { useState, useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues, defaultSettings } from '../schema';

export const useLoadSettings = (form: UseFormReturn<FormValues>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  
  const loadSettings = useCallback(async () => {
    console.log('Loading settings from storage/database...');
    
    try {
      setIsLoading(true);
      setLoadError(null);
      
      // In development mode or production, use a consistent approach
      // Simulate API call in production (replace with real API call later)
      if (!import.meta.env.DEV) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      // Load from localStorage with proper fallbacks for all fields
      let storedDateFormat = localStorage.getItem('dateFormat') || '';
      // Enforce type safety for dateFormat
      if (storedDateFormat !== 'MM/DD/YYYY' && storedDateFormat !== 'DD/MM/YYYY') {
        storedDateFormat = defaultSettings.dateFormat;
      }
      
      // Get language with a safe default
      const storedLanguage = localStorage.getItem('language') || '';
      const safeLanguage = 
        storedLanguage && 
        ['en-US', 'en-GB', 'es-ES', 'fr-FR', 'de-DE', 'ja-JP', 'zh-CN'].includes(storedLanguage) 
        ? storedLanguage 
        : defaultSettings.language;
      
      // Get timeZone with a safe default
      const storedTimeZone = localStorage.getItem('timeZone') || '';
      // For simplicity, just check if it's not empty
      const safeTimeZone = storedTimeZone || defaultSettings.timeZone;
      
      const storedSettings: FormValues = {
        companyName: localStorage.getItem('companyName') || defaultSettings.companyName,
        // Use safe values for required fields
        timeZone: safeTimeZone,
        // Use the validated dateFormat
        dateFormat: storedDateFormat as 'MM/DD/YYYY' | 'DD/MM/YYYY',
        systemName: localStorage.getItem('systemName') || defaultSettings.systemName,
        // Use safe language value
        language: safeLanguage,
        supportEmail: localStorage.getItem('supportEmail') || defaultSettings.supportEmail,
        helpdeskPhone: localStorage.getItem('helpdeskPhone') || defaultSettings.helpdeskPhone,
      };
      
      console.log('Loaded settings:', storedSettings);
      
      // Reset form with loaded values
      form.reset(storedSettings);
    } catch (error) {
      console.error('Error loading settings:', error);
      setLoadError('Could not load settings. Please try again.');
      
      // Even if loading fails, reset form with default values
      form.reset(defaultSettings);
    } finally {
      setIsLoading(false);
    }
  }, [form]);
  
  return { isLoading, loadError, loadSettings };
};
