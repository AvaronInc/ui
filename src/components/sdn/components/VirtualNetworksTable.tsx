
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, ArrowRightLeft } from 'lucide-react';

// Mock data for virtual networks
const virtualNetworks = [
  {
    id: 'vlan-100',
    name: 'Finance Department',
    type: 'VLAN',
    vlanId: 100,
    subnet: '10.100.0.0/24',
    deployments: ['Headquarters', 'Data Center'],
    status: 'active'
  },
  {
    id: 'vlan-200',
    name: 'Engineering',
    type: 'VLAN',
    vlanId: 200,
    subnet: '10.200.0.0/24',
    deployments: ['Headquarters', 'Data Center', 'Cloud Infrastructure'],
    status: 'active'
  },
  {
    id: 'vxlan-1000',
    name: 'Cloud Services',
    type: 'VXLAN',
    vlanId: 1000,
    subnet: '172.16.10.0/24',
    deployments: ['Cloud Infrastructure', 'Data Center'],
    status: 'active'
  },
  {
    id: 'vlan-300',
    name: 'Sales Department',
    type: 'VLAN',
    vlanId: 300,
    subnet: '10.300.0.0/24',
    deployments: ['Headquarters', 'Branch Office 1'],
    status: 'active'
  },
  {
    id: 'vxlan-2000',
    name: 'Remote Worker VPN',
    type: 'VXLAN',
    vlanId: 2000,
    subnet: '172.16.20.0/24',
    deployments: ['Headquarters', 'Cloud Infrastructure'],
    status: 'degraded'
  },
  {
    id: 'vlan-400',
    name: 'Guest Network',
    type: 'VLAN',
    vlanId: 400,
    subnet: '10.400.0.0/24',
    deployments: ['Headquarters', 'Branch Office 1', 'Branch Office 2'],
    status: 'disabled'
  }
];

const VirtualNetworksTable: React.FC = () => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Subnet</TableHead>
            <TableHead>Deployments</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {virtualNetworks.map((network) => (
            <TableRow key={network.id}>
              <TableCell className="font-medium">{network.name}</TableCell>
              <TableCell>{network.type}</TableCell>
              <TableCell>{network.vlanId}</TableCell>
              <TableCell>{network.subnet}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {network.deployments.map((deployment, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {deployment}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  variant={
                    network.status === 'active' ? 'default' : 
                    network.status === 'degraded' ? 'destructive' : 
                    'secondary'
                  }
                  className="text-xs"
                >
                  {network.status === 'active' ? 'Active' : 
                   network.status === 'degraded' ? 'Degraded' : 
                   'Disabled'}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ArrowRightLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default VirtualNetworksTable;
