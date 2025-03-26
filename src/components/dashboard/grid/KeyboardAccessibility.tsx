
import React, { useEffect } from 'react';
import { useGridLayout } from './GridLayoutContext';

interface KeyboardAccessibilityProps {
  children: React.ReactNode;
}

export const KeyboardAccessibility: React.FC<KeyboardAccessibilityProps> = ({ children }) => {
  const { editMode, setEditMode } = useGridLayout();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape key to exit edit mode
      if (e.key === 'Escape' && editMode) {
        setEditMode(false);
      }

      // Ctrl+E to toggle edit mode
      if (e.key === 'e' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setEditMode(!editMode);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [editMode, setEditMode]);

  return <>{children}</>;
};

export default KeyboardAccessibility;
