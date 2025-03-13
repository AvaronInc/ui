
import React from 'react';
import { Switch } from '@/components/ui/switch';
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

interface CallBehaviorProps {
  form: UseFormReturn<AISettingsValues>;
}

const CallBehavior: React.FC<CallBehaviorProps> = ({ form }) => {
  return (
    <SettingsCard title="AI Call Behavior Settings">
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="retryCallsOnNoAnswer"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <FormLabel>Retry Calls if No Answer</FormLabel>
                <FormDescription>
                  Automatically retry calling administrators if no one answers
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="callEscalationPolicy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Call Escalation Policy</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select escalation policy" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">Escalate After 1 Missed Call</SelectItem>
                  <SelectItem value="2">Escalate After 2 Missed Calls</SelectItem>
                  <SelectItem value="3">Escalate After 3 Missed Calls</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Determine when to escalate to the next admin in the call list
              </FormDescription>
            </FormItem>
          )}
        />
      </div>
    </SettingsCard>
  );
};

export default CallBehavior;
