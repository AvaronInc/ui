
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const DNSFirewallTab: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">DNS Firewall Rules</h3>
            <p className="text-sm text-muted-foreground">Configure custom rules to prevent DNS-based attacks and data exfiltration</p>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rule Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Pattern</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Block Long DNS Queries</TableCell>
                  <TableCell>Query Length</TableCell>
                  <TableCell>&gt; 200 characters</TableCell>
                  <TableCell>Block</TableCell>
                  <TableCell>
                    <Switch checked={true} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Rate Limit DNS Queries</TableCell>
                  <TableCell>Query Rate</TableCell>
                  <TableCell>&gt; 100/min per IP</TableCell>
                  <TableCell>Rate Limit</TableCell>
                  <TableCell>
                    <Switch checked={true} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Block Non-Standard Ports</TableCell>
                  <TableCell>Port</TableCell>
                  <TableCell>!= 53</TableCell>
                  <TableCell>Block</TableCell>
                  <TableCell>
                    <Switch checked={true} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <Button className="w-full">
            Add New Rule
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DNSFirewallTab;
