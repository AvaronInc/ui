import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { Dock, Server, Network } from 'lucide-react';

const DeploymentConfiguration = () => {
  const form = useForm({
    defaultValues: {
      name: '',
      image: '',
      cpu: '1',
      memory: '512',
      ports: '',
      environment: '',
      orchestration: 'docker',
    },
  });

  const onSubmit = (data: any) => {
    console.log('Form submitted:', data);
    // Handle container deployment
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Container Deployment</CardTitle>
          <CardDescription>
            Configure and deploy new containers to your infrastructure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Setup</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Config</TabsTrigger>
              <TabsTrigger value="orchestration">Orchestration</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4 pt-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Container Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. api-service" {...field} />
                          </FormControl>
                          <FormDescription>
                            A unique name for your container
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Container Image</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. nginx:latest" {...field} />
                          </FormControl>
                          <FormDescription>
                            Docker image to use for this container
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="cpu"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CPU Allocation</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select CPU limit" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="0.5">0.5 CPU</SelectItem>
                              <SelectItem value="1">1 CPU</SelectItem>
                              <SelectItem value="2">2 CPUs</SelectItem>
                              <SelectItem value="4">4 CPUs</SelectItem>
                              <SelectItem value="8">8 CPUs</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            CPU cores allocated to the container
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="memory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Memory Allocation</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select memory limit" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="256">256 MB</SelectItem>
                              <SelectItem value="512">512 MB</SelectItem>
                              <SelectItem value="1024">1 GB</SelectItem>
                              <SelectItem value="2048">2 GB</SelectItem>
                              <SelectItem value="4096">4 GB</SelectItem>
                              <SelectItem value="8192">8 GB</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Memory allocated to the container
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button type="submit">Deploy Container</Button>
                  </div>
                </form>
              </Form>
            </TabsContent>
            
            <TabsContent value="advanced" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Environment Variables</h3>
                  <Input placeholder="KEY=value (one per line)" className="h-32" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Port Mappings</h3>
                  <Input placeholder="host:container (e.g. 80:8080)" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Volume Mounts</h3>
                  <Input placeholder="host_path:container_path" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Network Configuration</h3>
                  <Select defaultValue="bridge">
                    <SelectTrigger>
                      <SelectValue placeholder="Select network mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bridge">Bridge Network</SelectItem>
                      <SelectItem value="host">Host Network</SelectItem>
                      <SelectItem value="none">No Network</SelectItem>
                      <SelectItem value="custom">Custom Network</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="orchestration" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Orchestration Platform</h3>
                  <Select defaultValue="docker">
                    <SelectTrigger>
                      <SelectValue placeholder="Select orchestration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="docker">Docker Standalone</SelectItem>
                      <SelectItem value="swarm">Docker Swarm</SelectItem>
                      <SelectItem value="kubernetes">Kubernetes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Replica Count</h3>
                  <Select defaultValue="1">
                    <SelectTrigger>
                      <SelectValue placeholder="Select replicas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 (No Redundancy)</SelectItem>
                      <SelectItem value="2">2 (Basic Redundancy)</SelectItem>
                      <SelectItem value="3">3 (Recommended)</SelectItem>
                      <SelectItem value="5">5 (High Availability)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Auto-Scaling</h3>
                  <Select defaultValue="disabled">
                    <SelectTrigger>
                      <SelectValue placeholder="Auto-scaling" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="disabled">Disabled</SelectItem>
                      <SelectItem value="cpu">Based on CPU Usage</SelectItem>
                      <SelectItem value="memory">Based on Memory Usage</SelectItem>
                      <SelectItem value="requests">Based on Request Count</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Node Selection</h3>
                  <Select defaultValue="any">
                    <SelectTrigger>
                      <SelectValue placeholder="Node affinity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Node</SelectItem>
                      <SelectItem value="worker">Worker Nodes Only</SelectItem>
                      <SelectItem value="high-cpu">High CPU Nodes</SelectItem>
                      <SelectItem value="high-memory">High Memory Nodes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeploymentConfiguration;
