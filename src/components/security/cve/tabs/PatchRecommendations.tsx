
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Shield, AlertTriangle, ThumbsUp, ThumbsDown, Cpu, Clock } from 'lucide-react';

type PatchRecommendation = {
  id: string;
  cveId: string;
  systemsCount: number;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  riskRating: number;
  aiJustification: string;
  estimatedTime: string;
  requiresReboot: boolean;
  systemsAffected: string[];
};

const mockPatchRecommendations: PatchRecommendation[] = [
  {
    id: '1',
    cveId: 'CVE-2023-45178',
    systemsCount: 12,
    severity: 'Critical',
    riskRating: 9.8,
    aiJustification: 'This OpenSSL vulnerability enables remote code execution. With 12 servers exposed, the risk level is extreme. Immediate patching is recommended as there are active exploits in the wild targeting this vulnerability.',
    estimatedTime: '25 minutes',
    requiresReboot: true,
    systemsAffected: ['Web Server 01', 'Web Server 02', 'API Gateway', 'Load Balancer']
  },
  {
    id: '2',
    cveId: 'CVE-2023-38408',
    systemsCount: 3,
    severity: 'High',
    riskRating: 8.2,
    aiJustification: 'Authentication bypass vulnerability affecting identity services. Although only 3 systems are affected, these are critical authentication servers. Prioritize this patch as it could lead to unauthorized account access.',
    estimatedTime: '15 minutes',
    requiresReboot: false,
    systemsAffected: ['Auth Service 01', 'SSO Provider', 'Identity Management']
  },
  {
    id: '3',
    cveId: 'CVE-2023-29200',
    systemsCount: 5,
    severity: 'Medium',
    riskRating: 6.5,
    aiJustification: 'PostgreSQL privilege escalation vulnerability. Risk is mitigated by limited access to database servers and network segmentation. Schedule this during the next maintenance window.',
    estimatedTime: '20 minutes',
    requiresReboot: true,
    systemsAffected: ['Database Server 01', 'Database Server 02', 'Data Warehouse']
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
            AI-Generated Patch Recommendations
          </h2>
          <p className="text-sm text-muted-foreground">
            Prioritized patching list based on risk assessment and system impact
          </p>
        </div>
      </div>

      {mockPatchRecommendations.map((patch) => (
        <Card key={patch.id} className={`overflow-hidden border-l-4 ${
          patch.severity === 'Critical' ? 'border-l-red-500' :
          patch.severity === 'High' ? 'border-l-orange-500' :
          patch.severity === 'Medium' ? 'border-l-yellow-500' : 'border-l-blue-500'
        }`}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <a href={`https://nvd.nist.gov/vuln/detail/${patch.cveId}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {patch.cveId}
                  </a>
                  <Badge className={getSeverityColor(patch.severity)}>
                    {patch.severity}
                  </Badge>
                </CardTitle>
                <CardDescription className="mt-1">
                  <span className="flex items-center gap-1">
                    <Cpu className="h-4 w-4" />
                    Affects {patch.systemsCount} systems in your environment
                  </span>
                </CardDescription>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1 bg-green-500/10 text-green-500 hover:bg-green-500/20 hover:text-green-500">
                  <ThumbsUp className="h-4 w-4" />
                  Approve
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1 bg-destructive/10 text-destructive hover:bg-destructive/20 hover:text-destructive">
                  <ThumbsDown className="h-4 w-4" />
                  Reject
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">AI Risk Justification</div>
                <div className="bg-slate-800 rounded-md p-3 text-sm">
                  {patch.aiJustification}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Risk Rating</div>
                  <div className="font-medium flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    {patch.riskRating}/10
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Estimated Time</div>
                  <div className="font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    {patch.estimatedTime}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Requires Reboot</div>
                  <div className="font-medium">
                    {patch.requiresReboot ? (
                      <span className="text-red-500">Yes</span>
                    ) : (
                      <span className="text-green-500">No</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-muted-foreground mb-1">Affected Systems</div>
                <div className="flex flex-wrap gap-2">
                  {patch.systemsAffected.map((system, index) => (
                    <Badge key={index} variant="outline" className="bg-slate-800">
                      {system}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PatchRecommendations;
