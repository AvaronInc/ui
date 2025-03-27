
import React, { useEffect } from 'react';
import QuantumEncryptionPanel from './QuantumEncryptionPanel';
import { useIsMobile } from '@/hooks/use-mobile';

/**
 * This wrapper component overrides the tab display of the QuantumEncryptionPanel
 * without modifying the protected file directly.
 */
const QuantumEncryptionWrapper: React.FC = () => {
  const isMobile = useIsMobile();
  
  // Using useEffect to inject CSS into the document head
  useEffect(() => {
    // Create a style element
    const styleElement = document.createElement('style');
    
    // Set the CSS content
    styleElement.textContent = `
      /* Rename "Diagnostics & Testing" to "Diagnostics" */
      .quantum-encryption .tabs-list [data-value="diagnostics-testing"]::before {
        content: "Diagnostics";
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
    `;
    
    // Append it to the document head
    document.head.appendChild(styleElement);
    
    // Clean up by removing the style element when the component unmounts
    return () => {
      document.head.removeChild(styleElement);
    };
  }, [isMobile]); // Re-run if mobile status changes
  
  return (
    <div className="quantum-encryption-wrapper">
      {/* The original QuantumEncryptionPanel is rendered normally */}
      <QuantumEncryptionPanel />
    </div>
  );
};

export default QuantumEncryptionWrapper;
