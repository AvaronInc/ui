
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
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

interface AutoFixesProps {
  form: UseFormReturn<AISettingsValues>;
}

const AutoFixes: React.FC<AutoFixesProps> = ({ form }) => {
  const confidenceThreshold = form.watch('autoFixConfidenceThreshold');

  return (
    <SettingsCard title="AI-Generated Fixes">
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="enableAIRecommendations"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <FormLabel>Enable AI Recommendations</FormLabel>
                <FormDescription>
                  Allow AI to analyze system issues and suggest or automatically implement fixes
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
          name="autoFixConfidenceThreshold"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confidence Threshold for Auto-Fixes</FormLabel>
              <div className="space-y-2">
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <div className="flex flex-col space-y-1">
                  <div className="text-sm text-muted-foreground">
                    Current: {confidenceThreshold}%
                  </div>
                  <Progress value={confidenceThreshold} className="h-2" />
                </div>
              </div>
              <FormDescription>
                AI will only auto-implement fixes when confidence level meets or exceeds this threshold (%)
              </FormDescription>
            </FormItem>
          )}
        />
      </div>
    </SettingsCard>
  );
};

export default AutoFixes;
