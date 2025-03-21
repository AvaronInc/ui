
import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Plus, 
  Search, 
  ArrowUpDown, 
  Edit, 
  Trash2, 
  Download, 
  RefreshCw, 
  Filter, 
  FileJson, 
  FileSpreadsheet 
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PolicyRouteEditor from '../components/policy-routing/PolicyRouteEditor';
import { mockPolicyRoutes } from '../data/mockPolicyRoutingData';
import { PolicyRoute } from '@/types/sdwan';

const PolicyRoutingTab = () => {
  const [selectedRoute, setSelectedRoute] = useState<PolicyRoute | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<keyof PolicyRoute>('priority');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [routes, setRoutes] = useState<PolicyRoute[]>(mockPolicyRoutes);
  const [refreshInterval, setRefreshInterval] = useState<number | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [routeToDelete, setRouteToDelete] = useState<PolicyRoute | null>(null);

  // Filtering logic
  const filteredRoutes = routes.filter(route => 
    route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.sourceIp.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.destinationIp.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (route.description && route.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Sorting logic
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

  // Set up refresh interval
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    
    if (refreshInterval) {
      intervalId = setInterval(() => {
        // In a real app, this would fetch fresh data from the API
        // For now, we'll just update lastRefreshed and simulate some data changes
        setLastRefreshed(new Date());
        
        // Simulate data changes by updating packet counts and rates
        setRoutes(prevRoutes => 
          prevRoutes.map(route => {
            if (route.status === 'active') {
              const packetIncrement = Math.floor(Math.random() * 50);
              const trafficIncrement = Math.floor(Math.random() * 20);
              
              return {
                ...route,
                packetCount: route.packetCount + packetIncrement,
                trafficHandled: route.trafficHandled + trafficIncrement,
                packetRate: Math.floor(Math.random() * 300),
                byteRate: Math.floor(Math.random() * 1500000),
                lastUpdated: new Date().toISOString()
              };
            }
            return route;
          })
        );
      }, refreshInterval);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [refreshInterval]);

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

  const handleDeleteRoute = (route: PolicyRoute) => {
    setRouteToDelete(route);
  };

  const confirmDeleteRoute = () => {
    if (routeToDelete) {
      setRoutes(prevRoutes => prevRoutes.filter(route => route.id !== routeToDelete.id));
      setRouteToDelete(null);
      
      // If the deleted route was selected, clear selection
      if (selectedRoute && selectedRoute.id === routeToDelete.id) {
        setSelectedRoute(null);
      }
    }
  };

  const handleSaveRoute = (route: PolicyRoute) => {
    setRoutes(prevRoutes => {
      const index = prevRoutes.findIndex(r => r.id === route.id);
      if (index >= 0) {
        // Update existing route
        const updatedRoutes = [...prevRoutes];
        updatedRoutes[index] = {
          ...route,
          lastUpdated: new Date().toISOString()
        };
        return updatedRoutes;
      } else {
        // Add new route
        return [...prevRoutes, {
          ...route,
          id: `${Date.now()}`,
          lastUpdated: new Date().toISOString()
        }];
      }
    });
    setSelectedRoute(null);
    setIsCreatingNew(false);
  };

  const getPriorityColor = (priority: number) => {
    if (priority <= 10) return "bg-red-500";
    if (priority <= 25) return "bg-orange-500";
    if (priority <= 50) return "bg-yellow-500";
    if (priority <= 75) return "bg-blue-500";
    return "bg-green-500";
  };

  const getSortIcon = (field: keyof PolicyRoute) => {
    if (field !== sortField) return <ArrowUpDown className="h-4 w-4 ml-1" />;
    return sortDirection === 'asc' 
      ? <ArrowUpDown className="h-4 w-4 ml-1 text-primary" /> 
      : <ArrowUpDown className="h-4 w-4 ml-1 text-primary rotate-180" />;
  };

  const exportData = (format: 'json' | 'csv') => {
    let data: string = '';
    const fileName = `policy-routes-${new Date().toISOString()}.${format}`;
    
    if (format === 'json') {
      data = JSON.stringify(routes, null, 2);
    } else if (format === 'csv') {
      // Create CSV header
      const headers = [
        'id', 'name', 'description', 'sourceIp', 'destinationIp', 
        'protocol', 'priority', 'status', 'interface', 'nextHopIp'
      ];
      
      data = headers.join(',') + '\n';
      
      // Add rows
      data += routes.map(route => {
        return [
          route.id,
          `"${route.name}"`,
          `"${route.description || ''}"`,
          route.sourceIp,
          route.destinationIp,
          route.protocol,
          route.priority,
          route.status,
          route.interface,
          route.nextHopIp
        ].join(',');
      }).join('\n');
    }
    
    // Create and trigger download
    const blob = new Blob([data], { type: format === 'json' ? 'application/json' : 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="mb-4 flex flex-col sm:flex-row space-y-3 sm:space-y-0 justify-between items-start sm:items-center">
          <div className="flex-1 mr-4 w-full sm:w-auto">
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
          <div className="flex space-x-2 w-full sm:w-auto justify-between sm:justify-end">
            <Select
              value={refreshInterval ? String(refreshInterval) : "0"}
              onValueChange={(value) => setRefreshInterval(value === "0" ? null : Number(value))}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Auto-refresh" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Manual refresh</SelectItem>
                <SelectItem value="5000">5 seconds</SelectItem>
                <SelectItem value="15000">15 seconds</SelectItem>
                <SelectItem value="60000">60 seconds</SelectItem>
              </SelectContent>
            </Select>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => exportData('json')}>
                  <FileJson className="mr-2 h-4 w-4" />
                  Export as JSON
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => exportData('csv')}>
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Export as CSV
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button onClick={handleAddNewRoute}>
              <Plus className="mr-2 h-4 w-4" />
              Add Route
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg">VPP Policy-Based Routes</CardTitle>
                <CardDescription>
                  Manage traffic flow with Vector Packet Processing policies
                </CardDescription>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                className="h-8 px-2"
                onClick={() => setLastRefreshed(new Date())}
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                <span className="text-xs">
                  Last refreshed: {lastRefreshed.toLocaleTimeString()}
                </span>
              </Button>
            </div>
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
                          <TableCell>
                            <Badge 
                              className={`${getPriorityColor(route.priority)} text-white`}
                            >
                              {route.priority}
                            </Badge>
                          </TableCell>
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
                              
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteRoute(route);
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will permanently delete the policy route "{route.name}". 
                                      This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={confirmDeleteRoute} 
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
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
