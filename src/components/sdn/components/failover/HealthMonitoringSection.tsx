
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HeartPulse, Activity, TrendingUp, TrendingDown, AlertTriangle, RefreshCw } from 'lucide-react';

const HealthMonitoringSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium">Real-Time Network Health Monitoring</h3>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          <span>Refresh Now</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Latency (Avg)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold">12.5 ms</div>
              <Badge className="bg-green-500 flex items-center gap-1">
                <TrendingDown className="h-3 w-3" />
                <span>-1.2 ms</span>
              </Badge>
            </div>
            <Progress value={25} className="h-2 mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Packet Loss</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold">0.3%</div>
              <Badge className="bg-green-500 flex items-center gap-1">
                <TrendingDown className="h-3 w-3" />
                <span>-0.1%</span>
              </Badge>
            </div>
            <Progress value={3} className="h-2 mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Jitter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold">3.8 ms</div>
              <Badge variant="outline" className="border-amber-200 text-amber-700 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                <span>+0.5 ms</span>
              </Badge>
            </div>
            <Progress value={38} className="h-2 mt-2" indicatorClassName="bg-amber-500" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Connection Stability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold">98.2%</div>
              <Badge className="bg-green-500 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                <span>+0.3%</span>
              </Badge>
            </div>
            <Progress value={98} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <HeartPulse className="h-5 w-5 text-blue-500" />
            <span>Connection Health Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Connection</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Latency</TableHead>
                  <TableHead>Jitter</TableHead>
                  <TableHead>Packet Loss</TableHead>
                  <TableHead>Uptime</TableHead>
                  <TableHead>Bandwidth Usage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Headquarters (Fiber)</TableCell>
                  <TableCell>
                    <Badge className="bg-green-500">Healthy</Badge>
                  </TableCell>
                  <TableCell>8.5 ms</TableCell>
                  <TableCell>1.2 ms</TableCell>
                  <TableCell>0.1%</TableCell>
                  <TableCell>99.98%</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={68} className="h-2 w-24" />
                      <span className="text-xs">425/1000 Mbps</span>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Branch Office A (Fiber)</TableCell>
                  <TableCell>
                    <Badge className="bg-green-500">Healthy</Badge>
                  </TableCell>
                  <TableCell>12.8 ms</TableCell>
                  <TableCell>2.1 ms</TableCell>
                  <TableCell>0.2%</TableCell>
                  <TableCell>99.95%</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={42} className="h-2 w-24" />
                      <span className="text-xs">210/500 Mbps</span>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Branch Office B (Copper)</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-amber-200 text-amber-700 flex items-center gap-1">
                      <Activity className="h-3 w-3" />
                      <span>Degraded</span>
                    </Badge>
                  </TableCell>
                  <TableCell>35.2 ms</TableCell>
                  <TableCell>8.7 ms</TableCell>
                  <TableCell>1.8%</TableCell>
                  <TableCell>97.2%</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={85} className="h-2 w-24" indicatorClassName="bg-amber-500" />
                      <span className="text-xs">85/100 Mbps</span>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Remote Site (Starlink)</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-amber-200 text-amber-700 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      <span>Weather Impact</span>
                    </Badge>
                  </TableCell>
                  <TableCell>58.3 ms</TableCell>
                  <TableCell>12.5 ms</TableCell>
                  <TableCell>2.2%</TableCell>
                  <TableCell>96.8%</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={35} className="h-2 w-24" indicatorClassName="bg-amber-500" />
                      <span className="text-xs">52/150 Mbps</span>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Mobile Team (LTE)</TableCell>
                  <TableCell>
                    <Badge className="bg-green-500">Healthy</Badge>
                  </TableCell>
                  <TableCell>45.1 ms</TableCell>
                  <TableCell>9.8 ms</TableCell>
                  <TableCell>0.8%</TableCell>
                  <TableCell>99.1%</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={25} className="h-2 w-24" />
                      <span className="text-xs">6/25 Mbps</span>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Threshold Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Latency Threshold</span>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">50ms</span>
                    <Badge className="bg-blue-500">Auto-adjusted</Badge>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Packet Loss Threshold</span>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">2.5%</span>
                    <Badge className="bg-blue-500">Auto-adjusted</Badge>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Jitter Threshold</span>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">10ms</span>
                    <Badge className="bg-blue-500">Auto-adjusted</Badge>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Failover Delay</span>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">15 seconds</span>
                    <Badge className="bg-purple-500">AI Optimized</Badge>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Adjust Thresholds
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Health Check Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Check Interval</span>
                  <div className="font-medium">5 seconds</div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Consecutive Failures</span>
                  <div className="font-medium">3 checks</div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Test Method</span>
                  <div className="font-medium">ICMP + HTTP</div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Test Targets</span>
                  <div className="font-medium">Multiple Endpoints</div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Configure Health Checks
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HealthMonitoringSection;
