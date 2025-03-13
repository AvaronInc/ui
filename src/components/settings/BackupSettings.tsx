
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
import { Clock, Database, CloudStorage, HardDrive } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface BackupSettingsFormValues {
  backupFrequency: string;
  retentionPeriod: string;
  primaryLocation: string;
  redundantBackups: boolean;
}

const BackupSettings = () => {
  const { toast } = useToast();
  
  const defaultValues: BackupSettingsFormValues = {
    backupFrequency: 'weekly',
    retentionPeriod: '90',
    primaryLocation: 'cloud',
    redundantBackups: true,
  };
  
  // Initialize form with saved values from localStorage or defaults
  const [formValues, setFormValues] = useState<BackupSettingsFormValues>(() => {
    const savedSettings = localStorage.getItem('backupSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultValues;
  });
  
  const form = useForm<BackupSettingsFormValues>({
    defaultValues: formValues,
  });
  
  // Save settings to localStorage when form is submitted
  const handleSave = () => {
    const values = form.getValues();
    localStorage.setItem('backupSettings', JSON.stringify(values));
    setFormValues(values);
    
    toast({
      title: "Settings saved",
      description: "Backup & Disaster Recovery settings have been updated successfully.",
    });
  };
  
  // Update form when formValues change
  useEffect(() => {
    form.reset(formValues);
  }, [form, formValues]);
  
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground mb-6">
        Configure backup schedules, storage locations, retention policies, and disaster recovery procedures.
      </div>
      
      <Form {...form}>
        <form className="space-y-8">
          {/* Backup Frequency Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Backup Frequency</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="backupFrequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Schedule Automatic Backups
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      How often automated backups should run
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="retentionPeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      Backup Retention Period
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
                        <SelectItem value="30">30 Days</SelectItem>
                        <SelectItem value="90">90 Days</SelectItem>
                        <SelectItem value="365">1 Year</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      How long backups will be retained before deletion
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* Storage Locations Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Storage Locations</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="primaryLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <CloudStorage className="h-4 w-4" />
                      Primary Backup Location
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="local">Local Storage</SelectItem>
                        <SelectItem value="cloud">Cloud Storage</SelectItem>
                        <SelectItem value="nas">Network Attached Storage (NAS)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Where primary backup data should be stored
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="redundantBackups"
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
                        <HardDrive className="h-4 w-4" />
                        Enable Redundant Backups
                      </FormLabel>
                      <FormDescription>
                        Maintain copies in multiple locations for extra security
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

export default BackupSettings;
