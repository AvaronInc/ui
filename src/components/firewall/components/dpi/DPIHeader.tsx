
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Layers, Eye, EyeOff } from 'lucide-react';

interface DPIHeaderProps {
  dpiEnabled: boolean;
  onToggleDPI: () => void;
}

const DPIHeader = ({ dpiEnabled, onToggleDPI }: DPIHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Layers className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-medium">Deep Packet Inspection</h3>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          {dpiEnabled ? 'DPI Active' : 'DPI Inactive'}
        </span>
        <Switch 
          checked={dpiEnabled} 
          onCheckedChange={onToggleDPI} 
          aria-label="Toggle DPI"
        />
        {dpiEnabled ? 
          <Eye className="h-4 w-4 text-green-500" /> : 
          <EyeOff className="h-4 w-4 text-muted-foreground" />
        }
      </div>
    </div>
  );
};

export default DPIHeader;
