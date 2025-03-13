
import { Lock } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { StorageSettingsFormValues } from './types';

interface MinioCredentialsProps {
  form: UseFormReturn<StorageSettingsFormValues>;
}

const MinioCredentials = ({ form }: MinioCredentialsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">MinIO Credentials</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="minioUsername"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                MinIO Username
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter MinIO username"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Username for MinIO authentication
              </FormDescription>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="minioPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                MinIO Password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter MinIO password"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Password for MinIO authentication
              </FormDescription>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="minioApiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                MinIO API Key
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter MinIO API key"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                API key for MinIO integration
              </FormDescription>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default MinioCredentials;
