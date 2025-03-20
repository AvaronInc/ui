
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Server, Network, Database, Cloud, Settings, Plug } from 'lucide-react';

// Form schema for the virtual switch configuration
const switchConfigSchema = z.object({
  name: z.string().min(3, { message: "Switch name must be at least 3 characters" }),
  description: z.string().optional(),
  switchType: z.enum(['layer2', 'layer3', 'hybrid']),
  encapsulation: z.enum(['vxlan', 'gre', 'mpls', 'none']),
  useAiOptimization: z.boolean().default(true),
  vlans: z.string().optional(),
  qosEnabled: z.boolean().default(false),
  deployToSites: z.array(z.string()).default([]),
  interfaces: z.number().min(1).max(128).default(4),
  subnets: z.string().optional(),
});

type SwitchConfigValues = z.infer<typeof switchConfigSchema>;

interface VirtualSwitchConfigDialogProps {
  open: boolean;
  onClose: () => void;
  onDeploy: (values: SwitchConfigValues) => void;
}

const VirtualSwitchConfigDialog: React.FC<VirtualSwitchConfigDialogProps> = ({
  open,
  onClose,
  onDeploy
}) => {
  const { toast } = useToast();
  const form = useForm<SwitchConfigValues>({
    resolver: zodResolver(switchConfigSchema),
    defaultValues: {
      name: '',
      description: '',
      switchType: 'layer2',
      encapsulation: 'vxlan',
      useAiOptimization: true,
      qosEnabled: false,
      interfaces: 4,
      deployToSites: [],
    }
  });
  
  const onSubmit = (values: SwitchConfigValues) => {
    onDeploy(values);
    toast({
      title: "Switch Configuration Submitted",
      description: `Virtual switch "${values.name}" configured and queued for deployment.`
    });
    onClose();
  };

  const nestSites = [
    { id: 'site1', name: 'Main Datacenter' },
    { id: 'site2', name: 'Edge Network' },
    { id: 'site3', name: 'Branch Office 1' },
    { id: 'site4', name: 'Branch Office 2' },
    { id: 'site5', name: 'Cloud Zone' },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Server className="mr-2 h-5 w-5 text-primary" />
            Configure Virtual Switch
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Tabs defaultValue="basic">
              <TabsList className="mb-4">
                <TabsTrigger value="basic" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Basic Settings
                </TabsTrigger>
                <TabsTrigger value="network" className="flex items-center">
                  <Network className="mr-2 h-4 w-4" />
                  Network Config
                </TabsTrigger>
                <TabsTrigger value="advanced" className="flex items-center">
                  <Database className="mr-2 h-4 w-4" />
                  VLAN & Subnets
                </TabsTrigger>
                <TabsTrigger value="deployment" className="flex items-center">
                  <Cloud className="mr-2 h-4 w-4" />
                  Deployment
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Switch Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter switch name..." {...field} />
                      </FormControl>
                      <FormDescription>
                        Unique name to identify this virtual switch
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the purpose of this switch..." 
                          className="resize-none" 
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="switchType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Switch Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select switch type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="layer2">Layer 2 Switch</SelectItem>
                          <SelectItem value="layer3">Layer 3 Switch (Routing)</SelectItem>
                          <SelectItem value="hybrid">Hybrid L2/L3 Switch</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Determines the functionality level of the virtual switch
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="encapsulation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Encapsulation Protocol</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select encapsulation" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="vxlan">VXLAN</SelectItem>
                          <SelectItem value="gre">GRE Tunnel</SelectItem>
                          <SelectItem value="mpls">MPLS</SelectItem>
                          <SelectItem value="none">None (Native)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Protocol used for network traffic encapsulation
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="network" className="space-y-4">
                <FormField
                  control={form.control}
                  name="interfaces"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Interfaces</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={1} 
                          max={128} 
                          {...field}
                          onChange={e => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>
                        Number of logical interfaces to create on this virtual switch
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <div className="bg-muted/50 p-4 rounded-md">
                  <h3 className="font-medium flex items-center mb-2">
                    <Plug className="mr-2 h-4 w-4" />
                    Port & Interface Assignment
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Interface configuration will be available after initial switch deployment
                  </p>
                  
                  <FormField
                    control={form.control}
                    name="qosEnabled"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Enable QoS Policies
                          </FormLabel>
                          <FormDescription>
                            Allow quality of service configuration on switch ports
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="advanced" className="space-y-4">
                <FormField
                  control={form.control}
                  name="vlans"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>VLAN Configuration</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="VLAN IDs (comma separated): 10,20,30,100-200" 
                          className="resize-none h-20" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Specify VLAN IDs as individual numbers or ranges (e.g., 100-200)
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subnets"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subnet Assignment</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter subnet CIDR notation: 10.0.1.0/24,192.168.10.0/24" 
                          className="resize-none h-20" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Define subnets for L3 switches (using CIDR notation)
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="deployment" className="space-y-4">
                <FormField
                  control={form.control}
                  name="useAiOptimization"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Use AI-Assisted Deployment
                        </FormLabel>
                        <FormDescription>
                          Optimize switch placement and configuration based on network traffic patterns
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <div className="p-4 border rounded-md bg-muted/30">
                  <h3 className="font-medium mb-2">Multi-Site Deployment</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Deploy this virtual switch across multiple NEST locations
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {nestSites.map(site => (
                      <FormField
                        key={site.id}
                        control={form.control}
                        name="deployToSites"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-2 space-y-0 p-2 rounded-md">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(site.id)}
                                onCheckedChange={(checked) => {
                                  const updatedSites = checked 
                                    ? [...field.value, site.id]
                                    : field.value.filter(value => value !== site.id);
                                  field.onChange(updatedSites);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {site.name}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                Deploy Virtual Switch
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default VirtualSwitchConfigDialog;
