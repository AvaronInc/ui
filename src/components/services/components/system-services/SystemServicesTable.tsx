
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { SystemService } from '@/types/services';
import { ScrollArea } from "@/components/ui/scroll-area";

interface SystemServicesTableProps {
  services: SystemService[];
  groupedServices: Record<string, SystemService[]>;
  grouped: boolean;
  onSelectService: (service: SystemService) => void;
  selectedServiceId: string | undefined;
}

const SystemServicesTable: React.FC<SystemServicesTableProps> = ({
  services,
  groupedServices,
  grouped,
  onSelectService,
  selectedServiceId
}) => {
  // Helper function to format the timestamp
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Helper function to get badge variant based on health status
  const getHealthBadgeVariant = (health: string) => {
    switch (health) {
      case 'ok':
        return 'default'; // Changed from 'success' to 'default'
      case 'degraded':
        return 'warning';
      case 'critical':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  // Helper function to get badge variant based on status
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'running':
        return 'default';
      case 'stopped':
        return 'secondary';
      case 'error':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  // Render table rows for a group of services
  const renderServiceRows = (servicesList: SystemService[]) => {
    return servicesList.map((service) => (
      <TableRow 
        key={service.id}
        className={`cursor-pointer hover:bg-muted/50 ${selectedServiceId === service.id ? 'bg-muted' : ''}`}
        onClick={() => onSelectService(service)}
      >
        <TableCell className="font-medium">{service.name}</TableCell>
        <TableCell>
          <Badge variant="outline" className="capitalize">
            {service.type}
          </Badge>
        </TableCell>
        <TableCell className="hidden md:table-cell">{service.description}</TableCell>
        <TableCell>
          <Badge variant={getStatusBadgeVariant(service.status)} className="capitalize">
            {service.status}
          </Badge>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <div className="w-full bg-muted rounded-full h-2.5">
              <div 
                className="bg-primary h-2.5 rounded-full" 
                style={{ width: `${service.cpuUsage}%` }}
              ></div>
            </div>
            <span className="text-xs whitespace-nowrap">{service.cpuUsage}%</span>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <div className="w-full bg-muted rounded-full h-2.5">
              <div 
                className="bg-primary h-2.5 rounded-full" 
                style={{ width: `${service.memoryUsage}%` }}
              ></div>
            </div>
            <span className="text-xs whitespace-nowrap">{service.memoryUsage}%</span>
          </div>
        </TableCell>
        <TableCell className="hidden lg:table-cell">{formatDate(service.lastRestart)}</TableCell>
        <TableCell>
          <Badge variant={getHealthBadgeVariant(service.health)} className="capitalize">
            {service.health}
          </Badge>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <ScrollArea className="h-[calc(100vh-300px)]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>CPU %</TableHead>
            <TableHead>MEM %</TableHead>
            <TableHead className="hidden lg:table-cell">Last Restart</TableHead>
            <TableHead>Health</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {grouped ? (
            // Render grouped services
            Object.entries(groupedServices).map(([type, groupServices]) => (
              <React.Fragment key={type}>
                {type !== 'all' && (
                  <TableRow className="bg-muted/30">
                    <TableCell colSpan={8} className="font-semibold capitalize">
                      {type} Services ({groupServices.length})
                    </TableCell>
                  </TableRow>
                )}
                {renderServiceRows(groupServices)}
              </React.Fragment>
            ))
          ) : (
            // Render non-grouped services
            renderServiceRows(services)
          )}
          
          {services.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                No services found matching the current filters
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default SystemServicesTable;
