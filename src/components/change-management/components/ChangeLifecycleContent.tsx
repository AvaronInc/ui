
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { ChangeRequest } from '@/types/change-management';
import ChangeLifecycleStages from './ChangeLifecycleStages';
import ChangeStatusBoard from './ChangeStatusBoard';
import AutomatedDocumentation from './AutomatedDocumentation';

interface ChangeLifecycleContentProps {
  changeRequests: ChangeRequest[];
}

const ChangeLifecycleContent: React.FC<ChangeLifecycleContentProps> = ({ changeRequests }) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Change Request Lifecycle</CardTitle>
          <CardDescription>Track the progress of your change requests through defined stages</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ChangeLifecycleStages />
          <ChangeStatusBoard changeRequests={changeRequests} />
        </CardContent>
      </Card>
      
      <AutomatedDocumentation closedChanges={changeRequests.filter(c => c.status === 'closed')} />
    </div>
  );
};

export default ChangeLifecycleContent;
