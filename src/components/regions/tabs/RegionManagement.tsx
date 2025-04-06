
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash, Power, PowerOff, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { mockRegions } from '../data/mockData';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const RegionManagement = () => {
  const [regions, setRegions] = useState(mockRegions);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const getStatusBadgeColor = (status: string) => {
    switch(status) {
      case 'active':
        return 'bg-green-500 hover:bg-green-600';
      case 'degraded':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'down':
        return 'bg-red-500 hover:bg-red-600';
      case 'provisioning':
        return 'bg-blue-500 hover:bg-blue-600';
      default:
        return '';
    }
  };

  // Dialog content for adding a new region
  const AddRegionDialog = () => {
    return (
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Region</DialogTitle>
            <DialogDescription>
              Enter details to provision a new region
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="region-name" className="text-right">
                Name
              </Label>
              <Input
                id="region-name"
                placeholder="North America Central"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="region-loc" className="text-right">
                Location
              </Label>
              <Input
                id="region-loc"
                placeholder="Chicago, IL"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="region-cores" className="text-right">
                CPU Cores
              </Label>
              <Input
                id="region-cores"
                type="number"
                placeholder="32"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="region-memory" className="text-right">
                Memory (GB)
              </Label>
              <Input
                id="region-memory"
                type="number"
                placeholder="128"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="region-storage" className="text-right">
                Storage (GB)
              </Label>
              <Input
                id="region-storage"
                type="number"
                placeholder="2000"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="region-bandwidth" className="text-right">
                Bandwidth (Mbps)
              </Label>
              <Input
                id="region-bandwidth"
                type="number"
                placeholder="5000"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsAddDialogOpen(false)}>Provision</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  // Dialog content for deleting a region
  const DeleteRegionDialog = () => {
    const region = selectedRegion ? regions.find(r => r.id === selectedRegion) : null;
    
    return (
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Region</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this region? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {region && (
            <div className="py-4">
              <div className="flex items-center space-x-2 text-red-500">
                <AlertCircle className="h-5 w-5" />
                <p className="font-semibold">Warning: This will delete region "{region.name}"</p>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                All zones in this region will also be deprovisioned, and all data will be lost.
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                if (selectedRegion) {
                  setRegions(regions.filter(r => r.id !== selectedRegion));
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
      <AddRegionDialog />
      <DeleteRegionDialog />
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Regions</CardTitle>
            <CardDescription>
              Manage and provision new regions
            </CardDescription>
          </div>
          <Button 
            onClick={() => setIsAddDialogOpen(true)}
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" /> Add Region
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>CPU Cores</TableHead>
                <TableHead>Memory</TableHead>
                <TableHead>Zones</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {regions.map((region) => (
                <TableRow key={region.id}>
                  <TableCell className="font-medium">{region.name}</TableCell>
                  <TableCell>{region.location.address}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(region.status)}>
                      {region.status.charAt(0).toUpperCase() + region.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{region.specs.cores}</TableCell>
                  <TableCell>{region.specs.memory} GB</TableCell>
                  <TableCell>{region.zones.length}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {region.status === 'active' ? (
                        <Button variant="ghost" size="icon" className="text-yellow-500">
                          <PowerOff className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button variant="ghost" size="icon" className="text-green-500">
                          <Power className="h-4 w-4" />
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-500"
                        onClick={() => {
                          setSelectedRegion(region.id);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <div className="text-sm text-muted-foreground">
            Total provisioned regions: {regions.length}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegionManagement;
