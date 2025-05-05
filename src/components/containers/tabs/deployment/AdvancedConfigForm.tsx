
import React from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { 
  EnvironmentVariables,
  PortMappings,
  VolumeMounts,
  NetworkConfig,
  AdvancedConfigFormValues
} from './advanced-config';
import BucketMounting from './advanced-config/BucketMounting';

const AdvancedConfigForm: React.FC = () => {
  const form = useForm<AdvancedConfigFormValues>({
    defaultValues: {
      environmentVars: '',
      portMappings: '',
      volumeMounts: '',
      networkMode: 'bridge',
      vertexVaultBucket: 'none',
    },
  });

  return (
    <Form {...form}>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EnvironmentVariables form={form} />
        <PortMappings form={form} />
        <VolumeMounts form={form} />
        <NetworkConfig form={form} />
        <div className="md:col-span-2">
          <BucketMounting form={form} />
        </div>
      </form>
    </Form>
  );
};

export default AdvancedConfigForm;
