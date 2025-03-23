
import React from 'react';
import { CLIModal } from '@/components/cli/CLIModal';

export const CLIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      {children}
      <CLIModal />
    </>
  );
};
