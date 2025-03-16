
import React from 'react';
import { useScheduling } from '@/hooks/use-scheduling';
import { useForm } from 'react-hook-form';
import { SchedulingSettings } from '@/types/scheduling';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bell, Globe, Lock, Users, Clock, Calendar, Bot, Shield } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface SchedulingConfigProps {
  schedulingData: ReturnType<typeof useScheduling>;
}

const SchedulingConfig: React.FC<SchedulingConfigProps> = ({ schedulingData }) => {
  const { settings, updateSettings } = schedulingData;
  
  const form = useForm<SchedulingSettings>({
    defaultValues: settings
  });
  
  const onSubmit = (data: SchedulingSettings) => {
    updateSettings(data);
  };
  
  return (
    <div className="p-6 overflow-auto h-full">
      <h2 className="text-xl font-semibold mb-4">Scheduling Configuration</h2>
      
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="access" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Access & Permissions</span>
          </TabsTrigger>
          <TabsTrigger value="integration" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>Integrations</span>
          </TabsTrigger>
        </TabsList>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">General Settings</CardTitle>
                  <CardDescription>
                    Configure the global settings for the scheduling system
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="enabled"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Enable Scheduling System</FormLabel>
                          <FormDescription>
                            Turn the scheduling system on or off globally
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="defaultMeetingDuration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Default Meeting Duration (minutes)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormDescription>
                            Set the default duration for new meetings
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="defaultBufferTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Default Buffer Time (minutes)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormDescription>
                            Set the default buffer time between meetings
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="customDomain"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Custom Domain for Scheduling Links</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="meet.yourcompany.com" />
                        </FormControl>
                        <FormDescription>
                          Set a custom domain for all scheduling links
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Bell className="mr-2 h-5 w-5 text-blue-500" />
                    Notification Settings
                  </CardTitle>
                  <CardDescription>
                    Configure notification and reminder settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="autoSendReminders"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Automatic Reminders</FormLabel>
                          <FormDescription>
                            Send automatic reminders for upcoming events
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="pl-4 border-l-2 border-blue-200 space-y-4">
                    <h4 className="text-sm font-medium text-muted-foreground">Reminder Times (minutes before event)</h4>
                    <div className="grid grid-cols-1 gap-4">
                      {form.watch('reminderTimes').map((time, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={time}
                            onChange={(e) => {
                              const updatedTimes = [...form.watch('reminderTimes')];
                              updatedTimes[index] = Number(e.target.value);
                              form.setValue('reminderTimes', updatedTimes);
                            }}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            type="button"
                            onClick={() => {
                              const updatedTimes = form.watch('reminderTimes').filter((_, i) => i !== index);
                              form.setValue('reminderTimes', updatedTimes);
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          form.setValue('reminderTimes', [...form.watch('reminderTimes'), 15]);
                        }}
                      >
                        Add Reminder Time
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Bot className="mr-2 h-5 w-5 text-purple-500" />
                    AI Features
                  </CardTitle>
                  <CardDescription>
                    Configure AI-powered features for scheduling
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="autoDetectAvailability"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Auto-Detect Availability</FormLabel>
                          <FormDescription>
                            Use AI to automatically detect team member availability
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-100 dark:border-purple-800">
                    <h4 className="font-medium flex items-center">
                      <Bot className="mr-2 h-4 w-4 text-purple-500" />
                      AI-Powered Scheduling Features
                    </h4>
                    <ul className="mt-2 space-y-2">
                      <li className="text-sm flex items-start">
                        <span className="bg-purple-100 dark:bg-purple-900 p-1 rounded-full mr-2 mt-0.5">
                          <Clock className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                        </span>
                        Smart time slot suggestions based on previous scheduling patterns
                      </li>
                      <li className="text-sm flex items-start">
                        <span className="bg-purple-100 dark:bg-purple-900 p-1 rounded-full mr-2 mt-0.5">
                          <Users className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                        </span>
                        Automatic detection of team availability across time zones
                      </li>
                      <li className="text-sm flex items-start">
                        <span className="bg-purple-100 dark:bg-purple-900 p-1 rounded-full mr-2 mt-0.5">
                          <Calendar className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                        </span>
                        Intelligent conflict resolution and rescheduling suggestions
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="access" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Lock className="mr-2 h-5 w-5 text-amber-500" />
                    Access Control
                  </CardTitle>
                  <CardDescription>
                    Configure who can access and use the scheduling system
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="allowExternalScheduling"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Allow External Scheduling</FormLabel>
                          <FormDescription>
                            Allow external users to book appointments
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="requireApproval"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Require Approval</FormLabel>
                          <FormDescription>
                            Require approval for new scheduling requests
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-3">Role-Based Scheduling Permissions</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-2 border-b">
                        <div>
                          <h5 className="font-medium">Administrators</h5>
                          <p className="text-sm text-muted-foreground">
                            Full access to all scheduling features
                          </p>
                        </div>
                        <span className="text-sm bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded">
                          Full Access
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between py-2 border-b">
                        <div>
                          <h5 className="font-medium">IT Managers</h5>
                          <p className="text-sm text-muted-foreground">
                            Can manage all IT-related scheduling
                          </p>
                        </div>
                        <span className="text-sm bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded">
                          Department Access
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between py-2 border-b">
                        <div>
                          <h5 className="font-medium">Team Members</h5>
                          <p className="text-sm text-muted-foreground">
                            Can view and create personal scheduling links
                          </p>
                        </div>
                        <span className="text-sm bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 px-2 py-1 rounded">
                          Limited Access
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <h5 className="font-medium">External Users</h5>
                          <p className="text-sm text-muted-foreground">
                            Can use scheduling links if external access is enabled
                          </p>
                        </div>
                        <span className="text-sm bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                          Link Access Only
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Shield className="mr-2 h-5 w-5 text-green-500" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>
                    Configure security settings for the scheduling system
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm">
                    <div className="space-y-0.5">
                      <h4 className="text-base font-medium">Email Verification</h4>
                      <p className="text-sm text-muted-foreground">
                        Require email verification for external bookings
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm">
                    <div className="space-y-0.5">
                      <h4 className="text-base font-medium">Prevent Schedule Scraping</h4>
                      <p className="text-sm text-muted-foreground">
                        Prevent automated tools from scraping availability
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm">
                    <div className="space-y-0.5">
                      <h4 className="text-base font-medium">Sanitize Event Details</h4>
                      <p className="text-sm text-muted-foreground">
                        Automatically sanitize sensitive information in event details
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="integration" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Calendar Integrations</CardTitle>
                  <CardDescription>
                    Connect with external calendar services
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Microsoft Exchange</h4>
                        <p className="text-sm text-muted-foreground">
                          Connect to company Exchange server
                        </p>
                      </div>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                        <Calendar className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Google Calendar</h4>
                        <p className="text-sm text-muted-foreground">
                          Sync with Google Workspace
                        </p>
                      </div>
                    </div>
                    <Button variant="outline">Connect</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                        <Calendar className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">iCalendar (ICS)</h4>
                        <p className="text-sm text-muted-foreground">
                          Export events as ICS files
                        </p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">System Integrations</CardTitle>
                  <CardDescription>
                    Connect scheduling with other system components
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                        <Shield className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Email Security</h4>
                        <p className="text-sm text-muted-foreground">
                          Integrate with Email Security for DLP event awareness
                        </p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <Users className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Workforce EMS</h4>
                        <p className="text-sm text-muted-foreground">
                          Use Workforce EMS data for availability detection
                        </p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                        <Bot className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">AI/Automation</h4>
                        <p className="text-sm text-muted-foreground">
                          Use AI for scheduling optimization and conflicts
                        </p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <div className="flex justify-end">
              <Button type="submit">Save Configuration</Button>
            </div>
          </form>
        </Form>
      </Tabs>
    </div>
  );
};

export default SchedulingConfig;
