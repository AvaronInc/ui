
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Download } from 'lucide-react';
import { Software } from '@/types/workforce';

interface EndpointSoftwareListProps {
  software: Software[];
}

const EndpointSoftwareList = ({ software }: EndpointSoftwareListProps) => {
  const getSoftwareStatusIcon = (updateAvailable: boolean) => {
    return updateAvailable ? 
      <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 flex items-center gap-1">
        <Download className="h-3 w-3" /> Update
      </Badge> : 
      <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 flex items-center gap-1">
        <CheckCircle className="h-3 w-3" /> Updated
      </Badge>;
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Software</TableHead>
            <TableHead>Version</TableHead>
            <TableHead>Publisher</TableHead>
            <TableHead>Install Date</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {software.map(app => (
            <TableRow key={`${app.name}-${app.version}`}>
              <TableCell className="font-medium">{app.name}</TableCell>
              <TableCell>{app.version}</TableCell>
              <TableCell>{app.publisher}</TableCell>
              <TableCell>{app.installDate}</TableCell>
              <TableCell className="text-right">{getSoftwareStatusIcon(app.updateAvailable)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EndpointSoftwareList;
