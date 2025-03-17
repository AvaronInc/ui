
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import { Software } from '@/types/workforce';

interface EndpointUpdatesListProps {
  software: Software[];
  needsUpdate: boolean;
}

const EndpointUpdatesList = ({ software, needsUpdate }: EndpointUpdatesListProps) => {
  if (!needsUpdate) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border rounded-md">
        <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
        <h3 className="text-lg font-medium">All software up to date</h3>
        <p className="text-sm text-muted-foreground mt-1">This device has all the latest updates installed</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Software</TableHead>
            <TableHead>Current Version</TableHead>
            <TableHead>Update Type</TableHead>
            <TableHead className="text-right">Priority</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {software.filter(s => s.updateAvailable).map(app => (
            <TableRow key={`${app.name}-${app.version}-update`}>
              <TableCell className="font-medium">{app.name}</TableCell>
              <TableCell>{app.version}</TableCell>
              <TableCell>
                {app.name.includes('Chrome') || app.name.includes('Office') ? 
                  <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                    Security
                  </Badge> : 
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    Feature
                  </Badge>
                }
              </TableCell>
              <TableCell className="text-right">
                {app.name.includes('Chrome') || app.name.includes('Office') ? 
                  <Badge className="bg-red-500">High</Badge> : 
                  <Badge className="bg-blue-500">Normal</Badge>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EndpointUpdatesList;
