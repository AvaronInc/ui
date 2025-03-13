
import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { StorageSettingsFormValues } from './types';

interface S3BucketConnectionProps {
  form: UseFormReturn<StorageSettingsFormValues>;
  visible: boolean;
}

// Predefined regions with guaranteed non-empty values
const regions = [
  { value: "us-east-1", label: "US East (N. Virginia)" },
  { value: "us-east-2", label: "US East (Ohio)" },
  { value: "us-west-1", label: "US West (N. California)" },
  { value: "us-west-2", label: "US West (Oregon)" },
  { value: "eu-west-1", label: "EU (Ireland)" },
  { value: "eu-central-1", label: "EU (Frankfurt)" },
  { value: "ap-northeast-1", label: "Asia Pacific (Tokyo)" }
];

const S3BucketConnection = ({ form, visible }: S3BucketConnectionProps) => {
  if (!visible) return null;

  return (
    <div className="space-y-4 p-4 border rounded-md bg-muted/30">
      <h3 className="text-lg font-medium">S3 Bucket Connection (Wasabi)</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="s3BucketName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bucket Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter bucket name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="s3Region"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Region</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value || "us-east-1"}
                value={field.value || "us-east-1"}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {regions.map(region => (
                    <SelectItem key={region.value} value={region.value}>
                      {region.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="s3Endpoint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endpoint</FormLabel>
              <FormControl>
                <Input placeholder="e.g., s3.wasabisys.com" {...field} />
              </FormControl>
              <FormDescription>
                Wasabi S3-compatible endpoint
              </FormDescription>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="s3AccessKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Access Key</FormLabel>
              <FormControl>
                <Input 
                  type="password"
                  placeholder="Enter access key" 
                  {...field} 
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="s3SecretKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secret Key</FormLabel>
              <FormControl>
                <Input 
                  type="password"
                  placeholder="Enter secret key" 
                  {...field} 
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default S3BucketConnection;
