
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

const AlertConfigurationPanel: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Real-Time Alert Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Configure how and when security alerts are triggered, and define notification channels for different severities and event types.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-medium">Alert Triggers</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center border p-3 rounded-md">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">Critical Security Events</h4>
                    <Badge variant="destructive">Immediate</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Intrusion attempts, malware detection</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex justify-between items-center border p-3 rounded-md">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">High-Priority Events</h4>
                    <Badge>5 Minutes</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Multiple failed logins, permission escalation</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex justify-between items-center border p-3 rounded-md">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">Policy Violations</h4>
                    <Badge variant="outline">Hourly Digest</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Compliance violations, policy breaches</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex justify-between items-center border p-3 rounded-md">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">System Events</h4>
                    <Badge variant="outline">Daily Digest</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Configuration changes, updates</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">Alert Channels</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center border p-3 rounded-md">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-muted-foreground">security-team@example.com</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex justify-between items-center border p-3 rounded-md">
                <div>
                  <h4 className="font-medium">SMS Alerts</h4>
                  <p className="text-sm text-muted-foreground">Critical events only</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex justify-between items-center border p-3 rounded-md">
                <div>
                  <h4 className="font-medium">Microsoft Teams</h4>
                  <p className="text-sm text-muted-foreground">Security channel webhook</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex justify-between items-center border p-3 rounded-md">
                <div>
                  <h4 className="font-medium">Slack Notifications</h4>
                  <p className="text-sm text-muted-foreground">Not configured</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex justify-between items-center border p-3 rounded-md">
                <div>
                  <h4 className="font-medium">Ticketing System Integration</h4>
                  <p className="text-sm text-muted-foreground">Create tickets for critical alerts</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 pt-4 border-t">
          <h3 className="font-medium">Alert Templates</h3>
          
          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">Security Alert Template</h4>
            <div className="bg-muted p-3 rounded text-sm font-mono">
              <p>[Severity] Security Alert: [Event Type]</p>
              <p>Time: [Timestamp]</p>
              <p>Source: [Source IP/Host]</p>
              <p>Destination: [Destination IP/Host]</p>
              <p>Rule: [Rule Name]</p>
              <p>Details: [Event Details]</p>
              <p>Recommended Action: [Action]</p>
            </div>
            <div className="flex justify-end mt-2">
              <Button variant="outline" size="sm">
                Edit Template
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline">Test Alerts</Button>
          <Button>Save Alert Configuration</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertConfigurationPanel;
