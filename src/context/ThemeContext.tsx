
import React, { createContext, useContext, useEffect, useState } from 'react';
import LightModeWarningDialog from '@/components/theme/LightModeWarningDialog';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  backgroundImage: string | null;
  setBackgroundImage: (image: string | null) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode
  const [primaryColor, setPrimaryColor] = useState('blue');
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [showLightModeWarning, setShowLightModeWarning] = useState(false);

  useEffect(() => {
    // Apply dark mode
    document.documentElement.classList.toggle('dark', isDarkMode);
    
    // Apply primary color
    document.documentElement.style.setProperty('--primary', getPrimaryColorHSL(primaryColor));
    
    // Apply or remove background image
    const htmlElement = document.documentElement;
    if (backgroundImage) {
      htmlElement.style.backgroundImage = `url(${backgroundImage})`;
      htmlElement.style.backgroundSize = 'cover';
      htmlElement.style.backgroundAttachment = 'fixed';
      htmlElement.style.backgroundPosition = 'center';
      htmlElement.classList.add('has-background-image');
    } else {
      htmlElement.style.backgroundImage = '';
      htmlElement.classList.remove('has-background-image');
    }
  }, [isDarkMode, primaryColor, backgroundImage]);

  const handleToggleDarkMode = () => {
    if (isDarkMode) {
      setShowLightModeWarning(true);
    } else {
      setIsDarkMode(true);
      localStorage.setItem('darkMode', 'true');
    }
  };

  const confirmLightMode = () => {
    setIsDarkMode(false);
    setShowLightModeWarning(false);
    localStorage.setItem('darkMode', 'false');
  };

  const cancelLightMode = () => {
    setShowLightModeWarning(false);
  };

  // Load saved preferences on mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') !== 'false'; // Default to true if not set
    const savedPrimaryColor = localStorage.getItem('primaryColor') || 'blue';
    const savedBackgroundImage = localStorage.getItem('backgroundImage') || null;
    
    setIsDarkMode(savedDarkMode);
    setPrimaryColor(savedPrimaryColor);
    setBackgroundImage(savedBackgroundImage);
  }, []);

  const getPrimaryColorHSL = (color: string) => {
    switch (color) {
      case 'blue': return '210 100% 50%';
      case 'green': return '142 72% 29%';
      case 'purple': return '262 83% 58%';
      case 'red': return '0 84% 60%';
      case 'orange': return '24 95% 53%';
      case 'gray': return '220 9% 46%';
      default: return '210 100% 50%';
    }
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        isDarkMode, 
        toggleDarkMode: handleToggleDarkMode, 
        primaryColor, 
        setPrimaryColor: (color) => {
          setPrimaryColor(color);
          localStorage.setItem('primaryColor', color);
        },
        backgroundImage,
        setBackgroundImage: (image) => {
          setBackgroundImage(image);
          if (image) {
            localStorage.setItem('backgroundImage', image);
          } else {
            localStorage.removeItem('backgroundImage');
          }
        }
      }}
    >
      {children}
      {showLightModeWarning && (
        <LightModeWarningDialog
          open={showLightModeWarning}
          onConfirm={confirmLightMode}
          onCancel={cancelLightMode}
        />
      )}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
