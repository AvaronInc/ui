
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertTriangle, AlertCircle } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

type ZeroDayVulnerability = {
  id: string;
  cveId: string;
  description: string;
  discoveryDate: string;
  affectedSystems: string[];
  exploitStatus: 'Active' | 'POC' | 'Theoretical';
  summary: string;
  tracked: boolean;
};

const mockZeroDayVulnerabilities: ZeroDayVulnerability[] = [
  {
    id: '1',
    cveId: 'CVE-2023-45178',
    description: 'Critical remote code execution vulnerability in OpenSSL',
    discoveryDate: '2023-11-05',
    affectedSystems: ['Web Servers', 'API Gateways', 'Load Balancers'],
    exploitStatus: 'Active',
    summary: 'This vulnerability allows attackers to execute arbitrary code remotely through a specially crafted TLS handshake. Exploits have been observed in the wild targeting unpatched systems.',
    tracked: true
  },
  {
    id: '2',
    cveId: 'CVE-2023-38408',
    description: 'Authentication bypass in Identity Management System',
    discoveryDate: '2023-10-22',
    affectedSystems: ['Auth Services', 'SSO Providers'],
    exploitStatus: 'POC',
    summary: 'A vulnerability in the authentication flow allows attackers to bypass multi-factor authentication under specific conditions. Proof-of-concept code has been published but no active exploitation reported.',
    tracked: true
  },
  {
    id: '3',
    cveId: 'CVE-2023-29200',
    description: 'Privilege escalation in PostgreSQL database',
    discoveryDate: '2023-09-15',
    affectedSystems: ['Database Servers', 'Data Warehouses'],
    exploitStatus: 'Theoretical',
    summary: 'A flaw in permission checking allows unauthorized users to escalate privileges in affected databases. Currently only a theoretical vulnerability with no known exploits.',
    tracked: false
  }
];

const getExploitStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-red-500 hover:bg-red-600';
    case 'POC':
      return 'bg-orange-500 hover:bg-orange-600';
    case 'Theoretical':
      return 'bg-blue-500 hover:bg-blue-600';
    default:
      return 'bg-gray-500 hover:bg-gray-600';
  }
};

const ZeroDayWatchlist = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-medium flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Zero-Day Vulnerabilities Watchlist
          </h2>
          <p className="text-sm text-muted-foreground">
            Monitor active zero-day vulnerabilities that may affect your systems
          </p>
        </div>
      </div>

      {mockZeroDayVulnerabilities.map((vulnerability) => (
        <Card key={vulnerability.id} className="overflow-hidden border-l-4 border-l-destructive">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {vulnerability.cveId}
                  <Badge className={getExploitStatusColor(vulnerability.exploitStatus)}>
                    {vulnerability.exploitStatus} Exploit
                  </Badge>
                </CardTitle>
                <CardDescription>{vulnerability.description}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Track this CVE</span>
                <Switch defaultChecked={vulnerability.tracked} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">AI Risk Summary</div>
                <div className="bg-slate-800 rounded-md p-3 text-sm">
                  {vulnerability.summary}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Discovery Date</div>
                  <div className="font-medium">{vulnerability.discoveryDate}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Affected Systems</div>
                  <div className="font-medium">{vulnerability.affectedSystems.join(', ')}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-4">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <span className="text-sm text-destructive">
                  {vulnerability.exploitStatus === 'Active' ? 'Active exploitation detected in the wild' : 
                   vulnerability.exploitStatus === 'POC' ? 'Proof of concept exploit available' : 
                   'Theoretical vulnerability, no known exploits'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ZeroDayWatchlist;
