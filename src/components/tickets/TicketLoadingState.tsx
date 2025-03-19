
import React, { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const TicketLoadingState: React.FC = () => {
  useEffect(() => {
    console.log('💡 TicketLoadingState MOUNTED');
    return () => {
      console.log('💡 TicketLoadingState UNMOUNTED');
    };
  }, []);

  console.log('💡 Rendering TicketLoadingState component');
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
        <p className="text-sm text-center text-muted-foreground">Loading ticket data...</p>
        <div className="flex justify-center mt-2">
          <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></div>
        </div>
      </div>
      <Skeleton className="h-[400px]" />
    </div>
  );
};

export default TicketLoadingState;
