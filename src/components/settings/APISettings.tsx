
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';
import { Code, Shield, PlusCircle, X } from 'lucide-react';

interface APISettingsFormValues {
  enableApiAccess: boolean;
  apiKeys: string[];
  allowedIps: string[];
}

const APISettings = () => {
  const { toast } = useToast();
  
  const defaultValues: APISettingsFormValues = {
    enableApiAccess: false,
    apiKeys: [],
    allowedIps: [],
  };
  
  // Initialize form with saved values from localStorage or defaults
  const [formValues, setFormValues] = useState<APISettingsFormValues>(() => {
    const savedSettings = localStorage.getItem('apiSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultValues;
  });
  
  const [newIpAddress, setNewIpAddress] = useState('');
  
  const form = useForm<APISettingsFormValues>({
    defaultValues: formValues,
  });
  
  // Save settings to localStorage when form is submitted
  const handleSave = () => {
    const values = form.getValues();
    localStorage.setItem('apiSettings', JSON.stringify(values));
    setFormValues(values);
    
    toast({
      title: "Settings saved",
      description: "API & Integration settings have been updated successfully.",
    });
  };
  
  // Generate a new API key
  const handleGenerateApiKey = () => {
    // Simple random API key generator
    const apiKey = 'api_' + Math.random().toString(36).substring(2, 15) + 
                  Math.random().toString(36).substring(2, 15);
    
    const currentValues = form.getValues();
    const updatedApiKeys = [...currentValues.apiKeys, apiKey];
    
    form.setValue('apiKeys', updatedApiKeys);
    
    toast({
      title: "API Key Generated",
      description: "A new API key has been generated. Keep it secure!",
    });
  };
  
  // Add new IP address to allowed list
  const handleAddIpAddress = () => {
    if (!newIpAddress) return;
    
    // Simple IP validation regex
    const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    if (!ipRegex.test(newIpAddress)) {
      toast({
        title: "Invalid IP Address",
        description: "Please enter a valid IPv4 address.",
        variant: "destructive",
      });
      return;
    }
    
    const currentValues = form.getValues();
    const updatedIps = [...currentValues.allowedIps, newIpAddress];
    
    form.setValue('allowedIps', updatedIps);
    setNewIpAddress('');
  };
  
  // Remove IP address from allowed list
  const handleRemoveIpAddress = (ipToRemove: string) => {
    const currentValues = form.getValues();
    const updatedIps = currentValues.allowedIps.filter(ip => ip !== ipToRemove);
    
    form.setValue('allowedIps', updatedIps);
  };
  
  // Remove API key
  const handleRemoveApiKey = (keyToRemove: string) => {
    const currentValues = form.getValues();
    const updatedApiKeys = currentValues.apiKeys.filter(key => key !== keyToRemove);
    
    form.setValue('apiKeys', updatedApiKeys);
  };
  
  // Update form when formValues change
  useEffect(() => {
    form.reset(formValues);
  }, [form, formValues]);
  
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground mb-6">
        Configure API access, rate limits, keys, and third-party integrations.
      </div>
      
      <Form {...form}>
        <form className="space-y-8">
          {/* API Access Control */}
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
                    onClick={handleGenerateApiKey}
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
                          onClick={() => handleRemoveApiKey(apiKey)}
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
          
          {/* Allowed IPs for API Access */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Allowed IPs for API Access</h3>
            <div className="grid gap-4">
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Add Whitelisted IP Addresses
                </FormLabel>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter IP address (e.g., 192.168.1.1)"
                    value={newIpAddress}
                    onChange={(e) => setNewIpAddress(e.target.value)}
                    disabled={!form.watch('enableApiAccess')}
                  />
                  <Button 
                    onClick={handleAddIpAddress}
                    disabled={!form.watch('enableApiAccess')}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
                <FormDescription>
                  Only these IP addresses will be able to access the API
                </FormDescription>
              </FormItem>
              
              {form.watch('allowedIps').length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {form.watch('allowedIps').map((ip, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <code>{ip}</code>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleRemoveIpAddress(ip)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">
                  No IP addresses whitelisted yet.
                </div>
              )}
            </div>
          </div>
        </form>
      </Form>
      
      <div className="flex justify-end pt-4 border-t">
        <Button onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default APISettings;
