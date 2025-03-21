
import React from 'react';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { AdvancedConfigFormValues } from './types';

interface PortMappingsProps {
  form: UseFormReturn<AdvancedConfigFormValues>;
}

const PortMappings: React.FC<PortMappingsProps> = ({ form }) => {
  return (
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
  );
};

export default PortMappings;
