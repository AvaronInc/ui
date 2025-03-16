
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Clock, Shield, Settings } from 'lucide-react';
import ApprovalRequestTable from '../components/ApprovalRequestTable';
import TemporaryAccessControl from '../components/TemporaryAccessControl';
import WorkflowConfiguration from '../components/WorkflowConfiguration';

const ApprovalWorkflowsTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState('requests');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User & Role Approval Workflows</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Workflow
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-primary" />
            Approval Workflows
          </CardTitle>
          <CardDescription>
            Manage approval flows for new users, role changes, and privileged access requests
          </CardDescription>
        </CardHeader>
      </Card>
      
      <Tabs defaultValue="requests" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-3">
          <TabsTrigger value="requests" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Pending Requests</span>
          </TabsTrigger>
          <TabsTrigger value="temporary" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Temporary Access</span>
          </TabsTrigger>
          <TabsTrigger value="config" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Configuration</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="requests" className="mt-6">
          <ApprovalRequestTable />
        </TabsContent>
        
        <TabsContent value="temporary" className="mt-6">
          <TemporaryAccessControl />
        </TabsContent>
        
        <TabsContent value="config" className="mt-6">
          <WorkflowConfiguration />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApprovalWorkflowsTab;
