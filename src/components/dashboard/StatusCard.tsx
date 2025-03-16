
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
  style?: React.CSSProperties;
  onClick?: () => void;
  icon?: React.ReactNode;
  detail?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

const statusConfig = {
  healthy: {
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-900/10',
    borderColor: 'border-green-200 dark:border-green-800/30',
    dotColor: 'bg-green-500',
    label: 'Healthy'
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-amber-500',
    bgColor: 'bg-amber-50 dark:bg-amber-900/10',
    borderColor: 'border-amber-200 dark:border-amber-800/30',
    dotColor: 'bg-amber-500',
    label: 'Warning'
  },
  critical: {
    icon: XCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-900/10',
    borderColor: 'border-red-200 dark:border-red-800/30',
    dotColor: 'bg-red-500',
    label: 'Critical'
  },
  unknown: {
    icon: Info,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/10',
    borderColor: 'border-blue-200 dark:border-blue-800/30',
    dotColor: 'bg-blue-500',
    label: 'Unknown'
  }
};

export const StatusCard = ({ 
  title, 
  status, 
  description, 
  updated,
  className,
  style,
  onClick,
  icon,
  detail,
  trend,
  trendValue
}: StatusCardProps) => {
  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 border hover:shadow-md",
        config.borderColor,
        config.bgColor,
        onClick && "cursor-pointer",
        className
      )}
      style={style}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            {icon && <div className={cn("mr-2", config.color)}>{icon}</div>}
            <CardTitle className="text-base font-medium">{title}</CardTitle>
          </div>
          {onClick && (
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2.5 mb-2">
          <span className={`h-2.5 w-2.5 rounded-full ${config.dotColor}`} />
          <span className={cn("font-medium", config.color)}>
            {config.label}
          </span>
          {trend && (
            <span className={cn("ml-auto text-xs font-medium", 
              trend === 'up' ? 'text-green-500' : 
              trend === 'down' ? 'text-red-500' : 
              'text-gray-500'
            )}>
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        {detail && (
          <p className="text-xs text-muted-foreground mt-1">{detail}</p>
        )}
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
