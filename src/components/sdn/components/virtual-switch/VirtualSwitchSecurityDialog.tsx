
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Shield, Users, Fingerprint, Lock, ShieldAlert, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserRole } from '@/types/identity';

// Form schema for the virtual switch security configuration
const switchSecuritySchema = z.object({
  rbacEnabled: z.boolean().default(true),
  allowedRoles: z.array(z.string()).default(['Admin', 'Engineer']),
  microsegmentationEnabled: z.boolean().default(false),
  securityZones: z.array(z.string()).default([]),
  autoQuarantine: z.boolean().default(true),
  anomalyDetection: z.boolean().default(true),
  alertThreshold: z.enum(['low', 'medium', 'high']).default('medium'),
  encryptionEnabled: z.boolean().default(true),
  encryptionType: z.enum(['wireguard', 'ipsec', 'tls']).default('wireguard'),
  kyberEncryption: z.boolean().default(true),
});

type SwitchSecurityValues = z.infer<typeof switchSecuritySchema>;

interface VirtualSwitchSecurityDialogProps {
  open: boolean;
  onClose: () => void;
  selectedSwitch: string | null;
  onApply: (values: SwitchSecurityValues) => void;
}

const VirtualSwitchSecurityDialog: React.FC<VirtualSwitchSecurityDialogProps> = ({
  open,
  onClose,
  selectedSwitch,
  onApply
}) => {
  const { toast } = useToast();
  const form = useForm<SwitchSecurityValues>({
    resolver: zodResolver(switchSecuritySchema),
    defaultValues: {
      rbacEnabled: true,
      allowedRoles: ['Admin', 'Engineer'],
      microsegmentationEnabled: false,
      securityZones: [],
      autoQuarantine: true,
      anomalyDetection: true,
      alertThreshold: 'medium',
      encryptionEnabled: true,
      encryptionType: 'wireguard',
      kyberEncryption: true,
    }
  });
  
  const onSubmit = (values: SwitchSecurityValues) => {
    onApply(values);
    toast({
      title: "Security Settings Applied",
      description: `Security configuration for "${selectedSwitch}" has been updated.`
    });
    onClose();
  };

  const availableRoles: { id: string, name: string }[] = [
    { id: 'Admin', name: 'Administrator' },
    { id: 'Engineer', name: 'Network Engineer' },
    { id: 'Security', name: 'Security Analyst' },
    { id: 'Operator', name: 'Network Operator' },
    { id: 'User', name: 'Standard User' },
  ];

  const securityZones: { id: string, name: string, level: string }[] = [
    { id: 'zone1', name: 'Trusted Zone', level: 'low' },
    { id: 'zone2', name: 'DMZ', level: 'medium' },
    { id: 'zone3', name: 'Restricted Zone', level: 'high' },
    { id: 'zone4', name: 'Quarantine Zone', level: 'critical' },
    { id: 'zone5', name: 'Public Zone', level: 'medium' },
  ];

  const getZoneBadge = (level: string) => {
    switch (level) {
      case 'low':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Low</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Medium</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">High</Badge>;
      case 'critical':
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Critical</Badge>;
      default:
        return <Badge variant="outline">{level}</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Shield className="mr-2 h-5 w-5 text-primary" />
            Virtual Switch Security & Access Control
            {selectedSwitch && (
              <Badge variant="outline" className="ml-2">
                {selectedSwitch}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh] pr-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <Tabs defaultValue="rbac">
                <TabsList className="mb-4">
                  <TabsTrigger value="rbac" className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    RBAC
                  </TabsTrigger>
                  <TabsTrigger value="segmentation" className="flex items-center">
                    <Lock className="mr-2 h-4 w-4" />
                    Microsegmentation
                  </TabsTrigger>
                  <TabsTrigger value="anomaly" className="flex items-center">
                    <ShieldAlert className="mr-2 h-4 w-4" />
                    Anomaly Detection
                  </TabsTrigger>
                  <TabsTrigger value="encryption" className="flex items-center">
                    <Fingerprint className="mr-2 h-4 w-4" />
                    Encryption
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="rbac" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="rbacEnabled"
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
                            Enable Role-Based Access Control
                          </FormLabel>
                          <FormDescription>
                            Control who can create, modify, and delete virtual switches based on their assigned roles
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Role Permissions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {availableRoles.map(role => (
                          <FormField
                            key={role.id}
                            control={form.control}
                            name="allowedRoles"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(role.id)}
                                    onCheckedChange={(checked) => {
                                      const updatedRoles = checked 
                                        ? [...field.value, role.id]
                                        : field.value.filter(value => value !== role.id);
                                      field.onChange(updatedRoles);
                                    }}
                                  />
                                </FormControl>
                                <div className="flex justify-between w-full">
                                  <FormLabel className="font-normal cursor-pointer">
                                    {role.name}
                                  </FormLabel>
                                  <div className="flex gap-2">
                                    <Badge variant={role.id === 'Admin' || role.id === 'Engineer' ? "default" : "outline"}>
                                      {role.id === 'Admin' ? 'Full Access' : 
                                        role.id === 'Engineer' ? 'Modify' : 
                                        role.id === 'Security' ? 'View & Audit' : 
                                        role.id === 'Operator' ? 'Limited' : 'View Only'}
                                    </Badge>
                                  </div>
                                </div>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="segmentation" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="microsegmentationEnabled"
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
                            Enable Microsegmentation
                          </FormLabel>
                          <FormDescription>
                            Create isolated security zones within your network using virtual switches
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Security Zones</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {securityZones.map(zone => (
                          <FormField
                            key={zone.id}
                            control={form.control}
                            name="securityZones"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(zone.id)}
                                    onCheckedChange={(checked) => {
                                      const updatedZones = checked 
                                        ? [...field.value, zone.id]
                                        : field.value.filter(value => value !== zone.id);
                                      field.onChange(updatedZones);
                                    }}
                                  />
                                </FormControl>
                                <div className="flex justify-between w-full">
                                  <FormLabel className="font-normal cursor-pointer">
                                    {zone.name}
                                  </FormLabel>
                                  <div className="flex gap-2">
                                    {getZoneBadge(zone.level)}
                                  </div>
                                </div>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <FormField
                    control={form.control}
                    name="autoQuarantine"
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
                            Auto-Quarantine Suspicious Traffic
                          </FormLabel>
                          <FormDescription>
                            Automatically isolate suspicious traffic detected by CyberNest AI
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </TabsContent>
                
                <TabsContent value="anomaly" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="anomalyDetection"
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
                            AI-Powered Anomaly Detection
                          </FormLabel>
                          <FormDescription>
                            Detect unauthorized switch modifications or rogue virtual switches
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                        Alert Configuration
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={form.control}
                        name="alertThreshold"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Alert Sensitivity Threshold</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select alert threshold" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="low">Low (Alert on severe anomalies only)</SelectItem>
                                <SelectItem value="medium">Medium (Balanced approach)</SelectItem>
                                <SelectItem value="high">High (Detect even minor anomalies)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Controls the sensitivity of the anomaly detection system
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      
                      <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-md border border-amber-200 dark:border-amber-900/50">
                        <h4 className="font-medium flex items-center text-amber-800 dark:text-amber-300">
                          <ShieldAlert className="h-4 w-4 mr-2" />
                          Anomaly Detection Features
                        </h4>
                        <ul className="text-sm mt-2 space-y-1 text-amber-700 dark:text-amber-400">
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Unauthorized switch modifications</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Rogue virtual switch detection</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Unusual traffic patterns identification</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Potential lateral movement attacks</span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="encryption" className="space-y-4">
                  <FormField
                    control={form.control}
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
                    control={form.control}
                    name="encryptionType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Encryption Protocol</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          disabled={!form.watch('encryptionEnabled')}
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
                    control={form.control}
                    name="kyberEncryption"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={!form.watch('encryptionEnabled') || form.watch('encryptionType') !== 'wireguard'}
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
                </TabsContent>
              </Tabs>
              
              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  Apply Security Settings
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default VirtualSwitchSecurityDialog;
