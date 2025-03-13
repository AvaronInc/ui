
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Cpu, HardDrive, Network, Shield } from 'lucide-react';

const SDMSSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulate search results
    setTimeout(() => {
      const mockResults = [
        { 
          id: '1', 
          type: 'device', 
          name: 'Core Router', 
          category: 'Network',
          path: 'Devices > Network > Routers',
          icon: Network 
        },
        { 
          id: '2', 
          type: 'server', 
          name: 'Application Server 1', 
          category: 'Servers',
          path: 'Servers > Application Servers',
          icon: Cpu 
        },
        { 
          id: '3', 
          type: 'security', 
          name: 'Firewall Rule #32', 
          category: 'Security',
          path: 'Security > Firewall Rules',
          icon: Shield 
        },
        { 
          id: '4', 
          type: 'storage', 
          name: 'File Server', 
          category: 'Storage',
          path: 'Storage > File Servers',
          icon: HardDrive 
        },
      ];
      
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <div className="text-lg font-medium">AI-Powered Documentation Search</div>
      <p className="text-muted-foreground">
        Find anything in your network documentation using natural language search
      </p>
      
      <Card>
        <CardHeader>
          <CardTitle>Search Documentation</CardTitle>
          <CardDescription>
            Ask questions like "Show all VPN connections" or "List security issues on VLAN 10"
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter your search query..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleSearch} 
              disabled={isSearching}
              className="gap-2"
            >
              <Search className="h-4 w-4" />
              {isSearching ? 'Searching...' : 'Search'}
            </Button>
          </div>
          
          {searchResults.length > 0 && (
            <div className="mt-6">
              <h3 className="font-medium mb-2">Search Results ({searchResults.length})</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Path</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {searchResults.map((result) => {
                    const Icon = result.icon;
                    return (
                      <TableRow key={result.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            <span>{result.type}</span>
                          </div>
                        </TableCell>
                        <TableCell>{result.name}</TableCell>
                        <TableCell>{result.category}</TableCell>
                        <TableCell className="text-muted-foreground">{result.path}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
          
          {searchQuery && !isSearching && searchResults.length === 0 && (
            <div className="mt-6 text-center p-6 border rounded-lg">
              <Search className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <h3 className="font-medium">No results found</h3>
              <p className="text-muted-foreground mt-2">
                Try using different keywords or phrases
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Suggested Searches</CardTitle>
          <CardDescription>Common search queries and examples</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start" onClick={() => setSearchQuery("Show all active VPN connections")}>
              Show all active VPN connections
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => setSearchQuery("List security concerns on VLAN 10")}>
              List security concerns on VLAN 10
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => setSearchQuery("Find all servers with outdated software")}>
              Find all servers with outdated software
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => setSearchQuery("Show network bottlenecks")}>
              Show network bottlenecks
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SDMSSearch;
