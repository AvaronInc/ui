
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface VirtualSwitch {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'error';
  connectedDevices: number;
  trafficLoad: number; // Percentage
  location: string;
  vlanCount: number;
}

interface VirtualSwitchDashboardProps {
  onSelectSwitch: (switchId: string) => void;
  selectedSwitch: string | null;
}

const VirtualSwitchDashboard: React.FC<VirtualSwitchDashboardProps> = ({ 
  onSelectSwitch, 
  selectedSwitch 
}) => {
  // Mock data for virtual switches
  const virtualSwitches: VirtualSwitch[] = [
    { 
      id: 'vs-001', 
      name: 'Core-Switch-01', 
      status: 'active', 
      connectedDevices: 24, 
      trafficLoad: 67, 
      location: 'Main Datacenter',
      vlanCount: 5
    },
    { 
      id: 'vs-002', 
      name: 'Edge-Switch-01', 
      status: 'active', 
      connectedDevices: 16, 
      trafficLoad: 42, 
      location: 'Edge Network',
      vlanCount: 3
    },
    { 
      id: 'vs-003', 
      name: 'DMZ-Switch-01', 
      status: 'active', 
      connectedDevices: 8, 
      trafficLoad: 23, 
      location: 'DMZ',
      vlanCount: 2
    },
    { 
      id: 'vs-004', 
      name: 'Backup-Switch-01', 
      status: 'inactive', 
      connectedDevices: 0, 
      trafficLoad: 0, 
      location: 'Backup Center',
      vlanCount: 0
    },
    { 
      id: 'vs-005', 
      name: 'Dev-Switch-01', 
      status: 'error', 
      connectedDevices: 12, 
      trafficLoad: 35, 
      location: 'Development Network',
      vlanCount: 4
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Active</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400">Inactive</Badge>;
      case 'error':
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Error</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTrafficLoadClass = (load: number) => {
    if (load > 80) return "text-red-600 dark:text-red-400";
    if (load > 60) return "text-amber-600 dark:text-amber-400";
    return "text-green-600 dark:text-green-400";
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Switch Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Connected Devices</TableHead>
            <TableHead>Traffic Load</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>VLAN Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {virtualSwitches.map(vSwitch => (
            <TableRow 
              key={vSwitch.id}
              className={`cursor-pointer hover:bg-muted/50 ${selectedSwitch === vSwitch.id ? 'bg-muted' : ''}`}
              onClick={() => onSelectSwitch(vSwitch.id)}
            >
              <TableCell className="font-medium">{vSwitch.name}</TableCell>
              <TableCell>{getStatusBadge(vSwitch.status)}</TableCell>
              <TableCell>{vSwitch.connectedDevices}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        vSwitch.trafficLoad > 80 ? 'bg-red-500' : 
                        vSwitch.trafficLoad > 60 ? 'bg-amber-500' : 
                        'bg-green-500'
                      }`}
                      style={{ width: `${vSwitch.trafficLoad}%` }}
                    />
                  </div>
                  <span className={getTrafficLoadClass(vSwitch.trafficLoad)}>
                    {vSwitch.trafficLoad}%
                  </span>
                </div>
              </TableCell>
              <TableCell>{vSwitch.location}</TableCell>
              <TableCell>{vSwitch.vlanCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default VirtualSwitchDashboard;
