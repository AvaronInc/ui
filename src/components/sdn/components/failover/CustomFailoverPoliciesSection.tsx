
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ServerCog, Settings, ArrowRight } from 'lucide-react';

const CustomFailoverPoliciesSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium">Custom Failover Policies</h3>
        <Button>Create New Policy</Button>
      </div>
      
      <div className="overflow-x-auto">
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium">Policy Name</TableHead>
              <TableHead className="font-medium">Type</TableHead>
              <TableHead className="font-medium">Vertex Targets</TableHead>
              <TableHead className="font-medium">Status</TableHead>
              <TableHead className="font-medium">Last Triggered</TableHead>
              <TableHead className="font-medium">Connection Path</TableHead>
              <TableHead className="font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Headquarters-Failover</TableCell>
              <TableCell>
                <Badge className="bg-purple-500">AI-Driven</Badge>
              </TableCell>
              <TableCell>Headquarters</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span>Active</span>
                </div>
              </TableCell>
              <TableCell>3 hours ago</TableCell>
              <TableCell>
                <div className="flex items-center text-xs">
                  <span>Fiber</span>
                  <ArrowRight className="h-3 w-3 mx-1" />
                  <span>Starlink</span>
                  <ArrowRight className="h-3 w-3 mx-1" />
                  <span>LTE</span>
                </div>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell className="font-medium">Branch-Priority</TableCell>
              <TableCell>
                <Badge variant="outline">Manual</Badge>
              </TableCell>
              <TableCell>Branch Office A, B</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span>Active</span>
                </div>
              </TableCell>
              <TableCell>2 days ago</TableCell>
              <TableCell>
                <div className="flex items-center text-xs">
                  <span>Fiber</span>
                  <ArrowRight className="h-3 w-3 mx-1" />
                  <span>Copper</span>
                </div>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell className="font-medium">Remote-Weather</TableCell>
              <TableCell>
                <Badge className="bg-blue-500">Adaptive</Badge>
              </TableCell>
              <TableCell>Remote Sites</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span>Active</span>
                </div>
              </TableCell>
              <TableCell>Just now</TableCell>
              <TableCell>
                <div className="flex items-center text-xs">
                  <span>Starlink</span>
                  <ArrowRight className="h-3 w-3 mx-1" />
                  <span>LTE</span>
                </div>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell className="font-medium">Cost-Optimized</TableCell>
              <TableCell>
                <Badge className="bg-purple-500">AI-Driven</Badge>
              </TableCell>
              <TableCell>All Sites</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                  <span>Maintenance</span>
                </div>
              </TableCell>
              <TableCell>5 days ago</TableCell>
              <TableCell>
                <div className="flex items-center text-xs">
                  <span>Varies by site</span>
                </div>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell className="font-medium">Emergency-Protocol</TableCell>
              <TableCell>
                <Badge variant="outline">Manual</Badge>
              </TableCell>
              <TableCell>All Sites</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-gray-500"></div>
                  <span>Disabled</span>
                </div>
              </TableCell>
              <TableCell>Never</TableCell>
              <TableCell>
                <div className="flex items-center text-xs">
                  <span>All Available</span>
                </div>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-base font-medium">
              <ServerCog className="h-5 w-5 mr-2 text-blue-500" />
              Policy Global Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Emergency Fallback Mode</span>
                <Switch checked />
              </div>
              
              <div className="flex items-center justify-between">
                <span>Policy Persistence</span>
                <Switch checked />
              </div>
              
              <div className="flex items-center justify-between">
                <span>Override AI Recommendations</span>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <span>Global Policy Priority</span>
                <Select defaultValue="medium">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Policy Preview Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col space-y-1">
                <div className="flex justify-between items-center text-sm">
                  <span>Predicted Network Availability</span>
                  <span className="font-medium text-green-500">99.98%</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Estimated Failover Events (Monthly)</span>
                  <span className="font-medium">12-15</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Average Failover Response Time</span>
                  <span className="font-medium">4.2 seconds</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Cost Impact</span>
                  <span className="font-medium text-amber-500">+$275/month</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Performance Impact</span>
                  <span className="font-medium text-green-500">+15% improvement</span>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full">
                View Detailed Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomFailoverPoliciesSection;
