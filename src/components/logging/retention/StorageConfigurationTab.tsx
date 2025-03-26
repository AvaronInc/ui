
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Edit, Plus, HardDrive, Cloud, ArrowUpDown, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

// Local Storage Drives
interface Drive {
  id: string;
  name: string;
  path: string;
  capacity: string;
  used: number;
  status: 'healthy' | 'warning' | 'error';
}

// Cloud Storage Providers
interface CloudProvider {
  id: string;
  name: string;
  type: string;
  bucket: string;
  usage: string;
  usedPercent: number;
  syncFrequency: string;
  lastSync: string;
  status: 'synced' | 'syncing' | 'error';
}

// Tiering Rules
interface TieringRule {
  id: string;
  name: string;
  condition: string;
  action: string;
  status: 'active' | 'inactive';
}

const sampleDrives: Drive[] = [
  { id: '1', name: 'Primary SSD Array', path: '/var/log/avaron', capacity: '2 TB', used: 68, status: 'healthy' },
  { id: '2', name: 'Secondary Storage', path: '/mnt/storage/logs', capacity: '8 TB', used: 45, status: 'healthy' },
  { id: '3', name: 'Archive Volume', path: '/mnt/archive', capacity: '20 TB', used: 30, status: 'warning' },
];

const sampleCloudProviders: CloudProvider[] = [
  { 
    id: '1', 
    name: 'Wasabi Hot Cloud', 
    type: 'Wasabi', 
    bucket: 'avaron-logs-primary',
    usage: '8.2 TB / 50 TB', 
    usedPercent: 16, 
    syncFrequency: 'Hourly',
    lastSync: '2023-11-28 14:30',
    status: 'synced'
  },
  { 
    id: '2', 
    name: 'AWS Glacier Archive', 
    type: 'AWS S3', 
    bucket: 'avaron-archive-compliance',
    usage: '15.7 TB / 100 TB', 
    usedPercent: 15, 
    syncFrequency: 'Daily',
    lastSync: '2023-11-27 23:00',
    status: 'synced'
  },
  { 
    id: '3', 
    name: 'Azure Blob Cold Tier', 
    type: 'Azure Blob', 
    bucket: 'avaron-cold-storage',
    usage: '4.3 TB / 20 TB', 
    usedPercent: 21, 
    syncFrequency: 'Weekly',
    lastSync: '2023-11-26 01:00',
    status: 'error'
  },
];

const sampleTieringRules: TieringRule[] = [
  { 
    id: '1', 
    name: 'Wazuh Archival', 
    condition: 'Wazuh logs > 90 days', 
    action: 'Move to Azure Blob Cold Tier', 
    status: 'active' 
  },
  { 
    id: '2', 
    name: 'Large PCAP Archive', 
    condition: 'Arkime PCAP > 100GB', 
    action: 'Move to Wasabi Hot Cloud', 
    status: 'active' 
  },
  { 
    id: '3', 
    name: 'Compliance Archive', 
    condition: 'Any logs with HIPAA/PCI tags > 1 year', 
    action: 'Copy to AWS Glacier & retain', 
    status: 'active' 
  },
];

const StorageConfigurationTab: React.FC = () => {
  const [drives, setDrives] = useState<Drive[]>(sampleDrives);
  const [cloudProviders, setCloudProviders] = useState<CloudProvider[]>(sampleCloudProviders);
  const [tieringRules, setTieringRules] = useState<TieringRule[]>(sampleTieringRules);
  const [erasureCodingEnabled, setErasureCodingEnabled] = useState(true);

  const handleAddDrive = () => {
    toast.success('Drive configuration dialog would open here');
  };

  const handleAddCloudProvider = () => {
    toast.success('Cloud provider configuration dialog would open here');
  };

  const handleAddTieringRule = () => {
    toast.success('Tiering rule configuration dialog would open here');
  };

  return (
    <div className="space-y-6">
      {/* Local Storage Section */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center gap-2">
              <HardDrive className="h-5 w-5" />
              Local Storage Volumes
            </CardTitle>
            <Button size="sm" variant="outline" onClick={handleAddDrive} className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Add Drive
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Volume Name</TableHead>
                <TableHead>Path</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drives.map((drive) => (
                <TableRow key={drive.id}>
                  <TableCell className="font-medium">{drive.name}</TableCell>
                  <TableCell className="font-mono text-xs">{drive.path}</TableCell>
                  <TableCell>{drive.capacity}</TableCell>
                  <TableCell>
                    <div className="w-full max-w-[150px]">
                      <div className="flex justify-between text-xs mb-1">
                        <span>{drive.used}%</span>
                      </div>
                      <Progress value={drive.used} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>
                    {drive.status === 'healthy' && (
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                        Healthy
                      </Badge>
                    )}
                    {drive.status === 'warning' && (
                      <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                        Warning
                      </Badge>
                    )}
                    {drive.status === 'error' && (
                      <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
                        Error
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Cloud Storage Section */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center gap-2">
              <Cloud className="h-5 w-5" />
              Cloud Storage Providers
            </CardTitle>
            <Button size="sm" variant="outline" onClick={handleAddCloudProvider} className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Link Provider
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Provider</TableHead>
                <TableHead>Bucket</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Sync Frequency</TableHead>
                <TableHead>Last Sync</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cloudProviders.map((provider) => (
                <TableRow key={provider.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{provider.name}</div>
                      <div className="text-xs text-muted-foreground">{provider.type}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{provider.bucket}</TableCell>
                  <TableCell>
                    <div className="w-full max-w-[150px]">
                      <div className="flex justify-between text-xs mb-1">
                        <span>{provider.usage}</span>
                      </div>
                      <Progress value={provider.usedPercent} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>{provider.syncFrequency}</TableCell>
                  <TableCell className="text-xs">{provider.lastSync}</TableCell>
                  <TableCell>
                    {provider.status === 'synced' && (
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Synced
                      </Badge>
                    )}
                    {provider.status === 'syncing' && (
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                        Syncing
                      </Badge>
                    )}
                    {provider.status === 'error' && (
                      <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Error
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Erasure Coding Settings */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Erasure Coding Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Enable Erasure Coding</h4>
              <p className="text-sm text-muted-foreground">
                Provides data redundancy and protection against drive failures
              </p>
            </div>
            <Switch 
              checked={erasureCodingEnabled} 
              onCheckedChange={setErasureCodingEnabled} 
            />
          </div>
          
          {erasureCodingEnabled && (
            <div className="bg-muted p-4 rounded-md space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Redundancy Level</span>
                <Badge variant="outline">4+2 (Default)</Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Applied to Buckets</span>
                <span className="text-sm font-medium">3 of 3</span>
              </div>
              
              <div>
                <Button variant="outline" size="sm">
                  <Edit className="h-3.5 w-3.5 mr-1" />
                  Configure
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Storage Tiering Rules */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center gap-2">
              <ArrowUpDown className="h-5 w-5" />
              Storage Tiering Rules
            </CardTitle>
            <Button size="sm" variant="outline" onClick={handleAddTieringRule} className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Add Rule
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rule Name</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Action</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tieringRules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="font-medium">{rule.name}</TableCell>
                  <TableCell>{rule.condition}</TableCell>
                  <TableCell>{rule.action}</TableCell>
                  <TableCell className="text-right">
                    <Badge 
                      variant="outline" 
                      className={rule.status === 'active' 
                        ? "bg-green-500/10 text-green-500 border-green-500/20" 
                        : "bg-gray-500/10 text-gray-500 border-gray-500/20"
                      }
                    >
                      {rule.status === 'active' ? 'Active' : 'Inactive'}
                    </Badge>
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

export default StorageConfigurationTab;
