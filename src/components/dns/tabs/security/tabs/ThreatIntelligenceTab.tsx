
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ThreatIntelligence } from '../types';

const ThreatIntelligenceTab: React.FC = () => {
  const { toast } = useToast();
  const [threatFeedEnabled, setThreatFeedEnabled] = useState(true);
  const [searchDomain, setSearchDomain] = useState('');
  
  // Sample threat intelligence data
  const threatIntelligence: ThreatIntelligence[] = [
    { id: 1, domain: 'malicious-site.xyz', category: 'Malware', lastSeen: '2 hours ago', riskScore: 92, action: 'Blocked' },
    { id: 2, domain: 'phishing-attempt.com', category: 'Phishing', lastSeen: '4 hours ago', riskScore: 88, action: 'Blocked' },
    { id: 3, domain: 'suspicious-domain.ru', category: 'Suspicious', lastSeen: '1 day ago', riskScore: 75, action: 'Warned' },
    { id: 4, domain: 'data-exfil.cn', category: 'Data Exfiltration', lastSeen: '3 days ago', riskScore: 95, action: 'Blocked' },
    { id: 5, domain: 'ransomware-c2.net', category: 'C2', lastSeen: '12 hours ago', riskScore: 98, action: 'Blocked' },
  ];

  const handleToggleThreatFeed = () => {
    setThreatFeedEnabled(!threatFeedEnabled);
    toast({
      title: threatFeedEnabled ? "Threat Feed Disabled" : "Threat Feed Enabled",
      description: threatFeedEnabled 
        ? "Real-time threat intelligence feed integration has been disabled." 
        : "Real-time threat intelligence feed integration has been enabled.",
    });
  };

  return (
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
  );
};

export default ThreatIntelligenceTab;
