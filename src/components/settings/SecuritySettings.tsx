
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
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
import SettingsCard from '@/components/settings/SettingsCard';

const securityFormSchema = z.object({
  alertSensitivity: z.enum(['low', 'medium', 'high', 'critical']),
  automaticIncidentResponse: z.boolean(),
  autoIsolateEndpoints: z.boolean(),
  reportRetentionPeriod: z.enum(['30', '90', '180']),
  fullComplianceLogging: z.boolean(),
});

type SecurityFormValues = z.infer<typeof securityFormSchema>;

const SecuritySettings = () => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  
  const defaultValues: SecurityFormValues = {
    alertSensitivity: 'medium',
    automaticIncidentResponse: false,
    autoIsolateEndpoints: false,
    reportRetentionPeriod: '90',
    fullComplianceLogging: true,
  };
  
  const form = useForm<SecurityFormValues>({
    resolver: zodResolver(securityFormSchema),
    defaultValues,
  });
  
  const handleSave = (values: SecurityFormValues) => {
    setIsSaving(true);
    
    // Simulate saving to server
    setTimeout(() => {
      // Save settings to localStorage
      localStorage.setItem('securitySettings', JSON.stringify(values));
      
      setIsSaving(false);
      toast({
        title: "Settings saved",
        description: "Security & Compliance settings have been updated successfully.",
      });
    }, 500);
  };
  
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground mb-6">
        Configure Wazuh integration, security policies, and compliance monitoring.
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
          <SettingsCard title="Threat Sensitivity Level">
            <FormField
              control={form.control}
              name="alertSensitivity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Set Alert Sensitivity</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sensitivity level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Determines the threshold for triggering security alerts
                  </FormDescription>
                </FormItem>
              )}
            />
          </SettingsCard>
          
          <SettingsCard title="Intrusion Detection Settings">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="automaticIncidentResponse"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Enable Automatic Incident Response</FormLabel>
                      <FormDescription>
                        System will automatically respond to detected threats
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
                name="autoIsolateEndpoints"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Auto-Isolate Compromised Endpoints</FormLabel>
                      <FormDescription>
                        Automatically isolate endpoints when compromise is detected
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
            </div>
          </SettingsCard>
          
          <SettingsCard title="Compliance & Data Retention">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="reportRetentionPeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Security Report Retention Period</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select retention period" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="30">30 Days</SelectItem>
                        <SelectItem value="90">90 Days</SelectItem>
                        <SelectItem value="180">6 Months</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      How long security reports are kept before archiving
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="fullComplianceLogging"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Enable Full Compliance Logging</FormLabel>
                      <FormDescription>
                        Capture detailed logs for compliance auditing
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
            </div>
          </SettingsCard>
          
          <div className="flex justify-end pt-4 border-t">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SecuritySettings;
