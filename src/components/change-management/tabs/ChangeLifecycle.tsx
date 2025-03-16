
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useChangeManagement } from '@/hooks/use-change-management';
import { PlusCircle, FileText } from 'lucide-react';
import NewChangeRequestForm from '../forms/NewChangeRequestForm';
import ChangeLifecycleContent from '../components/ChangeLifecycleContent';

const ChangeLifecycle: React.FC = () => {
  const [activeTab, setActiveTab] = useState('create');
  const { changeRequests, submitChangeRequest, loading } = useChangeManagement();
  
  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="create" className="flex items-center">
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Change Request
          </TabsTrigger>
          <TabsTrigger value="lifecycle" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Change Lifecycle
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="create" className="space-y-4">
          <NewChangeRequestForm onSubmit={submitChangeRequest} isLoading={loading} />
        </TabsContent>
        
        <TabsContent value="lifecycle" className="space-y-4">
          <ChangeLifecycleContent changeRequests={changeRequests} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChangeLifecycle;
