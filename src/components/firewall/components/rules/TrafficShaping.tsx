
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Sliders } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

const TrafficShaping = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sliders className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Traffic Shaping & QoS</h3>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add QoS Rule
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">QoS Policies</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Bandwidth Limit</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>VoIP Traffic</TableCell>
                  <TableCell>
                    <Badge variant="default">High</Badge>
                  </TableCell>
                  <TableCell>10 Mbps</TableCell>
                  <TableCell>
                    <Badge>Active</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>HTTP/HTTPS</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Medium</Badge>
                  </TableCell>
                  <TableCell>50 Mbps</TableCell>
                  <TableCell>
                    <Badge>Active</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>File Sharing</TableCell>
                  <TableCell>
                    <Badge variant="outline">Low</Badge>
                  </TableCell>
                  <TableCell>5 Mbps</TableCell>
                  <TableCell>
                    <Badge>Active</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrafficShaping;
