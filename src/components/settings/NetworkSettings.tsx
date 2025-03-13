
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
import { Wifi, Activity, Bell, Gauge } from 'lucide-react';

interface NetworkSettingsFormValues {
  enableNetworkAutoDiscovery: boolean;
  devicePollingInterval: string;
  maximumAllowedLatency: number;
  bandwidthAlertThreshold: number;
  enableEmailAlerts: boolean;
  enableSMSAlerts: boolean;
}

const NetworkSettings = () => {
  const { toast } = useToast();
  
  const defaultValues: NetworkSettingsFormValues = {
    enableNetworkAutoDiscovery: true,
    devicePollingInterval: '5',
    maximumAllowedLatency: 150,
    bandwidthAlertThreshold: 80,
    enableEmailAlerts: true,
    enableSMSAlerts: false,
  };
  
  // Initialize form with saved values from localStorage or defaults
  const [formValues, setFormValues] = useState<NetworkSettingsFormValues>(() => {
    const savedSettings = localStorage.getItem('networkSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultValues;
  });
  
  const form = useForm<NetworkSettingsFormValues>({
    defaultValues: formValues,
  });
  
  // Save settings to localStorage when form is submitted
  const handleSave = () => {
    const values = form.getValues();
    localStorage.setItem('networkSettings', JSON.stringify(values));
    setFormValues(values);
    
    toast({
      title: "Settings saved",
      description: "Network & Infrastructure settings have been updated successfully.",
    });
  };
  
  // Update form when formValues change
  useEffect(() => {
    form.reset(formValues);
  }, [form, formValues]);
  
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground mb-6">
        Configure network topology visualization, diagnostics thresholds, and infrastructure monitoring.
      </div>
      
      <Form {...form}>
        <form className="space-y-8">
          {/* Device Monitoring & Discovery Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Device Monitoring & Discovery</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="enableNetworkAutoDiscovery"
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
                        <Wifi className="h-4 w-4" />
                        Enable Network Auto-Discovery
                      </FormLabel>
                      <FormDescription>
                        Automatically discover and monitor new network devices
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="devicePollingInterval"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      Device Polling Interval
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select interval" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1 Minute</SelectItem>
                        <SelectItem value="5">5 Minutes</SelectItem>
                        <SelectItem value="15">15 Minutes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      How often devices are polled for status and metrics
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* Network Performance Thresholds Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Network Performance Thresholds</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="maximumAllowedLatency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Gauge className="h-4 w-4" />
                      Maximum Allowed Latency (ms)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={1000}
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      Alert when latency exceeds this threshold (milliseconds)
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="bandwidthAlertThreshold"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bandwidth Alert Threshold (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={100}
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      Alert when bandwidth utilization exceeds this percentage
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* Notification Preferences Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Notification Preferences</h3>
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
                        <Bell className="h-4 w-4" />
                        Enable Email Alerts for Network Issues
                      </FormLabel>
                      <FormDescription>
                        Receive email notifications when network issues are detected
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="enableSMSAlerts"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Enable SMS Alerts for Critical Issues</FormLabel>
                      <FormDescription>
                        Receive SMS notifications for critical network issues
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

export default NetworkSettings;
