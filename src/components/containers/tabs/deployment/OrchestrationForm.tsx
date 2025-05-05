
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { 
  PlatformSelector,
  PrimaryNodeSelector, 
  ReplicaSelector, 
  NodeAffinitySelector,
  CustomServerFields,
  SecondaryNodeSelector,
  OrchestrationFormValues
} from './orchestration';

const OrchestrationForm: React.FC = () => {
  const [showCustomServerFields, setShowCustomServerFields] = useState(false);
  const [showSecondaryNode, setShowSecondaryNode] = useState(false);
  const [showSecondaryCustomServer, setShowSecondaryCustomServer] = useState(false);

  const form = useForm<OrchestrationFormValues>({
    defaultValues: {
      orchestration: 'docker',
      primaryNode: 'vertex-1',
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
          <PlatformSelector form={form} />
          <PrimaryNodeSelector form={form} onValueChange={handlePrimaryNodeChange} />
          <ReplicaSelector form={form} onValueChange={handleReplicaCountChange} />
          <NodeAffinitySelector form={form} />
        </div>
        
        {showCustomServerFields && <CustomServerFields form={form} isPrimary={true} />}
        
        {showSecondaryNode && (
          <div className="space-y-4">
            <SecondaryNodeSelector form={form} onValueChange={handleSecondaryNodeChange} />
            
            {showSecondaryCustomServer && <CustomServerFields form={form} isSecondary={true} />}
          </div>
        )}
      </form>
    </Form>
  );
};

export default OrchestrationForm;
