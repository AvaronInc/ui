
import React from 'react';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { AdvancedConfigFormValues } from './types';

interface EnvironmentVariablesProps {
  form: UseFormReturn<AdvancedConfigFormValues>;
}

const EnvironmentVariables: React.FC<EnvironmentVariablesProps> = ({ form }) => {
  return (
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
  );
};

export default EnvironmentVariables;
