
import React from 'react';
import VPNSessionsTable from '@/components/workforce/VPNSessionsTable';
import { VPNSession } from '@/types/workforce';

interface VPNTabContentProps {
  sessions: VPNSession[];
  onDisconnect: (sessionId: string) => void;
  isAdmin: boolean;
}

const VPNTabContent = ({ sessions, onDisconnect, isAdmin }: VPNTabContentProps) => {
  return (
    <div className="space-y-4">
      <VPNSessionsTable 
        sessions={sessions}
        onDisconnect={onDisconnect}
        isAdmin={isAdmin}
      />
    </div>
  );
};

export default VPNTabContent;
