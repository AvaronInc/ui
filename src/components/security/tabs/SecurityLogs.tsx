
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { FileSearch, Search, Filter, Download, BarChart, Network, Maximize2, Clock, FileX } from 'lucide-react';
import SecurityLogsList from '../components/SecurityLogsList';
import ForensicTimeline from '../components/ForensicTimeline';
import AttackPathVisualization from '../components/AttackPathVisualization';

const SecurityLogs: React.FC = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState('log-analysis');
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleExportLogs = () => {
    toast({
      title: "Logs Exported",
      description: "Security logs have been exported successfully.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Security Logs & Forensics</h2>
          <p className="text-muted-foreground">
            Deep log analysis and forensic investigation
          </p>
        </div>
        <Button size="sm" onClick={handleExportLogs}>
          <Download className="mr-2 h-4 w-4" />
          Export Logs
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Log Search & Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search security logs..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="firewall">Firewall</SelectItem>
                  <SelectItem value="endpoint">Endpoints</SelectItem>
                  <SelectItem value="server">Servers</SelectItem>
                  <SelectItem value="network">Network</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="all">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="24h">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">Last Hour</SelectItem>
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="secondary" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>More Filters</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="log-analysis" value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="log-analysis" className="flex items-center gap-2">
            <FileSearch className="h-4 w-4" />
            <span>Log Analysis</span>
          </TabsTrigger>
          <TabsTrigger value="forensics" className="flex items-center gap-2">
            <Maximize2 className="h-4 w-4" />
            <span>Forensic Investigation</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="log-analysis">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Log Explorer</CardTitle>
                <CardDescription>
                  Centralized logs from all security sources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SecurityLogsList searchQuery={searchQuery} />
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  Showing 1-50 of 1,234 logs
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </CardFooter>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart className="mr-2 h-5 w-5" />
                    Top Event Types
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Authentication Failure</TableCell>
                        <TableCell className="text-right">47%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Firewall Block</TableCell>
                        <TableCell className="text-right">23%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Malware Detection</TableCell>
                        <TableCell className="text-right">15%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Config Change</TableCell>
                        <TableCell className="text-right">8%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Suspicious Activity</TableCell>
                        <TableCell className="text-right">7%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Network className="mr-2 h-5 w-5" />
                    Top Source IPs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">192.168.1.105</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="outline" className="bg-red-100 text-red-800">34</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">10.0.0.15</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="outline" className="bg-amber-100 text-amber-800">27</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">203.0.113.42</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="outline" className="bg-amber-100 text-amber-800">21</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">172.16.0.8</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="outline" className="bg-blue-100 text-blue-800">18</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">8.8.8.8</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="outline" className="bg-blue-100 text-blue-800">15</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    Event Timing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">00:00 - 06:00</TableCell>
                        <TableCell className="text-right">14%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">06:00 - 12:00</TableCell>
                        <TableCell className="text-right">22%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">12:00 - 18:00</TableCell>
                        <TableCell className="text-right">37%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">18:00 - 00:00</TableCell>
                        <TableCell className="text-right">27%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium font-bold">Peak Hour</TableCell>
                        <TableCell className="text-right font-bold">14:00 - 15:00</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="forensics">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Forensic Timeline</CardTitle>
                <CardDescription>
                  AI-powered log correlation for incident reconstruction
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ForensicTimeline />
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileX className="mr-2 h-5 w-5" />
                    File Integrity Monitoring
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>File Path</TableHead>
                        <TableHead>Change Type</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>User</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">/etc/passwd</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-red-100 text-red-800">Modified</Badge>
                        </TableCell>
                        <TableCell>15:42</TableCell>
                        <TableCell>root</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">/var/www/html/index.php</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-red-100 text-red-800">Modified</Badge>
                        </TableCell>
                        <TableCell>15:38</TableCell>
                        <TableCell>www-data</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">/opt/malware.bin</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-amber-100 text-amber-800">Created</Badge>
                        </TableCell>
                        <TableCell>15:35</TableCell>
                        <TableCell>unknown</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">/etc/shadow</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-100 text-blue-800">Accessed</Badge>
                        </TableCell>
                        <TableCell>15:33</TableCell>
                        <TableCell>root</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View All File Changes</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Network className="mr-2 h-5 w-5" />
                    Attack Path Visualization
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[250px]">
                  <AttackPathVisualization />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Analyze Attack Flow</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityLogs;
