
import React from 'react';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { AdvancedConfigFormValues } from './types';

interface NetworkConfigProps {
  form: UseFormReturn<AdvancedConfigFormValues>;
}

const NetworkConfig: React.FC<NetworkConfigProps> = ({ form }) => {
  return (
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
  );
};

export default NetworkConfig;
