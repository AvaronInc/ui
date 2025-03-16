
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Settings, Users, ShieldAlert, Clock } from 'lucide-react';

const WorkflowConfiguration: React.FC = () => {
  const [workflows, setWorkflows] = useState([
    {
      id: 'wf-1',
      name: 'Admin Access Approval',
      description: 'Requires CTO and Security approval for admin role assignments',
      triggerType: 'Role Assignment',
      triggerValue: 'Admin',
      approvers: ['CTO', 'Security Lead'],
      isActive: true,
    },
    {
      id: 'wf-2',
      name: 'Financial Systems Access',
      description: 'Requires CFO approval for access to financial systems',
      triggerType: 'Resource Access',
      triggerValue: 'Financial Systems',
      approvers: ['CFO'],
      isActive: true,
    },
    {
      id: 'wf-3',
      name: 'Emergency Access Protocol',
      description: 'Fast-track approval for emergency access requests',
      triggerType: 'Emergency Request',
      triggerValue: 'All Resources',
      approvers: ['On-call Manager'],
      isActive: false,
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
        <div>
          <h3 className="text-lg font-medium mb-2">Approval Workflow Configuration</h3>
          <p className="text-sm text-muted-foreground">
            Configure custom approval workflows for different access types and roles
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Workflow
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2 text-primary" />
            Active Workflows
          </CardTitle>
          <CardDescription>
            These workflows will be triggered when matching conditions are met
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Workflow Name</TableHead>
                <TableHead>Trigger Type</TableHead>
                <TableHead>Approvers</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workflows.map((workflow) => (
                <TableRow key={workflow.id}>
                  <TableCell className="font-medium">{workflow.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-primary/10">
                      {workflow.triggerType}
                    </Badge>
                    <div className="text-xs text-muted-foreground mt-1">
                      {workflow.triggerValue}
                    </div>
                  </TableCell>
                  <TableCell>
                    {workflow.approvers.map((approver, index) => (
                      <Badge key={index} variant="secondary" className="mr-1 mb-1">
                        {approver}
                      </Badge>
                    ))}
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <span className="line-clamp-2 text-sm">{workflow.description}</span>
                  </TableCell>
                  <TableCell>
                    <Switch 
                      checked={workflow.isActive} 
                      onCheckedChange={(checked) => {
                        setWorkflows(
                          workflows.map((wf) =>
                            wf.id === workflow.id ? { ...wf, isActive: checked } : wf
                          )
                        );
                      }} 
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center">
            <ShieldAlert className="h-5 w-5 mr-2 text-primary" />
            Default Escalation Paths
          </CardTitle>
          <CardDescription>
            Configure default approval chains for different security scenarios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Standard Access Requests</label>
                    <p className="text-xs text-muted-foreground">Normal priority access requests</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                <Select defaultValue="manager-department">
                  <SelectTrigger>
                    <SelectValue placeholder="Select approver" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager-only">Direct Manager Only</SelectItem>
                    <SelectItem value="manager-department">Manager & Department Head</SelectItem>
                    <SelectItem value="manager-security">Manager & Security Team</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Emergency Access Requests</label>
                    <p className="text-xs text-muted-foreground">High priority/urgent requests</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                <Select defaultValue="on-call">
                  <SelectTrigger>
                    <SelectValue placeholder="Select approver" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="on-call">On-Call Manager</SelectItem>
                    <SelectItem value="security-lead">Security Lead</SelectItem>
                    <SelectItem value="cto">CTO/CIO</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="pt-4">
              <h4 className="text-sm font-medium mb-3 flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                Approval Timeouts
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Standard Request Timeout</label>
                  <div className="flex space-x-2">
                    <Input type="number" defaultValue="24" className="w-24" />
                    <div className="flex items-center text-sm text-muted-foreground">hours</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Emergency Request Timeout</label>
                  <div className="flex space-x-2">
                    <Input type="number" defaultValue="1" className="w-24" />
                    <div className="flex items-center text-sm text-muted-foreground">hours</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <Button variant="outline" className="mr-2">Cancel</Button>
            <Button>Save Configuration</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkflowConfiguration;
