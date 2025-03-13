
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import StatusCard from '@/components/dashboard/StatusCard';
import { HardDrive, CloudRain, Database, Server } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface StorageBucket {
  id: string;
  name: string;
  provider: 'minio' | 's3' | 'other';
  status: 'healthy' | 'warning' | 'critical' | 'unknown';
  region?: string;
  createdAt: string;
  totalSpace: number;
  usedSpace: number;
  objectCount: number;
  locked: boolean;
  versioned: boolean;
  encrypted: boolean;
  lastSync?: string;
}

// Mock data - replace with actual API call
const fetchBuckets = async (): Promise<StorageBucket[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: '1',
      name: 'backup-primary',
      provider: 'minio',
      status: 'healthy',
      createdAt: '2023-01-15T08:30:00',
      totalSpace: 1024 * 1024 * 1024 * 500, // 500 GB
      usedSpace: 1024 * 1024 * 1024 * 125, // 125 GB
      objectCount: 23451,
      locked: true,
      versioned: true,
      encrypted: true,
      lastSync: '2023-09-01T14:23:15'
    },
    {
      id: '2',
      name: 'documents-archive',
      provider: 'minio',
      status: 'healthy',
      createdAt: '2023-02-20T10:15:00',
      totalSpace: 1024 * 1024 * 1024 * 1000, // 1 TB
      usedSpace: 1024 * 1024 * 1024 * 750, // 750 GB
      objectCount: 562144,
      locked: true,
      versioned: true,
      encrypted: true,
      lastSync: '2023-09-01T16:45:33'
    },
    {
      id: '3',
      name: 'app-data',
      provider: 'minio',
      status: 'warning',
      createdAt: '2023-03-10T12:45:00',
      totalSpace: 1024 * 1024 * 1024 * 250, // 250 GB
      usedSpace: 1024 * 1024 * 1024 * 200, // 200 GB (80% full - warning)
      objectCount: 92500,
      locked: false,
      versioned: true,
      encrypted: true,
      lastSync: '2023-09-01T12:10:45'
    },
    {
      id: '4',
      name: 'backup-archive',
      provider: 's3',
      region: 'us-east-1',
      status: 'healthy',
      createdAt: '2023-04-05T09:20:00',
      totalSpace: 1024 * 1024 * 1024 * 1024 * 5, // 5 TB
      usedSpace: 1024 * 1024 * 1024 * 1024 * 2, // 2 TB
      objectCount: 1250000,
      locked: true,
      versioned: true,
      encrypted: true,
      lastSync: '2023-09-01T18:30:22'
    },
    {
      id: '5',
      name: 'user-uploads',
      provider: 's3',
      region: 'eu-central-1',
      status: 'critical',
      createdAt: '2023-05-15T15:10:00',
      totalSpace: 1024 * 1024 * 1024 * 500, // 500 GB
      usedSpace: 1024 * 1024 * 1024 * 490, // 490 GB (98% full - critical)
      objectCount: 835621,
      locked: false,
      versioned: false,
      encrypted: true,
      lastSync: '2023-09-01T20:15:10'
    }
  ];
};

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const BucketStatistics = () => {
  const { data: buckets = [], isLoading } = useQuery({
    queryKey: ['storage-buckets'],
    queryFn: fetchBuckets
  });

  const minIOBuckets = buckets.filter(bucket => bucket.provider === 'minio');
  const s3Buckets = buckets.filter(bucket => bucket.provider === 's3');
  
  const totalStorage = buckets.reduce((acc, bucket) => acc + bucket.totalSpace, 0);
  const usedStorage = buckets.reduce((acc, bucket) => acc + bucket.usedSpace, 0);
  const usagePercent = totalStorage > 0 ? Math.round((usedStorage / totalStorage) * 100) : 0;
  
  const totalObjects = buckets.reduce((acc, bucket) => acc + bucket.objectCount, 0);
  
  // Count buckets by status
  const bucketStatusCount = buckets.reduce((acc, bucket) => {
    acc[bucket.status] = (acc[bucket.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatusCard 
          title="Total Storage"
          status={usagePercent > 90 ? 'critical' : usagePercent > 75 ? 'warning' : 'healthy'}
          description={`${formatBytes(usedStorage)} of ${formatBytes(totalStorage)} used (${usagePercent}%)`}
        />
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">MinIO Buckets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2.5">
              <Database className="h-4 w-4 text-primary" />
              <span className="text-2xl font-semibold">{minIOBuckets.length}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Deployed across network
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">S3 Buckets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2.5">
              <CloudRain className="h-4 w-4 text-primary" />
              <span className="text-2xl font-semibold">{s3Buckets.length}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Connected external storage
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Total Objects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2.5">
              <HardDrive className="h-4 w-4 text-primary" />
              <span className="text-2xl font-semibold">
                {totalObjects.toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Files across all storage
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Storage Systems Overview</CardTitle>
          <CardDescription>
            Status and usage statistics for all storage buckets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bucket Name</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Storage Usage</TableHead>
                <TableHead>Objects</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Protection</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {buckets.map(bucket => (
                <TableRow key={bucket.id}>
                  <TableCell className="font-medium">{bucket.name}</TableCell>
                  <TableCell>
                    {bucket.provider === 'minio' ? (
                      <div className="flex items-center gap-1">
                        <Server className="h-3.5 w-3.5" />
                        <span>MinIO</span>
                      </div>
                    ) : bucket.provider === 's3' ? (
                      <div className="flex items-center gap-1">
                        <CloudRain className="h-3.5 w-3.5" />
                        <span>S3</span>
                      </div>
                    ) : (
                      bucket.provider
                    )}
                  </TableCell>
                  <TableCell>{bucket.region || 'Local'}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>{formatBytes(bucket.usedSpace)}</span>
                        <span>{formatBytes(bucket.totalSpace)}</span>
                      </div>
                      <Progress value={(bucket.usedSpace / bucket.totalSpace) * 100} 
                        className={
                          bucket.usedSpace / bucket.totalSpace > 0.9 ? "text-destructive" : 
                          bucket.usedSpace / bucket.totalSpace > 0.75 ? "text-warning" : 
                          "text-primary"
                        }
                      />
                    </div>
                  </TableCell>
                  <TableCell>{bucket.objectCount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        bucket.status === 'healthy' ? 'outline' : 
                        bucket.status === 'warning' ? 'secondary' : 
                        'destructive'
                      }
                    >
                      {bucket.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {bucket.versioned && 
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          versioned
                        </Badge>
                      }
                      {bucket.encrypted && 
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          encrypted
                        </Badge>
                      }
                      {bucket.locked && 
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          locked
                        </Badge>
                      }
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BucketStatistics;
