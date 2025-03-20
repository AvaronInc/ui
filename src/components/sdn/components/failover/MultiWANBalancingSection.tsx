
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Wifi, Cable, HeartPulse, ShieldCheck, RotateCw, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

const MultiWANBalancingSection: React.FC = () => {
  const [activeStrategy, setActiveStrategy] = useState('weighted');
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium">Multi-WAN Configuration & Load Balancing</h3>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Load Balancing Strategy</Label>
            <Select value={activeStrategy} onValueChange={setActiveStrategy}>
              <SelectTrigger>
                <SelectValue placeholder="Select strategy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weighted">Weighted Round Robin</SelectItem>
                <SelectItem value="failover">Failover Only</SelectItem>
                <SelectItem value="performance">Performance Based</SelectItem>
                <SelectItem value="cost">Cost Optimized</SelectItem>
                <SelectItem value="ai">AI Managed Dynamic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-4 pt-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="auto-failback" checked />
              <Label htmlFor="auto-failback">
                Automatically fail back to primary when restored
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="notify-failover" checked />
              <Label htmlFor="notify-failover">
                Send notifications on failover events
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="sticky-connections" checked />
              <Label htmlFor="sticky-connections">
                Maintain sticky connections during failover
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="balance-routing" />
              <Label htmlFor="balance-routing">
                Enable per-packet load balancing
              </Label>
            </div>
          </div>
        </div>
        
        <div className="grid grid-rows-2 gap-4 h-full">
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium">Current Network Status</h4>
                <Badge className="bg-green-500">All Systems Online</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-card rounded-md text-center">
                  <ShieldCheck className="h-5 w-5 mx-auto text-green-500 mb-1" />
                  <p className="text-xs">Failover Ready</p>
                </div>
                <div className="p-2 bg-card rounded-md text-center">
                  <HeartPulse className="h-5 w-5 mx-auto text-blue-500 mb-1" />
                  <p className="text-xs">98.5% Uptime</p>
                </div>
                <div className="p-2 bg-card rounded-md text-center">
                  <TrendingUp className="h-5 w-5 mx-auto text-green-500 mb-1" />
                  <p className="text-xs">Optimal Routing</p>
                </div>
                <div className="p-2 bg-card rounded-md text-center">
                  <RotateCw className="h-5 w-5 mx-auto text-amber-500 mb-1" />
                  <p className="text-xs">12 Failovers (30d)</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex flex-col justify-end">
            <Button variant="outline" className="mb-2">
              Test Failover Scenario
            </Button>
            <Button>
              Save Configuration
            </Button>
          </div>
        </div>
      </div>
      
      <div className="overflow-hidden">
        <h4 className="font-medium mb-3">Connection Priorities & Health</h4>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Connection Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Bandwidth</TableHead>
                <TableHead>Latency</TableHead>
                <TableHead>Packet Loss</TableHead>
                <TableHead>Load Distribution</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Cable className="h-4 w-4 text-blue-500" />
                    <span>Fiber (Primary)</span>
                  </div>
                </TableCell>
                <TableCell>1</TableCell>
                <TableCell>
                  <Badge className="bg-green-500">Active</Badge>
                </TableCell>
                <TableCell>1 Gbps</TableCell>
                <TableCell>8 ms</TableCell>
                <TableCell>0.1%</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={75} className="h-2 w-24" />
                    <span className="text-xs">75%</span>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Cable className="h-4 w-4 text-amber-500" />
                    <span>Copper (Secondary)</span>
                  </div>
                </TableCell>
                <TableCell>2</TableCell>
                <TableCell>
                  <Badge className="bg-green-500">Active</Badge>
                </TableCell>
                <TableCell>100 Mbps</TableCell>
                <TableCell>15 ms</TableCell>
                <TableCell>0.5%</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={25} className="h-2 w-24" />
                    <span className="text-xs">25%</span>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Wifi className="h-4 w-4 text-blue-400" />
                    <span>Starlink (Tertiary)</span>
                  </div>
                </TableCell>
                <TableCell>3</TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-amber-200 text-amber-700">Standby</Badge>
                </TableCell>
                <TableCell>150 Mbps</TableCell>
                <TableCell>45 ms</TableCell>
                <TableCell>1.2%</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={0} className="h-2 w-24" />
                    <span className="text-xs">0%</span>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Wifi className="h-4 w-4 text-gray-400" />
                    <span>Cellular (Backup)</span>
                  </div>
                </TableCell>
                <TableCell>4</TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-red-200 text-red-700">
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      <span>Signal Issue</span>
                    </div>
                  </Badge>
                </TableCell>
                <TableCell>25 Mbps</TableCell>
                <TableCell>120 ms</TableCell>
                <TableCell>3.5%</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={0} className="h-2 w-24" />
                    <span className="text-xs">0%</span>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default MultiWANBalancingSection;
