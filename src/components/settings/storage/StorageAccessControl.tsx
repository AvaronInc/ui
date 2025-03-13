
import { UploadCloud, FileType } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { StorageSettingsFormValues, fileTypeOptions } from './types';

interface StorageAccessControlProps {
  form: UseFormReturn<StorageSettingsFormValues>;
}

const StorageAccessControl = ({ form }: StorageAccessControlProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Storage & Access Control</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="maxFileUploadSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <UploadCloud className="h-4 w-4" />
                Maximum File Upload Size (MB)
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
                Maximum file size users can upload in MB
              </FormDescription>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="allowedFileTypes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <FileType className="h-4 w-4" />
                Restrict File Types
              </FormLabel>
              <div className="mt-2 space-y-2">
                {fileTypeOptions.map((option) => (
                  <FormItem
                    key={option.id}
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(option.id)}
                        onCheckedChange={(checked) => {
                          const updatedValue = checked
                            ? [...field.value, option.id]
                            : field.value?.filter((value) => value !== option.id);
                          field.onChange(updatedValue);
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {option.label}
                    </FormLabel>
                  </FormItem>
                ))}
              </div>
              <FormDescription>
                Select which file types are allowed in storage
              </FormDescription>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default StorageAccessControl;
