
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Server, 
  CloudRain, 
  RefreshCw,
  Trash2,
  Lock,
  History,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { StorageBucket } from './types';
import { formatBytes, formatDate } from './utils';

interface BucketCardProps {
  bucket: StorageBucket;
  onDeleteClick: (bucket: StorageBucket) => void;
  onRefresh: () => void;
}

const BucketCard: React.FC<BucketCardProps> = ({ 
  bucket, 
  onDeleteClick,
  onRefresh
}) => {
  return (
    <Card className="overflow-hidden">
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
        <Button variant="ghost" size="sm" onClick={onRefresh}>
          <RefreshCw className="h-4 w-4 mr-1" />
          Refresh
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-destructive hover:text-destructive"
          onClick={() => onDeleteClick(bucket)}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BucketCard;
