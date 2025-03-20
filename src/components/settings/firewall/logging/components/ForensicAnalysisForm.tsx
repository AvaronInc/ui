
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, BarChart4 } from 'lucide-react';

const ForensicAnalysisForm: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Forensic Analysis Mode</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Forensic mode allows for detailed investigation of security incidents with advanced log correlation and timeline visualization.
          Use this mode to perform historical traffic analysis and build forensic evidence for security investigations.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-medium">Historical Query</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Time Range</label>
                <div className="flex gap-2">
                  <Input type="datetime-local" className="flex-1" />
                  <span className="flex items-center">to</span>
                  <Input type="datetime-local" className="flex-1" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">IP Address Filter</label>
                <Input placeholder="e.g. 192.168.1.5 or leave blank for all" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Event Type</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="block">Blocked Traffic</SelectItem>
                    <SelectItem value="allow">Allowed Traffic</SelectItem>
                    <SelectItem value="alert">Security Alerts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="pt-2">
                <Button className="w-full">
                  <Search className="h-4 w-4 mr-1" />
                  Run Forensic Query
                </Button>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">Advanced Options</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center border p-3 rounded-md">
                <div>
                  <h4 className="font-medium">Timeline Visualization</h4>
                  <p className="text-sm text-muted-foreground">Interactive event timeline</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex justify-between items-center border p-3 rounded-md">
                <div>
                  <h4 className="font-medium">Connection Mapping</h4>
                  <p className="text-sm text-muted-foreground">Map related network connections</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex justify-between items-center border p-3 rounded-md">
                <div>
                  <h4 className="font-medium">Full Packet Capture</h4>
                  <p className="text-sm text-muted-foreground">Include raw packet data if available</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex justify-between items-center border p-3 rounded-md">
                <div>
                  <h4 className="font-medium">Correlation Engine</h4>
                  <p className="text-sm text-muted-foreground">Connect related security events</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center py-8 border-2 border-dashed rounded-md bg-muted">
          <div className="text-center">
            <BarChart4 className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
            <h3 className="font-medium mb-1">Forensic Results</h3>
            <p className="text-sm text-muted-foreground">
              Run a query to see timeline visualization and analytics
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForensicAnalysisForm;
