
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { useChangeManagement } from '@/hooks/use-change-management';
import { ChangeRequest, ChangeType, ChangeStatus } from '@/types/change-management';
import { Badge } from '@/components/ui/badge';
import ChangeLifecycleStages from '../components/ChangeLifecycleStages';
import ChangeRequestTable from '../components/ChangeRequestTable';
import { PlusCircle, FileText, ChevronRight } from 'lucide-react';

const ChangeLifecycle: React.FC = () => {
  const [activeTab, setActiveTab] = useState('create');
  const { changeRequests, submitChangeRequest, loading } = useChangeManagement();
  
  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="create" className="flex items-center">
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Change Request
          </TabsTrigger>
          <TabsTrigger value="lifecycle" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Change Lifecycle
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="create" className="space-y-4">
          <NewChangeRequestForm onSubmit={submitChangeRequest} isLoading={loading} />
        </TabsContent>
        
        <TabsContent value="lifecycle" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Change Request Lifecycle</CardTitle>
              <CardDescription>Track the progress of your change requests through defined stages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ChangeLifecycleStages />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {(['draft', 'review', 'approval', 'implementation', 'verification', 'closed'] as ChangeStatus[]).map(status => (
                  <Card key={status} className="h-auto">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        {capitalize(status)}
                        <Badge className="ml-2" variant="outline">
                          {changeRequests.filter(c => c.status === status).length}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      {changeRequests.filter(c => c.status === status).slice(0, 3).map(change => (
                        <div key={change.id} className="p-2 border-b last:border-0">
                          <div className="flex items-center justify-between">
                            <div className="flex-1 truncate">
                              <div className="font-medium text-sm truncate">{change.title}</div>
                              <div className="text-xs text-muted-foreground truncate">
                                {changeTypeToTitle(change.type)} • {changeDateToText(change.plannedDate)}
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                          </div>
                        </div>
                      ))}
                      
                      {changeRequests.filter(c => c.status === status).length > 3 && (
                        <Button variant="ghost" size="sm" className="w-full mt-2 text-xs">
                          View {changeRequests.filter(c => c.status === status).length - 3} more
                        </Button>
                      )}
                      
                      {changeRequests.filter(c => c.status === status).length === 0 && (
                        <div className="py-3 text-center text-sm text-muted-foreground">
                          No changes in this stage
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Automated Documentation</CardTitle>
              <CardDescription>AI-generated documentation based on change requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Recent Change Documentation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChangeRequestTable 
                      changes={changeRequests.filter(c => c.status === 'closed').slice(0, 3)} 
                      type="documentation" 
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Documentation Templates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        "Network Configuration Change", 
                        "Server Deployment", 
                        "Application Update", 
                        "Security Patch", 
                        "Database Schema Change"
                      ].map(template => (
                        <div key={template} className="flex items-center justify-between p-2 border-b last:border-0">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">{template}</span>
                          </div>
                          <Button variant="ghost" size="sm">Use</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface NewChangeRequestFormProps {
  onSubmit: (data: Partial<ChangeRequest>) => void;
  isLoading: boolean;
}

const NewChangeRequestForm: React.FC<NewChangeRequestFormProps> = ({ onSubmit, isLoading }) => {
  const form = useForm<Partial<ChangeRequest>>({
    defaultValues: {
      title: '',
      description: '',
      requestedBy: '',
      assignedTo: '',
      type: 'standard',
      affectedComponents: [],
      plannedDate: new Date().toISOString().split('T')[0],
      rollbackPlan: '',
      riskLevel: 'medium',
    },
  });
  
  const handleSubmit = (data: Partial<ChangeRequest>) => {
    onSubmit(data);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>New Change Request</CardTitle>
        <CardDescription>Create a new change request with all required details</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Change Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Brief title for the change" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Change Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select change type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="standard">Standard Change</SelectItem>
                        <SelectItem value="emergency">Emergency Change</SelectItem>
                        <SelectItem value="major">Major Change</SelectItem>
                        <SelectItem value="minor">Minor Change</SelectItem>
                        <SelectItem value="routine">Routine Change</SelectItem>
                        <SelectItem value="security">Security Patch</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Change Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Detailed description of the change and its purpose" 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="requestedBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Requested By</FormLabel>
                    <FormControl>
                      <Input placeholder="Name of requester" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="assignedTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assigned Engineer</FormLabel>
                    <FormControl>
                      <Input placeholder="Engineer responsible for implementation" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="plannedDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Planned Implementation Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="riskLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Initial Risk Assessment</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select risk level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low Risk</SelectItem>
                        <SelectItem value="medium">Medium Risk</SelectItem>
                        <SelectItem value="high">High Risk</SelectItem>
                        <SelectItem value="critical">Critical Risk</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="affectedComponents"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Systems/Components Affected</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Comma-separated list of affected systems (e.g., Firewall, Database)" 
                      {...field}
                      value={field.value?.join(', ') || ''}
                      onChange={e => field.onChange(e.target.value.split(',').map(item => item.trim()))}
                    />
                  </FormControl>
                  <FormDescription>Enter the components affected by this change</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="rollbackPlan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rollback Plan</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Detail the steps required to rollback changes if necessary" 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end">
              <Button type="button" variant="outline" className="mr-2">
                Save as Draft
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit Change Request'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

// Helper functions
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const changeTypeToTitle = (type: ChangeType) => {
  switch (type) {
    case 'standard': return 'Standard Change';
    case 'emergency': return 'Emergency Change';
    case 'major': return 'Major Change';
    case 'minor': return 'Minor Change';
    case 'routine': return 'Routine Change';
    case 'security': return 'Security Patch';
  }
};

const changeDateToText = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays > 0) {
    return `In ${diffDays} day${diffDays > 1 ? 's' : ''}`;
  } else if (diffDays < 0) {
    return `${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? 's' : ''} ago`;
  } else {
    return 'Today';
  }
};

export default ChangeLifecycle;
