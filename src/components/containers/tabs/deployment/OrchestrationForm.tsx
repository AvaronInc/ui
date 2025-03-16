
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const OrchestrationForm: React.FC = () => {
  return (
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
  );
};

export default OrchestrationForm;
