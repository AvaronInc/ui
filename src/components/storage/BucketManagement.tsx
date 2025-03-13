
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  HardDrive, 
  CloudRain, 
  Plus, 
  Server, 
  Trash2, 
  RefreshCw,
  ShieldCheck,
  Lock,
  History,
  Link,
  ExternalLink
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

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
  endpoint?: string;
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
      endpoint: 's3.amazonaws.com',
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
      endpoint: 's3.eu-central-1.amazonaws.com',
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

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
};

const BucketManagement = () => {
  const { toast } = useToast();
  const [newBucketType, setNewBucketType] = useState<'minio' | 's3'>('minio');
  const [isCreatingBucket, setIsCreatingBucket] = useState(false);
  const [isConnectingS3, setIsConnectingS3] = useState(false);

  const { data: buckets = [], isLoading, refetch } = useQuery({
    queryKey: ['storage-buckets'],
    queryFn: fetchBuckets
  });

  const handleDeployMinio = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingBucket(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsCreatingBucket(false);
      toast({
        title: "MinIO Bucket Deployed",
        description: "New MinIO bucket has been successfully deployed",
      });
      refetch();
    }, 1500);
  };

  const handleConnectS3 = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConnectingS3(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsConnectingS3(false);
      toast({
        title: "S3 Bucket Connected",
        description: "External S3 bucket has been successfully connected",
      });
      refetch();
    }, 1500);
  };

  const handleDeleteBucket = (bucketId: string, bucketName: string) => {
    // Simulate API call
    toast({
      title: "Bucket Deleted",
      description: `The bucket "${bucketName}" has been removed`,
    });
    
    // In a real app, you would refetch the data after the API call
    refetch();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Deploy MinIO Bucket
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Deploy New MinIO Bucket</DialogTitle>
              <DialogDescription>
                Create a new bucket in your MinIO storage infrastructure.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleDeployMinio}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="bucket-name">Bucket Name</Label>
                  <Input id="bucket-name" placeholder="e.g., backups-primary" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bucket-size">Storage Size (GB)</Label>
                  <Input id="bucket-size" type="number" min="1" defaultValue="100" required />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="bucket-versioning" className="flex-grow">Enable Versioning</Label>
                  <Switch id="bucket-versioning" defaultChecked />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="bucket-encryption" className="flex-grow">Enable Encryption</Label>
                  <Switch id="bucket-encryption" defaultChecked />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="bucket-immutable" className="flex-grow">Make Immutable</Label>
                  <Switch id="bucket-immutable" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isCreatingBucket}>
                  {isCreatingBucket ? 'Deploying...' : 'Deploy Bucket'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Link className="mr-2 h-4 w-4" />
              Connect S3 Bucket
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Connect External S3 Bucket</DialogTitle>
              <DialogDescription>
                Connect to an external S3-compatible storage bucket.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleConnectS3}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="s3-name">Bucket Name</Label>
                  <Input id="s3-name" placeholder="e.g., my-company-backups" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="s3-endpoint">Endpoint URL</Label>
                  <Input id="s3-endpoint" placeholder="e.g., s3.amazonaws.com" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="s3-region">Region</Label>
                  <Select defaultValue="us-east-1">
                    <SelectTrigger id="s3-region">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                      <SelectItem value="us-east-2">US East (Ohio)</SelectItem>
                      <SelectItem value="us-west-1">US West (N. California)</SelectItem>
                      <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                      <SelectItem value="eu-west-1">EU (Ireland)</SelectItem>
                      <SelectItem value="eu-central-1">EU (Frankfurt)</SelectItem>
                      <SelectItem value="ap-northeast-1">Asia Pacific (Tokyo)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="s3-access-key">Access Key</Label>
                  <Input id="s3-access-key" type="password" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="s3-secret-key">Secret Key</Label>
                  <Input id="s3-secret-key" type="password" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isConnectingS3}>
                  {isConnectingS3 ? 'Connecting...' : 'Connect Bucket'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {buckets.map(bucket => (
          <Card key={bucket.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    {bucket.provider === 'minio' ? (
                      <Server className="h-4 w-4 text-primary" />
                    ) : (
                      <CloudRain className="h-4 w-4 text-primary" />
                    )}
                    <CardTitle className="text-lg">{bucket.name}</CardTitle>
                  </div>
                  <CardDescription className="mt-1">
                    {bucket.provider === 'minio' ? 'MinIO Bucket' : 'S3 Bucket'}
                    {bucket.region && ` • ${bucket.region}`}
                  </CardDescription>
                </div>
                <Badge 
                  variant={
                    bucket.status === 'healthy' ? 'outline' : 
                    bucket.status === 'warning' ? 'secondary' : 
                    'destructive'
                  }
                  className="capitalize"
                >
                  {bucket.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="pb-2">
              <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="protection">Protection</TabsTrigger>
                  <TabsTrigger value="access">Access</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="pt-4 px-0">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Storage Usage</div>
                      <div className="text-md font-medium">
                        {formatBytes(bucket.usedSpace)} of {formatBytes(bucket.totalSpace)}
                        <span className="text-sm text-muted-foreground ml-2">
                          ({Math.round((bucket.usedSpace / bucket.totalSpace) * 100)}%)
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Objects</div>
                      <div className="text-md font-medium">
                        {bucket.objectCount.toLocaleString()}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Created</div>
                      <div className="text-md font-medium">
                        {new Date(bucket.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    
                    {bucket.lastSync && (
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Last Sync</div>
                        <div className="text-md font-medium">
                          {formatDate(bucket.lastSync)}
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="protection" className="pt-4 px-0">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                        <span>Immutable Storage</span>
                      </div>
                      <Badge variant={bucket.locked ? "default" : "outline"}>
                        {bucket.locked ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <History className="h-4 w-4 text-muted-foreground" />
                        <span>Versioning</span>
                      </div>
                      <Badge variant={bucket.versioned ? "default" : "outline"}>
                        {bucket.versioned ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                        <span>Encryption</span>
                      </div>
                      <Badge variant={bucket.encrypted ? "default" : "outline"}>
                        {bucket.encrypted ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="access" className="pt-4 px-0">
                  <div className="space-y-4">
                    {bucket.provider === 's3' && bucket.endpoint && (
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Endpoint</div>
                        <div className="text-md font-medium flex items-center gap-1">
                          {bucket.endpoint}
                          <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Access Policy</div>
                      <div className="text-md font-medium">
                        Private
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Connected Services</div>
                      <div className="text-md font-medium">
                        3 services
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            
            <CardFooter className="border-t pt-4 flex justify-between">
              <Button variant="ghost" size="sm" onClick={() => refetch()}>
                <RefreshCw className="h-4 w-4 mr-1" />
                Refresh
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-destructive hover:text-destructive"
                onClick={() => handleDeleteBucket(bucket.id, bucket.name)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BucketManagement;
