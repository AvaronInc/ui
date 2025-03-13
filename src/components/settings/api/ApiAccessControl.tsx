
import { Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { UseFormReturn } from 'react-hook-form';
import { APISettingsFormValues } from './types';

interface ApiAccessControlProps {
  form: UseFormReturn<APISettingsFormValues>;
  onGenerateApiKey: () => void;
  onRemoveApiKey: (key: string) => void;
}

const ApiAccessControl = ({ form, onGenerateApiKey, onRemoveApiKey }: ApiAccessControlProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">API Access Control</h3>
      <div className="grid gap-4">
        <FormField
          control={form.control}
          name="enableApiAccess"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  Enable API Access
                </FormLabel>
                <FormDescription>
                  Allow external applications to access the system via API
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        <div className="p-4 border rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">API Keys</h4>
            <Button 
              size="sm" 
              onClick={onGenerateApiKey}
              disabled={!form.watch('enableApiAccess')}
            >
              Generate API Key
            </Button>
          </div>
          
          {form.watch('apiKeys').length > 0 ? (
            <div className="space-y-2">
              {form.watch('apiKeys').map((apiKey, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                  <code className="text-xs overflow-hidden text-ellipsis">{apiKey}</code>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onRemoveApiKey(apiKey)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              No API keys generated yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiAccessControl;
