
import React from 'react';
import { Shield, Eye } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface IPSHeaderProps {
  ipsEnabled: boolean;
  toggleIPS: () => void;
}

const IPSHeader = ({ ipsEnabled, toggleIPS }: IPSHeaderProps) => {
  return (
    <div className="flex items-center justify-between bg-card p-4 rounded-lg border shadow-sm">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-full">
          <Shield className="h-6 w-6 text-red-600 dark:text-red-400" />
        </div>
        <div>
          <h3 className="text-lg font-medium">Intrusion Prevention System (IPS/IDS)</h3>
          <p className="text-sm text-muted-foreground">Wazuh-powered threat detection and prevention</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">
          {ipsEnabled ? 'IPS Active' : 'IPS Inactive'}
        </span>
        <Switch 
          checked={ipsEnabled} 
          onCheckedChange={toggleIPS} 
        />
      </div>
    </div>
  );
};

export default IPSHeader;
