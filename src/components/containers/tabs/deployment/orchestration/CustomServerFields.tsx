
import React from 'react';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { OrchestrationFormValues } from './types';

interface CustomServerFieldsProps {
  form: UseFormReturn<OrchestrationFormValues>;
  isPrimary?: boolean;
  isSecondary?: boolean;
}

const CustomServerFields: React.FC<CustomServerFieldsProps> = ({ 
  form, 
  isPrimary = false, 
  isSecondary = false 
}) => {
  // If isPrimary is true, we're configuring primary server
  // If isSecondary is true, we're configuring secondary server
  // Default to primary if neither is explicitly set
  const configType = isSecondary ? 'secondary' : '';
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{isSecondary ? 'Secondary' : 'Primary'} Custom Server Configuration</h3>
      <FormField
        control={form.control}
        name={`${configType}customServerIp` as keyof OrchestrationFormValues}
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
        name={`${configType}customServerUsername` as keyof OrchestrationFormValues}
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
        name={`${configType}customServerPassword` as keyof OrchestrationFormValues}
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
        name={`${configType}customServerCertificate` as keyof OrchestrationFormValues}
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
