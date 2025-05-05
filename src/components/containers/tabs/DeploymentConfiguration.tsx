
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Dock, Server, Network } from 'lucide-react';
import { BasicSetupForm, AdvancedConfigForm, OrchestrationForm } from './deployment';

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

const DeploymentConfiguration = () => {
  const form = useForm<DeploymentFormValues>({
    defaultValues: {
      name: '',
      image: '',
      cpu: '1',
      memory: '512',
      ports: '',
      environment: '',
      orchestration: 'docker',
      vertexNode: 'vertex-1',
    },
  });

  const onSubmit = (data: DeploymentFormValues) => {
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
                <BasicSetupForm form={form} onSubmit={onSubmit} />
              </Form>
            </TabsContent>
            
            <TabsContent value="advanced" className="space-y-4 pt-4">
              <AdvancedConfigForm />
            </TabsContent>
            
            <TabsContent value="orchestration" className="space-y-4 pt-4">
              <OrchestrationForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeploymentConfiguration;
