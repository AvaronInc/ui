
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, RotateCcw, Search, Calendar, FileDown, Tag, Database, HardDrive, Cloud } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

// Mock data for backup history
const mockBackups = [
  {
    id: 'bk-001',
    timestamp: '2023-11-15T08:00:00',
    locations: ['local', 'vertexvault'],
    status: 'success',
    size: '15.4 MB',
    version: 'v1.0.14'
  },
  {
    id: 'bk-002',
    timestamp: '2023-11-14T08:00:00',
    locations: ['local', 'vertexvault', 'wasabi'],
    status: 'success',
    size: '15.2 MB',
    version: 'v1.0.13'
  },
  {
    id: 'bk-003',
    timestamp: '2023-11-13T08:00:00',
    locations: ['local', 'vertexvault'],
    status: 'success',
    size: '15.2 MB',
    version: 'v1.0.12'
  },
  {
    id: 'bk-004',
    timestamp: '2023-11-12T08:00:00',
    locations: ['vertexvault', 'wasabi'],
    status: 'success',
    size: '15.1 MB',
    version: 'v1.0.11'
  },
  {
    id: 'bk-005',
    timestamp: '2023-11-11T08:00:00',
    locations: ['local'],
    status: 'failed',
    size: '0 KB',
    version: 'v1.0.10'
  },
  {
    id: 'bk-006',
    timestamp: '2023-11-10T08:00:00',
    locations: ['vertexvault', 'wasabi'],
    status: 'success',
    size: '14.9 MB',
    version: 'v1.0.9'
  },
  {
    id: 'bk-007',
    timestamp: '2023-11-09T08:00:00',
    locations: ['local', 'vertexvault'],
    status: 'success',
    size: '14.8 MB',
    version: 'v1.0.8'
  }
];

const BackupHistorySection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [isRestoring, setIsRestoring] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const filteredBackups = mockBackups.filter(backup => {
    const matchesSearch = 
      backup.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      backup.version.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || backup.status === statusFilter;
    
    const matchesLocation = 
      locationFilter === 'all' || 
      backup.locations.includes(locationFilter);
    
    return matchesSearch && matchesStatus && matchesLocation;
  });

  const handleRestore = (backupId: string) => {
    setIsRestoring(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success(`Restored system to backup ${backupId}`);
      setIsRestoring(false);
    }, 2000);
  };

  const handleDownload = (backupId: string) => {
    setIsDownloading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success(`Downloaded backup ${backupId}`);
      setIsDownloading(false);
    }, 1500);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const LocationIcon = ({ location }: { location: string }) => {
    switch (location) {
      case 'local':
        return <HardDrive className="h-4 w-4" />;
      case 'vertexvault':
        return <Database className="h-4 w-4" />;
      case 'wasabi':
        return <Cloud className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Backup History
          </CardTitle>
          <CardDescription>
            Browse and manage system configuration backups
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search backups..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="local">Local Storage</SelectItem>
                <SelectItem value="vertexvault">VertexVault</SelectItem>
                <SelectItem value="wasabi">Wasabi Cloud</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Storage Locations</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBackups.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No backups found matching your filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBackups.map((backup) => (
                    <TableRow key={backup.id}>
                      <TableCell>
                        {formatDate(backup.timestamp)}
                      </TableCell>
                      <TableCell className="flex items-center gap-1.5">
                        <Tag className="h-4 w-4 text-primary" />
                        {backup.version}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1.5">
                          {backup.locations.map(location => (
                            <Badge 
                              key={location}
                              variant="outline"
                              className="flex items-center gap-1 py-0.5"
                            >
                              <LocationIcon location={location} />
                              {location === 'local' && 'Local'}
                              {location === 'vertexvault' && 'VertexVault'}
                              {location === 'wasabi' && 'Wasabi'}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {backup.status === 'success' ? (
                          <Badge className="bg-green-500">Success</Badge>
                        ) : (
                          <Badge variant="destructive">Failed</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {backup.size}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownload(backup.id)}
                            disabled={isDownloading || backup.status === 'failed'}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRestore(backup.id)}
                            disabled={isRestoring || backup.status === 'failed'}
                          >
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BackupHistorySection;
