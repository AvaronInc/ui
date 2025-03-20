
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ExternalLink } from 'lucide-react';

const SIEMIntegrationPanel: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>SIEM Integration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Configure integration with Security Information and Event Management (SIEM) systems for centralized log management,
          correlation, and analysis.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-medium">Current SIEM Configuration</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center border p-3 rounded-md">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">ELK Stack Integration</h4>
                    <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Elasticsearch, Logstash, Kibana</p>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Open
                </Button>
              </div>
              
              <div className="flex justify-between items-center border p-3 rounded-md">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">Wazuh Dashboard</h4>
                    <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Intrusion detection visualization</p>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Open
                </Button>
              </div>
              
              <div className="flex justify-between items-center border p-3 rounded-md">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">Splunk Integration</h4>
                    <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300">Inactive</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Enterprise log management</p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">Log Forwarding</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Log Format</label>
                <Select defaultValue="json">
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="json">JSON</SelectItem>
                    <SelectItem value="cef">CEF (Common Event Format)</SelectItem>
                    <SelectItem value="leef">LEEF (Log Event Extended Format)</SelectItem>
                    <SelectItem value="syslog">Syslog</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Event Categories</label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="security" className="h-4 w-4" defaultChecked />
                    <label htmlFor="security" className="text-sm">Security Events</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="traffic" className="h-4 w-4" defaultChecked />
                    <label htmlFor="traffic" className="text-sm">Traffic Logs</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="system" className="h-4 w-4" defaultChecked />
                    <label htmlFor="system" className="text-sm">System Events</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="audit" className="h-4 w-4" defaultChecked />
                    <label htmlFor="audit" className="text-sm">Audit Logs</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="compliance" className="h-4 w-4" defaultChecked />
                    <label htmlFor="compliance" className="text-sm">Compliance Events</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="debug" className="h-4 w-4" />
                    <label htmlFor="debug" className="text-sm">Debug Logs</label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center border p-3 rounded-md">
                <div>
                  <h4 className="font-medium">Real-time Forwarding</h4>
                  <p className="text-sm text-muted-foreground">Send logs as they are generated</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex justify-between items-center border p-3 rounded-md">
                <div>
                  <h4 className="font-medium">Batched Forwarding</h4>
                  <p className="text-sm text-muted-foreground">Send logs in batches (every 5 minutes)</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline">Test Connection</Button>
          <Button>Save SIEM Configuration</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SIEMIntegrationPanel;
