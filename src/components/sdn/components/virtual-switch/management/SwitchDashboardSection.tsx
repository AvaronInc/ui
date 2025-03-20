
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import VirtualSwitchDashboard from '../VirtualSwitchDashboard';

interface SwitchDashboardSectionProps {
  selectedSwitch: string | null;
  onSelectSwitch: (switchId: string) => void;
}

const SwitchDashboardSection: React.FC<SwitchDashboardSectionProps> = ({ 
  selectedSwitch, 
  onSelectSwitch 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Virtual Switch Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <VirtualSwitchDashboard 
          onSelectSwitch={onSelectSwitch} 
          selectedSwitch={selectedSwitch} 
        />
      </CardContent>
    </Card>
  );
};

export default SwitchDashboardSection;
