
import React from 'react';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { OrchestrationFormValues } from './types';

interface NodeAffinitySelectorProps {
  form: UseFormReturn<OrchestrationFormValues>;
}

const NodeAffinitySelector: React.FC<NodeAffinitySelectorProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Node Selection</h3>
      <FormField
        control={form.control}
        name="nodeAffinity"
        render={({ field }) => (
          <FormItem>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Node affinity" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="any">Any Node</SelectItem>
                <SelectItem value="worker">Worker Nodes Only</SelectItem>
                <SelectItem value="high-cpu">High CPU Nodes</SelectItem>
                <SelectItem value="high-memory">High Memory Nodes</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default NodeAffinitySelector;
