
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import ConfigurationOptions from './config/ConfigurationOptions';
import ConfigurationEditor from './config/ConfigurationEditor';
import { getDefaultConfigCode } from './config/ConfigUtils';

const SimulationConfiguration = () => {
  const [configType, setConfigType] = useState('network');
  const [editorContent, setEditorContent] = useState(getDefaultConfigCode('network'));
  const [replicateZone, setReplicateZone] = useState(false);
  const [selectedZone, setSelectedZone] = useState('global');
  const [trafficProfile, setTrafficProfile] = useState('normal');
  const { toast } = useToast();

  const handleConfigTypeChange = (value: string) => {
    setConfigType(value);
    setEditorContent(getDefaultConfigCode(value));
  };

  const saveConfiguration = () => {
    // In a real app, this would save to context or API
    toast({
      title: "Configuration Saved",
      description: "Test configuration has been saved and is ready to run",
    });

    // Store in localStorage for demo purposes
    localStorage.setItem('deployment-test-config', JSON.stringify({
      configType,
      configContent: editorContent,
      selectedZone,
      replicateZone,
      trafficProfile,
      timestamp: new Date().toISOString()
    }));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Simulation Configuration</h2>
        <p className="text-sm text-muted-foreground">
          Configure your deployment test scenario by selecting the type of change and defining the configuration parameters.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <ConfigurationOptions 
          configType={configType}
          setConfigType={handleConfigTypeChange}
          selectedZone={selectedZone}
          setSelectedZone={setSelectedZone}
          trafficProfile={trafficProfile}
          setTrafficProfile={setTrafficProfile}
          replicateZone={replicateZone}
          setReplicateZone={setReplicateZone}
          saveConfiguration={saveConfiguration}
        />
        
        <div className="space-y-2">
          <Label htmlFor="config-editor">Configuration Editor</Label>
          <ConfigurationEditor 
            editorContent={editorContent}
            setEditorContent={setEditorContent}
          />
        </div>
      </div>
    </div>
  );
};

export default SimulationConfiguration;
