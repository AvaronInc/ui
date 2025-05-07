
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription, 
  FormMessage 
} from '@/components/ui/form';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { FormValues } from '../schema';

interface AppearanceTabProps {
  form: UseFormReturn<FormValues>;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  backgroundImage: string | null;
  setBackgroundImage: (image: string | null) => void;
}

// Predefined language options with guaranteed non-empty values
const languages = [
  { value: "en-US", label: "English (US)" },
  { value: "en-GB", label: "English (UK)" },
  { value: "es-ES", label: "Spanish" },
  { value: "fr-FR", label: "French" },
  { value: "de-DE", label: "German" },
  { value: "ja-JP", label: "Japanese" },
  { value: "zh-CN", label: "Chinese (Simplified)" }
];

// Predefined color options with guaranteed non-empty values
const colors = [
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
  { value: "indigo", label: "Indigo" }
];

// Background image options
const backgroundOptions = [
  { value: "none", label: "None" },
  { value: "/assets/7a756512-0fbb-4a57-8285-428cb5a8bd2c.png", label: "Blue Grid" }
];

const AppearanceTab: React.FC<AppearanceTabProps> = ({ 
  form, 
  isDarkMode, 
  toggleDarkMode,
  primaryColor,
  setPrimaryColor,
  backgroundImage,
  setBackgroundImage
}) => {
  // Ensure primaryColor is never empty
  const safeColor = primaryColor || "blue";
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <FormLabel>Dark Mode</FormLabel>
          <FormDescription>
            Enable dark mode for the interface.
          </FormDescription>
        </div>
        <Switch 
          checked={isDarkMode} 
          onCheckedChange={toggleDarkMode}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value || "en-US"}
                value={field.value || "en-US"}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {languages.map((language) => (
                    <SelectItem key={language.value} value={language.value}>
                      {language.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                The default language for the system.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="space-y-2">
          <FormLabel>Primary Color</FormLabel>
          <Select 
            onValueChange={setPrimaryColor} 
            defaultValue={safeColor}
            value={safeColor}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select primary color" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {colors.map((color) => (
                <SelectItem key={color.value} value={color.value}>
                  {color.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>
            The primary accent color for UI elements.
          </FormDescription>
        </div>
      </div>
      
      <div className="space-y-2">
        <FormLabel>Background Image</FormLabel>
        <Select 
          onValueChange={(value) => setBackgroundImage(value === "none" ? null : value)} 
          defaultValue={backgroundImage || "none"}
          value={backgroundImage || "none"}
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select background image" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {backgroundOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormDescription>
          Choose a background image for the application.
        </FormDescription>
      </div>
    </div>
  );
};

export default AppearanceTab;
