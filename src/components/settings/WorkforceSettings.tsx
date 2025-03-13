
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';
import { Network, Clock, Cpu, Shield, Users } from 'lucide-react';

interface WorkforceSettingsFormValues {
  maxConcurrentVPNSessions: number;
  autoDisconnectIdle: boolean;
  idleTimeoutMinutes: number;
  enableAutoPatch: boolean;
  patchApprovalPolicy: string;
  enableAutoGrouping: boolean;
  enableRoleBasedAccess: boolean;
}

const WorkforceSettings = () => {
  const { toast } = useToast();
  
  const defaultValues: WorkforceSettingsFormValues = {
    maxConcurrentVPNSessions: 2,
    autoDisconnectIdle: true,
    idleTimeoutMinutes: 30,
    enableAutoPatch: true,
    patchApprovalPolicy: 'scheduled',
    enableAutoGrouping: true,
    enableRoleBasedAccess: true,
  };
  
  // Initialize form with saved values from localStorage or defaults
  const [formValues, setFormValues] = useState<WorkforceSettingsFormValues>(() => {
    const savedSettings = localStorage.getItem('workforceSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultValues;
  });
  
  const form = useForm<WorkforceSettingsFormValues>({
    defaultValues: formValues,
  });
  
  // Save settings to localStorage when form is submitted
  const handleSave = () => {
    const values = form.getValues();
    localStorage.setItem('workforceSettings', JSON.stringify(values));
    setFormValues(values);
    
    toast({
      title: "Settings saved",
      description: "Workforce EMS settings have been updated successfully.",
    });
  };
  
  // Update form when formValues change
  useEffect(() => {
    form.reset(formValues);
  }, [form, formValues]);
  
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground mb-6">
        Configure VPN settings, endpoint management policies, and device monitoring parameters.
      </div>
      
      <Form {...form}>
        <form className="space-y-8">
          {/* VPN Connection Rules Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">VPN Connection Rules</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="maxConcurrentVPNSessions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Network className="h-4 w-4" />
                      Maximum Concurrent VPN Sessions Per User
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={10}
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      Set the maximum number of simultaneous VPN connections allowed per user
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="autoDisconnectIdle"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Auto-Disconnect Idle Users
                      </FormLabel>
                      <FormDescription>
                        Automatically disconnect users after a period of inactivity
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="idleTimeoutMinutes"
              render={({ field }) => (
                <FormItem className="max-w-sm">
                  <FormLabel>Idle Timeout Duration (Minutes)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={5}
                      max={120}
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                      disabled={!form.watch('autoDisconnectIdle')}
                    />
                  </FormControl>
                  <FormDescription>
                    Set how long until an idle connection is automatically disconnected
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
          
          {/* Endpoint Management Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Endpoint Management</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="enableAutoPatch"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="flex items-center gap-2">
                        <Cpu className="h-4 w-4" />
                        Enable Automatic Software Patching
                      </FormLabel>
                      <FormDescription>
                        Allow the system to automatically install software updates
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="patchApprovalPolicy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Default Patch Approval Policy
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!form.watch('enableAutoPatch')}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select approval policy" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="automatic">Automatic</SelectItem>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      How software updates are approved and deployed
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* Device Grouping Options Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Device Grouping Options</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="enableAutoGrouping"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Enable Auto-Grouping by Department
                      </FormLabel>
                      <FormDescription>
                        Automatically assign devices to groups based on department
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="enableRoleBasedAccess"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Enable Role-Based Endpoint Access</FormLabel>
                      <FormDescription>
                        Control device access based on user roles
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
      
      <div className="flex justify-end pt-4 border-t">
        <Button onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default WorkforceSettings;
