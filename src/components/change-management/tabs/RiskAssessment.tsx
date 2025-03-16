
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useChangeManagement } from '@/hooks/use-change-management';
import { AIAssessment, ChangeRequest } from '@/types/change-management';
import RiskScoreCard from '../components/RiskScoreCard';
import { Network } from 'lucide-react';
import DependencyGraph from '../components/DependencyGraph';

const RiskAssessment: React.FC = () => {
  const { changeRequests } = useChangeManagement();
  const [selectedChangeId, setSelectedChangeId] = useState<string>(
    changeRequests.find(c => c.aiAssessment)?.id || ''
  );
  
  const selectedChange = changeRequests.find(c => c.id === selectedChangeId);
  const aiAssessment = selectedChange?.aiAssessment;
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>AI-Based Risk Assessment</CardTitle>
          <CardDescription>
            Automated risk analysis for change requests to evaluate potential impact and identify risks
          </CardDescription>
          <div className="mt-3">
            <Select 
              value={selectedChangeId} 
              onValueChange={setSelectedChangeId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a change request to assess" />
              </SelectTrigger>
              <SelectContent>
                {changeRequests
                  .filter(c => c.aiAssessment)
                  .map(change => (
                    <SelectItem key={change.id} value={change.id}>
                      {change.title} - {change.type.charAt(0).toUpperCase() + change.type.slice(1)}
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>
      
      {aiAssessment && selectedChange ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <RiskScoreCard 
              title="Overall Risk Score" 
              value={aiAssessment.riskScore} 
              maxValue={100} 
              description="Composite risk score based on multiple factors"
            />
            <RiskScoreCard 
              title="Security Risk" 
              value={aiAssessment.securityRisk} 
              maxValue={100} 
              description="Potential security vulnerabilities"
            />
            <RiskScoreCard 
              title="Business Impact" 
              value={aiAssessment.businessImpact} 
              maxValue={100} 
              description="Impact on business operations"
            />
            <RiskScoreCard 
              title="System Stability" 
              value={aiAssessment.systemStability} 
              maxValue={100} 
              description="Impact on system reliability"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Network className="h-5 w-5 mr-2" />
                  Dependency Analysis
                </CardTitle>
                <CardDescription>
                  Systems and services potentially impacted by this change
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <DependencyGraph 
                  changeRequest={selectedChange} 
                  dependencies={aiAssessment.dependencies}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Change Details</CardTitle>
                <CardDescription>Overview of the selected change</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">{selectedChange.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{selectedChange.description.substring(0, 100)}...</p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Change Type</span>
                      <Badge>
                        {selectedChange.type.charAt(0).toUpperCase() + selectedChange.type.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Risk Level</span>
                      <Badge className={getRiskBadgeClass(selectedChange.riskLevel)}>
                        {selectedChange.riskLevel.charAt(0).toUpperCase() + selectedChange.riskLevel.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <Badge variant="outline">
                        {selectedChange.status.charAt(0).toUpperCase() + selectedChange.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Potential Downtime</span>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        {aiAssessment.potentialDowntime}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Risk Mitigation Strategies</CardTitle>
                <CardDescription>
                  AI-recommended approaches to reduce identified risks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {aiAssessment.mitigationStrategies.map((strategy, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-xs mr-2 mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-sm">{strategy}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recommended Actions</CardTitle>
                <CardDescription>
                  Suggested steps to ensure successful implementation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {aiAssessment.recommendedActions.map((action, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs mr-2 mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-sm">{action}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Compliance Impact</CardTitle>
              <CardDescription>
                Potential impacts on regulatory compliance and governance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {['SOC 2', 'ISO 27001', 'GDPR', 'HIPAA'].map(standard => {
                  // Generate random impact for demo
                  const impact = ['No Impact', 'Low Impact', 'Medium Impact', 'High Impact'][
                    Math.floor(Math.random() * 4)
                  ];
                  const impactClass = getImpactClass(impact);
                  
                  return (
                    <div key={standard} className="p-4 border rounded-md">
                      <div className="text-lg font-medium">{standard}</div>
                      <Badge className={impactClass}>
                        {impact}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-2">
                        {getComplianceDescription(standard, impact)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardContent className="p-10 text-center">
            <h3 className="text-lg font-medium">No Risk Assessment Selected</h3>
            <p className="text-muted-foreground mt-2">Select a change request above to view its AI risk assessment</p>
            <Button className="mt-4">Generate New Assessment</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Helper functions
function getRiskBadgeClass(riskLevel: string) {
  switch (riskLevel) {
    case 'critical':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    case 'high':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
    case 'medium':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    case 'low':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    default:
      return '';
  }
}

function getImpactClass(impact: string) {
  switch (impact) {
    case 'High Impact':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    case 'Medium Impact':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
    case 'Low Impact':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    case 'No Impact':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    default:
      return '';
  }
}

function getComplianceDescription(standard: string, impact: string) {
  if (impact === 'No Impact') {
    return `This change does not affect ${standard} compliance requirements.`;
  }
  
  if (impact === 'Low Impact') {
    return `Minor documentation updates needed to maintain ${standard} compliance.`;
  }
  
  if (impact === 'Medium Impact') {
    return `Requires review of ${standard} controls and potential adjustments.`;
  }
  
  return `Significant implications for ${standard} compliance. Detailed review required.`;
}

export default RiskAssessment;
