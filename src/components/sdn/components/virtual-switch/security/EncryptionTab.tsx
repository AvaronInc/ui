
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Fingerprint } from 'lucide-react';
import { Control } from 'react-hook-form';
import { SwitchSecurityValues } from './types';

interface EncryptionTabProps {
  control: Control<SwitchSecurityValues>;
  watch: (name: string) => any;
}

const EncryptionTab: React.FC<EncryptionTabProps> = ({ control, watch }) => {
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="encryptionEnabled"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                Encrypted Virtual Switch Communication
              </FormLabel>
              <FormDescription>
                Secure inter-switch communications to prevent man-in-the-middle attacks
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="encryptionType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Encryption Protocol</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
              disabled={!watch('encryptionEnabled')}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select encryption type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="wireguard">WireGuard (Recommended)</SelectItem>
                <SelectItem value="ipsec">IPSec</SelectItem>
                <SelectItem value="tls">TLS/SSL</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              Protocol used for securing virtual switch communications
            </FormDescription>
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="kyberEncryption"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={!watch('encryptionEnabled') || watch('encryptionType') !== 'wireguard'}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                Enable Kyber Quantum-Resistant Encryption
              </FormLabel>
              <FormDescription>
                Add post-quantum cryptography layer to protect against future quantum attacks
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
      
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <Fingerprint className="h-5 w-5 text-primary mt-1" />
            <div>
              <h4 className="font-medium">WireGuard with Kyber Encryption</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Using WireGuard with Kyber post-quantum cryptography provides the strongest protection
                against both current and future threats, including quantum computing attacks.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EncryptionTab;
