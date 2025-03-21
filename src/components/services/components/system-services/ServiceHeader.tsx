
import React from 'react';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SystemService } from '@/types/services';
import ServiceActions from './ServiceActions';

interface ServiceHeaderProps {
  service: SystemService;
  onRefresh: () => void;
}

const ServiceHeader: React.FC<ServiceHeaderProps> = ({ service, onRefresh }) => {
  // Helper function to get badge variant based on health status
  const getHealthBadgeVariant = (health: string) => {
    switch (health) {
      case 'ok':
        return 'default'; 
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

  return (
    <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
      <div className="flex items-center gap-3">
        <CardTitle className="text-xl">{service.name}</CardTitle>
        <Badge variant={getStatusBadgeVariant(service.status)} className="capitalize">
          {service.status}
        </Badge>
        <Badge variant={getHealthBadgeVariant(service.health)} className="capitalize">
          {service.health}
        </Badge>
        <Badge variant="outline" className="capitalize">
          {service.type}
        </Badge>
      </div>
      
      <ServiceActions service={service} onRefresh={onRefresh} />
    </CardHeader>
  );
};

export default ServiceHeader;
