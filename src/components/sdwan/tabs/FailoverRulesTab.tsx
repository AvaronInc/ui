
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RotateCw, Route, ArrowRightLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const FailoverRulesTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <RotateCw className="mr-2 h-5 w-5" />
            WAN Failover Policies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select NEST to Configure</Label>
              <Select defaultValue="headquarters">
                <SelectTrigger>
                  <SelectValue placeholder="Select NEST" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="headquarters">Headquarters</SelectItem>
                  <SelectItem value="branch1">Branch Office 1</SelectItem>
                  <SelectItem value="branch2">Branch Office 2</SelectItem>
                  <SelectItem value="datacenter">Data Center</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label>Failover Activation Thresholds</Label>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="latency-threshold" className="text-xs">Latency (ms)</Label>
                  <Input id="latency-threshold" type="number" defaultValue={150} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="packet-loss" className="text-xs">Packet Loss (%)</Label>
                  <Input id="packet-loss" type="number" defaultValue={5} />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="jitter" className="text-xs">Jitter (ms)</Label>
                  <Input id="jitter" type="number" defaultValue={20} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="outage-time" className="text-xs">Outage Time (s)</Label>
                  <Input id="outage-time" type="number" defaultValue={10} />
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="load-balancing">Load Balancing Between Active Links</Label>
              <Switch id="load-balancing" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="starlink-backup">Enable Starlink as Emergency Backup</Label>
              <Switch id="starlink-backup" defaultChecked />
            </div>
          </div>
          
          <div className="pt-4">
            <Button className="w-full">Apply Failover Configuration</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Route className="mr-2 h-5 w-5" />
            Traffic Routing Policies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Traffic Shaping & QoS Settings</Label>
            <Select defaultValue="balanced">
              <SelectTrigger>
                <SelectValue placeholder="Select QoS profile" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="balanced">Balanced</SelectItem>
                <SelectItem value="video">Video Conferencing Priority</SelectItem>
                <SelectItem value="voip">VoIP Priority</SelectItem>
                <SelectItem value="data">Data Transfer Priority</SelectItem>
                <SelectItem value="custom">Custom Profile</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Prioritize Business-Critical Applications</Label>
            <Select defaultValue="voip">
              <SelectTrigger>
                <SelectValue placeholder="Select applications" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="voip">VoIP Systems</SelectItem>
                <SelectItem value="teams">Microsoft Teams</SelectItem>
                <SelectItem value="zoom">Zoom</SelectItem>
                <SelectItem value="erp">ERP Software</SelectItem>
                <SelectItem value="crm">CRM Software</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Custom Application Traffic Rules</Label>
              <Button variant="outline" size="sm">Add Rule</Button>
            </div>
            
            <div className="bg-muted rounded-md p-3 space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <ArrowRightLeft className="h-4 w-4" />
                  <span className="text-sm font-medium">CRM Traffic Rule</span>
                </div>
                <Badge>Active</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <ArrowRightLeft className="h-4 w-4" />
                  <span className="text-sm font-medium">VoIP Priority</span>
                </div>
                <Badge>Active</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <ArrowRightLeft className="h-4 w-4" />
                  <span className="text-sm font-medium">Video Conferencing</span>
                </div>
                <Badge variant="outline">Disabled</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FailoverRulesTab;
