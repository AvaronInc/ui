
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const SimulationHistory: React.FC = () => {
  // Mock data for simulation history
  const historyItems = [
    {
      id: 'sim-1234',
      name: 'Firewall Rule Update - DMZ',
      type: 'firewall',
      date: '2023-10-25T14:30:00Z',
      result: 'success',
      risk: 'low',
      score: 96,
      approver: 'Sarah Johnson'
    },
    {
      id: 'sim-1233',
      name: 'DNS Configuration Update',
      type: 'dns',
      date: '2023-10-23T10:15:00Z',
      result: 'warning',
      risk: 'medium',
      score: 82,
      approver: 'Michael Zhang'
    },
    {
      id: 'sim-1230',
      name: 'VLAN Restructuring',
      type: 'network',
      date: '2023-10-20T16:45:00Z',
      result: 'failure',
      risk: 'high',
      score: 45,
      approver: null
    },
    {
      id: 'sim-1225',
      name: 'SD-WAN Policy Update',
      type: 'sdwan',
      date: '2023-10-15T09:00:00Z',
      result: 'success',
      risk: 'low',
      score: 98,
      approver: 'David Patel'
    },
    {
      id: 'sim-1220',
      name: 'VPN Access Policy Change',
      type: 'identity',
      date: '2023-10-10T11:30:00Z',
      result: 'warning',
      risk: 'medium',
      score: 76,
      approver: 'Emma Wilson'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-500">Success</Badge>;
      case 'warning':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500">Warning</Badge>;
      case 'failure':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'low':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500">Low Risk</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500">Medium Risk</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500">High Risk</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Simulation History</h2>
        <p className="text-sm text-muted-foreground">
          View and manage past deployment test simulations.
        </p>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search simulations..."
            className="pl-8"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">Export All</Button>
          <Button variant="outline" size="sm">Delete Selected</Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Recent Simulations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead>
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Type</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Result</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Risk</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Score</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Approver</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {historyItems.map((item) => (
                    <tr 
                      key={item.id} 
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      <td className="p-4 align-middle">{item.name}</td>
                      <td className="p-4 align-middle capitalize">{item.type}</td>
                      <td className="p-4 align-middle">
                        {new Date(item.date).toLocaleDateString()}
                      </td>
                      <td className="p-4 align-middle">{getStatusBadge(item.result)}</td>
                      <td className="p-4 align-middle">{getRiskBadge(item.risk)}</td>
                      <td className="p-4 align-middle">
                        <span className={`font-medium ${
                          item.score >= 90 ? 'text-green-500' :
                          item.score >= 70 ? 'text-yellow-500' : 'text-red-500'
                        }`}>
                          {item.score}%
                        </span>
                      </td>
                      <td className="p-4 align-middle">
                        {item.approver || 'Not approved'}
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="outline" size="sm">Rerun</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimulationHistory;
