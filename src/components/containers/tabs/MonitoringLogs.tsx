
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Download, RefreshCw, AlertCircle, Clock, FileText } from 'lucide-react';
import { useContainersData } from '@/components/containers/hooks/useContainersData';
import { ResourceMonitoringChart } from '../charts/ResourceMonitoringChart';

const MonitoringLogs = () => {
  const { containers, logs } = useContainersData();
  const [selectedContainer, setSelectedContainer] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [logLevel, setLogLevel] = useState('all');
  
  // Filter logs based on search query and log level
  const filteredLogs = logs.filter(log => {
    const matchesSearch = searchQuery ? 
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) || 
      log.container.toLowerCase().includes(searchQuery.toLowerCase()) :
      true;
    
    const matchesLevel = logLevel === 'all' ? true : log.level === logLevel;
    
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Container Resource Monitoring</CardTitle>
            <CardDescription>
              Real-time resource usage metrics for your containers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResourceMonitoringChart />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Container Status</CardTitle>
            <CardDescription>
              Current state of all deployed containers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {containers?.map((container, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      container.status === 'running' ? 'bg-green-500' : 
                      container.status === 'stopped' ? 'bg-red-500' : 'bg-amber-500'
                    }`} />
                    <div>
                      <p className="text-sm font-medium">{container.name}</p>
                      <p className="text-xs text-muted-foreground">{container.image}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="text-xs capitalize">{container.status}</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="ml-2" 
                      onClick={() => setSelectedContainer(container.id)}
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Container Logs</CardTitle>
              <CardDescription>
                Search and filter logs from all containers
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Select 
                defaultValue="all"
                onValueChange={value => setLogLevel(value)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Filter by level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="debug">Debug</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search logs..."
                  className="pl-8 md:w-[200px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Time</TableHead>
                  <TableHead className="w-[100px]">Level</TableHead>
                  <TableHead className="w-[150px]">Container</TableHead>
                  <TableHead>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-xs">
                        <span className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {log.timestamp}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          log.level === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                          log.level === 'warning' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
                          log.level === 'info' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                        }`}>
                          {log.level === 'error' && <AlertCircle className="mr-1 h-3 w-3" />}
                          {log.level.charAt(0).toUpperCase() + log.level.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{log.container}</TableCell>
                      <TableCell className="font-mono text-xs">{log.message}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                      No logs found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonitoringLogs;
