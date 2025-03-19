
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
      <Skeleton className="h-[400px]" />
    </div>
  );
};

export default TicketLoadingState;
