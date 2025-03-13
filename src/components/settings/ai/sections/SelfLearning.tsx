
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SettingsCard from '@/components/settings/SettingsCard';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { AISettingsValues } from '../schema';

interface SelfLearningProps {
  form: UseFormReturn<AISettingsValues>;
}

const SelfLearning: React.FC<SelfLearningProps> = ({ form }) => {
  return (
    <SettingsCard title="AI Self-Learning Period">
      <FormField
        control={form.control}
        name="aiLearningDuration"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Learning Duration Before Auto-Fixing New Issues</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select learning period" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="7">7 Days</SelectItem>
                <SelectItem value="14">14 Days</SelectItem>
                <SelectItem value="30">30 Days</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              Period the AI will observe and learn about new issues before attempting to auto-fix them
            </FormDescription>
          </FormItem>
        )}
      />
    </SettingsCard>
  );
};

export default SelfLearning;
