
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Database, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface EmptyTicketStateProps {
  onRefresh: () => void;
  error?: string;
}

const EmptyTicketState: React.FC<EmptyTicketStateProps> = ({ onRefresh, error }) => {
  useEffect(() => {
    console.log('💡 EmptyTicketState MOUNTED');
    return () => {
      console.log('💡 EmptyTicketState UNMOUNTED');
    };
  }, []);

  const handleRefresh = () => {
    console.log('💡 User clicked Refresh Tickets button');
    toast("Refreshing Tickets", {
      description: "Attempting to reload ticket data..."
    });
    onRefresh();
  };

  console.log('💡 Rendering EmptyTicketState component', { error });
  return (
    <div className="text-center p-8 bg-muted rounded-lg">
      <div className="flex justify-center mb-4">
        {error ? (
          <AlertTriangle className="h-12 w-12 text-destructive" />
        ) : (
          <Database className="h-12 w-12 text-muted-foreground" />
        )}
      </div>
      <h3 className="text-xl font-medium mb-2">
        {error ? 'Error Loading Tickets' : 'No tickets found'}
      </h3>
      <p className="text-muted-foreground mb-4">
        {error 
          ? `There was a problem loading tickets: ${error}` 
          : 'There are no tickets matching your current filters or no tickets have been created yet.'}
      </p>
      <div className="flex flex-col items-center gap-2">
        <Button onClick={handleRefresh} className="mb-2 min-w-[200px]">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Tickets
        </Button>
        <p className="text-xs text-muted-foreground max-w-md">
          {error 
            ? 'If refreshing doesn\'t work, try checking your database connection or contact support for assistance.' 
            : 'If this problem persists, check your database connection or contact support.'}
        </p>
      </div>
    </div>
  );
};

export default EmptyTicketState;
