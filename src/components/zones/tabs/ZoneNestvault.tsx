
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Database, HardDrive, Clock, Shield, NetworkIcon, Eye, Share2, FileArchive } from 'lucide-react';
import { Zone } from '../types';

interface ZoneNestvaultProps {
  zone: Zone;
}

const ZoneNestvault: React.FC<ZoneNestvaultProps> = ({ zone }) => {
  const [activeTab, setActiveTab] = useState('buckets');
  
  // If storage is not enabled for this zone
  if (!zone.storageConfig?.enabled) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center">
        <Database className="h-16 w-16 text-muted-foreground mb-4 opacity-20" />
        <h3 className="text-xl font-medium">NestVault not enabled</h3>
        <p className="text-muted-foreground mb-6">Storage is not currently enabled for this zone.</p>
        <Button>Enable NestVault</Button>
      </div>
    );
  }

  const storageUsagePercent = (zone.storageConfig.used / zone.storageConfig.provisioned) * 100;
  
  // Mock buckets data
  const mockBuckets = [
    { 
      id: 'assets', 
      name: 'Assets', 
      size: 2.4, 
      objects: 1205, 
      lastAccess: '2023-10-12T08:45:22Z',
      isPublic: false,
      complianceMode: true,
      tier: 'hot' 
    },
    { 
      id: 'backups', 
      name: 'Backups', 
      size: 0.9, 
      objects: 48, 
      lastAccess: '2023-10-05T14:30:10Z',
      isPublic: false,
      complianceMode: true,
      tier: 'cold' 
    },
    { 
      id: 'documents', 
      name: 'Documents', 
      size: 0.3, 
      objects: 864, 
      lastAccess: '2023-10-14T10:15:45Z',
      isPublic: false,
      complianceMode: false,
      tier: 'hot' 
    },
    { 
      id: 'media', 
      name: 'Media', 
      size: 0.1, 
      objects: 216, 
      lastAccess: '2023-10-10T16:22:30Z',
      isPublic: true,
      complianceMode: false,
      tier: 'hot' 
    },
  ];

  // Mock access logs
  const mockAccessLogs = [
    { timestamp: '2023-10-14T15:45:22Z', user: 'alice.johnson', action: 'DOWNLOAD', object: 'documents/q3-report.pdf', vaultId: 'Yes' },
    { timestamp: '2023-10-14T14:30:15Z', user: 'bob.smith', action: 'LIST', object: 'assets/*', vaultId: 'Yes' },
    { timestamp: '2023-10-14T12:15:33Z', user: 'john.doe', action: 'UPLOAD', object: 'media/product-video.mp4', vaultId: 'No' },
    { timestamp: '2023-10-14T10:05:41Z', user: 'alice.johnson', action: 'VIEW', object: 'documents/security-policy.docx', vaultId: 'Yes' },
    { timestamp: '2023-10-14T09:22:18Z', user: 'sarah.parker', action: 'DELETE', object: 'backups/temp-backup-10-13.zip', vaultId: 'Yes' },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatSize = (sizeInTB: number) => {
    if (sizeInTB < 0.001) {
      return `${Math.round(sizeInTB * 1000000)} KB`;
    } else if (sizeInTB < 0.1) {
      return `${Math.round(sizeInTB * 1000)} MB`;
    } else if (sizeInTB < 1) {
      return `${Math.round(sizeInTB * 1000)} GB`;
    }
    return `${sizeInTB.toFixed(1)} TB`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-grow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Database className="h-5 w-5 mr-2 text-indigo-500" />
              NestVault Storage
            </CardTitle>
            <CardDescription>
              Isolated storage for {zone.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Usage</div>
                <div className="text-lg font-semibold">
                  {formatSize(zone.storageConfig.used)} / {formatSize(zone.storageConfig.provisioned)}
                </div>
                <Progress 
                  value={storageUsagePercent} 
                  className={`h-2 ${storageUsagePercent > 80 ? 'bg-red-200' : 'bg-secondary'}`}
                />
                <div className="text-xs text-muted-foreground">
                  {storageUsagePercent.toFixed(1)}% used
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Tier</div>
                <div className="text-lg font-semibold flex items-center">
                  <HardDrive className="h-4 w-4 mr-1 text-blue-500" />
                  {zone.storageConfig.tier === 'hot' && 'Hot Storage'}
                  {zone.storageConfig.tier === 'cold' && 'Cold Storage'}
                  {zone.storageConfig.tier === 'archived' && 'Archive Storage'}
                </div>
                <div className="text-xs text-muted-foreground">
                  {zone.storageConfig.tier === 'hot' && 'Immediate access, higher cost'}
                  {zone.storageConfig.tier === 'cold' && 'Delayed access, lower cost'}
                  {zone.storageConfig.tier === 'archived' && 'Scheduled retrieval, lowest cost'}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Configuration</div>
                <div className="flex flex-col space-y-1">
                  <div className="text-xs flex items-center">
                    <Shield className="h-3 w-3 mr-1 text-green-500" />
                    {zone.storageConfig.erasureCoding ? 'Erasure Coding: On (4+2)' : 'Erasure Coding: Off'}
                  </div>
                  <div className="text-xs flex items-center">
                    <Eye className="h-3 w-3 mr-1 text-blue-500" />
                    {zone.storageConfig.publicBucketsAllowed ? 'Public Buckets: Allowed' : 'Public Buckets: Restricted'}
                  </div>
                  <div className="text-xs flex items-center">
                    <Clock className="h-3 w-3 mr-1 text-amber-500" />
                    {zone.storageConfig.customRetention ? 'Custom Retention: Enabled' : 'Tenant Default Retention'}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:w-[300px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" variant="outline">
              <Database className="h-4 w-4 mr-2" /> Create New Bucket
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Shield className="h-4 w-4 mr-2" /> Access Controls
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <FileArchive className="h-4 w-4 mr-2" /> Configure Archiving
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Share2 className="h-4 w-4 mr-2" /> External Sharing
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
          <TabsTrigger value="buckets">Buckets</TabsTrigger>
          <TabsTrigger value="dashboard">Usage Dashboard</TabsTrigger>
          <TabsTrigger value="access">Access Logs</TabsTrigger>
          <TabsTrigger value="settings">Storage Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="buckets" className="space-y-4">
          <div className="flex justify-between items-center">
            <Input placeholder="Search buckets..." className="max-w-xs" />
            <Button>+ New Bucket</Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bucket Name</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Objects</TableHead>
                  <TableHead>Last Access</TableHead>
                  <TableHead>Storage Tier</TableHead>
                  <TableHead>Accessibility</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockBuckets.map((bucket) => (
                  <TableRow key={bucket.id}>
                    <TableCell className="font-medium">{bucket.name}</TableCell>
                    <TableCell>{formatSize(bucket.size)}</TableCell>
                    <TableCell>{bucket.objects.toLocaleString()}</TableCell>
                    <TableCell>{formatDate(bucket.lastAccess)}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center">
                        {bucket.tier === 'hot' && <HardDrive className="h-3 w-3 mr-1 text-blue-500" />}
                        {bucket.tier === 'cold' && <HardDrive className="h-3 w-3 mr-1 text-indigo-500" />}
                        {bucket.tier === 'archived' && <FileArchive className="h-3 w-3 mr-1 text-slate-500" />}
                        {bucket.tier.charAt(0).toUpperCase() + bucket.tier.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {bucket.isPublic ? (
                        <span className="text-amber-500 flex items-center">
                          <Eye className="h-3 w-3 mr-1" /> Public
                        </span>
                      ) : (
                        <span className="text-green-500 flex items-center">
                          <Shield className="h-3 w-3 mr-1" /> Private
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">Browse</Button>
                        <Button variant="ghost" size="sm">Settings</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Real-time I/O</CardTitle>
              </CardHeader>
              <CardContent className="h-[200px] flex items-center justify-center">
                <div className="text-muted-foreground">I/O metrics graph would appear here</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Bandwidth Usage</CardTitle>
              </CardHeader>
              <CardContent className="h-[200px] flex items-center justify-center">
                <div className="text-muted-foreground">Bandwidth usage graph would appear here</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Object Count</CardTitle>
              </CardHeader>
              <CardContent className="h-[200px] flex items-center justify-center">
                <div className="text-muted-foreground">Object count growth would appear here</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Delta Sync Status</CardTitle>
              </CardHeader>
              <CardContent className="h-[200px] flex items-center justify-center">
                <div className="text-muted-foreground">Delta sync metrics would appear here</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="access" className="space-y-4">
          <div className="flex justify-between items-center">
            <Input placeholder="Search access logs..." className="max-w-xs" />
            <div className="flex space-x-2">
              <Select defaultValue="today">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="week">Last 7 days</SelectItem>
                  <SelectItem value="month">Last 30 days</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">Export</Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Object</TableHead>
                  <TableHead>VaultID Used</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAccessLogs.map((log, index) => (
                  <TableRow key={index}>
                    <TableCell>{formatDate(log.timestamp)}</TableCell>
                    <TableCell className="font-medium">{log.user}</TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell className="font-mono text-xs">{log.object}</TableCell>
                    <TableCell>
                      {log.vaultId === 'Yes' ? (
                        <span className="text-green-500">Yes</span>
                      ) : (
                        <span className="text-muted-foreground">No</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Storage Configuration</CardTitle>
              <CardDescription>
                Modify storage settings for this zone
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="storage-tier">Storage Tier</Label>
                    <Select defaultValue={zone.storageConfig.tier}>
                      <SelectTrigger id="storage-tier">
                        <SelectValue placeholder="Select storage tier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hot">Hot (immediate access, higher cost)</SelectItem>
                        <SelectItem value="cold">Cold (delayed access, lower cost)</SelectItem>
                        <SelectItem value="archived">Archived (scheduled retrieval, lowest cost)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="storage-quota">Storage Quota</Label>
                    <div className="flex items-center space-x-2">
                      <Input id="storage-quota" type="number" defaultValue={zone.storageConfig.provisioned} />
                      <span className="text-muted-foreground">TB</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="erasure-coding" className="block mb-1">Erasure Coding (4+2)</Label>
                      <span className="text-xs text-muted-foreground">Provides greater data resilience</span>
                    </div>
                    <Switch id="erasure-coding" defaultChecked={zone.storageConfig.erasureCoding} />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="retention-period">Default Retention Period</Label>
                    <Select defaultValue="90">
                      <SelectTrigger id="retention-period">
                        <SelectValue placeholder="Select retention period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                        <SelectItem value="forever">Indefinite</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="public-buckets" className="block mb-1">Allow Public Buckets</Label>
                      <span className="text-xs text-muted-foreground">Enables creation of public-facing storage</span>
                    </div>
                    <Switch id="public-buckets" defaultChecked={zone.storageConfig.publicBucketsAllowed} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="bucket-sharing" className="block mb-1">Cross-Zone Bucket Sharing</Label>
                      <span className="text-xs text-muted-foreground">Allow accessing buckets from other zones</span>
                    </div>
                    <Switch id="bucket-sharing" />
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4 flex justify-end space-x-2">
                <Button variant="outline">Reset to Defaults</Button>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Compliance Settings</CardTitle>
              <CardDescription>
                Configure compliance-related storage settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="worm-retention" className="block mb-1">WORM (Write Once Read Many)</Label>
                      <span className="text-xs text-muted-foreground">Objects cannot be modified after creation</span>
                    </div>
                    <Switch id="worm-retention" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="legal-hold" className="block mb-1">Legal Hold Support</Label>
                      <span className="text-xs text-muted-foreground">Prevents deletion during litigation</span>
                    </div>
                    <Switch id="legal-hold" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="audit-logging" className="block mb-1">Extended Audit Logging</Label>
                      <span className="text-xs text-muted-foreground">Track all object access and changes</span>
                    </div>
                    <Switch id="audit-logging" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="encryption" className="block mb-1">End-to-End Encryption</Label>
                      <span className="text-xs text-muted-foreground">All data encrypted at rest and in transit</span>
                    </div>
                    <Switch id="encryption" defaultChecked />
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4 flex justify-end space-x-2">
                <Button variant="outline">Reset to Defaults</Button>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ZoneNestvault;
