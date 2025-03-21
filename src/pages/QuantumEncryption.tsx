
import React from 'react';
import { PageTransition } from '@/components/transitions/PageTransition';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTitle from '@/components/common/PageTitle';
import QuantumEncryptionPanel from '@/components/quantum-encryption/QuantumEncryptionPanel';
import { Fingerprint } from 'lucide-react';

const QuantumEncryption = () => {
  return (
    <PageTransition>
      <DashboardLayout>
        <div className="p-2 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
          <PageTitle 
            title="Post-Quantum Encryption" 
            description="Configure system-wide post-quantum cryptography settings to protect against future quantum computing threats"
            icon={<Fingerprint className="h-6 w-6" />}
          />
          <QuantumEncryptionPanel />
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default QuantumEncryption;
