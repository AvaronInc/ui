
import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, ArrowUpDown, Edit, Trash2, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PolicyRouteEditor from '../components/policy-routing/PolicyRouteEditor';
import { mockPolicyRoutes } from '../data/mockPolicyRoutingData';
import { PolicyRoute } from '@/types/sdwan';

const PolicyRoutingTab = () => {
  const [selectedRoute, setSelectedRoute] = useState<PolicyRoute | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<keyof PolicyRoute>('priority');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const filteredRoutes = mockPolicyRoutes.filter(route => 
    route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.sourceIp.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.destinationIp.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedRoutes = [...filteredRoutes].sort((a, b) => {
    if (sortField === 'status') {
      return sortDirection === 'asc' 
        ? (a.status === 'active' ? 1 : -1) 
        : (a.status === 'active' ? -1 : 1);
    }
    
    if (typeof a[sortField] === 'number' && typeof b[sortField] === 'number') {
      return sortDirection === 'asc' 
        ? (a[sortField] as number) - (b[sortField] as number)
        : (b[sortField] as number) - (a[sortField] as number);
    }
    
    const aValue = String(a[sortField]).toLowerCase();
    const bValue = String(b[sortField]).toLowerCase();
    
    return sortDirection === 'asc' 
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const handleSort = (field: keyof PolicyRoute) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleAddNewRoute = () => {
    setSelectedRoute(null);
    setIsCreatingNew(true);
  };

  const handleSelectRoute = (route: PolicyRoute) => {
    setSelectedRoute(route);
    setIsCreatingNew(false);
  };

  const handleCloseEditor = () => {
    setSelectedRoute(null);
    setIsCreatingNew(false);
  };

  const handleSaveRoute = (route: PolicyRoute) => {
    // In a real application, this would save to the backend
    console.log('Saving route:', route);
    setSelectedRoute(null);
    setIsCreatingNew(false);
  };

  const getSortIcon = (field: keyof PolicyRoute) => {
    if (field !== sortField) return <ArrowUpDown className="h-4 w-4 ml-1" />;
    return sortDirection === 'asc' 
      ? <ArrowUpDown className="h-4 w-4 ml-1 text-primary" /> 
      : <ArrowUpDown className="h-4 w-4 ml-1 text-primary rotate-180" />;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex-1 mr-4">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search policy routes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 w-full"
              />
            </div>
          </div>
          <Button onClick={handleAddNewRoute}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Policy Route
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">VPP Policy-Based Routes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead 
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handleSort('name')}
                      >
                        Policy Name {getSortIcon('name')}
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handleSort('sourceIp')}
                      >
                        Source IP/Subnet {getSortIcon('sourceIp')}
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handleSort('destinationIp')}
                      >
                        Destination IP/Subnet {getSortIcon('destinationIp')}
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handleSort('protocol')}
                      >
                        Protocol {getSortIcon('protocol')}
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handleSort('priority')}
                      >
                        Priority {getSortIcon('priority')}
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handleSort('status')}
                      >
                        Status {getSortIcon('status')}
                      </TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedRoutes.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                          No policy routes found
                        </TableCell>
                      </TableRow>
                    ) : (
                      sortedRoutes.map((route) => (
                        <TableRow 
                          key={route.id}
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => handleSelectRoute(route)}
                        >
                          <TableCell className="font-medium">{route.name}</TableCell>
                          <TableCell>{route.sourceIp}</TableCell>
                          <TableCell>{route.destinationIp}</TableCell>
                          <TableCell>{route.protocol}</TableCell>
                          <TableCell>{route.priority}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={route.status === 'active' ? 'default' : 'secondary'}
                              className={route.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}
                            >
                              {route.status === 'active' ? 'Active' : 'Inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectRoute(route);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Add delete logic here
                                  console.log('Delete route:', route.id);
                                }}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        {(selectedRoute || isCreatingNew) && (
          <PolicyRouteEditor 
            route={selectedRoute}
            isNew={isCreatingNew}
            onSave={handleSaveRoute}
            onCancel={handleCloseEditor}
          />
        )}
      </div>
    </div>
  );
};

export default PolicyRoutingTab;
