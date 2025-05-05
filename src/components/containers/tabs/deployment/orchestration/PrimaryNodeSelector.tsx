
import React from 'react';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { OrchestrationFormValues } from './types';

interface PrimaryNodeSelectorProps {
  form: UseFormReturn<OrchestrationFormValues>;
  onValueChange: (value: string) => void;
}

const PrimaryNodeSelector: React.FC<PrimaryNodeSelectorProps> = ({ form, onValueChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Primary Vertex Node</h3>
      <FormField
        control={form.control}
        name="primaryNode"
        render={({ field }) => (
          <FormItem>
            <Select 
              onValueChange={(value) => onValueChange(value)} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select primary node" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="vertex-1">Vertex-1 (Primary)</SelectItem>
                <SelectItem value="vertex-2">Vertex-2 (Secondary)</SelectItem>
                <SelectItem value="vertex-3">Vertex-3 (Development)</SelectItem>
                <SelectItem value="vertex-4">Vertex-4 (Testing)</SelectItem>
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

export default PrimaryNodeSelector;
