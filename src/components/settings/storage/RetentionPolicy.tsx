
import { Clock, HardDrive } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { StorageSettingsFormValues } from './types';

interface RetentionPolicyProps {
  form: UseFormReturn<StorageSettingsFormValues>;
}

const RetentionPolicy = ({ form }: RetentionPolicyProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Retention Policy</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="deleteOldFilesAfter"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Delete Old Files After
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
                  <SelectItem value="never">Never (Keep Forever)</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Automatically delete files after this time period
              </FormDescription>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="enableDataRedundancy"
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
                  Enable Data Redundancy Backups
                </FormLabel>
                <FormDescription>
                  Store multiple copies of files for redundancy
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default RetentionPolicy;
