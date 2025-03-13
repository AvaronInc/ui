
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
import { HardDrive, Clock, FileType, UploadCloud, Shield, Lock } from 'lucide-react';
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
  // New MinIO credentials
  minioApiKey: string;
  minioUsername: string;
  minioPassword: string;
  // New storage protection features
  enableImmutableStorage: boolean;
  enableRansomwareProtection: boolean;
  // S3 bucket connection for ransomware protection
  s3BucketName: string;
  s3AccessKey: string;
  s3SecretKey: string;
  s3Endpoint: string;
  s3Region: string;
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
    // Default MinIO credentials (empty)
    minioApiKey: '',
    minioUsername: '',
    minioPassword: '',
    // Default protection features
    enableImmutableStorage: false,
    enableRansomwareProtection: false,
    // Default S3 bucket connection
    s3BucketName: '',
    s3AccessKey: '',
    s3SecretKey: '',
    s3Endpoint: '',
    s3Region: 'us-east-1',
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
          {/* MinIO Credentials Section */}
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
          
          {/* Protection Features Section */}
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
          
          {/* S3 Bucket Connection (conditional display) */}
          {form.watch('enableRansomwareProtection') && (
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
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select region" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                          <SelectItem value="us-east-2">US East (Ohio)</SelectItem>
                          <SelectItem value="us-west-1">US West (N. California)</SelectItem>
                          <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                          <SelectItem value="eu-west-1">EU (Ireland)</SelectItem>
                          <SelectItem value="eu-central-1">EU (Frankfurt)</SelectItem>
                          <SelectItem value="ap-northeast-1">Asia Pacific (Tokyo)</SelectItem>
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
          )}
          
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
