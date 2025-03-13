
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
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';
import { Archive, Lock, UserCog, ShieldAlert } from 'lucide-react';

interface LoggingSettingsFormValues {
  logRetentionPeriod: string;
  enableLogEncryption: boolean;
  logAllAdminChanges: boolean;
  enableTamperProtection: boolean;
}

const LoggingSettings = () => {
  const { toast } = useToast();
  
  const defaultValues: LoggingSettingsFormValues = {
    logRetentionPeriod: '6',
    enableLogEncryption: true,
    logAllAdminChanges: true,
    enableTamperProtection: true,
  };
  
  // Initialize form with saved values from localStorage or defaults
  const [formValues, setFormValues] = useState<LoggingSettingsFormValues>(() => {
    const savedSettings = localStorage.getItem('loggingSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultValues;
  });
  
  const form = useForm<LoggingSettingsFormValues>({
    defaultValues: formValues,
  });
  
  // Save settings to localStorage when form is submitted
  const handleSave = () => {
    const values = form.getValues();
    localStorage.setItem('loggingSettings', JSON.stringify(values));
    setFormValues(values);
    
    toast({
      title: "Settings saved",
      description: "Logging & Audit settings have been updated successfully.",
    });
  };
  
  // Update form when formValues change
  useEffect(() => {
    form.reset(formValues);
  }, [form, formValues]);
  
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground mb-6">
        Configure logging levels, audit trail settings, and retention policies.
      </div>
      
      <Form {...form}>
        <form className="space-y-8">
          {/* System Log Retention Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">System Log Retention</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="logRetentionPeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Archive className="h-4 w-4" />
                      Keep Logs For
                    </FormLabel>
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
                        <SelectItem value="3">3 Months</SelectItem>
                        <SelectItem value="6">6 Months</SelectItem>
                        <SelectItem value="12">1 Year</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      How long to retain system logs
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="enableLogEncryption"
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
                        <Lock className="h-4 w-4" />
                        Enable Log Encryption
                      </FormLabel>
                      <FormDescription>
                        Encrypt log files for enhanced security
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* Admin Actions Logging Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Admin Actions Logging</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="logAllAdminChanges"
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
                        <UserCog className="h-4 w-4" />
                        Log All Admin Changes
                      </FormLabel>
                      <FormDescription>
                        Record all changes made by administrators
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="enableTamperProtection"
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
                        <ShieldAlert className="h-4 w-4" />
                        Enable Tamper Protection
                      </FormLabel>
                      <FormDescription>
                        Prevent unauthorized modification of logs
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

export default LoggingSettings;
