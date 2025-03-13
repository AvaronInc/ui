
import { useState, useCallback, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues, defaultSettings } from '../schema';
import { toast } from 'sonner';

export const useLoadSettings = (form: UseFormReturn<FormValues>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  
  // Function to simulate loading progress
  useEffect(() => {
    let interval: number;
    
    if (isLoading && progress < 100) {
      interval = window.setInterval(() => {
        setProgress(prevProgress => {
          // Slow down progress as it approaches 90%
          const increment = prevProgress < 50 ? 15 : prevProgress < 80 ? 8 : 3;
          const newProgress = Math.min(prevProgress + increment, 90);
          return newProgress;
        });
      }, 200);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading, progress]);
  
  const loadSettings = useCallback(async () => {
    console.log('Loading settings from storage/database...');
    
    try {
      setIsLoading(true);
      setLoadError(null);
      setProgress(0);
      
      toast("Loading settings", {
        description: "Retrieving your configuration...",
      });
      
      // In development mode or production, use a consistent approach
      // Simulate API call in production (replace with real API call later)
      if (!import.meta.env.DEV) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        // Add a small delay in dev mode to show the progress bar
        await new Promise(resolve => setTimeout(resolve, 800));
      }
      
      // Default valid values to use if stored values are invalid
      const validDateFormats = ['MM/DD/YYYY', 'DD/MM/YYYY'];
      const validLanguages = ['en-US', 'en-GB', 'es-ES', 'fr-FR', 'de-DE', 'ja-JP', 'zh-CN'];
      
      // Load from localStorage with proper fallbacks for all fields
      let storedDateFormat = localStorage.getItem('dateFormat') || '';
      // Enforce type safety for dateFormat
      if (!validDateFormats.includes(storedDateFormat)) {
        storedDateFormat = defaultSettings.dateFormat;
      }
      
      // Get language with a safe default
      const storedLanguage = localStorage.getItem('language') || '';
      const safeLanguage = validLanguages.includes(storedLanguage) 
        ? storedLanguage 
        : defaultSettings.language;
      
      // Get timeZone with a safe default
      const storedTimeZone = localStorage.getItem('timeZone') || '';
      // For simplicity, just check if it's not empty
      const safeTimeZone = storedTimeZone || defaultSettings.timeZone;
      
      const storedSettings: FormValues = {
        companyName: localStorage.getItem('companyName') || defaultSettings.companyName,
        timeZone: safeTimeZone,
        dateFormat: storedDateFormat as 'MM/DD/YYYY' | 'DD/MM/YYYY',
        systemName: localStorage.getItem('systemName') || defaultSettings.systemName,
        language: safeLanguage,
        supportEmail: localStorage.getItem('supportEmail') || defaultSettings.supportEmail,
        helpdeskPhone: localStorage.getItem('helpdeskPhone') || defaultSettings.helpdeskPhone,
      };
      
      console.log('Loaded settings:', storedSettings);
      
      // Set progress to 100% to indicate we're done loading
      setProgress(100);
      
      // Wait a moment before completing to show 100%
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Reset form with loaded values
      form.reset(storedSettings);
    } catch (error) {
      console.error('Error loading settings:', error);
      setLoadError('Could not load settings. Please try again.');
      toast.error("Error loading settings", {
        description: "Could not load your settings. Please try again.",
      });
      
      // Even if loading fails, reset form with default values
      form.reset(defaultSettings);
    } finally {
      // Wait a moment before hiding the loader to ensure smooth transition
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 300);
    }
  }, [form]);
  
  return { isLoading, loadError, loadSettings, progress };
};
