
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Brain, Activity, Signal, AlertTriangle, FileText, ChartBar } from 'lucide-react';

const AIIntelligentFailoverTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* AI Confidence & Threshold Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="mr-2 h-5 w-5" />
            AI Confidence & Threshold Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="ai-confidence">AI Confidence Level for Autonomous Failover: 75%</Label>
              </div>
              <Slider id="ai-confidence" defaultValue={[75]} max={100} step={1} />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="min-confidence">Minimum Confidence Required: 80%</Label>
              </div>
              <Slider id="min-confidence" defaultValue={[80]} min={50} max={100} step={1} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="threshold">Threshold for AI-Generated Failover Recommendations</Label>
              <Select defaultValue="medium">
                <SelectTrigger>
                  <SelectValue placeholder="Select threshold" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="admin-approval">Admin Approval Requirement</Label>
              <Switch id="admin-approval" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Network Conditions AI Evaluates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2 h-5 w-5" />
            Network Conditions for Failover Decisions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latency">Latency Degradation (ms)</Label>
              <Input id="latency" type="number" defaultValue="100" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="packet-loss">Packet Loss (%)</Label>
              <Input id="packet-loss" type="number" defaultValue="5" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="jitter">Jitter (ms)</Label>
              <Input id="jitter" type="number" defaultValue="30" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="failures">Connection Failures (in 5 min)</Label>
              <Input id="failures" type="number" defaultValue="3" />
            </div>
          </div>
          
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="bgp-detection">ISP-Level Routing Issues (BGP detection)</Label>
              <Switch id="bgp-detection" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="ddos-response">DDoS Attack Response (AI mitigation)</Label>
              <Switch id="ddos-response" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Failover Learning & Adaptive AI Policies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Signal className="mr-2 h-5 w-5" />
            Failover Learning & Adaptive AI Policies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="adaptive-learning">Enable Adaptive Learning Mode</Label>
              <Switch id="adaptive-learning" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="real-time-adjust">Allow AI to Adjust Traffic Routing in Real-Time</Label>
              <Switch id="real-time-adjust" defaultChecked />
            </div>
            
            <div className="pt-2 space-y-2">
              <Button className="w-full">
                Train AI on Past Network Failover Logs
              </Button>
            </div>
            
            <div className="pt-2 space-y-2">
              <Button variant="outline" className="w-full">
                View AI Decision Logs & Accuracy Reports
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Custom AI-Driven Failover Rules & Prioritization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Custom AI-Driven Failover Rules
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Prioritize Failover Paths by:</Label>
              <Select defaultValue="performance">
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cost">Cost (Auto-select cheapest option)</SelectItem>
                  <SelectItem value="performance">Performance (Auto-select lowest latency)</SelectItem>
                  <SelectItem value="stability">Stability (Auto-select most reliable link)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Custom AI Routing Rules</Label>
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Source IP</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Priority</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>10.0.1.0/24</TableCell>
                      <TableCell>SaaS Apps</TableCell>
                      <TableCell>High</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>10.0.2.0/24</TableCell>
                      <TableCell>Cloud Services</TableCell>
                      <TableCell>Medium</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <Button variant="outline" size="sm" className="mt-2">
                Add Rule
              </Button>
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <Label htmlFor="simulation-mode">AI Failover Testing Mode (Simulation)</Label>
              <Switch id="simulation-mode" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Logging, Alerts, & Reporting */}
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
                <Switch id="enable-logging" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="enable-alerts">Send Alerts When AI Makes a Failover Decision</Label>
                <Switch id="enable-alerts" defaultChecked />
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
    </div>
  );
};

export default AIIntelligentFailoverTab;
