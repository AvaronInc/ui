
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { TrendingUp, Database, ArrowUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const buckets = [
  { id: 1, name: 'client-uploads', growth: 42.3, size: '1.3 TB', changePercent: 8.2 },
  { id: 2, name: 'security-logs', growth: 28.7, size: '850 GB', changePercent: 15.4 },
  { id: 3, name: 'ml-models', growth: 21.5, size: '2.1 TB', changePercent: 5.8 },
  { id: 4, name: 'analytics-data', growth: 18.2, size: '740 GB', changePercent: 7.3 },
  { id: 5, name: 'backup-archives', growth: 15.6, size: '3.6 TB', changePercent: 3.2 },
];

const TopBucketsByGrowth = () => {
  return (
    <div className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium flex items-center justify-between">
          <div className="flex items-center">
            <span>Top Buckets by Growth</span>
            <Badge variant="outline" className="ml-2 text-xs">7 days</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bucket</TableHead>
              <TableHead className="text-right">Growth</TableHead>
              <TableHead className="text-right">Size</TableHead>
              <TableHead className="text-right">Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {buckets.map(bucket => (
              <TableRow key={bucket.id}>
                <TableCell className="flex items-center py-2">
                  <Database className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  <span className="text-xs">{bucket.name}</span>
                </TableCell>
                <TableCell className="text-right text-xs font-medium">{bucket.growth} GB</TableCell>
                <TableCell className="text-right text-xs text-muted-foreground">{bucket.size}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end text-xs text-emerald-500">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    {bucket.changePercent}%
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </div>
  );
};

export default TopBucketsByGrowth;
