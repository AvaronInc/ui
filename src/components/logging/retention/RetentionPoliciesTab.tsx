
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, MoreHorizontal, Copy, Edit, Trash2, Send } from 'lucide-react';
import { toast } from 'sonner';

interface RetentionPolicy {
  id: string;
  logType: string;
  duration: string;
  rotationType: string;
  sizeCap: string;
  lastModified: string;
  appliedTo: string[];
  complianceTags?: string[];
  replicationCount?: number;
}

const samplePolicies: RetentionPolicy[] = [
  {
    id: '1',
    logType: 'Wazuh',
    duration: '90 days',
    rotationType: 'Time-based',
    sizeCap: '500 GB',
    lastModified: '2023-09-15',
    appliedTo: ['All Sites'],
    complianceTags: ['PCI', 'HIPAA'],
    replicationCount: 3
  },
  {
    id: '2',
    logType: 'Arkime',
    duration: '30 days',
    rotationType: 'Hybrid',
    sizeCap: '1 TB',
    lastModified: '2023-10-22',
    appliedTo: ['HQ', 'Data Center'],
    complianceTags: ['SOX'],
    replicationCount: 2
  },
  {
    id: '3',
    logType: 'Syslog',
    duration: '180 days',
    rotationType: 'Time-based',
    sizeCap: '200 GB',
    lastModified: '2023-08-05',
    appliedTo: ['All Sites'],
    complianceTags: ['GDPR', 'HIPAA'],
    replicationCount: 3
  },
  {
    id: '4',
    logType: 'Firewall',
    duration: '60 days',
    rotationType: 'Size-based',
    sizeCap: '300 GB',
    lastModified: '2023-11-10',
    appliedTo: ['Branch Offices'],
    complianceTags: ['PCI'],
    replicationCount: 2
  }
];

const RetentionPoliciesTab: React.FC = () => {
  const [policies, setPolicies] = useState<RetentionPolicy[]>(samplePolicies);
  const [isNewPolicyOpen, setIsNewPolicyOpen] = useState(false);
  const [isEditPolicyOpen, setIsEditPolicyOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<RetentionPolicy | null>(null);

  const handleNewPolicy = () => {
    setSelectedPolicy(null);
    setIsNewPolicyOpen(true);
  };

  const handleEditPolicy = (policy: RetentionPolicy) => {
    setSelectedPolicy(policy);
    setIsEditPolicyOpen(true);
  };

  const handleClonePolicy = (policy: RetentionPolicy) => {
    const newPolicy = {
      ...policy,
      id: `${parseInt(policy.id) + 100}`,
      logType: `${policy.logType} (Copy)`,
      lastModified: new Date().toISOString().split('T')[0]
    };
    setPolicies([...policies, newPolicy]);
    toast.success('Policy cloned successfully');
  };

  const handleDeletePolicy = (id: string) => {
    setPolicies(policies.filter(policy => policy.id !== id));
    toast.success('Policy deleted successfully');
  };

  const handleApplyToTenant = (policy: RetentionPolicy) => {
    toast.success(`Policy for ${policy.logType} applied to current tenant`);
  };

  // Safe close functions that ensure state is properly reset
  const handleCloseNewPolicy = () => {
    setIsNewPolicyOpen(false);
  };

  const handleCloseEditPolicy = () => {
    setIsEditPolicyOpen(false);
    setSelectedPolicy(null);
  };

  const handleSaveNewPolicy = () => {
    toast.success('New policy created successfully');
    handleCloseNewPolicy();
  };

  const handleUpdatePolicy = () => {
    toast.success('Policy updated successfully');
    handleCloseEditPolicy();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Retention Policies</h3>
        <Button onClick={handleNewPolicy} className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          New Policy
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Log Type</TableHead>
                <TableHead>Retention Duration</TableHead>
                <TableHead>Rotation Type</TableHead>
                <TableHead>Size Cap</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead>Applied To</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {policies.map((policy) => (
                <TableRow key={policy.id}>
                  <TableCell className="font-medium">{policy.logType}</TableCell>
                  <TableCell>{policy.duration}</TableCell>
                  <TableCell>{policy.rotationType}</TableCell>
                  <TableCell>{policy.sizeCap}</TableCell>
                  <TableCell>{policy.lastModified}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {policy.appliedTo.map((site) => (
                        <Badge key={site} variant="outline" className="text-xs">
                          {site}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditPolicy(policy)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleClonePolicy(policy)}>
                          <Copy className="h-4 w-4 mr-2" />
                          Clone
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleApplyToTenant(policy)}>
                          <Send className="h-4 w-4 mr-2" />
                          Apply to Tenant
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeletePolicy(policy.id)} className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* New Policy Dialog */}
      <Dialog open={isNewPolicyOpen} onOpenChange={handleCloseNewPolicy}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Retention Policy</DialogTitle>
            <DialogDescription>
              Define how long logs should be kept and how they should rotate
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="logType" className="text-right">
                Log Type
              </Label>
              <Select defaultValue="wazuh">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select log type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wazuh">Wazuh</SelectItem>
                  <SelectItem value="arkime">Arkime</SelectItem>
                  <SelectItem value="syslog">Syslog</SelectItem>
                  <SelectItem value="firewall">Firewall</SelectItem>
                  <SelectItem value="intrusion">Intrusion Detection</SelectItem>
                  <SelectItem value="authentication">Authentication</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">
                Retention
              </Label>
              <div className="col-span-3 flex gap-2">
                <Input id="duration" type="number" defaultValue="90" className="w-20" />
                <Select defaultValue="days">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="days">Days</SelectItem>
                    <SelectItem value="weeks">Weeks</SelectItem>
                    <SelectItem value="months">Months</SelectItem>
                    <SelectItem value="years">Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rotation" className="text-right">
                Rotation Method
              </Label>
              <div className="col-span-3">
                <Select defaultValue="time">
                  <SelectTrigger>
                    <SelectValue placeholder="Select rotation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="time">Time-based</SelectItem>
                    <SelectItem value="size">Size-based</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sizeCap" className="text-right">
                Size Cap
              </Label>
              <div className="col-span-3 flex gap-2">
                <Input id="sizeCap" type="number" defaultValue="500" className="w-20" />
                <Select defaultValue="gb">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mb">MB</SelectItem>
                    <SelectItem value="gb">GB</SelectItem>
                    <SelectItem value="tb">TB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="replication" className="text-right">
                Min Replication
              </Label>
              <div className="col-span-3">
                <Select defaultValue="2">
                  <SelectTrigger>
                    <SelectValue placeholder="Select replication count" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 copy</SelectItem>
                    <SelectItem value="2">2 copies</SelectItem>
                    <SelectItem value="3">3 copies</SelectItem>
                    <SelectItem value="4">4 copies</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="compliance" className="text-right">
                Compliance Tags
              </Label>
              <div className="col-span-3">
                <Select defaultValue="pci">
                  <SelectTrigger>
                    <SelectValue placeholder="Select compliance tags" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pci">PCI DSS</SelectItem>
                    <SelectItem value="hipaa">HIPAA</SelectItem>
                    <SelectItem value="gdpr">GDPR</SelectItem>
                    <SelectItem value="sox">SOX</SelectItem>
                    <SelectItem value="fedramp">FedRAMP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseNewPolicy}>
              Cancel
            </Button>
            <Button onClick={handleSaveNewPolicy}>
              Create Policy
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Policy Dialog */}
      <Dialog open={isEditPolicyOpen} onOpenChange={handleCloseEditPolicy}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Retention Policy</DialogTitle>
            <DialogDescription>
              Update retention policy settings for {selectedPolicy?.logType}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {selectedPolicy && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-logType" className="text-right">
                    Log Type
                  </Label>
                  <Input 
                    id="edit-logType" 
                    defaultValue={selectedPolicy.logType}
                    className="col-span-3"
                    disabled
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-duration" className="text-right">
                    Retention
                  </Label>
                  <div className="col-span-3 flex gap-2">
                    <Input 
                      id="edit-duration" 
                      type="number" 
                      defaultValue={selectedPolicy.duration.split(' ')[0]} 
                      className="w-20"
                    />
                    <Select defaultValue="days">
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="days">Days</SelectItem>
                        <SelectItem value="weeks">Weeks</SelectItem>
                        <SelectItem value="months">Months</SelectItem>
                        <SelectItem value="years">Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-rotation" className="text-right">
                    Rotation Method
                  </Label>
                  <div className="col-span-3">
                    <Select defaultValue={selectedPolicy.rotationType.toLowerCase().replace('-', '')}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select rotation type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="timebased">Time-based</SelectItem>
                        <SelectItem value="sizebased">Size-based</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-sizeCap" className="text-right">
                    Size Cap
                  </Label>
                  <div className="col-span-3 flex gap-2">
                    <Input 
                      id="edit-sizeCap" 
                      type="number" 
                      defaultValue={selectedPolicy.sizeCap.split(' ')[0]} 
                      className="w-20" 
                    />
                    <Select defaultValue="gb">
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mb">MB</SelectItem>
                        <SelectItem value="gb">GB</SelectItem>
                        <SelectItem value="tb">TB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseEditPolicy}>
              Cancel
            </Button>
            <Button onClick={handleUpdatePolicy}>
              Update Policy
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RetentionPoliciesTab;
