
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle } from 'lucide-react';

const FailoverRulesCard = () => {
  return (
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
  );
};

export default FailoverRulesCard;
