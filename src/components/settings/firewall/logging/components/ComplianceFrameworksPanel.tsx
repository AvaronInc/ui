
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

// Mock data
const complianceFrameworks = [
  { id: 1, name: 'PCI-DSS', enabled: true, version: '4.0', requirements: 12, requirementsCompleted: 11 },
  { id: 2, name: 'GDPR', enabled: true, version: '2018', requirements: 10, requirementsCompleted: 10 },
  { id: 3, name: 'SOC 2', enabled: true, version: 'Type II', requirements: 5, requirementsCompleted: 5 },
  { id: 4, name: 'HIPAA', enabled: true, version: '2023', requirements: 8, requirementsCompleted: 7 },
  { id: 5, name: 'NIST 800-53', enabled: true, version: 'Rev. 5', requirements: 20, requirementsCompleted: 19 },
  { id: 6, name: 'ISO 27001', enabled: false, version: '2022', requirements: 14, requirementsCompleted: 0 },
];

const ComplianceFrameworksPanel: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Compliance Frameworks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {complianceFrameworks.map((framework) => (
            <div key={framework.id} className="flex justify-between items-center border p-3 rounded-md">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{framework.name}</h4>
                  <Badge variant="outline" className="text-xs">v{framework.version}</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{framework.requirementsCompleted} of {framework.requirements} requirements met</span>
                  <Progress value={(framework.requirementsCompleted / framework.requirements) * 100} className="h-1.5 w-16" />
                </div>
              </div>
              <Switch checked={framework.enabled} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceFrameworksPanel;
