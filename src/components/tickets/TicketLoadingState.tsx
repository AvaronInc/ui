
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
  const [isRefreshing, setIsRefreshing] = useState(false);
  
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

  const showLoadingWarning = loadingTime > 5;
  const showSeriousWarning = loadingTime > 10;

  // Provide immediate feedback when the user clicks the button
  const handleTryAgain = () => {
    console.log('💡 User clicked Try Again button');
    setHasTriedRefresh(true);
    setIsRefreshing(true);
    
    toast("Canceling Current Load", {
      description: "Switching to mock data for development...",
      duration: 3000
    });
    
    // Simulate a delay before calling the actual cancel function
    // This gives the user visual feedback that something is happening
    setTimeout(() => {
      if (onCancel) {
        onCancel();
      }
      setIsRefreshing(false);
    }, 1000);
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
              <div className="text-red-600">
                <p className="flex items-center justify-center gap-2 mb-2">
                  <AlertCircle className="h-4 w-4" />
                  Loading is taking longer than expected
                </p>
                <p>There might be a CORS issue or network connection problem</p>
              </div>
            ) : (
              <p className="text-amber-600">This is taking longer than expected.</p>
            )}
            
            {onCancel && (
              <Button 
                variant="default"
                size="sm" 
                className="mt-3 w-full sm:w-auto bg-orange-500 hover:bg-orange-600" 
                onClick={handleTryAgain}
                disabled={isRefreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? "Switching to Mock Data..." : "Use Mock Data Instead"}
              </Button>
            )}
            
            {showSeriousWarning && (
              <div className="mt-3 space-y-2 text-xs text-muted-foreground">
                <p>Error details:</p>
                <ul className="list-disc list-inside">
                  <li>A CORS error may be preventing data from loading</li>
                  <li>The application is running in development mode and can use mock data</li>
                  <li>Click the button above to use mock data instead</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      <Skeleton className="h-[400px]" />
    </div>
  );
};

export default TicketLoadingState;
