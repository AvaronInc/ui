
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Database, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface EmptyTicketStateProps {
  onRefresh: () => void;
  error?: string;
}

const EmptyTicketState: React.FC<EmptyTicketStateProps> = ({ onRefresh, error }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  useEffect(() => {
    console.log('💡 EmptyTicketState MOUNTED');
    return () => {
      console.log('💡 EmptyTicketState UNMOUNTED');
    };
  }, []);

  const handleRefresh = () => {
    console.log('💡 User clicked Refresh Tickets button');
    setIsRefreshing(true);
    
    toast("Using Mock Data", {
      description: "Loading development data since database connection failed",
      duration: 3000
    });
    
    // Add a slight delay to give visual feedback
    setTimeout(() => {
      onRefresh();
      // We'll keep this set to true as the parent component will re-render this with new props if needed
    }, 800);
  };

  const isCorsError = error && (error.includes('CORS') || error.includes('network'));
  
  const errorDetails = error ? (
    <div className="text-xs text-left mt-4 bg-red-50 p-3 rounded border border-red-200">
      <p className="font-medium mb-1">Technical details:</p>
      <code className="block whitespace-pre-wrap text-red-700 bg-red-100 p-2 rounded">{error}</code>
      <p className="mt-2">
        {isCorsError 
          ? "This is a CORS error that often happens in development. Use mock data instead." 
          : "This error has been logged for our technical team to investigate."}
      </p>
    </div>
  ) : null;

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
          ? 'There was a problem loading tickets due to a CORS issue or network connection problem.' 
          : 'There are no tickets matching your current filters or no tickets have been created yet.'}
      </p>
      <div className="flex flex-col items-center gap-2">
        <Button 
          onClick={handleRefresh} 
          className="mb-2 min-w-[200px] bg-orange-500 hover:bg-orange-600"
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Loading Mock Data...' : 'Use Mock Data Instead'}
        </Button>
        <p className="text-xs text-muted-foreground max-w-md">
          {error 
            ? 'In development mode, you can use mock data instead of connecting to the database.' 
            : 'If this problem persists, check your database connection or contact support.'}
        </p>
        {errorDetails}
      </div>
    </div>
  );
};

export default EmptyTicketState;
