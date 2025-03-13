
import { Lock, Shield } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { StorageSettingsFormValues } from './types';

interface ProtectionFeaturesProps {
  form: UseFormReturn<StorageSettingsFormValues>;
}

const ProtectionFeatures = ({ form }: ProtectionFeaturesProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Data Protection Features</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="enableImmutableStorage"
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
                  Enable Immutable Storage
                </FormLabel>
                <FormDescription>
                  Prevent modification or deletion of files after upload
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="enableRansomwareProtection"
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
                  <Shield className="h-4 w-4" />
                  Enable Ransomware Protection
                </FormLabel>
                <FormDescription>
                  Backup files to secure S3 storage for ransomware protection
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ProtectionFeatures;
