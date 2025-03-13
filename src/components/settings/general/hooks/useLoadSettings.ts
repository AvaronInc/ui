
import { useState, useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../schema';

export const useLoadSettings = (form: UseFormReturn<FormValues>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  
  const loadSettings = useCallback(async () => {
    console.log('Loading settings from storage/database...');
    
    // In development mode, just use localStorage
    if (import.meta.env.DEV) {
      console.log('Dev mode: using localStorage only');
      
      try {
        // Load from localStorage
        setIsLoading(true);
        setLoadError(null);
        
        const storedSettings = {
          companyName: localStorage.getItem('companyName') || '',
          timeZone: localStorage.getItem('timeZone') || '',
          dateFormat: localStorage.getItem('dateFormat') || '',
          businessStartTime: localStorage.getItem('businessStartTime') || '',
          businessEndTime: localStorage.getItem('businessEndTime') || '',
        };
        
        console.log('Loaded settings from localStorage:', storedSettings);
        
        form.reset({
          ...form.getValues(),
          ...storedSettings,
        });
      } catch (error) {
        console.error('Error loading settings from localStorage:', error);
        setLoadError('Could not load settings from localStorage');
      } finally {
        setIsLoading(false);
      }
      return;
    }
  
    try {
      setIsLoading(true);
      setLoadError(null);
      
      // Simulate API call (replace with real API call in production)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would load from a database here
      // const response = await fetch('/api/settings');
      // const data = await response.json();
      
      // For now, we'll just use localStorage as a fallback
      const storedSettings = {
        companyName: localStorage.getItem('companyName') || '',
        timeZone: localStorage.getItem('timeZone') || '',
        dateFormat: localStorage.getItem('dateFormat') || '',
        businessStartTime: localStorage.getItem('businessStartTime') || '',
        businessEndTime: localStorage.getItem('businessEndTime') || '',
      };
      
      console.log('Loaded settings:', storedSettings);
      
      form.reset({
        ...form.getValues(),
        ...storedSettings,
      });
    } catch (error) {
      console.error('Error loading settings:', error);
      setLoadError('Could not load settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [form]);
  
  return { isLoading, loadError, loadSettings };
};
