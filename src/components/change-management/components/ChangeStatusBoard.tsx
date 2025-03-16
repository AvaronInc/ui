
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChangeRequest, ChangeStatus } from '@/types/change-management';
import { ChevronRight } from 'lucide-react';

interface ChangeStatusBoardProps {
  changeRequests: ChangeRequest[];
}

const ChangeStatusBoard: React.FC<ChangeStatusBoardProps> = ({ changeRequests }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      {(['draft', 'review', 'approval', 'implementation', 'verification', 'closed'] as ChangeStatus[]).map(status => (
        <Card key={status} className="h-auto">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              {capitalize(status)}
              <Badge className="ml-2" variant="outline">
                {changeRequests.filter(c => c.status === status).length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            {changeRequests.filter(c => c.status === status).slice(0, 3).map(change => (
              <div key={change.id} className="p-2 border-b last:border-0">
                <div className="flex items-center justify-between">
                  <div className="flex-1 truncate">
                    <div className="font-medium text-sm truncate">{change.title}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {changeTypeToTitle(change.type)} • {changeDateToText(change.plannedDate)}
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                </div>
              </div>
            ))}
            
            {changeRequests.filter(c => c.status === status).length > 3 && (
              <Button variant="ghost" size="sm" className="w-full mt-2 text-xs">
                View {changeRequests.filter(c => c.status === status).length - 3} more
              </Button>
            )}
            
            {changeRequests.filter(c => c.status === status).length === 0 && (
              <div className="py-3 text-center text-sm text-muted-foreground">
                No changes in this stage
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Helper functions
function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function changeTypeToTitle(type: ChangeRequest['type']) {
  switch (type) {
    case 'standard': return 'Standard Change';
    case 'emergency': return 'Emergency Change';
    case 'major': return 'Major Change';
    case 'minor': return 'Minor Change';
    case 'routine': return 'Routine Change';
    case 'security': return 'Security Patch';
  }
}

function changeDateToText(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays > 0) {
    return `In ${diffDays} day${diffDays > 1 ? 's' : ''}`;
  } else if (diffDays < 0) {
    return `${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? 's' : ''} ago`;
  } else {
    return 'Today';
  }
}

export default ChangeStatusBoard;
