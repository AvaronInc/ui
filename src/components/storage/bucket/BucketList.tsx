
import React from 'react';
import BucketCard from './BucketCard';
import { StorageBucket } from './types';

interface BucketListProps {
  buckets: StorageBucket[];
  onDeleteClick: (bucket: StorageBucket) => void;
  onRefresh: () => void;
}

const BucketList: React.FC<BucketListProps> = ({ 
  buckets, 
  onDeleteClick,
  onRefresh
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {buckets.map(bucket => (
        <BucketCard 
          key={bucket.id} 
          bucket={bucket} 
          onDeleteClick={onDeleteClick}
          onRefresh={onRefresh}
        />
      ))}
    </div>
  );
};

export default BucketList;
