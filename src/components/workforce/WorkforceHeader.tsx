
import React from 'react';
import WorkforceActions from '@/components/workforce/WorkforceActions';

interface WorkforceHeaderProps {
  isAdmin: boolean;
  onGenerateReport: () => void;
}

const WorkforceHeader = ({ isAdmin, onGenerateReport }: WorkforceHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Workforce EMS</h1>
        <p className="text-muted-foreground">
          Monitor and manage endpoint devices and VPN connections
        </p>
      </div>
      <WorkforceActions 
        onGenerateReport={onGenerateReport}
        isAdmin={isAdmin}
      />
    </div>
  );
};

export default WorkforceHeader;
