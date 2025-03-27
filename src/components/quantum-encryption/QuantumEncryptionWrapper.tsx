
import React from 'react';
import QuantumEncryptionPanel from './QuantumEncryptionPanel';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';

/**
 * This wrapper component overrides the tab display of the QuantumEncryptionPanel
 * without modifying the protected file directly.
 */
const QuantumEncryptionWrapper: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="quantum-encryption-wrapper">
      {/* The original QuantumEncryptionPanel is rendered normally */}
      <QuantumEncryptionPanel />
      
      {/* This style block targets and modifies the tabs display */}
      <style jsx global>{`
        /* Rename "Diagnostics & Testing" to "Diagnostics" */
        .quantum-encryption .tabs-list [data-value="diagnostics-testing"]::before {
          content: "${isMobile ? "Diagnostics" : "Diagnostics"}";
          display: block;
        }
        
        .quantum-encryption .tabs-list [data-value="diagnostics-testing"] > span {
          display: none;
        }
        
        /* Add more spacing between tabs on mobile */
        @media (max-width: 768px) {
          .quantum-encryption .tabs-list {
            gap: 0.5rem;
            padding: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default QuantumEncryptionWrapper;
