
import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChangeRequest } from '@/types/change-management';

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

export default NewChangeRequestForm;
