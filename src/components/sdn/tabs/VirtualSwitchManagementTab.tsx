import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Plus, Settings, Trash2, LinkIcon, Activity, Server, ChartBar, Shield } from 'lucide-react';
import VirtualSwitchDashboard from '../components/virtual-switch/VirtualSwitchDashboard';
import NetworkVisualization from '../components/virtual-switch/NetworkVisualization';
import SwitchPerformanceMetrics from '../components/virtual-switch/SwitchPerformanceMetrics';
import VirtualSwitchConfigDialog from '../components/virtual-switch/VirtualSwitchConfigDialog';
import VirtualSwitchSecurityDialog from '../components/virtual-switch/VirtualSwitchSecurityDialog';

const VirtualSwitchManagementTab: React.FC = () => {
  const { toast } = useToast();
  const [selectedSwitch, setSelectedSwitch] = useState<string | null>(null);
  const [configDialogOpen, setConfigDialogOpen] = useState(false);
  const [securityDialogOpen, setSecurityDialogOpen] = useState(false);

  const handleCreateSwitch = () => {
    setConfigDialogOpen(true);
  };

  const handleDeploySwitch = (values: any) => {
    toast({
      title: "Virtual Switch Deployed",
      description: `Switch "${values.name}" has been configured and is being deployed.`
    });
    // In a real application, you would make an API call to create the switch here
  };

  const handleModifySwitch = () => {
    if (!selectedSwitch) {
      toast({
        title: "No Switch Selected",
        description: "Please select a virtual switch to modify",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Modify Virtual Switch",
      description: `Modify configuration for switch: ${selectedSwitch}`
    });
  };

  const handleDeleteSwitch = () => {
    if (!selectedSwitch) {
      toast({
        title: "No Switch Selected",
        description: "Please select a virtual switch to delete",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Delete Virtual Switch",
      description: `Confirm deletion of switch: ${selectedSwitch}`
    });
  };

  const handleAttachVLAN = () => {
    if (!selectedSwitch) {
      toast({
        title: "No Switch Selected",
        description: "Please select a virtual switch to attach VLANs",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Attach VLANs & Segments",
      description: `Configure VLANs for switch: ${selectedSwitch}`
    });
  };

  const handleSecuritySettings = () => {
    if (!selectedSwitch) {
      toast({
        title: "No Switch Selected",
        description: "Please select a virtual switch to configure security",
        variant: "destructive"
      });
      return;
    }
    
    setSecurityDialogOpen(true);
  };

  const handleApplySecurity = (values: any) => {
    toast({
      title: "Security Settings Applied",
      description: `Security configuration for switch: ${selectedSwitch} has been updated.`
    });
    // In a real application, you would make an API call to update the security settings here
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold flex items-center">
          <Server className="mr-2 h-6 w-6 text-primary" />
          Virtual Switch Management
        </h2>
        <div className="flex space-x-2">
          <Button onClick={handleCreateSwitch} className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Create Switch
          </Button>
          <Button 
            variant="outline" 
            onClick={handleModifySwitch} 
            disabled={!selectedSwitch}
            className="flex items-center"
          >
            <Settings className="mr-2 h-4 w-4" />
            Modify
          </Button>
          <Button 
            variant="outline" 
            onClick={handleDeleteSwitch} 
            disabled={!selectedSwitch}
            className="flex items-center"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
          <Button 
            variant="outline" 
            onClick={handleAttachVLAN} 
            disabled={!selectedSwitch}
            className="flex items-center"
          >
            <LinkIcon className="mr-2 h-4 w-4" />
            Attach VLANs
          </Button>
          <Button 
            variant="outline" 
            onClick={handleSecuritySettings} 
            disabled={!selectedSwitch}
            className="flex items-center"
          >
            <Shield className="mr-2 h-4 w-4" />
            Security
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5 text-primary" />
              Network Topology
            </CardTitle>
          </CardHeader>
          <CardContent>
            <NetworkVisualization onSelectSwitch={setSelectedSwitch} selectedSwitch={selectedSwitch} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ChartBar className="mr-2 h-5 w-5 text-primary" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SwitchPerformanceMetrics selectedSwitch={selectedSwitch} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Virtual Switch Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <VirtualSwitchDashboard 
            onSelectSwitch={setSelectedSwitch} 
            selectedSwitch={selectedSwitch} 
          />
        </CardContent>
      </Card>

      <VirtualSwitchConfigDialog 
        open={configDialogOpen}
        onClose={() => setConfigDialogOpen(false)}
        onDeploy={handleDeploySwitch}
      />

      <VirtualSwitchSecurityDialog 
        open={securityDialogOpen}
        onClose={() => setSecurityDialogOpen(false)}
        selectedSwitch={selectedSwitch}
        onApply={handleApplySecurity}
      />
    </div>
  );
};

export default VirtualSwitchManagementTab;
