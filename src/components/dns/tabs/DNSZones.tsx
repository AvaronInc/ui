
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  Plus,
  Upload,
  Download,
  RefreshCw,
  Search,
  FileText,
  Database,
  Globe,
  Server,
  Sparkles
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DnsZoneList from '../components/DnsZoneList';

const DNSZones: React.FC = () => {
  const { toast } = useToast();
  const [activeZonesTab, setActiveZonesTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState('');
  const [recordTypeFilter, setRecordTypeFilter] = useState('all');
  
  // Sample zone record data
  const zoneRecords = [
    { id: 1, name: 'www.example.com', type: 'A', ttl: 3600, value: '192.168.1.1', status: 'Active' },
    { id: 2, name: 'mail.example.com', type: 'MX', ttl: 1800, value: '10 mail.example.com', status: 'Active' },
    { id: 3, name: 'api.example.com', type: 'CNAME', ttl: 3600, value: 'api.servers.example.com', status: 'Active' },
    { id: 4, name: 'example.com', type: 'TXT', ttl: 3600, value: 'v=spf1 include:_spf.example.com ~all', status: 'Active' },
    { id: 5, name: 'example.com', type: 'NS', ttl: 86400, value: 'ns1.example.com', status: 'Active' },
    { id: 6, name: '_dmarc.example.com', type: 'TXT', ttl: 3600, value: 'v=DMARC1; p=reject; rua=mailto:dmarc@example.com', status: 'Active' },
    { id: 7, name: 'example.com', type: 'SOA', ttl: 86400, value: 'ns1.example.com. admin.example.com. 2023072601 10800 3600 604800 86400', status: 'Active' },
  ];

  // AI suggestions
  const aiSuggestions = [
    { id: 1, type: 'Performance', description: 'Lower TTL for api.example.com to improve failover speed (currently 3600s, recommend 600s)' },
    { id: 2, type: 'Security', description: 'Add DKIM record for enhanced email authentication' },
    { id: 3, type: 'Configuration', description: 'Consider adding IPv6 (AAAA) records for primary domains' },
  ];

  const filteredRecords = zoneRecords.filter(record => {
    const matchesSearch = record.name.includes(searchQuery) || 
                          record.value.includes(searchQuery);
    const matchesType = recordTypeFilter === 'all' || record.type === recordTypeFilter;
    return matchesSearch && matchesType;
  });

  const handleCreateZone = () => {
    toast({
      title: "Create DNS Zone",
      description: "DNS Zone creation dialog will be implemented in a future prompt.",
    });
  };

  const handleImportRecords = () => {
    toast({
      title: "Import Records",
      description: "Bulk import functionality will be implemented in a future prompt.",
    });
  };

  const handleExportRecords = () => {
    toast({
      title: "Export Records",
      description: "Records export functionality will be implemented in a future prompt.",
    });
  };

  const handleRefreshRecords = () => {
    toast({
      title: "Records Refreshed",
      description: "DNS records have been refreshed successfully.",
    });
  };

  const handleApplySuggestion = (id: number) => {
    toast({
      title: "AI Suggestion Applied",
      description: `Suggestion #${id} has been applied to your DNS configuration.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-1">DNS Zones & Records</h2>
          <p className="text-muted-foreground">Manage your DNS zones, records, and configurations</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleCreateZone} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>Create Zone</span>
          </Button>
          <Button variant="outline" onClick={handleImportRecords} className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            <span>Import</span>
          </Button>
          <Button variant="outline" onClick={handleExportRecords} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button variant="outline" onClick={handleRefreshRecords} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="zones" className="space-y-4">
        <TabsList>
          <TabsTrigger value="zones" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>DNS Zones</span>
          </TabsTrigger>
          <TabsTrigger value="records" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>DNS Records</span>
          </TabsTrigger>
          <TabsTrigger value="reverse" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span>Reverse DNS</span>
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span>AI Suggestions</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="zones" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <Tabs value={activeZonesTab} onValueChange={setActiveZonesTab} className="space-y-4">
                <TabsList>
                  <TabsTrigger value="all">All Zones</TabsTrigger>
                  <TabsTrigger value="primary">Primary</TabsTrigger>
                  <TabsTrigger value="secondary">Secondary</TabsTrigger>
                  <TabsTrigger value="forwarding">Forwarding</TabsTrigger>
                  <TabsTrigger value="internal">Internal</TabsTrigger>
                  <TabsTrigger value="external">External</TabsTrigger>
                </TabsList>
                <div className="space-y-4">
                  <DnsZoneList />
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="records" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search records..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Select value={recordTypeFilter} onValueChange={setRecordTypeFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Record Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Record Types</SelectItem>
                      <SelectItem value="A">A Records</SelectItem>
                      <SelectItem value="AAAA">AAAA Records</SelectItem>
                      <SelectItem value="CNAME">CNAME Records</SelectItem>
                      <SelectItem value="MX">MX Records</SelectItem>
                      <SelectItem value="TXT">TXT Records</SelectItem>
                      <SelectItem value="NS">NS Records</SelectItem>
                      <SelectItem value="SOA">SOA Records</SelectItem>
                      <SelectItem value="SRV">SRV Records</SelectItem>
                      <SelectItem value="PTR">PTR Records</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>TTL</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRecords.map(record => (
                      <TableRow key={`${record.id}-${record.type}`}>
                        <TableCell className="font-medium">{record.name}</TableCell>
                        <TableCell>{record.type}</TableCell>
                        <TableCell>{record.ttl}s</TableCell>
                        <TableCell className="max-w-[300px] truncate">{record.value}</TableCell>
                        <TableCell>{record.status}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">Edit</Button>
                            <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reverse" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-muted-foreground py-8">
                <Server className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Reverse DNS Configuration</h3>
                <p className="max-w-md mx-auto mb-4">
                  Configure PTR records to map IP addresses to domain names for email 
                  authentication and network services.
                </p>
                <Button>Configure Reverse DNS</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">AI-Driven DNS Optimization Suggestions</h3>
              
              <div className="space-y-4">
                {aiSuggestions.map(suggestion => (
                  <div key={suggestion.id} className="border rounded-lg p-4 flex justify-between items-start">
                    <div>
                      <div className="font-medium mb-1">{suggestion.type} Suggestion</div>
                      <div className="text-sm text-muted-foreground">{suggestion.description}</div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="ml-4"
                      onClick={() => handleApplySuggestion(suggestion.id)}
                    >
                      Apply
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DNSZones;
