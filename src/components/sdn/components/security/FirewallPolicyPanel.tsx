import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Shield, Plus, Edit, Trash2, Copy, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

const FirewallPolicyPanel: React.FC = () => {
  const { toast } = useToast();
  const [selectedSegment, setSelectedSegment] = useState('all');
  
  const firewallRules = [
    { 
      id: 1, 
      name: "Block SSH from External", 
      segment: "External", 
      source: "Any", 
      destination: "All Internal",
      port: "22",
      protocol: "TCP",
      action: "block",
      hitCount: 48
    },
    { 
      id: 2, 
      name: "Allow Web Traffic", 
      segment: "DMZ", 
      source: "Any", 
      destination: "Web Servers",
      port: "80,443",
      protocol: "TCP",
      action: "allow",
      hitCount: 12584
    },
    { 
      id: 3, 
      name: "Restrict Database Access", 
      segment: "Internal", 
      source: "Web Tier", 
      destination: "Database Tier",
      port: "3306",
      protocol: "TCP",
      action: "allow",
      hitCount: 5621
    },
    { 
      id: 4, 
      name: "Block Outbound FTP", 
      segment: "All", 
      source: "Any Internal", 
      destination: "Any External",
      port: "21",
      protocol: "TCP",
      action: "block",
      hitCount: 17
    }
  ];
  
  const networkSegments = [
    { id: 'all', name: 'All Segments' },
    { id: 'external', name: 'External' },
    { id: 'dmz', name: 'DMZ' },
    { id: 'internal', name: 'Internal' },
    { id: 'database', name: 'Database' }
  ];
  
  const getActionBadge = (action: string) => {
    switch (action) {
      case 'allow':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Allow</Badge>;
      case 'block':
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">Block</Badge>;
      default:
        return <Badge variant="outline">{action}</Badge>;
    }
  };

  const handleAddRule = () => {
    toast({
      title: "Add Rule",
      description: "New rule creation dialog would appear here"
    });
  };

  const handleDeleteRule = (ruleId: number) => {
    toast({
      title: "Rule Deleted",
      description: `Rule ID ${ruleId} would be deleted here`
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Firewall Policy Card */}
        <Card className="md:col-span-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Firewall Policy Management
            </CardTitle>
            <CardDescription>
              Configure per-segment firewall rules and apply traffic policies at the SDN layer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="font-medium">Network Segment:</span>
                <Select value={selectedSegment} onValueChange={setSelectedSegment}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select segment" />
                  </SelectTrigger>
                  <SelectContent>
                    {networkSegments.map(segment => (
                      <SelectItem key={segment.id} value={segment.id}>
                        {segment.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <Button onClick={handleAddRule}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Rule
                </Button>
                <Button variant="outline">Import Rules</Button>
              </div>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rule Name</TableHead>
                  <TableHead>Segment</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Port/Protocol</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Hit Count</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {firewallRules.map(rule => (
                  <TableRow key={rule.id}>
                    <TableCell>{rule.name}</TableCell>
                    <TableCell>{rule.segment}</TableCell>
                    <TableCell>{rule.source}</TableCell>
                    <TableCell>{rule.destination}</TableCell>
                    <TableCell>{rule.port}/{rule.protocol}</TableCell>
                    <TableCell>{getActionBadge(rule.action)}</TableCell>
                    <TableCell>{rule.hitCount.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteRule(rule.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Policy Summary Card */}
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Policy Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-3">
                <div className="text-sm font-medium mb-1">Total Rules</div>
                <div className="text-2xl font-bold">24</div>
                <div className="text-xs text-muted-foreground mt-1">Across all segments</div>
              </div>
              
              <div className="border rounded-lg p-3">
                <div className="text-sm font-medium mb-1">Allow Rules</div>
                <div className="text-2xl font-bold">15</div>
                <div className="text-xs text-muted-foreground mt-1">62% of total</div>
              </div>
              
              <div className="border rounded-lg p-3">
                <div className="text-sm font-medium mb-1">Block Rules</div>
                <div className="text-2xl font-bold">9</div>
                <div className="text-xs text-muted-foreground mt-1">38% of total</div>
              </div>
              
              <div className="border rounded-lg p-3">
                <div className="text-sm font-medium mb-1">Policy Conflicts</div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <span className="text-xl font-bold">2</span>
                </div>
              </div>
            </div>
            
            <Card className="border border-amber-200 dark:border-amber-800">
              <CardHeader className="py-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  Configuration Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent className="py-2 px-4 text-sm space-y-2">
                <div className="border-b pb-2">
                  <p className="font-medium">Rule Conflict Detected</p>
                  <p className="text-xs text-muted-foreground">
                    Rules #3 and #7 have conflicting policies for database access.
                  </p>
                </div>
                <div>
                  <p className="font-medium">Unused Rule Detected</p>
                  <p className="text-xs text-muted-foreground">
                    Rule "Legacy API Access" has 0 hits in the last 90 days.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Button variant="outline" className="w-full">
              Export Firewall Configuration
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FirewallPolicyPanel;
