
import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Globe, Plus } from 'lucide-react';

interface GeoRule {
  id: string;
  country: string;
  region: string;
  action: 'block' | 'allow';
  hits: number;
}

const GeoIPBlocking = () => {
  const [geoRules] = useState<GeoRule[]>([
    {
      id: '1',
      country: 'Russia',
      region: 'All',
      action: 'block',
      hits: 2450
    },
    {
      id: '2',
      country: 'China',
      region: 'All',
      action: 'block',
      hits: 3211
    }
  ]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Geo-IP Blocking</h3>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Location Rule
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Country</TableHead>
            <TableHead>Region</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Hit Count</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {geoRules.map((rule) => (
            <TableRow key={rule.id}>
              <TableCell>{rule.country}</TableCell>
              <TableCell>{rule.region}</TableCell>
              <TableCell>
                <Badge variant={rule.action === 'allow' ? 'default' : 'destructive'}>
                  {rule.action.toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell>{rule.hits.toLocaleString()}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline">Manage</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GeoIPBlocking;
