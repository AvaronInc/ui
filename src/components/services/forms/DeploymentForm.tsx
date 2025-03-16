
import React from 'react';
import { ServiceType, DeploymentConfig } from '@/types/services';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { serviceTypeConfigs } from '@/data/servicesData';
import { ArrowLeft } from 'lucide-react';

interface DeploymentFormProps {
  serviceType: ServiceType;
  onBack: () => void;
}

const DeploymentForm = ({ serviceType, onBack }: DeploymentFormProps) => {
  const selectedServiceConfig = serviceTypeConfigs.find(config => config.type === serviceType);
  
  const defaultValues: DeploymentConfig = {
    name: '',
    description: '',
    type: serviceType,
    version: '',
    instances: 1,
    resources: {
      cpu: 1,
      memory: 1,
      storage: 10
    },
    networking: {
      port: 80,
      enableIPv6: false,
      enableSSL: true,
      sslCertType: 'auto'
    },
    scaling: {
      enabled: true,
      minInstances: 1,
      maxInstances: 3,
      cpuThreshold: 75,
      memoryThreshold: 80
    },
    monitoring: {
      enableAIDetection: true,
      loggingLevel: 'standard',
      retentionDays: 30
    },
    storage: {
      persistentStorage: true,
      backupsEnabled: true,
      backupSchedule: 'daily'
    }
  };
  
  const form = useForm<DeploymentConfig>({
    defaultValues
  });
  
  const onSubmit = (data: DeploymentConfig) => {
    console.log('Deployment configuration submitted:', data);
    // Here you would typically submit the data to your backend
    alert('Service deployment initiated!');
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <CardTitle className="text-xl">
              Deploy {selectedServiceConfig?.name || 'Service'}
            </CardTitle>
            <CardDescription>
              Configure your {selectedServiceConfig?.name.toLowerCase()} deployment
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Basic Information</h3>
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter service name" {...field} />
                      </FormControl>
                      <FormMessage />
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
                        <Input placeholder="Brief description of service" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="version"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Version</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select version" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="latest">Latest</SelectItem>
                          <SelectItem value="stable">Stable</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="instances"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Initial Instances</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={1} 
                          {...field} 
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>
                        Number of service instances to deploy
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Resource Allocation */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Resource Allocation</h3>
                
                <FormField
                  control={form.control}
                  name="resources.cpu"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPU Cores</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={0.5} 
                          step={0.5} 
                          {...field} 
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="resources.memory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Memory (GB)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={0.5} 
                          step={0.5} 
                          {...field} 
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="resources.storage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Storage (GB)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={1} 
                          {...field} 
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* Networking */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Networking & Security</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="networking.domain"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Domain Name</FormLabel>
                      <FormControl>
                        <Input placeholder="example.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        Leave empty for internal services
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="networking.port"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Port</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={1} 
                          max={65535} 
                          {...field} 
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="networking.enableIPv6"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Enable IPv6</FormLabel>
                        <FormDescription>
                          Support IPv6 connectivity
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
                  name="networking.enableSSL"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Enable SSL/TLS</FormLabel>
                        <FormDescription>
                          Secure traffic with encryption
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
              </div>
            </div>
            
            {/* Auto-Scaling */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Auto-Scaling & Monitoring</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="scaling.enabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Enable Auto-Scaling</FormLabel>
                        <FormDescription>
                          Automatically adjust resources based on demand
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
                  name="monitoring.enableAIDetection"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">AI Anomaly Detection</FormLabel>
                        <FormDescription>
                          Use AI to detect unusual behavior
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
                  name="monitoring.loggingLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Logging Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select logging level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="minimal">Minimal</SelectItem>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="verbose">Verbose</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="storage.backupsEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Enable Automated Backups</FormLabel>
                        <FormDescription>
                          Schedule regular data backups
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
              </div>
            </div>
            
            <Button type="submit" className="w-full">Deploy Service</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DeploymentForm;
