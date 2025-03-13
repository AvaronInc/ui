
import React from 'react';
import { Switch } from '@/components/ui/switch';
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

interface IncidentResponseProps {
  form: UseFormReturn<AISettingsValues>;
}

const IncidentResponse: React.FC<IncidentResponseProps> = ({ form }) => {
  return (
    <SettingsCard title="Integration with Incident Response">
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="openSupportTicket"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <FormLabel>Allow AI to Open a Support Ticket After Call</FormLabel>
                <FormDescription>
                  Automatically create a support ticket after AI voice calls
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
          name="generateTranscript"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <FormLabel>Generate Call Transcript & Send to Admins</FormLabel>
                <FormDescription>
                  Create a written record of AI voice calls and email to all administrators
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
      </div>
    </SettingsCard>
  );
};

export default IncidentResponse;
