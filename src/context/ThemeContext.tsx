
import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('blue');

  useEffect(() => {
    // Apply dark mode
    document.documentElement.classList.toggle('dark', isDarkMode);
    
    // Apply primary color
    document.documentElement.style.setProperty('--primary', getPrimaryColorHSL(primaryColor));
  }, [isDarkMode, primaryColor]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    
    // Save to localStorage
    localStorage.setItem('darkMode', (!isDarkMode).toString());
  };

  // Load saved preferences on mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedPrimaryColor = localStorage.getItem('primaryColor') || 'blue';
    
    setIsDarkMode(savedDarkMode);
    setPrimaryColor(savedPrimaryColor);
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
    <ThemeContext.Provider value={{ 
      isDarkMode, 
      toggleDarkMode, 
      primaryColor, 
      setPrimaryColor: (color) => {
        setPrimaryColor(color);
        localStorage.setItem('primaryColor', color);
      }
    }}>
      {children}
    </ThemeProvider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
