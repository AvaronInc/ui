
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FileText, ChartBar } from 'lucide-react';
import { LoggingAlertsProps } from './interfaces';

const LoggingAlertsCard = ({ logging, onLoggingToggle }: LoggingAlertsProps) => {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          Logging, Alerts, & Reporting
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-logging">Enable AI Failover Logging</Label>
              <Switch 
                id="enable-logging" 
                checked={logging.enabled}
                onCheckedChange={() => onLoggingToggle('enabled')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-alerts">Send Alerts When AI Makes a Failover Decision</Label>
              <Switch 
                id="enable-alerts" 
                checked={logging.sendAlerts}
                onCheckedChange={() => onLoggingToggle('sendAlerts')}
              />
            </div>
            
            <Button variant="outline" className="mt-2 w-full">
              Export AI Failover Analysis Reports
            </Button>
          </div>
          
          <div className="h-[200px] bg-muted rounded-md flex items-center justify-center">
            <div className="text-center">
              <ChartBar className="h-10 w-10 mx-auto text-muted-foreground" />
              <p className="text-muted-foreground mt-2">Real-Time AI Failover Events Dashboard</p>
              <Button variant="outline" size="sm" className="mt-2">
                Open Dashboard
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoggingAlertsCard;
