
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface EmptyTicketStateProps {
  onRefresh: () => void;
}

const EmptyTicketState: React.FC<EmptyTicketStateProps> = ({ onRefresh }) => {
  return (
    <div className="text-center p-8 bg-muted rounded-lg">
      <h3 className="text-xl font-medium mb-2">No tickets found</h3>
      <p className="text-muted-foreground mb-4">
        There are no tickets matching your current filters or no tickets have been created yet.
      </p>
      <Button onClick={onRefresh}>
        <RefreshCw className="h-4 w-4 mr-2" />
        Refresh
      </Button>
    </div>
  );
};

export default EmptyTicketState;
