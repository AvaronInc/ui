
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AdvancedConfigForm: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Environment Variables</h3>
        <Input placeholder="KEY=value (one per line)" className="h-32" />
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Port Mappings</h3>
        <Input placeholder="host:container (e.g. 80:8080)" />
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Volume Mounts</h3>
        <Input placeholder="host_path:container_path" />
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Network Configuration</h3>
        <Select defaultValue="bridge">
          <SelectTrigger>
            <SelectValue placeholder="Select network mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bridge">Bridge Network</SelectItem>
            <SelectItem value="host">Host Network</SelectItem>
            <SelectItem value="none">No Network</SelectItem>
            <SelectItem value="custom">Custom Network</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AdvancedConfigForm;
