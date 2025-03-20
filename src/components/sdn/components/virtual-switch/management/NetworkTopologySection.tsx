
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';
import NetworkVisualization from '../NetworkVisualization';

interface NetworkTopologySectionProps {
  selectedSwitch: string | null;
  onSelectSwitch: (switchId: string) => void;
}

const NetworkTopologySection: React.FC<NetworkTopologySectionProps> = ({ 
  selectedSwitch, 
  onSelectSwitch 
}) => {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="mr-2 h-5 w-5 text-primary" />
          Network Topology
        </CardTitle>
      </CardHeader>
      <CardContent>
        <NetworkVisualization onSelectSwitch={onSelectSwitch} selectedSwitch={selectedSwitch} />
      </CardContent>
    </Card>
  );
};

export default NetworkTopologySection;
