
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
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { HardDrive, Clock, FileType, UploadCloud } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface StorageSettingsFormValues {
  maxFileUploadSize: number;
  allowedFileTypes: string[];
  deleteOldFilesAfter: string;
  enableDataRedundancy: boolean;
}

const fileTypeOptions = [
  { id: 'pdfs', label: 'PDFs' },
  { id: 'images', label: 'Images' },
  { id: 'executables', label: 'Executables' },
  { id: 'documents', label: 'Documents' },
  { id: 'archives', label: 'Archives' },
];

const StorageSettings = () => {
  const { toast } = useToast();
  
  const defaultValues: StorageSettingsFormValues = {
    maxFileUploadSize: 100,
    allowedFileTypes: ['pdfs', 'images', 'documents'],
    deleteOldFilesAfter: '90',
    enableDataRedundancy: true,
  };
  
  // Initialize form with saved values from localStorage or defaults
  const [formValues, setFormValues] = useState<StorageSettingsFormValues>(() => {
    const savedSettings = localStorage.getItem('storageSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultValues;
  });
  
  const form = useForm<StorageSettingsFormValues>({
    defaultValues: formValues,
  });
  
  // Save settings to localStorage when form is submitted
  const handleSave = () => {
    const values = form.getValues();
    localStorage.setItem('storageSettings', JSON.stringify(values));
    setFormValues(values);
    
    toast({
      title: "Settings saved",
      description: "File Storage settings have been updated successfully.",
    });
  };
  
  // Update form when formValues change
  useEffect(() => {
    form.reset(formValues);
  }, [form, formValues]);
  
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground mb-6">
        Configure MinIO integration, storage quotas, retention policies, and access controls.
      </div>
      
      <Form {...form}>
        <form className="space-y-8">
          {/* Storage & Access Control Section */}
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
          
          {/* Retention Policy Section */}
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

export default StorageSettings;
