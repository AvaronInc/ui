
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ZoneStatusBadge } from '../ZonesPanel';
import { 
  Brain, 
  Shield, 
  Network, 
  Server, 
  Fingerprint, 
  Table as TableIcon, 
  Grid2X2,
  Database,
  HardDrive
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Zone, ServiceType, StorageStatus, StorageTier } from '../types';

interface ZonesOverviewProps {
  zones: Zone[];
  onZoneClick: (zone: Zone) => void;
}

const ZonesOverview: React.FC<ZonesOverviewProps> = ({ zones, onZoneClick }) => {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const serviceIcons: Record<ServiceType, React.ReactNode> = {
    sdwan: <Network className="h-4 w-4 text-blue-500" />,
    identity: <Fingerprint className="h-4 w-4 text-purple-500" />,
    vault: <Shield className="h-4 w-4 text-green-500" />,
    ai: <Brain className="h-4 w-4 text-amber-500" />,
    rmm: <Server className="h-4 w-4 text-cyan-500" />,
    mixtral: <Brain className="h-4 w-4 text-pink-500" />,
    vertexvault: <Database className="h-4 w-4 text-indigo-500" />
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const getStorageStatusColor = (status: StorageStatus) => {
    switch (status) {
      case 'normal': return 'bg-green-500';
      case 'near-limit': return 'bg-yellow-500';
      case 'warning': return 'bg-orange-500';
      case 'unavailable': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStorageTierLabel = (tier: StorageTier) => {
    switch (tier) {
      case 'hot': return 'Hot';
      case 'cold': return 'Cold';
      case 'archived': return 'Archived';
      default: return 'N/A';
    }
  };

  const formatStorage = (tb: number) => {
    return tb < 1 ? `${(tb * 1000).toFixed(0)} GB` : `${tb.toFixed(1)} TB`;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('table')}
          >
            <TableIcon className="h-4 w-4 mr-1" />
            Table
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid2X2 className="h-4 w-4 mr-1" />
            Grid
          </Button>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary">
              + Create Zone
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Create New Zone</DialogTitle>
              <DialogDescription>
                Define a new isolated virtual compartment for your tenant environment.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Zone Name</Label>
                  <Input id="name" placeholder="e.g. Marketing Zone" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe the purpose of this zone"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Enabled Services</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(serviceIcons).map(([service, icon]) => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox id={service} />
                        <Label htmlFor={service} className="flex items-center cursor-pointer">
                          {icon}
                          <span className="ml-2 capitalize">
                            {service === 'vertexvault' ? 'Storage (VertexVault)' : service}
                          </span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role-assignment">RBAC Role Assignment</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select roles to assign" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="global-admin">Global Admin</SelectItem>
                      <SelectItem value="hr-admin">HR Admin</SelectItem>
                      <SelectItem value="finance-admin">Finance Admin</SelectItem>
                      <SelectItem value="devops-admin">DevOps Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="vault-id">VaultID Required for Admin Access</Label>
                  <Switch id="vault-id" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="isolation">Service Isolation Level</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select isolation level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal (shared core services)</SelectItem>
                      <SelectItem value="high">High (dedicated service containers)</SelectItem>
                      <SelectItem value="airgapped">Air-Gapped (no inter-zone comms)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Resource Limits (Optional)</Label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Label htmlFor="cpu" className="w-20">CPU:</Label>
                      <Input id="cpu" type="number" placeholder="% Soft Cap" className="w-full" />
                    </div>
                    <div className="flex items-center">
                      <Label htmlFor="ram" className="w-20">RAM:</Label>
                      <Input id="ram" type="number" placeholder="GB Limit" className="w-full" />
                    </div>
                    <div className="flex items-center">
                      <Label htmlFor="storage" className="w-20">Storage:</Label>
                      <Input id="storage" type="number" placeholder="GB Limit" className="w-full" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="compliance">Compliance Tags</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Add compliance tags" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hipaa">HIPAA</SelectItem>
                      <SelectItem value="pci">PCI-DSS</SelectItem>
                      <SelectItem value="gdpr">GDPR</SelectItem>
                      <SelectItem value="sox">SOX</SelectItem>
                      <SelectItem value="internal">Internal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4 col-span-2 border-t pt-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <Label htmlFor="enable-storage" className="text-md font-semibold flex items-center">
                      <Database className="h-4 w-4 mr-2 text-indigo-500" />
                      VertexVault Storage Configuration
                    </Label>
                    <p className="text-sm text-muted-foreground">Enable dedicated storage isolation for this zone</p>
                  </div>
                  <Switch id="enable-storage" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="provisioned-space">Provisioned Space</Label>
                      <div className="flex items-center space-x-2">
                        <Input id="provisioned-space" type="number" defaultValue="10" className="flex-grow" />
                        <span className="text-sm text-muted-foreground w-8">TB</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="storage-tier">Storage Tier Default</Label>
                      <Select defaultValue="hot">
                        <SelectTrigger id="storage-tier" className="w-full">
                          <SelectValue placeholder="Select storage tier" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hot">Hot (immediate access)</SelectItem>
                          <SelectItem value="cold">Cold (delayed access)</SelectItem>
                          <SelectItem value="archived">Archived (scheduled retrieval)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="erasure-coding">Erasure Coding (4+2)</Label>
                      <Switch id="erasure-coding" defaultChecked />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="retention-policy">Retention Policy</Label>
                      <Select defaultValue="inherit">
                        <SelectTrigger id="retention-policy" className="w-full">
                          <SelectValue placeholder="Select retention policy" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inherit">Inherit from tenant</SelectItem>
                          <SelectItem value="custom">Customize for this zone</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="allowed-accessors">Allowed Accessors</Label>
                      <Select>
                        <SelectTrigger id="allowed-accessors" className="w-full">
                          <SelectValue placeholder="Select users/groups with access" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="zone-admins">Zone Administrators</SelectItem>
                          <SelectItem value="data-scientists">Data Scientists</SelectItem>
                          <SelectItem value="developers">Developers</SelectItem>
                          <SelectItem value="analysts">Analysts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="public-buckets">Public Buckets Allowed</Label>
                      <Switch id="public-buckets" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsCreateDialogOpen(false)}>
                Create Zone
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {viewMode === 'table' ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Zone Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Services</TableHead>
                <TableHead>Admin Scope</TableHead>
                <TableHead>Resource Usage</TableHead>
                <TableHead>Storage</TableHead>
                <TableHead>VaultID</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {zones.map((zone) => (
                <TableRow key={zone.id}>
                  <TableCell 
                    className="font-medium cursor-pointer hover:text-primary"
                    onClick={() => onZoneClick(zone)}
                  >
                    {zone.name}
                  </TableCell>
                  <TableCell><ZoneStatusBadge status={zone.status} /></TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      {zone.services.map((service) => (
                        <div key={service} className="tooltip" data-tip={service}>
                          {serviceIcons[service]}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {zone.adminScopes.map((scope, i) => (
                        <span 
                          key={i} 
                          className="px-1.5 py-0.5 bg-secondary text-secondary-foreground rounded text-xs"
                        >
                          {scope}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div 
                        className="h-2 w-16 bg-secondary rounded-full overflow-hidden"
                        title={`CPU: ${zone.resourceUsage.cpu}%, RAM: ${zone.resourceUsage.ram}%, Storage: ${zone.resourceUsage.storage}%`}
                      >
                        <div 
                          className="h-full bg-primary"
                          style={{ width: `${zone.resourceUsage.cpu}%` }}
                        />
                      </div>
                      <span className="ml-2 text-xs">{zone.resourceUsage.cpu}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {zone.storageConfig?.enabled ? (
                      <div className="flex flex-col">
                        <div className="flex items-center space-x-1">
                          <div className={`h-2 w-2 rounded-full ${getStorageStatusColor(zone.storageConfig.status)}`} />
                          <span className="text-xs">
                            {formatStorage(zone.storageConfig.used)} / {formatStorage(zone.storageConfig.provisioned)}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {getStorageTierLabel(zone.storageConfig.tier)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">Not enabled</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {zone.vaultIdRequired ? 
                      <span className="text-green-500">Yes</span> : 
                      <span className="text-muted-foreground">No</span>
                    }
                  </TableCell>
                  <TableCell>{formatDate(zone.created)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm">Clone</Button>
                      <Button 
                        variant="default" 
                        size="sm" 
                        onClick={() => onZoneClick(zone)}
                      >
                        Enter
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {zones.map((zone) => (
            <div 
              key={zone.id}
              className="p-4 border rounded-lg bg-card shadow-sm hover:shadow-md transition-all cursor-pointer hover:translate-y-[-2px]"
              onClick={() => onZoneClick(zone)}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-lg">{zone.name}</h3>
                <ZoneStatusBadge status={zone.status} />
              </div>
              
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{zone.description}</p>
              
              <div className="space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {zone.services.map((service) => (
                    <div 
                      key={service} 
                      className="flex items-center px-2 py-1 bg-secondary/50 rounded-full text-xs"
                    >
                      {serviceIcons[service]}
                      <span className="ml-1 capitalize">
                        {service === 'vertexvault' ? 'Storage' : service}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="text-xs text-muted-foreground">
                  <div className="flex justify-between mb-1">
                    <span>Resource Usage</span>
                    <span>{zone.resourceUsage.cpu}% CPU</span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        zone.resourceUsage.cpu > 80 ? 'bg-red-500' : 
                        zone.resourceUsage.cpu > 60 ? 'bg-amber-500' : 
                        'bg-green-500'
                      }`}
                      style={{ width: `${zone.resourceUsage.cpu}%` }}
                    />
                  </div>
                </div>
                
                {zone.storageConfig?.enabled && (
                  <div className="text-xs space-y-1 pt-1">
                    <div className="flex justify-between">
                      <span className="flex items-center">
                        <Database className="h-3 w-3 mr-1 text-indigo-500" />
                        Storage
                      </span>
                      <span>
                        {formatStorage(zone.storageConfig.used)} / {formatStorage(zone.storageConfig.provisioned)}
                      </span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getStorageStatusColor(zone.storageConfig.status)}`}
                        style={{ width: `${(zone.storageConfig.used / zone.storageConfig.provisioned) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between">
                      <span>{getStorageTierLabel(zone.storageConfig.tier)} Tier</span>
                      <span>
                        {zone.storageConfig.erasureCoding ? 'Erasure: On' : 'Erasure: Off'}
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between text-xs">
                  <span>Created: {formatDate(zone.created)}</span>
                  <span>
                    VaultID: {zone.vaultIdRequired ? 
                      <span className="text-green-500">Required</span> : 
                      <span>Optional</span>
                    }
                  </span>
                </div>
                
                <div className="flex justify-end space-x-1 mt-2">
                  <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
                    Edit
                  </Button>
                  <Button variant="default" size="sm">
                    Enter Zone
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ZonesOverview;
