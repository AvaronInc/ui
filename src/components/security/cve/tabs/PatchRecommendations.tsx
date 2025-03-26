
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, Check, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

type PatchRecommendation = {
  id: string;
  cveId: string;
  description: string;
  systems: string[];
  patchUrl: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  aiRiskJustification: string;
  requiresAuth: boolean;
  estimatedDowntime: string;
};

const mockPatchRecommendations: PatchRecommendation[] = [
  {
    id: '1',
    cveId: 'CVE-2023-45178',
    description: 'OpenSSL Remote Code Execution',
    systems: ['Web Server 01', 'Web Server 02', 'API Gateway'],
    patchUrl: 'https://security.openssl.org/patches/CVE-2023-45178',
    severity: 'Critical',
    aiRiskJustification: 'This vulnerability allows attackers to execute arbitrary code remotely through a specially crafted TLS handshake. Your affected systems are directly exposed to the internet, increasing risk of successful exploitation.',
    requiresAuth: true,
    estimatedDowntime: '10-15 minutes per system'
  },
  {
    id: '2',
    cveId: 'CVE-2023-38408',
    description: 'Authentication Bypass in Identity Provider',
    systems: ['Auth Service', 'SSO Provider'],
    patchUrl: 'https://auth-system.example.com/security/CVE-2023-38408',
    severity: 'High',
    aiRiskJustification: 'This vulnerability allows bypassing MFA in specific scenarios. Your authentication services handle access to multiple critical systems, making this a high-risk vulnerability that should be addressed promptly.',
    requiresAuth: true,
    estimatedDowntime: '30 minutes for auth systems'
  },
  {
    id: '3',
    cveId: 'CVE-2023-29200',
    description: 'PostgreSQL Privilege Escalation',
    systems: ['Database Server', 'Data Warehouse'],
    patchUrl: 'https://www.postgresql.org/support/security/CVE-2023-29200/',
    severity: 'High',
    aiRiskJustification: 'This vulnerability allows local users to escalate privileges. Your database servers contain sensitive customer data, making this an important patch to apply during the next maintenance window.',
    requiresAuth: false,
    estimatedDowntime: '5-10 minutes per database'
  },
  {
    id: '4',
    cveId: 'CVE-2023-24567',
    description: 'Cross-Site Scripting in Admin Dashboard',
    systems: ['Customer Portal', 'Admin Dashboard'],
    patchUrl: 'https://dashboard.example.com/security/patches/CVE-2023-24567',
    severity: 'Medium',
    aiRiskJustification: 'This XSS vulnerability affects the admin interface. Since your admin dashboard is not publicly accessible and requires VPN access, this is rated as medium priority.',
    requiresAuth: false,
    estimatedDowntime: 'No downtime required'
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'Critical':
      return 'bg-red-500 hover:bg-red-600';
    case 'High':
      return 'bg-orange-500 hover:bg-orange-600';
    case 'Medium':
      return 'bg-yellow-500 hover:bg-yellow-600';
    case 'Low':
      return 'bg-blue-500 hover:bg-blue-600';
    default:
      return 'bg-gray-500 hover:bg-gray-600';
  }
};

const PatchRecommendations = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-medium flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            AI-Prioritized Patch Recommendations
          </h2>
          <p className="text-sm text-muted-foreground">
            Patches are automatically prioritized based on risk level, system exposure, and potential impact
          </p>
        </div>
      </div>

      {mockPatchRecommendations.map((patch) => (
        <Card key={patch.id} className="overflow-hidden">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <CardTitle>
                    {patch.cveId}: {patch.description}
                  </CardTitle>
                  <Badge className={getSeverityColor(patch.severity)}>
                    {patch.severity}
                  </Badge>
                </div>
                <CardDescription>Affected: {patch.systems.join(', ')}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <X className="h-4 w-4" />
                  Reject
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Check className="h-4 w-4" />
                  Approve
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">AI Risk Justification</div>
                <div className="bg-slate-800 rounded-md p-3 text-sm">
                  {patch.aiRiskJustification}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Patch URL</div>
                  <div className="font-medium text-blue-400 hover:underline">
                    <a href={patch.patchUrl} target="_blank" rel="noopener noreferrer">
                      {patch.patchUrl.split('/').slice(-1)[0]}
                    </a>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Estimated Downtime</div>
                  <div className="font-medium">{patch.estimatedDowntime}</div>
                </div>
              </div>
              
              {patch.requiresAuth && (
                <div className="flex items-center gap-2 mt-4">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-yellow-500">
                    VaultID authentication required for this critical patch
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PatchRecommendations;
