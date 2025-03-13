
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

interface VoiceCallSettingsProps {
  form: UseFormReturn<AISettingsValues>;
}

const VoiceCallSettings: React.FC<VoiceCallSettingsProps> = ({ form }) => {
  return (
    <SettingsCard title="AI Voice Call Alerts">
      <FormField
        control={form.control}
        name="enableAIVoiceCalls"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
            <div className="space-y-0.5">
              <FormLabel>Enable AI Voice Calls for Critical Events</FormLabel>
              <FormDescription>
                Allow system to make phone calls to administrators when critical events occur
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
    </SettingsCard>
  );
};

export default VoiceCallSettings;
