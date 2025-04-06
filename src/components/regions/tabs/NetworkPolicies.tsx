
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash, Edit, FilterX, Filter } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { mockRegions, mockPolicies } from '../data/mockData';
import { NetworkPolicy } from '@/types/regions';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const NetworkPolicies = () => {
  const [policies, setPolicies] = useState(mockPolicies);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<NetworkPolicy | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getRegionNameById = (regionId: string) => {
    const region = mockRegions.find(r => r.id === regionId);
    return region ? region.name : 'Unknown';
  };

  const filteredPolicies = searchTerm
    ? policies.filter(policy => 
        policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getRegionNameById(policy.sourceRegionId).toLowerCase().includes(searchTerm.toLowerCase()) ||
        getRegionNameById(policy.targetRegionId).toLowerCase().includes(searchTerm.toLowerCase())
      )
    : policies;

  const togglePolicyStatus = (id: string) => {
    setPolicies(policies.map(policy => 
      policy.id === id ? { ...policy, enabled: !policy.enabled } : policy
    ));
  };

  // Add new policy dialog
  const AddPolicyDialog = () => {
    return (
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Network Policy</DialogTitle>
            <DialogDescription>
              Define East-West network policy between regions
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="policy-name" className="text-right">
                Policy Name
              </Label>
              <Input
                id="policy-name"
                placeholder="Web Services Access"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="policy-desc" className="text-right">
                Description
              </Label>
              <Textarea
                id="policy-desc"
                placeholder="Allow web traffic between regions"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="source-region" className="text-right">
                Source Region
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select source region" />
                </SelectTrigger>
                <SelectContent>
                  {mockRegions.map(region => (
                    <SelectItem key={region.id} value={region.id}>
                      {region.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="target-region" className="text-right">
                Target Region
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select target region" />
                </SelectTrigger>
                <SelectContent>
                  {mockRegions.map(region => (
                    <SelectItem key={region.id} value={region.id}>
                      {region.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="direction" className="text-right">
                Direction
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select direction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="east-west">East-West</SelectItem>
                  <SelectItem value="north-south">North-South</SelectItem>
                  <SelectItem value="bidirectional">Bidirectional</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Priority
              </Label>
              <Input
                id="priority"
                type="number"
                placeholder="10"
                className="col-span-3"
              />
            </div>
            
            <Accordion type="single" collapsible className="w-full col-span-4">
              <AccordionItem value="rules">
                <AccordionTrigger className="px-4">Traffic Rules</AccordionTrigger>
                <AccordionContent className="px-4 pt-2">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border rounded-md p-3">
                      <Select defaultValue="tcp">
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="Protocol" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">ANY</SelectItem>
                          <SelectItem value="tcp">TCP</SelectItem>
                          <SelectItem value="udp">UDP</SelectItem>
                          <SelectItem value="icmp">ICMP</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input placeholder="Port (e.g. 443 or 8000-9000)" className="flex-1" />
                      <Select defaultValue="allow">
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="Action" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="allow">Allow</SelectItem>
                          <SelectItem value="deny">Deny</SelectItem>
                          <SelectItem value="log">Log</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="icon" className="shrink-0 text-red-500">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button variant="outline" className="w-full" size="sm">
                      <Plus className="h-4 w-4 mr-2" /> Add Rule
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="enabled">
                Status
              </Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch id="enabled" defaultChecked />
                <Label htmlFor="enabled">Enable policy immediately</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsAddDialogOpen(false)}>Create Policy</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  // Delete policy confirmation dialog
  const DeletePolicyDialog = () => {
    return (
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Network Policy</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this policy? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedPolicy && (
              <div className="text-sm space-y-2">
                <p>
                  <span className="font-medium">Name:</span> {selectedPolicy.name}
                </p>
                <p>
                  <span className="font-medium">Description:</span> {selectedPolicy.description}
                </p>
                <p>
                  <span className="font-medium">Connection:</span> {getRegionNameById(selectedPolicy.sourceRegionId)} ↔ {getRegionNameById(selectedPolicy.targetRegionId)}
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                if (selectedPolicy) {
                  setPolicies(policies.filter(p => p.id !== selectedPolicy.id));
                }
                setIsDeleteDialogOpen(false);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="space-y-6">
      <AddPolicyDialog />
      <DeletePolicyDialog />
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Network Policies</CardTitle>
            <CardDescription>
              Manage East-West policies between regions
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Input 
                placeholder="Search policies..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[250px] pr-8"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setSearchTerm('')}
                >
                  <FilterX className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" /> Add Policy
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Policy Name</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Direction</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Rules</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPolicies.length > 0 ? (
                filteredPolicies.map((policy) => (
                  <TableRow key={policy.id}>
                    <TableCell className="font-medium">
                      {policy.name}
                      <div className="text-xs text-muted-foreground mt-1">{policy.description}</div>
                    </TableCell>
                    <TableCell>{getRegionNameById(policy.sourceRegionId)}</TableCell>
                    <TableCell>{getRegionNameById(policy.targetRegionId)}</TableCell>
                    <TableCell className="capitalize">
                      {policy.direction === 'east-west' ? 'East-West' : 
                       policy.direction === 'north-south' ? 'North-South' : 
                       'Bidirectional'}
                    </TableCell>
                    <TableCell>{policy.priority}</TableCell>
                    <TableCell>{policy.rules.length}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          checked={policy.enabled} 
                          onCheckedChange={() => togglePolicyStatus(policy.id)}
                        />
                        <span className={policy.enabled ? 'text-green-500' : 'text-muted-foreground'}>
                          {policy.enabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-500"
                          onClick={() => {
                            setSelectedPolicy(policy);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No policies found
                    {searchTerm && (
                      <div className="text-sm text-muted-foreground mt-2">
                        Try adjusting your search criteria
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default NetworkPolicies;
