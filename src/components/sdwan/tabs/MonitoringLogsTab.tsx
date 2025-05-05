
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Monitor, Activity, List, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import SDWANTopologyMap from '../components/SDWANTopologyMap';
import { VertexNode } from '@/types/sdwan';

const MonitoringLogsTab = () => {
  const handleNodeClick = (node: VertexNode) => {
    console.log('Node clicked:', node);
    // Additional logic if needed when node is clicked
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-2 row-span-2">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Monitor className="mr-2 h-5 w-5" />
            Live SD-WAN Network Topology Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SDWANTopologyMap onNodeClick={handleNodeClick} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2 h-5 w-5" />
            Real-Time Network Health
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Select Vertex to View</Label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Select Vertex" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Vertices</SelectItem>
                <SelectItem value="headquarters">Headquarters</SelectItem>
                <SelectItem value="branch1">Branch Office 1</SelectItem>
                <SelectItem value="branch2">Branch Office 2</SelectItem>
                <SelectItem value="datacenter">Data Center</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Uptime</span>
              <span className="text-sm">99.98%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Bandwidth Usage</span>
              <span className="text-sm">1.2 Gbps / 2 Gbps</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Average Latency</span>
              <span className="text-sm">24 ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Packet Loss</span>
              <span className="text-sm">0.01%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Jitter</span>
              <span className="text-sm">2.3 ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Active Connections</span>
              <span className="text-sm">1,245</span>
            </div>
          </div>
          
          <Button className="w-full">View Detailed Metrics</Button>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center">
            <List className="mr-2 h-5 w-5" />
            System Events & Logs
          </CardTitle>
          <div className="flex items-center gap-2">
            <Input placeholder="Search logs..." className="w-48" />
            <Button variant="outline" size="sm">Export</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto rounded-md">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted">
                <tr>
                  <th scope="col" className="px-4 py-3">Timestamp</th>
                  <th scope="col" className="px-4 py-3">Event Type</th>
                  <th scope="col" className="px-4 py-3">Vertex</th>
                  <th scope="col" className="px-4 py-3">Status</th>
                  <th scope="col" className="px-4 py-3">Message</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-3">2023-08-28 14:32:15</td>
                  <td className="px-4 py-3">Failover</td>
                  <td className="px-4 py-3">Branch Office 1</td>
                  <td className="px-4 py-3"><Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Warning</Badge></td>
                  <td className="px-4 py-3">Primary link degraded, failing over to secondary</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">2023-08-28 14:30:22</td>
                  <td className="px-4 py-3">Security</td>
                  <td className="px-4 py-3">Headquarters</td>
                  <td className="px-4 py-3"><Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Alert</Badge></td>
                  <td className="px-4 py-3">Unusual traffic pattern detected from 192.168.1.45</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">2023-08-28 14:15:08</td>
                  <td className="px-4 py-3">BGP</td>
                  <td className="px-4 py-3">Data Center</td>
                  <td className="px-4 py-3"><Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Info</Badge></td>
                  <td className="px-4 py-3">BGP neighbor 203.0.113.1 state changed to Established</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">2023-08-28 14:02:55</td>
                  <td className="px-4 py-3">Performance</td>
                  <td className="px-4 py-3">Branch Office 2</td>
                  <td className="px-4 py-3"><Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Warning</Badge></td>
                  <td className="px-4 py-3">Increased latency detected on primary link</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">2023-08-28 13:45:11</td>
                  <td className="px-4 py-3">System</td>
                  <td className="px-4 py-3">All Vertices</td>
                  <td className="px-4 py-3"><Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Info</Badge></td>
                  <td className="px-4 py-3">SD-WAN configuration updated successfully</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonitoringLogsTab;
