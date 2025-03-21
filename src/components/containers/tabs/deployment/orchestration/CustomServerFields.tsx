
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { OrchestrationFormValues } from './types';

interface CustomServerFieldsProps {
  form: UseFormReturn<OrchestrationFormValues>;
  isPrimary?: boolean;
}

const CustomServerFields: React.FC<CustomServerFieldsProps> = ({ form, isPrimary = true }) => {
  const fieldPrefix = isPrimary ? '' : 'secondary';
  const titlePrefix = isPrimary ? 'Primary' : 'Secondary';

  return (
    <div className="border p-4 rounded-md space-y-4 bg-muted/20">
      <h3 className="font-medium">{titlePrefix} Custom Server Configuration</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={`${fieldPrefix}${isPrimary ? 'c' : 'C'}ustomServerIp`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Server IP Address</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 192.168.1.100" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name={`${fieldPrefix}${isPrimary ? 'c' : 'C'}ustomServerUsername`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="e.g. admin" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name={`${fieldPrefix}${isPrimary ? 'c' : 'C'}ustomServerPassword`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name={`${fieldPrefix}${isPrimary ? 'c' : 'C'}ustomServerCertificate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>SSH Certificate</FormLabel>
              <FormControl>
                <Input 
                  type="file" 
                  onChange={(e) => {
                    field.onChange(e.target.files ? e.target.files[0]?.name : '');
                  }} 
                />
              </FormControl>
              <FormDescription>
                Upload SSH certificate for authentication
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default CustomServerFields;
