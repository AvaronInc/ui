
import React, { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface TicketLoadingStateProps {
  onCancel?: () => void;
  loadingTime?: number;
}

const TicketLoadingState: React.FC<TicketLoadingStateProps> = ({ 
  onCancel,
  loadingTime: externalLoadingTime 
}) => {
  const [internalLoadingTime, setInternalLoadingTime] = useState(0);
  const [hasTriedRefresh, setHasTriedRefresh] = useState(false);
  
  // Use either the external loading time (if provided) or the internal one
  const loadingTime = typeof externalLoadingTime === 'number' ? externalLoadingTime : internalLoadingTime;
  
  useEffect(() => {
    console.log('💡 TicketLoadingState MOUNTED');
    
    const interval = setInterval(() => {
      setInternalLoadingTime(prev => prev + 1);
    }, 1000);
    
    return () => {
      console.log('💡 TicketLoadingState UNMOUNTED');
      clearInterval(interval);
    };
  }, []);

  const showLoadingWarning = loadingTime > 10;
  const showSeriousWarning = loadingTime > 20;

  // Provide immediate feedback when the user clicks the button
  const handleTryAgain = () => {
    console.log('💡 User clicked Try Again button');
    setHasTriedRefresh(true);
    toast("Refreshing...", {
      description: "Attempting to load tickets again"
    });
    
    if (onCancel) {
      onCancel();
    }
  };

  console.log('💡 Rendering TicketLoadingState component, loadingTime:', loadingTime);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-[200px]" />
        <Skeleton className="h-10 w-[100px]" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {Array(4).fill(null).map((_, i) => (
          <Skeleton key={i} className="h-[100px]" />
        ))}
      </div>
      <div className="border border-dashed border-gray-300 p-6 rounded-lg bg-gray-50 mb-4">
        <p className="text-sm text-center text-muted-foreground">Loading ticket data... ({loadingTime}s)</p>
        <div className="flex justify-center mt-2">
          <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></div>
        </div>
        
        {showLoadingWarning && (
          <div className="mt-4 text-sm text-center">
            {showSeriousWarning ? (
              <p className="text-red-600 flex items-center justify-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Loading is taking longer than expected. There might be an issue with the connection.
              </p>
            ) : (
              <p className="text-amber-600">This is taking longer than expected.</p>
            )}
            
            {onCancel && (
              <Button 
                variant={showSeriousWarning ? "default" : "outline"} 
                size="sm" 
                className="mt-3 w-full sm:w-auto" 
                onClick={handleTryAgain}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${hasTriedRefresh ? 'animate-spin' : ''}`} />
                {hasTriedRefresh ? "Trying Again..." : "Try Again"}
              </Button>
            )}
            
            {showSeriousWarning && (
              <p className="mt-3 text-xs text-muted-foreground">
                If this persists, please check your network connection or contact support.
              </p>
            )}
          </div>
        )}
      </div>
      <Skeleton className="h-[400px]" />
    </div>
  );
};

export default TicketLoadingState;
