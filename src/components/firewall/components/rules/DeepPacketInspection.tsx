
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { 
  FileDown, 
  Search, 
  Layers, 
  Shield, 
  Lock, 
  BrainCircuit, 
  BarChart3,
  NetworkIcon,
  Eye,
  EyeOff
} from 'lucide-react';

interface CaptureSession {
  id: string;
  source: string;
  destination: string;
  protocol: string;
  startTime: string;
  duration: string;
  status: 'active' | 'completed';
  packets: number;
  bytes: number;
  encryption: 'strong' | 'weak' | 'none';
  threatScore: number;
}

const DeepPacketInspection = () => {
  const { toast } = useToast();
  const [dpiEnabled, setDpiEnabled] = useState(false);
  const [sessions, setSessions] = useState<CaptureSession[]>([
    {
      id: '1',
      source: '192.168.1.105:53640',
      destination: '93.184.216.34:443',
      protocol: 'HTTPS',
      startTime: '2025-03-20 10:15:22',
      duration: '00:03:45',
      status: 'completed',
      packets: 248,
      bytes: 32580,
      encryption: 'strong',
      threatScore: 0
    },
    {
      id: '2',
      source: '192.168.1.110:49872',
      destination: '8.8.8.8:53',
      protocol: 'DNS',
      startTime: '2025-03-20 10:17:05',
      duration: '00:00:02',
      status: 'completed',
      packets: 4,
      bytes: 512,
      encryption: 'none',
      threatScore: 0
    },
    {
      id: '3',
      source: '192.168.1.120:61234',
      destination: '203.0.113.5:80',
      protocol: 'HTTP',
      startTime: '2025-03-20 10:18:30',
      duration: '00:02:15',
      status: 'completed',
      packets: 156,
      bytes: 24680,
      encryption: 'none',
      threatScore: 35
    },
    {
      id: '4',
      source: '192.168.1.125:52146',
      destination: '198.51.100.23:22',
      protocol: 'SSH',
      startTime: '2025-03-20 10:20:45',
      duration: '00:15:30',
      status: 'active',
      packets: 3456,
      bytes: 458972,
      encryption: 'strong',
      threatScore: 0
    },
    {
      id: '5',
      source: '192.168.1.130:44556',
      destination: '104.18.20.99:443',
      protocol: 'TLS 1.2',
      startTime: '2025-03-20 10:25:18',
      duration: '00:01:48',
      status: 'completed',
      packets: 86,
      bytes: 12450,
      encryption: 'weak',
      threatScore: 65
    }
  ]);

  const handleToggleDPI = () => {
    setDpiEnabled(!dpiEnabled);
    toast({
      title: dpiEnabled ? "DPI Disabled" : "DPI Enabled",
      description: dpiEnabled ? 
        "Deep packet inspection has been disabled." : 
        "Deep packet inspection is now active and monitoring traffic.",
    });
  };

  const exportPCAP = (sessionId: string) => {
    toast({
      title: "PCAP Export Started",
      description: `Exporting session ${sessionId} as PCAP file.`
    });
  };

  const viewSessionDetails = (sessionId: string) => {
    toast({
      title: "Session Details",
      description: `Viewing detailed analysis for session ${sessionId}.`
    });
  };

  const analyzeThreat = (sessionId: string) => {
    toast({
      title: "AI Analysis Initiated",
      description: `Running AI threat analysis on session ${sessionId}.`
    });
  };

  const getThreatBadge = (score: number) => {
    if (score === 0) return <Badge variant="outline">None</Badge>;
    if (score < 30) return <Badge variant="default">Low</Badge>;
    if (score < 70) return <Badge variant="warning">Medium</Badge>;
    return <Badge variant="destructive">High</Badge>;
  };

  const getEncryptionBadge = (encryption: string) => {
    switch (encryption) {
      case 'strong': 
        return <Badge variant="default" className="bg-green-500">Strong</Badge>;
      case 'weak': 
        return <Badge variant="warning">Weak</Badge>;
      case 'none': 
        return <Badge variant="destructive">None</Badge>;
      default: 
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Deep Packet Inspection</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {dpiEnabled ? 'DPI Active' : 'DPI Inactive'}
          </span>
          <Switch 
            checked={dpiEnabled} 
            onCheckedChange={handleToggleDPI} 
            aria-label="Toggle DPI"
          />
          {dpiEnabled ? 
            <Eye className="h-4 w-4 text-green-500" /> : 
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          }
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <CardDescription>Current packet capture sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{sessions.filter(s => s.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground mt-1">Out of {sessions.length} total sessions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Packets Analyzed</CardTitle>
            <CardDescription>Total packets inspected</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {sessions.reduce((acc, session) => acc + session.packets, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {(sessions.reduce((acc, session) => acc + session.bytes, 0) / 1024 / 1024).toFixed(2)} MB of data
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Potential Threats</CardTitle>
            <CardDescription>Sessions with elevated risk scores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {sessions.filter(s => s.threatScore > 0).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {sessions.filter(s => s.threatScore > 50).length} high-priority threats detected
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Captured Sessions</CardTitle>
          <CardDescription>
            View and analyze detailed network traffic sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Protocol</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Encryption</TableHead>
                <TableHead>Threat Score</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell className="font-mono text-xs">{session.source}</TableCell>
                  <TableCell className="font-mono text-xs">{session.destination}</TableCell>
                  <TableCell>{session.protocol}</TableCell>
                  <TableCell>{session.startTime}</TableCell>
                  <TableCell>{session.duration}</TableCell>
                  <TableCell>
                    <Badge variant={session.status === 'active' ? 'default' : 'outline'}>
                      {session.status === 'active' ? 'Active' : 'Completed'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {getEncryptionBadge(session.encryption)}
                  </TableCell>
                  <TableCell>
                    {getThreatBadge(session.threatScore)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => viewSessionDetails(session.id)}
                        title="View Details"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => exportPCAP(session.id)}
                        title="Export PCAP"
                      >
                        <FileDown className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => analyzeThreat(session.id)}
                        title="AI Threat Analysis"
                      >
                        <BrainCircuit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>TLS/SSL Monitoring</CardTitle>
          <CardDescription>
            Monitor TLS/SSL certificate usage and encryption strength
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" />
                  <h4 className="text-sm font-medium">Encryption Overview</h4>
                </div>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Strong Encryption (TLS 1.3, 1.2)</span>
                  <span className="text-sm font-medium">
                    {sessions.filter(s => s.encryption === 'strong').length} sessions
                  </span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-green-500 h-full rounded-full" 
                    style={{ width: `${sessions.filter(s => s.encryption === 'strong').length / sessions.length * 100}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm">Weak Encryption (TLS 1.0, 1.1)</span>
                  <span className="text-sm font-medium">
                    {sessions.filter(s => s.encryption === 'weak').length} sessions
                  </span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-amber-500 h-full rounded-full" 
                    style={{ width: `${sessions.filter(s => s.encryption === 'weak').length / sessions.length * 100}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm">No Encryption (HTTP, FTP)</span>
                  <span className="text-sm font-medium">
                    {sessions.filter(s => s.encryption === 'none').length} sessions
                  </span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-red-500 h-full rounded-full" 
                    style={{ width: `${sessions.filter(s => s.encryption === 'none').length / sessions.length * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <h4 className="text-sm font-medium">Protocol Security</h4>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Protocol</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sessions</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>TLS 1.3</TableCell>
                    <TableCell><Badge variant="default" className="bg-green-500">Secure</Badge></TableCell>
                    <TableCell>2</TableCell>
                    <TableCell><Button variant="outline" size="sm">Allow</Button></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>TLS 1.2</TableCell>
                    <TableCell><Badge variant="default" className="bg-green-500">Secure</Badge></TableCell>
                    <TableCell>1</TableCell>
                    <TableCell><Button variant="outline" size="sm">Allow</Button></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>TLS 1.1</TableCell>
                    <TableCell><Badge variant="warning">Weak</Badge></TableCell>
                    <TableCell>1</TableCell>
                    <TableCell><Button variant="outline" size="sm">Block</Button></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>HTTP</TableCell>
                    <TableCell><Badge variant="destructive">Insecure</Badge></TableCell>
                    <TableCell>1</TableCell>
                    <TableCell><Button variant="outline" size="sm">Block</Button></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-t-4 border-t-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5" />
            AI-Enhanced Threat Analysis
          </CardTitle>
          <CardDescription>
            Advanced machine learning traffic analysis and anomaly detection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">AI Analysis Status</h4>
              <Switch checked={dpiEnabled} onCheckedChange={handleToggleDPI} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Anomaly Detection</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">1</span>
                    <BarChart3 className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Traffic pattern anomalies detected
                  </p>
                  <Button variant="outline" className="w-full mt-2" size="sm">
                    View Details
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Data Exfiltration</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">0</span>
                    <NetworkIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    No suspicious data transfer detected
                  </p>
                  <Button variant="outline" className="w-full mt-2" size="sm">
                    Configure Alerts
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">AI Confidence</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">94%</span>
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Model certainty in detection results
                  </p>
                  <Button variant="outline" className="w-full mt-2" size="sm">
                    Tune Model
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline">
                Configure AI Settings
              </Button>
              <Button>
                Run Full Analysis
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeepPacketInspection;
