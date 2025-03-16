
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ServiceStatusCardProps {
  title: string;
  value: string;
  status?: 'success' | 'warning' | 'error' | 'default';
  icon?: React.ReactNode;
}

const ServiceStatusCard = ({ title, value, status = 'default', icon }: ServiceStatusCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'text-green-600';
      case 'warning':
        return 'text-amber-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-blue-600';
    }
  };
  
  return (
    <Card className="border bg-card/50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {icon && <div className={cn("text-muted-foreground", getStatusColor())}>{icon}</div>}
        </div>
        <p className={cn("text-2xl font-bold", getStatusColor())}>{value}</p>
      </CardContent>
    </Card>
  );
};

export default ServiceStatusCard;
