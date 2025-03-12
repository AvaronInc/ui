
import React, { createContext, useContext } from 'react';

interface NestContextType {
  selectedNestId: string | null;
  setSelectedNestId: (id: string | null) => void;
}

const NestContext = createContext<NestContextType | undefined>(undefined);

export const NestProvider: React.FC<{ 
  children: React.ReactNode;
  value: NestContextType;
}> = ({ children, value }) => {
  return (
    <NestContext.Provider value={value}>
      {children}
    </NestContext.Provider>
  );
};

export const useNest = (): NestContextType => {
  const context = useContext(NestContext);
  if (context === undefined) {
    throw new Error('useNest must be used within a NestProvider');
  }
  return context;
};
