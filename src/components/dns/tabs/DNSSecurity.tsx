
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  Shield,
  Lock,
  AlertTriangle,
  Radio,
  ShieldCheck,
  List,
  Database,
  Eye,
  Bot,
  BarChart3,
  Zap,
  KeyRound,
  Fingerprint,
  Globe,
  ListFilter
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const DNSSecurity: React.FC = () => {
  const { toast } = useToast();
  const [activeSecurityTab, setActiveSecurityTab] = useState("dnssec");
  const [searchDomain, setSearchDomain] = useState('');
  const [dnssecEnabled, setDnssecEnabled] = useState(true);
  const [enableQuantumSecurity, setEnableQuantumSecurity] = useState(false);
  const [threatFeedEnabled, setThreatFeedEnabled] = useState(true);
  const [aiAnomalyDetection, setAiAnomalyDetection] = useState(true);
  
  // Sample threat intelligence data
  const threatIntelligence = [
    { id: 1, domain: 'malicious-site.xyz', category: 'Malware', lastSeen: '2 hours ago', riskScore: 92, action: 'Blocked' },
    { id: 2, domain: 'phishing-attempt.com', category: 'Phishing', lastSeen: '4 hours ago', riskScore: 88, action: 'Blocked' },
    { id: 3, domain: 'suspicious-domain.ru', category: 'Suspicious', lastSeen: '1 day ago', riskScore: 75, action: 'Warned' },
    { id: 4, domain: 'data-exfil.cn', category: 'Data Exfiltration', lastSeen: '3 days ago', riskScore: 95, action: 'Blocked' },
    { id: 5, domain: 'ransomware-c2.net', category: 'C2', lastSeen: '12 hours ago', riskScore: 98, action: 'Blocked' },
  ];

  // Sample blocklisted TLDs
  const blockedTlds = ['.xyz', '.ru', '.pw', '.cn', '.su'];
  
  // Sample DNS anomalies
  const dnsAnomalies = [
    { id: 1, type: 'DNS Tunneling', source: '192.168.1.23', destination: 'tunnel.maliciousdomain.com', timestamp: '2023-07-15 14:23:45', status: 'Blocked' },
    { id: 2, type: 'Excessive Queries', source: '192.168.1.45', destination: 'Multiple', timestamp: '2023-07-15 16:12:33', status: 'Warned' },
    { id: 3, type: 'Pattern Anomaly', source: '192.168.1.102', destination: 'random.domain.net', timestamp: '2023-07-14 09:45:22', status: 'Monitoring' },
  ];

  // Sample DNSSEC events
  const dnssecEvents = [
    { id: 1, event: 'Key Rotation', zone: 'company.com', timestamp: '2023-07-10 00:00:00', status: 'Completed' },
    { id: 2, event: 'Signature Refresh', zone: 'internal.company.com', timestamp: '2023-07-15 00:00:00', status: 'Completed' },
    { id: 3, event: 'DNSKEY Published', zone: 'api.company.com', timestamp: '2023-07-01 00:00:00', status: 'Completed' },
  ];

  const handleToggleDNSSEC = () => {
    setDnssecEnabled(!dnssecEnabled);
    toast({
      title: dnssecEnabled ? "DNSSEC Disabled" : "DNSSEC Enabled",
      description: dnssecEnabled ? "Digital signing of DNS records has been disabled." : "Digital signing of DNS records has been enabled.",
    });
  };

  const handleToggleQuantumSecurity = () => {
    setEnableQuantumSecurity(!enableQuantumSecurity);
    toast({
      title: enableQuantumSecurity ? "Quantum Security Disabled" : "Quantum Security Enabled",
      description: enableQuantumSecurity 
        ? "Kyber-based post-quantum cryptography for DNSSEC has been disabled." 
        : "Kyber-based post-quantum cryptography for DNSSEC has been enabled.",
    });
  };

  const handleToggleThreatFeed = () => {
    setThreatFeedEnabled(!threatFeedEnabled);
    toast({
      title: threatFeedEnabled ? "Threat Feed Disabled" : "Threat Feed Enabled",
      description: threatFeedEnabled 
        ? "Real-time threat intelligence feed integration has been disabled." 
        : "Real-time threat intelligence feed integration has been enabled.",
    });
  };

  const handleToggleAIAnomaly = () => {
    setAiAnomalyDetection(!aiAnomalyDetection);
    toast({
      title: aiAnomalyDetection ? "AI Anomaly Detection Disabled" : "AI Anomaly Detection Enabled",
      description: aiAnomalyDetection 
        ? "AI-based DNS anomaly detection has been disabled." 
        : "AI-based DNS anomaly detection has been enabled.",
    });
  };

  const handleForceKeyRotation = () => {
    toast({
      title: "DNSSEC Key Rotation Initiated",
      description: "DNSSEC keys are being rotated. This process may take a few minutes to complete.",
    });
  };

  const handleRunSecurityScan = () => {
    toast({
      title: "DNS Security Scan Initiated",
      description: "Running comprehensive security scan on all DNS zones and records.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-1">DNS Security & Compliance</h2>
          <p className="text-muted-foreground">Enhance DNS security and ensure regulatory compliance</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleRunSecurityScan} className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Run Security Scan</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="dnssec" value={activeSecurityTab} onValueChange={setActiveSecurityTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="dnssec" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span>DNSSEC</span>
          </TabsTrigger>
          <TabsTrigger value="anomaly" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Anomaly Detection</span>
          </TabsTrigger>
          <TabsTrigger value="intelligence" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span>Threat Intelligence</span>
          </TabsTrigger>
          <TabsTrigger value="blocklists" className="flex items-center gap-2">
            <ListFilter className="h-4 w-4" />
            <span>Blocklists & Allowlists</span>
          </TabsTrigger>
          <TabsTrigger value="firewall" className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            <span>DNS Firewall</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dnssec" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-medium">DNSSEC Configuration</h3>
                    <p className="text-sm text-muted-foreground">Digitally sign DNS records to prevent DNS spoofing and cache poisoning attacks</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>{dnssecEnabled ? 'Enabled' : 'Disabled'}</span>
                    <Switch checked={dnssecEnabled} onCheckedChange={handleToggleDNSSEC} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium flex items-center gap-2">
                        <KeyRound className="h-4 w-4" />
                        Key Management
                      </h4>
                      <div className="rounded-md border p-4 space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">ZSK Key Length</span>
                            <span className="text-sm font-medium">2048 bits</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">KSK Key Length</span>
                            <span className="text-sm font-medium">4096 bits</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Next Key Rotation</span>
                            <span className="text-sm font-medium">23 days</span>
                          </div>
                        </div>
                        <Button variant="outline" onClick={handleForceKeyRotation} className="w-full">
                          Force Key Rotation
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium flex items-center gap-2">
                        <Fingerprint className="h-4 w-4" />
                        Post-Quantum Security
                      </h4>
                      <div className="rounded-md border p-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm">Kyber-based encryption</p>
                            <p className="text-xs text-muted-foreground">Provides protection against quantum computing attacks</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs">{enableQuantumSecurity ? 'Enabled' : 'Disabled'}</span>
                            <Switch checked={enableQuantumSecurity} onCheckedChange={handleToggleQuantumSecurity} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium flex items-center gap-2">
                        <Database className="h-4 w-4" />
                        Recent DNSSEC Events
                      </h4>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Event</TableHead>
                              <TableHead>Zone</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {dnssecEvents.map((event) => (
                              <TableRow key={event.id}>
                                <TableCell className="font-medium">{event.event}</TableCell>
                                <TableCell>{event.zone}</TableCell>
                                <TableCell>
                                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                    {event.status}
                                  </span>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Signed Zones Status</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>External Zones</span>
                            <span>12/12 Signed</span>
                          </div>
                          <Progress value={100} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Internal Zones</span>
                            <span>8/10 Signed</span>
                          </div>
                          <Progress value={80} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="anomaly" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-medium">AI-Based DNS Anomaly Detection</h3>
                    <p className="text-sm text-muted-foreground">Detect DNS tunneling, malware C2 traffic, and suspicious queries</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>{aiAnomalyDetection ? 'Enabled' : 'Disabled'}</span>
                    <Switch checked={aiAnomalyDetection} onCheckedChange={handleToggleAIAnomaly} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        Detection Capabilities
                      </h4>
                      <div className="rounded-md border p-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">DNS Tunneling Detection</span>
                          <Switch checked={true} />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Command & Control Detection</span>
                          <Switch checked={true} />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Data Exfiltration Detection</span>
                          <Switch checked={true} />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Excessive Query Detection</span>
                          <Switch checked={true} />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Pattern Anomaly Detection</span>
                          <Switch checked={true} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium flex items-center gap-2">
                        <Bot className="h-4 w-4" />
                        Recent Anomalies
                      </h4>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Type</TableHead>
                              <TableHead>Source</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {dnsAnomalies.map((anomaly) => (
                              <TableRow key={anomaly.id}>
                                <TableCell className="font-medium">{anomaly.type}</TableCell>
                                <TableCell>{anomaly.source}</TableCell>
                                <TableCell>
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    anomaly.status === 'Blocked' 
                                      ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                      : anomaly.status === 'Warned'
                                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                  }`}>
                                    {anomaly.status}
                                  </span>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="intelligence" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-medium">Threat Intelligence Integration</h3>
                    <p className="text-sm text-muted-foreground">Real-time updates from industry-leading threat feeds</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>{threatFeedEnabled ? 'Enabled' : 'Disabled'}</span>
                    <Switch checked={threatFeedEnabled} onCheckedChange={handleToggleThreatFeed} />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-4 items-center">
                    <Input 
                      placeholder="Search domains..."
                      value={searchDomain}
                      onChange={(e) => setSearchDomain(e.target.value)}
                      className="max-w-sm"
                    />
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="malware">Malware</SelectItem>
                        <SelectItem value="phishing">Phishing</SelectItem>
                        <SelectItem value="c2">Command & Control</SelectItem>
                        <SelectItem value="ransomware">Ransomware</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Domain</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Risk Score</TableHead>
                          <TableHead>Last Seen</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {threatIntelligence
                          .filter(threat => 
                            threat.domain.toLowerCase().includes(searchDomain.toLowerCase()) ||
                            threat.category.toLowerCase().includes(searchDomain.toLowerCase())
                          )
                          .map((threat) => (
                          <TableRow key={threat.id}>
                            <TableCell className="font-medium">{threat.domain}</TableCell>
                            <TableCell>{threat.category}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={threat.riskScore} className="w-[60px] h-2" />
                                <span className="text-sm">{threat.riskScore}</span>
                              </div>
                            </TableCell>
                            <TableCell>{threat.lastSeen}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                threat.action === 'Blocked' 
                                  ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                              }`}>
                                {threat.action}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blocklists" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">TLD Blocklist</h3>
                    <div className="rounded-md border p-4">
                      <div className="space-y-3">
                        {blockedTlds.map((tld, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm">{tld}</span>
                            <Button variant="ghost" size="sm" className="text-destructive">
                              Remove
                            </Button>
                          </div>
                        ))}
                        <div className="pt-3 border-t">
                          <Input placeholder="Add new TLD (e.g., .xyz)" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Domain Allowlist</h3>
                    <div className="rounded-md border p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">*.office365.com</span>
                          <Button variant="ghost" size="sm" className="text-destructive">
                            Remove
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">*.google.com</span>
                          <Button variant="ghost" size="sm" className="text-destructive">
                            Remove
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">*.salesforce.com</span>
                          <Button variant="ghost" size="sm" className="text-destructive">
                            Remove
                          </Button>
                        </div>
                        <div className="pt-3 border-t">
                          <Input placeholder="Add domain to allowlist" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="firewall" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">DNS Firewall Rules</h3>
                  <p className="text-sm text-muted-foreground">Configure custom rules to prevent DNS-based attacks and data exfiltration</p>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Rule Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Pattern</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Block Long DNS Queries</TableCell>
                        <TableCell>Query Length</TableCell>
                        <TableCell>&gt; 200 characters</TableCell>
                        <TableCell>Block</TableCell>
                        <TableCell>
                          <Switch checked={true} />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Rate Limit DNS Queries</TableCell>
                        <TableCell>Query Rate</TableCell>
                        <TableCell>&gt; 100/min per IP</TableCell>
                        <TableCell>Rate Limit</TableCell>
                        <TableCell>
                          <Switch checked={true} />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Block Non-Standard Ports</TableCell>
                        <TableCell>Port</TableCell>
                        <TableCell>!= 53</TableCell>
                        <TableCell>Block</TableCell>
                        <TableCell>
                          <Switch checked={true} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <Button className="w-full">
                  Add New Rule
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DNSSecurity;
