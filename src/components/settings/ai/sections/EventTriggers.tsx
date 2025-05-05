
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
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

interface EventTriggersProps {
  form: UseFormReturn<AISettingsValues>;
}

const EventTriggers: React.FC<EventTriggersProps> = ({ form }) => {
  return (
    <SettingsCard title="Event Triggers for AI Calls">
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="networkOutage"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Network Outage</FormLabel>
                <FormDescription>
                  Trigger AI calls when network outages are detected
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="securityIntrusion"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Security Intrusion Alert</FormLabel>
                <FormDescription>
                  Trigger AI calls when security intrusions are detected
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="hardwareFailure"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Avaron Vertex Hardware Failure</FormLabel>
                <FormDescription>
                  Trigger AI calls when Avaron Vertex hardware failures occur
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="highLatency"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>High Latency/Poor Performance</FormLabel>
                <FormDescription>
                  Trigger AI calls when system performance degrades significantly
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="customEvents"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Custom Events</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter custom events, one per line"
                  className="resize-y"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Define custom events that should trigger AI calls
              </FormDescription>
            </FormItem>
          )}
        />
      </div>
    </SettingsCard>
  );
};

export default EventTriggers;
