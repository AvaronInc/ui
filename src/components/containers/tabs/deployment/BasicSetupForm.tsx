
import React, { useState } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';

interface DeploymentFormValues {
  name: string;
  image: string;
  cpu: string;
  memory: string;
  ports: string;
  environment: string;
  orchestration: string;
  vertexNode: string;
  customServerIp?: string;
  customServerUsername?: string;
  customServerPassword?: string;
  customServerCertificate?: string;
}

interface BasicSetupFormProps {
  form: UseFormReturn<DeploymentFormValues>;
  onSubmit: (data: DeploymentFormValues) => void;
}

const BasicSetupForm: React.FC<BasicSetupFormProps> = ({ form, onSubmit }) => {
  const [showCustomServerFields, setShowCustomServerFields] = useState(false);

  const handleVertexNodeChange = (value: string) => {
    form.setValue('vertexNode', value);
    setShowCustomServerFields(value === 'custom');
  };

  return (
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
          name="vertexNode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vertex Node</FormLabel>
              <Select 
                onValueChange={(value) => handleVertexNodeChange(value)} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Vertex node" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="vertex-1">Vertex-1 (Primary)</SelectItem>
                  <SelectItem value="vertex-2">Vertex-2 (Secondary)</SelectItem>
                  <SelectItem value="vertex-3">Vertex-3 (Development)</SelectItem>
                  <SelectItem value="vertex-4">Vertex-4 (Testing)</SelectItem>
                  <SelectItem value="custom">Custom Server</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Hardware node where the container will be deployed
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
      
      {showCustomServerFields && (
        <div className="border p-4 rounded-md space-y-4 bg-muted/20">
          <h3 className="font-medium">Custom Server Configuration</h3>
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
                    <Input type="file" {...field} value={undefined} onChange={(e) => {
                      field.onChange(e.target.files ? e.target.files[0]?.name : '');
                    }} />
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
      
      <div className="flex justify-end space-x-2">
        <Button type="submit">Deploy Container</Button>
      </div>
    </form>
  );
};

export default BasicSetupForm;
