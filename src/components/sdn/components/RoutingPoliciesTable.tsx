
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Activity } from 'lucide-react';

// Mock data for routing policies
const routingPolicies = [
  {
    id: 'route-1',
    name: 'Primary DC Route',
    protocol: 'BGP',
    source: 'Headquarters',
    destination: 'Data Center',
    preference: 'High',
    metric: 100,
    aiOptimized: true,
    status: 'active'
  },
  {
    id: 'route-2',
    name: 'Cloud Backup Route',
    protocol: 'Static',
    source: 'Data Center',
    destination: 'Cloud Infrastructure',
    preference: 'Medium',
    metric: 200,
    aiOptimized: false,
    status: 'active'
  },
  {
    id: 'route-3',
    name: 'Branch1 Default Route',
    protocol: 'OSPF',
    source: 'Branch Office 1',
    destination: 'Headquarters',
    preference: 'Medium',
    metric: 150,
    aiOptimized: true,
    status: 'active'
  },
  {
    id: 'route-4',
    name: 'Branch2 Failover',
    protocol: 'BGP',
    source: 'Branch Office 2',
    destination: 'Cloud Infrastructure',
    preference: 'Low',
    metric: 250,
    aiOptimized: true,
    status: 'disabled'
  },
  {
    id: 'route-5',
    name: 'Engineering Direct Route',
    protocol: 'Static',
    source: 'Engineering VLAN',
    destination: 'Cloud Services',
    preference: 'High',
    metric: 110,
    aiOptimized: false,
    status: 'active'
  }
];

const RoutingPoliciesTable: React.FC = () => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Protocol</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Preference</TableHead>
            <TableHead>AI Optimized</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {routingPolicies.map((policy) => (
            <TableRow key={policy.id}>
              <TableCell className="font-medium">{policy.name}</TableCell>
              <TableCell>
                <Badge variant="outline">{policy.protocol}</Badge>
              </TableCell>
              <TableCell>{policy.source}</TableCell>
              <TableCell>{policy.destination}</TableCell>
              <TableCell>
                <Badge 
                  variant={
                    policy.preference === 'High' ? 'default' : 
                    policy.preference === 'Medium' ? 'secondary' : 
                    'outline'
                  }
                  className="text-xs"
                >
                  {policy.preference}
                </Badge>
              </TableCell>
              <TableCell>
                {policy.aiOptimized ? (
                  <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                    Optimized
                  </Badge>
                ) : (
                  <Badge variant="outline">Standard</Badge>
                )}
              </TableCell>
              <TableCell>
                <Badge 
                  variant={policy.status === 'active' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {policy.status === 'active' ? 'Active' : 'Disabled'}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Activity className="h-4 w-4" />
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

export default RoutingPoliciesTable;
