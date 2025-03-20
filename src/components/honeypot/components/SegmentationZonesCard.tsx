
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Network } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const zones = [
  {
    id: 1,
    name: 'DMZ',
    cidr: '10.0.3.0/24',
    purpose: 'External-facing services',
    honeypotCount: 2,
    riskLevel: 'High'
  },
  {
    id: 2,
    name: 'Services',
    cidr: '10.0.4.0/24',
    purpose: 'Internal application services',
    honeypotCount: 2,
    riskLevel: 'Medium'
  },
  {
    id: 3,
    name: 'Resources',
    cidr: '10.0.5.0/24',
    purpose: 'Resource servers',
    honeypotCount: 1,
    riskLevel: 'Medium'
  },
  {
    id: 4,
    name: 'Corporate',
    cidr: '10.0.6.0/24',
    purpose: 'User workstations',
    honeypotCount: 0,
    riskLevel: 'Low'
  },
  {
    id: 5,
    name: 'Secure',
    cidr: '10.0.7.0/24',
    purpose: 'High-security systems',
    honeypotCount: 0,
    riskLevel: 'Critical'
  }
];

export const SegmentationZonesCard: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <Network className="h-5 w-5 mr-2 text-indigo-500" />
          Network Segmentation Zones
        </CardTitle>
        <CardDescription>Isolated network areas for honeypot deployment</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Zone Name</TableHead>
                <TableHead>CIDR</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Honeypots</TableHead>
                <TableHead>Risk Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {zones.map((zone) => (
                <TableRow key={zone.id}>
                  <TableCell className="font-medium">{zone.name}</TableCell>
                  <TableCell>{zone.cidr}</TableCell>
                  <TableCell>{zone.purpose}</TableCell>
                  <TableCell>{zone.honeypotCount}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        zone.riskLevel === 'Critical' ? 'destructive' : 
                        zone.riskLevel === 'High' ? 'default' : 
                        zone.riskLevel === 'Medium' ? 'secondary' : 
                        'outline'
                      }
                    >
                      {zone.riskLevel}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
