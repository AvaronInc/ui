
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
import { Mail, Bell, Clock } from 'lucide-react';

interface NotificationSettingsFormValues {
  enableEmailAlerts: boolean;
  enableSmsAlerts: boolean;
  autoEscalateCriticalAlerts: string;
}

const NotificationSettings = () => {
  const { toast } = useToast();
  
  const defaultValues: NotificationSettingsFormValues = {
    enableEmailAlerts: true,
    enableSmsAlerts: false,
    autoEscalateCriticalAlerts: "30",
  };
  
  // Initialize form with saved values from localStorage or defaults
  const [formValues, setFormValues] = useState<NotificationSettingsFormValues>(() => {
    const savedSettings = localStorage.getItem('notificationSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultValues;
  });
  
  const form = useForm<NotificationSettingsFormValues>({
    defaultValues: formValues,
  });
  
  // Save settings to localStorage when form is submitted
  const handleSave = () => {
    const values = form.getValues();
    localStorage.setItem('notificationSettings', JSON.stringify(values));
    setFormValues(values);
    
    toast({
      title: "Settings saved",
      description: "Notification & Alert settings have been updated successfully.",
    });
  };
  
  // Update form when formValues change
  useEffect(() => {
    form.reset(formValues);
  }, [form, formValues]);
  
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground mb-6">
        Configure notification channels, alert thresholds, and delivery preferences.
      </div>
      
      <Form {...form}>
        <form className="space-y-8">
          {/* Alert Delivery Methods */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Alert Delivery Methods</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="enableEmailAlerts"
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
                        <Mail className="h-4 w-4" />
                        Enable Email Alerts
                      </FormLabel>
                      <FormDescription>
                        Receive system alerts via email
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="enableSmsAlerts"
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
                        <Bell className="h-4 w-4" />
                        Enable SMS Alerts
                      </FormLabel>
                      <FormDescription>
                        Receive critical alerts via SMS
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* Escalation Policies */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Escalation Policies</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="autoEscalateCriticalAlerts"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Auto-Escalate Critical Alerts After
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select escalation time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="10">10 Minutes</SelectItem>
                        <SelectItem value="30">30 Minutes</SelectItem>
                        <SelectItem value="60">1 Hour</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Time before escalating unacknowledged critical alerts
                    </FormDescription>
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

export default NotificationSettings;
