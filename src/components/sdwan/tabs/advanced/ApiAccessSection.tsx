
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Code, Share } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const ApiAccessSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Code className="mr-2 h-5 w-5" />
          API Access & External Automation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="api-access">Enable API Access</Label>
          <Switch id="api-access" defaultChecked />
        </div>
        
        <div className="space-y-2">
          <Label>API Authentication Method</Label>
          <Select defaultValue="oauth2">
            <SelectTrigger>
              <SelectValue placeholder="Select authentication method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="oauth2">OAuth 2.0</SelectItem>
              <SelectItem value="api-key">API Key</SelectItem>
              <SelectItem value="jwt">JWT</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>API Keys</Label>
            <Button variant="outline" size="sm">Generate New</Button>
          </div>
          
          <div className="bg-muted rounded-md p-3 space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm font-medium">Monitoring Key</div>
                <div className="text-xs text-muted-foreground">Created: 2023-05-15</div>
              </div>
              <Badge>Active</Badge>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm font-medium">Configuration Key</div>
                <div className="text-xs text-muted-foreground">Created: 2023-07-22</div>
              </div>
              <Badge>Active</Badge>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <Label htmlFor="webhook-support">Webhook Support for Alerts</Label>
          <Switch id="webhook-support" defaultChecked />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="webhook-url">Webhook URL</Label>
          <Input id="webhook-url" placeholder="https://example.com/webhook" />
        </div>
        
        <div className="space-y-2">
          <Label>Webhook Events</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="failover-events" className="h-4 w-4" defaultChecked />
              <Label htmlFor="failover-events" className="text-sm">Failover Events</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="security-alerts" className="h-4 w-4" defaultChecked />
              <Label htmlFor="security-alerts" className="text-sm">Security Alerts</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="performance-issues" className="h-4 w-4" defaultChecked />
              <Label htmlFor="performance-issues" className="text-sm">Performance Issues</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="config-changes" className="h-4 w-4" />
              <Label htmlFor="config-changes" className="text-sm">Config Changes</Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiAccessSection;
