
import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AdvancedConfigFormValues {
  environmentVars: string;
  portMappings: string;
  volumeMounts: string;
  networkMode: string;
}

const AdvancedConfigForm: React.FC = () => {
  const form = useForm<AdvancedConfigFormValues>({
    defaultValues: {
      environmentVars: '',
      portMappings: '',
      volumeMounts: '',
      networkMode: 'bridge',
    },
  });

  return (
    <Form {...form}>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Environment Variables</h3>
          <FormField
            control={form.control}
            name="environmentVars"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    placeholder="KEY=value (one per line)" 
                    className="h-32" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Port Mappings</h3>
          <FormField
            control={form.control}
            name="portMappings"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    placeholder="host:container (e.g. 80:8080)" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
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
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Network Configuration</h3>
          <FormField
            control={form.control}
            name="networkMode"
            render={({ field }) => (
              <FormItem>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select network mode" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="bridge">Bridge Network</SelectItem>
                    <SelectItem value="host">Host Network</SelectItem>
                    <SelectItem value="none">No Network</SelectItem>
                    <SelectItem value="custom">Custom Network</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default AdvancedConfigForm;
