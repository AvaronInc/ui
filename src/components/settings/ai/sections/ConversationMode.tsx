
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

interface ConversationModeProps {
  form: UseFormReturn<AISettingsValues>;
}

const ConversationMode: React.FC<ConversationModeProps> = ({ form }) => {
  return (
    <SettingsCard title="AI Voice Conversation Mode">
      <FormField
        control={form.control}
        name="voiceConversationMode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Voice Conversation Mode</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select voice mode" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="brief">Brief Summary Mode</SelectItem>
                <SelectItem value="interactive">Interactive Q&A Mode</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              Brief mode provides a quick summary while interactive mode allows for questions
            </FormDescription>
          </FormItem>
        )}
      />
    </SettingsCard>
  );
};

export default ConversationMode;
