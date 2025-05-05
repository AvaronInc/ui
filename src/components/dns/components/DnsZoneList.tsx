
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

const DnsZoneList: React.FC = () => {
  // Mock DNS zones data
  const zones = [
    { id: 1, name: 'example.com', type: 'Primary', records: 42, status: 'Healthy', lastUpdated: '2 hours ago' },
    { id: 2, name: 'avaron-vertex.local', type: 'Internal', records: 53, status: 'Healthy', lastUpdated: '1 day ago' },
    { id: 3, name: 'test.example.com', type: 'Secondary', records: 16, status: 'Degraded', lastUpdated: '3 hours ago' },
    { id: 4, name: 'dev.avaron-vertex.local', type: 'Internal', records: 24, status: 'Healthy', lastUpdated: '5 hours ago' },
    { id: 5, name: 'customer-portal.example.com', type: 'Primary', records: 31, status: 'Critical', lastUpdated: '20 mins ago' },
  ];

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'Healthy':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 flex gap-1 items-center">
            <CheckCircle className="h-3 w-3" />
            <span>Healthy</span>
          </Badge>
        );
      case 'Degraded':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 flex gap-1 items-center">
            <AlertTriangle className="h-3 w-3" />
            <span>Degraded</span>
          </Badge>
        );
      case 'Critical':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 flex gap-1 items-center">
            <XCircle className="h-3 w-3" />
            <span>Critical</span>
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Zone Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Records</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {zones.map(zone => (
            <TableRow key={zone.id}>
              <TableCell className="font-medium">{zone.name}</TableCell>
              <TableCell>{zone.type}</TableCell>
              <TableCell>{zone.records}</TableCell>
              <TableCell>{renderStatusBadge(zone.status)}</TableCell>
              <TableCell>{zone.lastUpdated}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DnsZoneList;
