
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormField, FormItem, FormLabel, FormDescription, FormControl, FormMessage, Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

interface OrchestrationFormValues {
  orchestration: string;
  primaryNode: string;
  replicaCount: string;
  nodeAffinity: string;
  customServerIp?: string;
  customServerUsername?: string;
  customServerPassword?: string;
  customServerCertificate?: string;
  secondaryNode?: string;
  secondaryCustomServerIp?: string;
  secondaryCustomServerUsername?: string;
  secondaryCustomServerPassword?: string;
  secondaryCustomServerCertificate?: string;
}

const OrchestrationForm: React.FC = () => {
  const [showCustomServerFields, setShowCustomServerFields] = useState(false);
  const [showSecondaryNode, setShowSecondaryNode] = useState(false);
  const [showSecondaryCustomServer, setShowSecondaryCustomServer] = useState(false);

  const form = useForm<OrchestrationFormValues>({
    defaultValues: {
      orchestration: 'docker',
      primaryNode: 'nest-1',
      replicaCount: '1',
      nodeAffinity: 'any',
    },
  });

  const handlePrimaryNodeChange = (value: string) => {
    form.setValue('primaryNode', value);
    setShowCustomServerFields(value === 'custom');
  };

  const handleReplicaCountChange = (value: string) => {
    form.setValue('replicaCount', value);
    setShowSecondaryNode(parseInt(value) > 1);
  };

  const handleSecondaryNodeChange = (value: string) => {
    form.setValue('secondaryNode', value);
    setShowSecondaryCustomServer(value === 'custom');
  };

  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Orchestration Platform</h3>
            <FormField
              control={form.control}
              name="orchestration"
              render={({ field }) => (
                <FormItem>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select orchestration" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="docker">Docker Standalone</SelectItem>
                      <SelectItem value="swarm">Docker Swarm</SelectItem>
                      <SelectItem value="kubernetes">Kubernetes</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Primary NEST Node</h3>
            <FormField
              control={form.control}
              name="primaryNode"
              render={({ field }) => (
                <FormItem>
                  <Select 
                    onValueChange={(value) => handlePrimaryNodeChange(value)} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select primary node" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="nest-1">NEST-1 (Primary)</SelectItem>
                      <SelectItem value="nest-2">NEST-2 (Secondary)</SelectItem>
                      <SelectItem value="nest-3">NEST-3 (Development)</SelectItem>
                      <SelectItem value="nest-4">NEST-4 (Testing)</SelectItem>
                      <SelectItem value="custom">Custom Server</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Replica Count</h3>
            <FormField
              control={form.control}
              name="replicaCount"
              render={({ field }) => (
                <FormItem>
                  <Select 
                    onValueChange={(value) => handleReplicaCountChange(value)} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select replicas" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1 (No Redundancy)</SelectItem>
                      <SelectItem value="2">2 (Basic Redundancy)</SelectItem>
                      <SelectItem value="3">3 (Recommended)</SelectItem>
                      <SelectItem value="5">5 (High Availability)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Node Selection</h3>
            <FormField
              control={form.control}
              name="nodeAffinity"
              render={({ field }) => (
                <FormItem>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Node affinity" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="any">Any Node</SelectItem>
                      <SelectItem value="worker">Worker Nodes Only</SelectItem>
                      <SelectItem value="high-cpu">High CPU Nodes</SelectItem>
                      <SelectItem value="high-memory">High Memory Nodes</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        {showCustomServerFields && (
          <div className="border p-4 rounded-md space-y-4 bg-muted/20">
            <h3 className="font-medium">Primary Custom Server Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="customServerIp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Server IP Address</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 192.168.1.100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="customServerUsername"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. admin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="customServerPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="customServerCertificate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SSH Certificate</FormLabel>
                    <FormControl>
                      <Input 
                        type="file" 
                        onChange={(e) => {
                          field.onChange(e.target.files ? e.target.files[0]?.name : '');
                        }} 
                      />
                    </FormControl>
                    <FormDescription>
                      Upload SSH certificate for authentication
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}
        
        {showSecondaryNode && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Secondary NEST Node</h3>
            <FormField
              control={form.control}
              name="secondaryNode"
              render={({ field }) => (
                <FormItem>
                  <Select 
                    onValueChange={(value) => handleSecondaryNodeChange(value)} 
                    defaultValue={field.value || 'nest-2'}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select secondary node" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="nest-1">NEST-1 (Primary)</SelectItem>
                      <SelectItem value="nest-2">NEST-2 (Secondary)</SelectItem>
                      <SelectItem value="nest-3">NEST-3 (Development)</SelectItem>
                      <SelectItem value="nest-4">NEST-4 (Testing)</SelectItem>
                      <SelectItem value="custom">Custom Server</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {showSecondaryCustomServer && (
              <div className="border p-4 rounded-md space-y-4 bg-muted/20 mt-4">
                <h3 className="font-medium">Secondary Custom Server Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="secondaryCustomServerIp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Server IP Address</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 192.168.1.101" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="secondaryCustomServerUsername"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. admin" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="secondaryCustomServerPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Enter password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="secondaryCustomServerCertificate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SSH Certificate</FormLabel>
                        <FormControl>
                          <Input 
                            type="file" 
                            onChange={(e) => {
                              field.onChange(e.target.files ? e.target.files[0]?.name : '');
                            }} 
                          />
                        </FormControl>
                        <FormDescription>
                          Upload SSH certificate for authentication
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </form>
    </Form>
  );
};

export default OrchestrationForm;
