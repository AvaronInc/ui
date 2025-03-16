
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useChangeManagement } from '@/hooks/use-change-management';
import { ApprovalWorkflow, ChangeRequest, ApprovalStatus } from '@/types/change-management';
import { CheckCircle, XCircle, Clock, HelpCircle, Shield, Settings, Users, Calendar } from 'lucide-react';
import ApprovalWorkflowChart from '../components/ApprovalWorkflowChart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ChangeApproval: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { changeRequests, approvalWorkflows, processApproval } = useChangeManagement();
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>(approvalWorkflows[0]?.id || '');
  
  // Get changes awaiting approval
  const pendingApprovals = changeRequests.filter(change => 
    change.status === 'approval' && 
    change.approvals.some(approval => approval.status === 'pending')
  );
  
  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard" className="flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            Approvals Dashboard
          </TabsTrigger>
          <TabsTrigger value="configuration" className="flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            Workflow Configuration
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>Changes awaiting your review and approval</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingApprovals.length > 0 ? (
                <div className="space-y-4">
                  {pendingApprovals.map(change => (
                    <ApprovalCard 
                      key={change.id} 
                      change={change}
                      onApprove={(changeId, approvalId) => processApproval(changeId, approvalId, 'approved', 'Approved')}
                      onReject={(changeId, approvalId) => processApproval(changeId, approvalId, 'rejected', 'Rejected due to policy violation')}
                      onHold={(changeId, approvalId) => processApproval(changeId, approvalId, 'on-hold', 'Pending additional information')}
                      onMoreInfo={(changeId, approvalId) => processApproval(changeId, approvalId, 'more-info', 'Please provide more details about the implementation plan')}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">All Clear!</h3>
                  <p className="text-muted-foreground mt-1">No pending approvals require your attention.</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Approval Status</CardTitle>
                <CardDescription>Recent approval activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <StatusCard 
                      title="Approved"
                      count={changeRequests.filter(c => 
                        c.approvals.some(a => a.status === 'approved' && new Date(a.approvedAt!).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000)
                      ).length}
                      icon={<CheckCircle className="h-4 w-4 text-green-500" />}
                    />
                    
                    <StatusCard 
                      title="Rejected"
                      count={changeRequests.filter(c => 
                        c.approvals.some(a => a.status === 'rejected')
                      ).length}
                      icon={<XCircle className="h-4 w-4 text-red-500" />}
                    />
                    
                    <StatusCard 
                      title="On Hold"
                      count={changeRequests.filter(c => 
                        c.approvals.some(a => a.status === 'on-hold')
                      ).length}
                      icon={<Clock className="h-4 w-4 text-amber-500" />}
                    />
                    
                    <StatusCard 
                      title="Needs Info"
                      count={changeRequests.filter(c => 
                        c.approvals.some(a => a.status === 'more-info')
                      ).length}
                      icon={<HelpCircle className="h-4 w-4 text-blue-500" />}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Approvers Activity</CardTitle>
                <CardDescription>Approval performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Technical Lead', 'Security Officer', 'IT Director', 'Change Manager'].map(role => (
                    <div key={role} className="flex items-center justify-between p-2 border-b last:border-0">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{role}</span>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          {Math.floor(Math.random() * 10)} Approved
                        </Badge>
                        <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                          {Math.floor(Math.random() * 5)} Pending
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Scheduled Changes</CardTitle>
              <CardDescription>Approved changes planned for implementation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {changeRequests
                  .filter(c => 
                    c.status === 'implementation' && 
                    new Date(c.plannedDate).getTime() > Date.now()
                  )
                  .sort((a, b) => new Date(a.plannedDate).getTime() - new Date(b.plannedDate).getTime())
                  .slice(0, 4)
                  .map(change => (
                    <div key={change.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <div className="font-medium">{change.title}</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Assigned to: {change.assignedTo}
                        </div>
                        <div className="flex items-center mt-2 space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {change.type.charAt(0).toUpperCase() + change.type.slice(1)}
                          </Badge>
                          <Badge variant="outline" className={`text-xs ${getRiskBadgeClass(change.riskLevel)}`}>
                            {change.riskLevel.charAt(0).toUpperCase() + change.riskLevel.slice(1)} Risk
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">
                          {new Date(change.plannedDate).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  ))
                }
                
                {changeRequests.filter(c => 
                  c.status === 'implementation' && 
                  new Date(c.plannedDate).getTime() > Date.now()
                ).length === 0 && (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No upcoming scheduled changes</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="configuration" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Approval Workflow Configuration</CardTitle>
              <CardDescription>Configure approval workflows based on change type and risk level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Select Workflow Template</label>
                  <Select 
                    value={selectedWorkflow} 
                    onValueChange={setSelectedWorkflow}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Choose a workflow" />
                    </SelectTrigger>
                    <SelectContent>
                      {approvalWorkflows.map(workflow => (
                        <SelectItem key={workflow.id} value={workflow.id}>
                          {workflow.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {selectedWorkflow && (
                  <div className="pt-4">
                    <WorkflowDetails workflow={approvalWorkflows.find(w => w.id === selectedWorkflow)!} />
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-end gap-2 w-full">
                <Button variant="outline">Clone Workflow</Button>
                <Button variant="outline">Edit Workflow</Button>
                <Button>Create New Workflow</Button>
              </div>
            </CardFooter>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Approval Flow Visualization</CardTitle>
                <CardDescription>Visual representation of the selected workflow</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-[300px]">
                {selectedWorkflow ? (
                  <ApprovalWorkflowChart workflow={approvalWorkflows.find(w => w.id === selectedWorkflow)!} />
                ) : (
                  <div className="text-center">
                    <p className="text-muted-foreground">Select a workflow to view</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Escalation Rules</CardTitle>
                <CardDescription>Configure automatic escalation for pending approvals</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedWorkflow ? (
                  <div className="space-y-4">
                    {approvalWorkflows.find(w => w.id === selectedWorkflow)?.escalationRules.map((rule, index) => (
                      <div key={index} className="p-3 border rounded-md">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">After {rule.after} hours</div>
                            <div className="text-sm text-muted-foreground mt-1">
                              Escalate to {rule.escalateTo}
                            </div>
                          </div>
                          <div>
                            <Button variant="ghost" size="sm">Edit</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <Button className="w-full" variant="outline">Add Escalation Rule</Button>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">Select a workflow to view escalation rules</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ApprovalCardProps {
  change: ChangeRequest;
  onApprove: (changeId: string, approvalId: string) => void;
  onReject: (changeId: string, approvalId: string) => void;
  onHold: (changeId: string, approvalId: string) => void;
  onMoreInfo: (changeId: string, approvalId: string) => void;
}

const ApprovalCard: React.FC<ApprovalCardProps> = ({ 
  change, 
  onApprove,
  onReject,
  onHold,
  onMoreInfo
}) => {
  // Find the pending approval
  const pendingApproval = change.approvals.find(a => a.status === 'pending');
  
  if (!pendingApproval) return null;
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium">{change.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{change.description.substring(0, 120)}...</p>
            </div>
            <Badge className={getRiskBadgeClass(change.riskLevel)}>
              {change.riskLevel.charAt(0).toUpperCase() + change.riskLevel.slice(1)} Risk
            </Badge>
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div>
              <div className="text-muted-foreground">Requested By</div>
              <div>{change.requestedBy}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Type</div>
              <div>{change.type.charAt(0).toUpperCase() + change.type.slice(1)}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Planned Date</div>
              <div>{new Date(change.plannedDate).toLocaleDateString()}</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="text-sm text-muted-foreground">Awaiting {pendingApproval.role} approval</div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            <Button 
              size="sm" 
              onClick={() => onApprove(change.id, pendingApproval.id)}
            >
              <CheckCircle className="h-4 w-4 mr-1" /> Approve
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onReject(change.id, pendingApproval.id)}
            >
              <XCircle className="h-4 w-4 mr-1" /> Reject
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onHold(change.id, pendingApproval.id)}
            >
              <Clock className="h-4 w-4 mr-1" /> Hold
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onMoreInfo(change.id, pendingApproval.id)}
            >
              <HelpCircle className="h-4 w-4 mr-1" /> Request Info
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface StatusCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
}

const StatusCard: React.FC<StatusCardProps> = ({ title, count, icon }) => (
  <div className="p-3 border rounded-md flex items-center justify-between">
    <div className="flex items-center">
      {icon}
      <span className="text-sm ml-2">{title}</span>
    </div>
    <Badge variant="outline">{count}</Badge>
  </div>
);

interface WorkflowDetailsProps {
  workflow: ApprovalWorkflow;
}

const WorkflowDetails: React.FC<WorkflowDetailsProps> = ({ workflow }) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">{workflow.name}</h3>
        <p className="text-sm text-muted-foreground">{workflow.description}</p>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Applies To</h4>
        <div className="flex flex-wrap gap-2">
          {workflow.changeTypes.map(type => (
            <Badge key={type} variant="outline">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Badge>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Required Approvals</h4>
        <div className="space-y-2">
          {workflow.requiredApprovals.map((approval, index) => (
            <div key={index} className="flex items-center justify-between p-2 border rounded-md">
              <div>{approval.role}</div>
              <Badge className={getRiskThresholdBadgeClass(approval.riskThreshold)}>
                {approval.riskThreshold.charAt(0).toUpperCase() + approval.riskThreshold.slice(1)} Risk+
              </Badge>
            </div>
          ))}
        </div>
      </div>
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

function getRiskThresholdBadgeClass(riskThreshold: string) {
  switch (riskThreshold) {
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

export default ChangeApproval;
