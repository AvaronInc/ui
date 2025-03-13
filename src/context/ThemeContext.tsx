
import React, { createContext, useContext, useEffect, useState } from 'react';

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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('blue');
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

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

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    
    // Save to localStorage
    localStorage.setItem('darkMode', (!isDarkMode).toString());
  };

  // Load saved preferences on mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
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
        toggleDarkMode, 
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
