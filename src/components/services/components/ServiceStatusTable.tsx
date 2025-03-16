
import React from 'react';
import { Service } from '@/types/services';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle, AlertCircle, Clock, Power } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ServiceStatusTableProps {
  services: Service[];
}

const ServiceStatusTable = ({ services }: ServiceStatusTableProps) => {
  const isMobile = useIsMobile();
  
  // Function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Healthy</Badge>;
      case 'warning':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Warning</Badge>;
      case 'critical':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Critical</Badge>;
      case 'offline':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Offline</Badge>;
      case 'deploying':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Deploying</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  // Function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'offline':
        return <Power className="h-5 w-5 text-gray-500" />;
      case 'deploying':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };
  
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Status</TableHead>
            <TableHead>Service Name</TableHead>
            <TableHead className={isMobile ? "hidden sm:table-cell" : ""}>Type</TableHead>
            <TableHead className={isMobile ? "hidden sm:table-cell" : ""}>Uptime</TableHead>
            <TableHead className={isMobile ? "hidden lg:table-cell" : ""}>Version</TableHead>
            <TableHead className={isMobile ? "hidden md:table-cell" : ""}>Instances</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id}>
              <TableCell className="py-2">
                {getStatusIcon(service.status)}
              </TableCell>
              <TableCell className="font-medium py-2">{service.name}</TableCell>
              <TableCell className={`capitalize py-2 ${isMobile ? "hidden sm:table-cell" : ""}`}>{service.type.replace('_', ' ')}</TableCell>
              <TableCell className={`py-2 ${isMobile ? "hidden sm:table-cell" : ""}`}>{service.uptime}</TableCell>
              <TableCell className={`py-2 ${isMobile ? "hidden lg:table-cell" : ""}`}>{service.version}</TableCell>
              <TableCell className={`py-2 ${isMobile ? "hidden md:table-cell" : ""}`}>{service.instances}</TableCell>
              <TableCell className="text-right py-2">
                <div className="flex justify-end gap-1">
                  <Button variant="ghost" size="sm">{isMobile ? "View" : "Details"}</Button>
                  <Button variant="ghost" size="sm" className={isMobile ? "hidden sm:inline-flex" : ""}>Restart</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ServiceStatusTable;
