
import React from 'react';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { OrchestrationFormValues } from './types';

interface ReplicaSelectorProps {
  form: UseFormReturn<OrchestrationFormValues>;
  onValueChange: (value: string) => void;
}

const ReplicaSelector: React.FC<ReplicaSelectorProps> = ({ form, onValueChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Replica Count</h3>
      <FormField
        control={form.control}
        name="replicaCount"
        render={({ field }) => (
          <FormItem>
            <Select 
              onValueChange={(value) => onValueChange(value)} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select replicas" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="1">1 (No Redundancy)</SelectItem>
                <SelectItem value="2">2 (Basic Redundancy)</SelectItem>
                <SelectItem value="3">3 (Recommended)</SelectItem>
                <SelectItem value="5">5 (High Availability)</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ReplicaSelector;
