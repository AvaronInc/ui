
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Plus, Settings, Trash2, LinkIcon, Activity } from 'lucide-react';
import VirtualSwitchDashboard from '../components/virtual-switch/VirtualSwitchDashboard';
import NetworkVisualization from '../components/virtual-switch/NetworkVisualization';
import SwitchPerformanceMetrics from '../components/virtual-switch/SwitchPerformanceMetrics';

const VirtualSwitchManagementTab: React.FC = () => {
  const { toast } = useToast();
  const [selectedSwitch, setSelectedSwitch] = useState<string | null>(null);

  const handleCreateSwitch = () => {
    toast({
      title: "New Virtual Switch",
      description: "Create new virtual switch dialog would open here"
    });
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Virtual Switch Management</h2>
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
            <CardTitle>Performance Metrics</CardTitle>
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
    </div>
  );
};

export default VirtualSwitchManagementTab;
