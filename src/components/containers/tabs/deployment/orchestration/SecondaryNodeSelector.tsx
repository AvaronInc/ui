
import React from 'react';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { OrchestrationFormValues } from './types';

interface SecondaryNodeSelectorProps {
  form: UseFormReturn<OrchestrationFormValues>;
  onValueChange: (value: string) => void;
}

const SecondaryNodeSelector: React.FC<SecondaryNodeSelectorProps> = ({ form, onValueChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Secondary NEST Node</h3>
      <FormField
        control={form.control}
        name="secondaryNode"
        render={({ field }) => (
          <FormItem>
            <Select 
              onValueChange={(value) => onValueChange(value)} 
              defaultValue={field.value || 'nest-2'}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select secondary node" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="nest-1">NEST-1 (Primary)</SelectItem>
                <SelectItem value="nest-2">NEST-2 (Secondary)</SelectItem>
                <SelectItem value="nest-3">NEST-3 (Development)</SelectItem>
                <SelectItem value="nest-4">NEST-4 (Testing)</SelectItem>
                <SelectItem value="custom">Custom Server</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default SecondaryNodeSelector;
