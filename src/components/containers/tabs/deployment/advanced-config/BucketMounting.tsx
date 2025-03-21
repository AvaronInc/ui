
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { AdvancedConfigFormValues } from './types';

interface BucketMountingProps {
  form: UseFormReturn<AdvancedConfigFormValues>;
}

// Sample bucket data - in a real app, this would be fetched from an API
const buckets = [
  { id: 'backup-primary', name: 'backup-primary', description: 'Primary backup storage bucket' },
  { id: 'documents-archive', name: 'documents-archive', description: 'Document archives' },
  { id: 'app-data', name: 'app-data', description: 'Application data storage' },
  { id: 'user-uploads', name: 'user-uploads', description: 'User uploaded content' }
];

const BucketMounting: React.FC<BucketMountingProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">NestVault Bucket Mounting</h3>
      <FormField
        control={form.control}
        name="nestVaultBucket"
        render={({ field }) => (
          <FormItem>
            <FormLabel>MinIO Bucket</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a bucket to mount" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="">None</SelectItem>
                {buckets.map(bucket => (
                  <SelectItem key={bucket.id} value={bucket.id}>
                    {bucket.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              Mount a NestVault MinIO bucket as a volume in your container
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default BucketMounting;
