
import React from 'react';
import { Zap, PlusCircle, Check, X, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AIRule {
  id: string;
  name: string;
  source: string;
  destination: string;
  action: 'allow' | 'block';
  confidence: number;
  status: 'active' | 'proposed' | 'rejected';
  created: string;
  threat: string;
  automated: boolean;
}

interface AIRulesPanelProps {
  aiEnabled: boolean;
  aiRules: AIRule[];
  handleApproveRule: (id: string) => void;
  handleRejectRule: (id: string) => void;
}

const AIRulesPanel = ({ 
  aiEnabled, 
  aiRules, 
  handleApproveRule, 
  handleRejectRule 
}: AIRulesPanelProps) => {
  
  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 90) {
      return (
        <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
          <Check className="h-3 w-3" /> {confidence}%
        </Badge>
      );
    } else if (confidence >= 70) {
      return (
        <Badge className="bg-amber-100 text-amber-800 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" /> {confidence}%
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
          <X className="h-3 w-3" /> {confidence}%
        </Badge>
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            AI-Generated Firewall Rules
          </CardTitle>
          <Button size="sm" disabled={!aiEnabled}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Generate Rule
          </Button>
        </div>
        <CardDescription>
          View and manage rules automatically created by the AI
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Rules</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="proposed">Proposed</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="m-0">
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="py-3 px-4 text-sm font-medium text-left">Rule</th>
                    <th className="py-3 px-4 text-sm font-medium text-left">Source</th>
                    <th className="py-3 px-4 text-sm font-medium text-left">Destination</th>
                    <th className="py-3 px-4 text-sm font-medium text-left">Threat</th>
                    <th className="py-3 px-4 text-sm font-medium text-left">Confidence</th>
                    <th className="py-3 px-4 text-sm font-medium text-left">Status</th>
                    <th className="py-3 px-4 text-sm font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {aiRules.map((rule) => (
                    <tr key={rule.id} className="border-b">
                      <td className="py-3 px-4">
                        <div className="font-medium">{rule.name}</div>
                        <div className="text-xs text-muted-foreground">{rule.created}</div>
                      </td>
                      <td className="py-3 px-4">{rule.source}</td>
                      <td className="py-3 px-4">{rule.destination}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <AlertCircle className={`h-3 w-3 ${rule.action === 'block' ? 'text-red-500' : 'text-green-500'}`} />
                          {rule.threat}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {getConfidenceBadge(rule.confidence)}
                      </td>
                      <td className="py-3 px-4">
                        {rule.status === 'active' && (
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        )}
                        {rule.status === 'proposed' && (
                          <Badge className="bg-blue-100 text-blue-800">Proposed</Badge>
                        )}
                        {rule.status === 'rejected' && (
                          <Badge className="bg-red-100 text-red-800">Rejected</Badge>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {rule.status === 'proposed' && (
                          <div className="flex justify-end gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 text-xs"
                              onClick={() => handleApproveRule(rule.id)}
                            >
                              <Check className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 text-xs"
                              onClick={() => handleRejectRule(rule.id)}
                            >
                              <X className="h-3 w-3 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                        {rule.status !== 'proposed' && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 text-xs"
                          >
                            Details
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="active" className="m-0">
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="py-3 px-4 text-sm font-medium text-left">Rule</th>
                    <th className="py-3 px-4 text-sm font-medium text-left">Source</th>
                    <th className="py-3 px-4 text-sm font-medium text-left">Destination</th>
                    <th className="py-3 px-4 text-sm font-medium text-left">Threat</th>
                    <th className="py-3 px-4 text-sm font-medium text-left">Confidence</th>
                    <th className="py-3 px-4 text-sm font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {aiRules.filter(rule => rule.status === 'active').map((rule) => (
                    <tr key={rule.id} className="border-b">
                      <td className="py-3 px-4">
                        <div className="font-medium">{rule.name}</div>
                        <div className="text-xs text-muted-foreground">{rule.created}</div>
                      </td>
                      <td className="py-3 px-4">{rule.source}</td>
                      <td className="py-3 px-4">{rule.destination}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <AlertCircle className={`h-3 w-3 ${rule.action === 'block' ? 'text-red-500' : 'text-green-500'}`} />
                          {rule.threat}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {getConfidenceBadge(rule.confidence)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 text-xs"
                        >
                          Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="proposed" className="m-0">
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="py-3 px-4 text-sm font-medium text-left">Rule</th>
                    <th className="py-3 px-4 text-sm font-medium text-left">Source</th>
                    <th className="py-3 px-4 text-sm font-medium text-left">Destination</th>
                    <th className="py-3 px-4 text-sm font-medium text-left">Threat</th>
                    <th className="py-3 px-4 text-sm font-medium text-left">Confidence</th>
                    <th className="py-3 px-4 text-sm font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {aiRules.filter(rule => rule.status === 'proposed').map((rule) => (
                    <tr key={rule.id} className="border-b">
                      <td className="py-3 px-4">
                        <div className="font-medium">{rule.name}</div>
                        <div className="text-xs text-muted-foreground">{rule.created}</div>
                      </td>
                      <td className="py-3 px-4">{rule.source}</td>
                      <td className="py-3 px-4">{rule.destination}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <AlertCircle className={`h-3 w-3 ${rule.action === 'block' ? 'text-red-500' : 'text-green-500'}`} />
                          {rule.threat}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {getConfidenceBadge(rule.confidence)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 text-xs"
                            onClick={() => handleApproveRule(rule.id)}
                          >
                            <Check className="h-3 w-3 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 text-xs"
                            onClick={() => handleRejectRule(rule.id)}
                          >
                            <X className="h-3 w-3 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="rejected" className="m-0">
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="py-3 px-4 text-sm font-medium text-left">Rule</th>
                    <th className="py-3 px-4 text-sm font-medium text-left">Source</th>
                    <th className="py-3 px-4 text-sm font-medium text-left">Destination</th>
                    <th className="py-3 px-4 text-sm font-medium text-left">Threat</th>
                    <th className="py-3 px-4 text-sm font-medium text-left">Confidence</th>
                    <th className="py-3 px-4 text-sm font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {aiRules.filter(rule => rule.status === 'rejected').map((rule) => (
                    <tr key={rule.id} className="border-b">
                      <td className="py-3 px-4">
                        <div className="font-medium">{rule.name}</div>
                        <div className="text-xs text-muted-foreground">{rule.created}</div>
                      </td>
                      <td className="py-3 px-4">{rule.source}</td>
                      <td className="py-3 px-4">{rule.destination}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <AlertCircle className={`h-3 w-3 ${rule.action === 'block' ? 'text-red-500' : 'text-green-500'}`} />
                          {rule.threat}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {getConfidenceBadge(rule.confidence)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 text-xs"
                        >
                          Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AIRulesPanel;
