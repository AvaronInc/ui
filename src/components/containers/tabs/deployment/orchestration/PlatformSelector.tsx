
import React from 'react';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { OrchestrationFormValues } from './types';

interface PlatformSelectorProps {
  form: UseFormReturn<OrchestrationFormValues>;
}

const PlatformSelector: React.FC<PlatformSelectorProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Orchestration Platform</h3>
      <FormField
        control={form.control}
        name="orchestration"
        render={({ field }) => (
          <FormItem>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select orchestration" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="docker">Docker Standalone</SelectItem>
                <SelectItem value="swarm">Docker Swarm</SelectItem>
                <SelectItem value="kubernetes">Kubernetes</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PlatformSelector;
