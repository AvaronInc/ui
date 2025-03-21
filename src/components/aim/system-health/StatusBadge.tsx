
import React from 'react';
import { Badge } from '@/components/ui/badge';

type StatusType = 'critical' | 'warning' | 'healthy' | 'error';

interface StatusBadgeProps {
  status: StatusType;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusProps = () => {
    switch (status) {
      case 'critical':
        return { variant: 'destructive' as const, text: 'Critical' };
      case 'warning':
        return { variant: 'outline' as const, className: 'border-amber-500 text-amber-500', text: 'Warning' };
      case 'error':
        return { variant: 'destructive' as const, text: 'Error' };
      case 'healthy':
      default:
        return { variant: 'outline' as const, className: 'border-green-500 text-green-500', text: 'Healthy' };
    }
  };

  const { variant, className, text } = getStatusProps();

  return (
    <Badge variant={variant} className={className}>
      {text}
    </Badge>
  );
};

export default StatusBadge;
