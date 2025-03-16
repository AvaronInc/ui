
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Bell, AlertTriangle, AlertCircle, CheckCircle, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const AlertItem = ({ 
  icon, 
  title, 
  time, 
  severity 
}: { 
  icon: React.ReactNode; 
  title: string; 
  time: string; 
  severity: 'critical' | 'warning' | 'info'; 
}) => {
  const colors = {
    critical: {
      bg: 'bg-red-50 dark:bg-red-900/10',
      text: 'text-red-800 dark:text-red-300',
      badge: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
    },
    warning: {
      bg: 'bg-amber-50 dark:bg-amber-900/10',
      text: 'text-amber-800 dark:text-amber-300',
      badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/10',
      text: 'text-blue-800 dark:text-blue-300',
      badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
    }
  };

  return (
    <div className={`flex items-center justify-between p-2 rounded-md ${colors[severity].bg}`}>
      <div className="flex items-center">
        {icon}
        <div className="ml-2">
          <div className="text-sm font-medium">{title}</div>
          <div className="text-xs text-muted-foreground">{time}</div>
        </div>
      </div>
      <Badge variant="outline" className={colors[severity].badge}>
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </Badge>
    </div>
  );
};

const ActiveAlertsSection = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-card/50 pb-2">
        <CardTitle className="flex items-center text-lg font-medium">
          <Bell className="h-5 w-5 mr-2 text-amber-500" />
          Active Alerts & Workflows
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
          <div>
            <div className="text-2xl font-bold text-red-500">3</div>
            <div className="text-xs text-muted-foreground">Critical</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-500">7</div>
            <div className="text-xs text-muted-foreground">Warning</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-500">12</div>
            <div className="text-xs text-muted-foreground">Info</div>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <AlertItem 
            icon={<AlertTriangle className="h-4 w-4 text-red-500" />}
            title="Server CPU usage at 92%" 
            time="2 min ago" 
            severity="critical" 
          />
          <AlertItem 
            icon={<AlertCircle className="h-4 w-4 text-amber-500" />}
            title="Storage space below 15%" 
            time="15 min ago" 
            severity="warning" 
          />
          <AlertItem 
            icon={<CheckCircle className="h-4 w-4 text-blue-500" />}
            title="Backup completed successfully" 
            time="1 hour ago" 
            severity="info" 
          />
        </div>

        <div className="bg-card rounded-md shadow-sm border p-3">
          <div className="text-sm font-medium mb-2">Automated Workflows</div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs">AI-Driven Cleanup</div>
            <div className="text-xs text-green-500">Running</div>
          </div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs">Security Scans</div>
            <div className="text-xs text-green-500">Scheduled (2h)</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs">System Backup</div>
            <div className="text-xs text-green-500">Completed</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/10 px-4 py-2 flex justify-between">
        <div className="text-xs text-muted-foreground">Updates every 5 minutes</div>
        <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">
          View All Alerts
          <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ActiveAlertsSection;
