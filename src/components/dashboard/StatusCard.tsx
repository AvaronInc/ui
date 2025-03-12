
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Info, 
  ArrowUpRight 
} from 'lucide-react';

type StatusType = 'healthy' | 'warning' | 'critical' | 'unknown';

interface StatusCardProps {
  title: string;
  status: StatusType;
  description: string;
  updated?: string;
  className?: string;
  onClick?: () => void;
}

const statusConfig = {
  healthy: {
    icon: CheckCircle,
    color: 'text-success',
    dotColor: 'green',
    label: 'Healthy'
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-warning',
    dotColor: 'yellow',
    label: 'Warning'
  },
  critical: {
    icon: XCircle,
    color: 'text-error',
    dotColor: 'red',
    label: 'Critical'
  },
  unknown: {
    icon: Info,
    color: 'text-muted-foreground',
    dotColor: '',
    label: 'Unknown'
  }
};

export const StatusCard = ({ 
  title, 
  status, 
  description, 
  updated,
  className,
  onClick
}: StatusCardProps) => {
  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <Card 
      className={cn(
        "glass-card overflow-hidden animated-card", 
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          {onClick && (
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2.5 mb-2">
          <span className={`status-dot ${config.dotColor}`} />
          <span className={cn("font-medium", config.color)}>
            {config.label}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        {updated && (
          <p className="text-xs text-muted-foreground mt-2">
            Updated {updated}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatusCard;
