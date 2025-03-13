
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, Download, Filter } from "lucide-react";

const SearchExportSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  
  // Mock search results
  const searchResults = [
    { id: "1", name: "WS-DEV-01", category: "Workstation", manufacturer: "Dell", model: "Precision 5570", location: "HQ - Floor 2", status: "Active" },
    { id: "2", name: "SRV-DB-01", category: "Server", manufacturer: "HP", model: "ProLiant DL380", location: "Data Center Alpha", status: "Active" },
    { id: "3", name: "SW-CORE-01", category: "Networking", manufacturer: "Cisco", model: "Catalyst 9300", location: "Data Center Alpha", status: "Active" },
    { id: "4", name: "NEST-PDX-01", category: "CyberNest", manufacturer: "Custom", model: "Enterprise C4", location: "Portland Office", status: "Active" },
    { id: "5", name: "LAP-MKT-05", category: "Workstation", manufacturer: "Apple", model: "MacBook Pro M1", location: "HQ - Floor 3", status: "In Maintenance" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would filter results based on search and filters
    console.log("Searching for:", searchQuery, selectedCategory, selectedLocation, selectedStatus);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Active": return "default";
      case "In Maintenance": return "warning";  
      case "Retired": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Search & Export Assets</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by name, model, serial number..." 
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit">Search</Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="workstation">Workstations</SelectItem>
                    <SelectItem value="server">Servers</SelectItem>
                    <SelectItem value="networking">Networking</SelectItem>
                    <SelectItem value="cybernest">CyberNests</SelectItem>
                    <SelectItem value="storage">Storage</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full sm:w-1/4">
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="hq">Headquarters</SelectItem>
                    <SelectItem value="datacenter">Data Centers</SelectItem>
                    <SelectItem value="remote">Remote Offices</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full sm:w-1/4">
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="maintenance">In Maintenance</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full sm:w-1/4">
                <Button variant="outline" className="w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="results">
        <TabsList className="mb-4">
          <TabsTrigger value="results">Search Results</TabsTrigger>
          <TabsTrigger value="export">Export Options</TabsTrigger>
          <TabsTrigger value="reports">Saved Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="results" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-muted-foreground">Showing {searchResults.length} results</div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Save Search
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="hidden md:table-cell">Manufacturer</TableHead>
                      <TableHead className="hidden lg:table-cell">Model</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {searchResults.map((asset) => (
                      <TableRow key={asset.id}>
                        <TableCell className="font-medium">{asset.name}</TableCell>
                        <TableCell>{asset.category}</TableCell>
                        <TableCell className="hidden md:table-cell">{asset.manufacturer}</TableCell>
                        <TableCell className="hidden lg:table-cell">{asset.model}</TableCell>
                        <TableCell>{asset.location}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(asset.status)}>
                            {asset.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="export" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Export as CSV
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Export asset data as CSV format for use in spreadsheet applications.
                </p>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Export as JSON
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Export asset data in JSON format for use in other applications.
                </p>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Export JSON
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Export as PDF
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Export asset data as PDF document for printing or sharing.
                </p>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Export Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <div className="text-sm font-medium mb-2">Include Fields:</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="field-id" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="field-id" className="text-sm">Asset ID</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="field-name" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="field-name" className="text-sm">Asset Name</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="field-category" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="field-category" className="text-sm">Category</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="field-manufacturer" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="field-manufacturer" className="text-sm">Manufacturer</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="field-model" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="field-model" className="text-sm">Model</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="field-serial" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="field-serial" className="text-sm">Serial Number</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="field-purchase" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="field-purchase" className="text-sm">Purchase Date</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="field-warranty" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="field-warranty" className="text-sm">Warranty</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="field-location" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="field-location" className="text-sm">Location</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="field-status" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="field-status" className="text-sm">Status</label>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="include-header" className="rounded border-gray-300" defaultChecked />
                  <label htmlFor="include-header" className="text-sm">Include header row</label>
                </div>
                
                <div>
                  <Button className="mr-2">
                    <Download className="h-4 w-4 mr-2" />
                    Export Selected Fields
                  </Button>
                  <Button variant="outline">Save Export Template</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm font-medium">Saved Reports & Searches</div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  New Report
                </Button>
              </div>
              
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead className="hidden md:table-cell">Created</TableHead>
                      <TableHead className="hidden md:table-cell">Modified</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Quarterly Asset Inventory</TableCell>
                      <TableCell className="hidden md:table-cell">Sep 30, 2023</TableCell>
                      <TableCell className="hidden md:table-cell">Oct 1, 2023</TableCell>
                      <TableCell>Full Report</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Run</Button>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Warranty Expiring 90 Days</TableCell>
                      <TableCell className="hidden md:table-cell">Aug 15, 2023</TableCell>
                      <TableCell className="hidden md:table-cell">Oct 3, 2023</TableCell>
                      <TableCell>Saved Search</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Run</Button>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Data Center Servers</TableCell>
                      <TableCell className="hidden md:table-cell">Jul 22, 2023</TableCell>
                      <TableCell className="hidden md:table-cell">Jul 22, 2023</TableCell>
                      <TableCell>Saved Search</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Run</Button>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SearchExportSection;
