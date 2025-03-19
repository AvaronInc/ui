
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface EmptyTicketStateProps {
  onRefresh: () => void;
}

const EmptyTicketState: React.FC<EmptyTicketStateProps> = ({ onRefresh }) => {
  useEffect(() => {
    console.log('💡 EmptyTicketState MOUNTED');
    return () => {
      console.log('💡 EmptyTicketState UNMOUNTED');
    };
  }, []);

  console.log('💡 Rendering EmptyTicketState component');
  return (
    <div className="text-center p-8 bg-muted rounded-lg">
      <h3 className="text-xl font-medium mb-2">No tickets found</h3>
      <p className="text-muted-foreground mb-4">
        There are no tickets matching your current filters or no tickets have been created yet.
      </p>
      <div className="flex flex-col items-center gap-2">
        <Button onClick={onRefresh} className="mb-2">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Tickets
        </Button>
        <p className="text-xs text-muted-foreground">
          If this problem persists, check your database connection or contact support.
        </p>
      </div>
    </div>
  );
};

export default EmptyTicketState;
