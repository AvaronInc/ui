
import React from 'react';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { OrchestrationFormValues } from './types';

interface CustomServerFieldsProps {
  form: UseFormReturn<OrchestrationFormValues>;
  isSecondary?: boolean;
}

const CustomServerFields: React.FC<CustomServerFieldsProps> = ({ form, isSecondary = false }) => {
  const prefix = isSecondary ? 'secondary' : '';
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{isSecondary ? 'Secondary' : 'Primary'} Custom Server Configuration</h3>
      <FormField
        control={form.control}
        name={`${prefix}customServerIp` as keyof OrchestrationFormValues}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input 
                placeholder="Server IP Address" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name={`${prefix}customServerUsername` as keyof OrchestrationFormValues}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input 
                placeholder="Username" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name={`${prefix}customServerPassword` as keyof OrchestrationFormValues}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input 
                type="password"
                placeholder="Password" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name={`${prefix}customServerCertificate` as keyof OrchestrationFormValues}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input 
                placeholder="SSH Certificate (optional)" 
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

export default CustomServerFields;
