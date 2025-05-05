
import React, { createContext, useContext } from 'react';

interface VertexContextType {
  selectedVertexId: string | null;
  setSelectedVertexId: (id: string | null) => void;
}

const VertexContext = createContext<VertexContextType | undefined>(undefined);

export const VertexProvider: React.FC<{ 
  children: React.ReactNode;
  value: VertexContextType;
}> = ({ children, value }) => {
  return (
    <VertexContext.Provider value={value}>
      {children}
    </VertexContext.Provider>
  );
};

export const useVertex = (): VertexContextType => {
  const context = useContext(VertexContext);
  if (context === undefined) {
    throw new Error('useVertex must be used within a VertexProvider');
  }
  return context;
};
