
import React from 'react';
import { FormField, FormItem, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { AdvancedConfigFormValues } from './types';

interface VolumeMountsProps {
  form: UseFormReturn<AdvancedConfigFormValues>;
}

const VolumeMounts: React.FC<VolumeMountsProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Volume Mounts</h3>
      <FormField
        control={form.control}
        name="volumeMounts"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input 
                placeholder="host_path:container_path" 
                {...field} 
              />
            </FormControl>
            <FormDescription>
              Mount local volumes (use NestVault section below for MinIO buckets)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default VolumeMounts;
