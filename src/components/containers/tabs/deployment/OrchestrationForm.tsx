
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormItem, FormLabel, FormDescription, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const OrchestrationForm: React.FC = () => {
  const [showCustomServerFields, setShowCustomServerFields] = useState(false);
  const [showSecondaryNode, setShowSecondaryNode] = useState(false);
  const [showSecondaryCustomServer, setShowSecondaryCustomServer] = useState(false);

  const handlePrimaryNodeChange = (value: string) => {
    setShowCustomServerFields(value === 'custom');
  };

  const handleReplicaCountChange = (value: string) => {
    setShowSecondaryNode(parseInt(value) > 1);
  };

  const handleSecondaryNodeChange = (value: string) => {
    setShowSecondaryCustomServer(value === 'custom');
  };

  return (
    <div className="space-y-6">
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
          <h3 className="text-lg font-medium">Primary NEST Node</h3>
          <Select defaultValue="nest-1" onValueChange={handlePrimaryNodeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select primary node" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nest-1">NEST-1 (Primary)</SelectItem>
              <SelectItem value="nest-2">NEST-2 (Secondary)</SelectItem>
              <SelectItem value="nest-3">NEST-3 (Development)</SelectItem>
              <SelectItem value="nest-4">NEST-4 (Testing)</SelectItem>
              <SelectItem value="custom">Custom Server</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Replica Count</h3>
          <Select defaultValue="1" onValueChange={handleReplicaCountChange}>
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
      
      {showCustomServerFields && (
        <div className="border p-4 rounded-md space-y-4 bg-muted/20">
          <h3 className="font-medium">Primary Custom Server Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormItem>
              <FormLabel>Server IP Address</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 192.168.1.100" />
              </FormControl>
              <FormMessage />
            </FormItem>
            
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="e.g. admin" />
              </FormControl>
              <FormMessage />
            </FormItem>
            
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter password" />
              </FormControl>
              <FormMessage />
            </FormItem>
            
            <FormItem>
              <FormLabel>SSH Certificate</FormLabel>
              <FormControl>
                <Input type="file" />
              </FormControl>
              <FormDescription>
                Upload SSH certificate for authentication
              </FormDescription>
              <FormMessage />
            </FormItem>
          </div>
        </div>
      )}
      
      {showSecondaryNode && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Secondary NEST Node</h3>
          <Select defaultValue="nest-2" onValueChange={handleSecondaryNodeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select secondary node" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nest-1">NEST-1 (Primary)</SelectItem>
              <SelectItem value="nest-2">NEST-2 (Secondary)</SelectItem>
              <SelectItem value="nest-3">NEST-3 (Development)</SelectItem>
              <SelectItem value="nest-4">NEST-4 (Testing)</SelectItem>
              <SelectItem value="custom">Custom Server</SelectItem>
            </SelectContent>
          </Select>
          
          {showSecondaryCustomServer && (
            <div className="border p-4 rounded-md space-y-4 bg-muted/20 mt-4">
              <h3 className="font-medium">Secondary Custom Server Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormItem>
                  <FormLabel>Server IP Address</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 192.168.1.101" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. admin" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                
                <FormItem>
                  <FormLabel>SSH Certificate</FormLabel>
                  <FormControl>
                    <Input type="file" />
                  </FormControl>
                  <FormDescription>
                    Upload SSH certificate for authentication
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrchestrationForm;
