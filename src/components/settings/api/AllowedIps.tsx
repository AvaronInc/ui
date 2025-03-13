
import { useState } from 'react';
import { Shield, PlusCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  FormDescription,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { APISettingsFormValues } from './types';

interface AllowedIpsProps {
  form: UseFormReturn<APISettingsFormValues>;
}

const AllowedIps = ({ form }: AllowedIpsProps) => {
  const { toast } = useToast();
  const [newIpAddress, setNewIpAddress] = useState('');
  
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
  
  return (
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
  );
};

export default AllowedIps;
