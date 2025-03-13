
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
import { Thermometer, RefreshCw, Video, Box } from 'lucide-react';

interface NestSettingsFormValues {
  enableCoolingFailureAlerts: boolean;
  maximumTemperatureThreshold: number;
  diagnosticsInterval: string;
  enableAutomaticReboots: boolean;
  restrictLiveStreamAccess: boolean;
}

const NestSettings = () => {
  const { toast } = useToast();
  
  const defaultValues: NestSettingsFormValues = {
    enableCoolingFailureAlerts: true,
    maximumTemperatureThreshold: 75,
    diagnosticsInterval: '7',
    enableAutomaticReboots: false,
    restrictLiveStreamAccess: true,
  };
  
  // Initialize form with saved values from localStorage or defaults
  const [formValues, setFormValues] = useState<NestSettingsFormValues>(() => {
    const savedSettings = localStorage.getItem('nestSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultValues;
  });
  
  const form = useForm<NestSettingsFormValues>({
    defaultValues: formValues,
  });
  
  // Save settings to localStorage when form is submitted
  const handleSave = () => {
    const values = form.getValues();
    localStorage.setItem('nestSettings', JSON.stringify(values));
    setFormValues(values);
    
    toast({
      title: "Settings saved",
      description: "CyberNest Management settings have been updated successfully.",
    });
  };
  
  // Update form when formValues change
  useEffect(() => {
    form.reset(formValues);
  }, [form, formValues]);
  
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground mb-6">
        Configure CyberNest deployment parameters, monitoring thresholds, and maintenance schedules.
      </div>
      
      <Form {...form}>
        <form className="space-y-8">
          {/* Hardware Monitoring Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Hardware Monitoring</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="enableCoolingFailureAlerts"
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
                        <Box className="h-4 w-4" />
                        Enable Cooling Failure Alerts
                      </FormLabel>
                      <FormDescription>
                        Get alerts when cooling systems in CyberNests fail
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="maximumTemperatureThreshold"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4" />
                      Maximum Temperature Threshold (°C)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={50}
                        max={100}
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      Alert when temperature exceeds this threshold
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* Maintenance & Health Checks Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Maintenance & Health Checks</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="diagnosticsInterval"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4" />
                      Auto-Run CyberNest Diagnostics Every
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
                        <SelectItem value="1">24 Hours</SelectItem>
                        <SelectItem value="7">7 Days</SelectItem>
                        <SelectItem value="30">30 Days (Custom)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      How often to automatically run diagnostics
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="enableAutomaticReboots"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Schedule Automatic System Reboots</FormLabel>
                      <FormDescription>
                        Allow automatic reboots during maintenance windows
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* Live Stream Access Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Live Stream Access</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="restrictLiveStreamAccess"
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
                        <Video className="h-4 w-4" />
                        Restrict Live Stream Access to Admins
                      </FormLabel>
                      <FormDescription>
                        Only administrators can access live streams
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

export default NestSettings;
