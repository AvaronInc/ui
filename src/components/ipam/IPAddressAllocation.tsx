
import React, { useState } from 'react';
import { IPAddress } from '@/types/ipam';
import IPAddressList from './IPAddressList';
import IPDetailPanel from './IPDetailPanel';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Search, Filter, ArrowDownUp, CheckCircle, AlertTriangle, Circle, Archive } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface IPAddressAllocationProps {
  ipAddresses: IPAddress[];
  onIPSelect: (ip: IPAddress) => void;
  selectedIP: IPAddress | null;
}

const IPAddressAllocation: React.FC<IPAddressAllocationProps> = ({
  ipAddresses,
  onIPSelect,
  selectedIP
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [subnetFilter, setSubnetFilter] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Get unique subnet values for filter
  const subnets = Array.from(new Set(ipAddresses.map(ip => ip.subnet)));

  // Filter and sort IPs
  const filteredIPs = ipAddresses.filter(ip => {
    // Apply status filter
    if (statusFilter && ip.status !== statusFilter) {
      return false;
    }
    
    // Apply subnet filter
    if (subnetFilter && ip.subnet !== subnetFilter) {
      return false;
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        ip.address.toLowerCase().includes(query) ||
        (ip.deviceName?.toLowerCase().includes(query) || false) ||
        (ip.assignedUser?.toLowerCase().includes(query) || false)
      );
    }
    
    return true;
  });

  // Sort IPs
  const sortedIPs = [...filteredIPs].sort((a, b) => {
    const ipA = a.address.split('.').map(octet => parseInt(octet, 10));
    const ipB = b.address.split('.').map(octet => parseInt(octet, 10));
    
    for (let i = 0; i < 4; i++) {
      if (ipA[i] !== ipB[i]) {
        return sortOrder === 'asc' ? ipA[i] - ipB[i] : ipB[i] - ipA[i];
      }
    }
    
    return 0;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">IP Address Search & Filtering</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by IP, device name, or user..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="h-10 w-10 flex-shrink-0"
                title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
              >
                <ArrowDownUp className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="flex items-center mb-1.5 gap-1.5">
                  <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Status</span>
                </div>
                <Select value={statusFilter || ''} onValueChange={(value) => setStatusFilter(value || null)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="in-use">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-warning" />
                        <span>In Use</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="available">
                      <div className="flex items-center gap-2">
                        <Circle className="h-3.5 w-3.5 text-success" />
                        <span>Available</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="conflict">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-3.5 w-3.5 text-destructive" />
                        <span>Conflict</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center mb-1.5 gap-1.5">
                  <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Subnet</span>
                </div>
                <Select value={subnetFilter || ''} onValueChange={(value) => setSubnetFilter(value || null)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by subnet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Subnets</SelectItem>
                    {subnets.map((subnet) => (
                      <SelectItem key={subnet} value={subnet}>
                        {subnet}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex gap-2 text-muted-foreground text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-warning"></div>
                <span>In Use: {ipAddresses.filter(ip => ip.status === 'in-use').length}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-success"></div>
                <span>Available: {ipAddresses.filter(ip => ip.status === 'available').length}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-destructive"></div>
                <span>Conflict: {ipAddresses.filter(ip => ip.status === 'conflict').length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <IPAddressList 
          ipAddresses={sortedIPs} 
          onIPSelect={onIPSelect}
          selectedIP={selectedIP}
        />
      </div>
      
      <div>
        <IPDetailPanel 
          ip={selectedIP} 
          onClose={() => onIPSelect(null)} 
        />
      </div>
    </div>
  );
};

export default IPAddressAllocation;
