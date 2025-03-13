
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw } from 'lucide-react';

interface TenantHeaderProps {
  handleRefresh: () => void;
}

const TenantHeader: React.FC<TenantHeaderProps> = ({ handleRefresh }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4">
      <div className="flex items-center space-x-2">
        <h2 className="text-2xl font-bold">Multi-Tenant Dashboard</h2>
        <Badge variant="outline">Admin View</Badge>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add System
        </Button>
      </div>
    </div>
  );
};

export default TenantHeader;
