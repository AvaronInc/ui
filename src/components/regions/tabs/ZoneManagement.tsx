
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash, Power, PowerOff, Filter } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockRegions, mockZones } from '../data/mockData';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ZoneManagement = () => {
  const [zones, setZones] = useState(mockZones);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string | null>(null);
  
  const filteredZones = selectedRegionFilter 
    ? zones.filter(zone => zone.regionId === selectedRegionFilter)
    : zones;

  const getStatusBadgeColor = (status: string) => {
    switch(status) {
      case 'active':
        return 'bg-green-500 hover:bg-green-600';
      case 'degraded':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'down':
        return 'bg-red-500 hover:bg-red-600';
      case 'maintenance':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'provisioning':
        return 'bg-purple-500 hover:bg-purple-600';
      default:
        return '';
    }
  };

  const getRegionNameById = (regionId: string) => {
    const region = mockRegions.find(r => r.id === regionId);
    return region ? region.name : 'Unknown';
  };

  // Dialog content for adding a new zone
  const AddZoneDialog = () => {
    return (
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Zone</DialogTitle>
            <DialogDescription>
              Provision a new zone within a region
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="zone-name" className="text-right">
                Name
              </Label>
              <Input
                id="zone-name"
                placeholder="NYC-D"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="zone-region" className="text-right">
                Region
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a region" />
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
              <Label htmlFor="zone-purpose" className="text-right">
                Purpose
              </Label>
              <Input
                id="zone-purpose"
                placeholder="Application Hosting"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="zone-cores" className="text-right">
                CPU Cores
              </Label>
              <Input
                id="zone-cores"
                type="number"
                placeholder="16"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="zone-memory" className="text-right">
                Memory (GB)
              </Label>
              <Input
                id="zone-memory"
                type="number"
                placeholder="64"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="zone-storage" className="text-right">
                Storage (GB)
              </Label>
              <Input
                id="zone-storage"
                type="number"
                placeholder="1000"
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

  return (
    <div className="space-y-6">
      <AddZoneDialog />
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Zones</CardTitle>
            <CardDescription>
              Manage zones within regions
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select 
              onValueChange={(value) => setSelectedRegionFilter(value === "all" ? null : value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                {mockRegions.map(region => (
                  <SelectItem key={region.id} value={region.id}>
                    {region.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" /> Add Zone
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>CPU</TableHead>
                <TableHead>Memory</TableHead>
                <TableHead>Storage</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredZones.map((zone) => (
                <TableRow key={zone.id}>
                  <TableCell className="font-medium">{zone.name}</TableCell>
                  <TableCell>{getRegionNameById(zone.regionId)}</TableCell>
                  <TableCell>{zone.purpose}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(zone.status)}>
                      {zone.status.charAt(0).toUpperCase() + zone.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{zone.specs.cores} cores</TableCell>
                  <TableCell>{zone.specs.memory} GB</TableCell>
                  <TableCell>{zone.specs.storage} GB</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {zone.status === 'active' ? (
                        <Button variant="ghost" size="icon" className="text-yellow-500">
                          <PowerOff className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button variant="ghost" size="icon" className="text-green-500">
                          <Power className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="text-red-500">
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
            {selectedRegionFilter 
              ? `${filteredZones.length} zones in ${getRegionNameById(selectedRegionFilter)}`
              : `${zones.length} total zones`
            }
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ZoneManagement;
