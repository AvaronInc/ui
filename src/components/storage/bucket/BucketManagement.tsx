
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import CreateBucketDialog from './CreateBucketDialog';
import ConnectS3Dialog from './ConnectS3Dialog';
import DeleteBucketDialog from './DeleteBucketDialog';
import BucketList from './BucketList';
import { StorageBucket } from './types';

const fetchBuckets = async (): Promise<StorageBucket[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: '1',
      name: 'backup-primary',
      provider: 'minio',
      status: 'healthy',
      createdAt: '2023-01-15T08:30:00',
      totalSpace: 1024 * 1024 * 1024 * 500, // 500 GB
      usedSpace: 1024 * 1024 * 1024 * 125, // 125 GB
      objectCount: 23451,
      locked: true,
      versioned: true,
      encrypted: true,
      lastSync: '2023-09-01T14:23:15'
    },
    {
      id: '2',
      name: 'documents-archive',
      provider: 'minio',
      status: 'healthy',
      createdAt: '2023-02-20T10:15:00',
      totalSpace: 1024 * 1024 * 1024 * 1000, // 1 TB
      usedSpace: 1024 * 1024 * 1024 * 750, // 750 GB
      objectCount: 562144,
      locked: true,
      versioned: true,
      encrypted: true,
      lastSync: '2023-09-01T16:45:33'
    },
    {
      id: '3',
      name: 'app-data',
      provider: 'minio',
      status: 'warning',
      createdAt: '2023-03-10T12:45:00',
      totalSpace: 1024 * 1024 * 1024 * 250, // 250 GB
      usedSpace: 1024 * 1024 * 1024 * 200, // 200 GB (80% full - warning)
      objectCount: 92500,
      locked: false,
      versioned: true,
      encrypted: true,
      lastSync: '2023-09-01T12:10:45'
    },
    {
      id: '4',
      name: 'backup-archive',
      provider: 's3',
      region: 'us-east-1',
      endpoint: 's3.amazonaws.com',
      status: 'healthy',
      createdAt: '2023-04-05T09:20:00',
      totalSpace: 1024 * 1024 * 1024 * 1024 * 5, // 5 TB
      usedSpace: 1024 * 1024 * 1024 * 1024 * 2, // 2 TB
      objectCount: 1250000,
      locked: true,
      versioned: true,
      encrypted: true,
      lastSync: '2023-09-01T18:30:22'
    },
    {
      id: '5',
      name: 'user-uploads',
      provider: 's3',
      region: 'eu-central-1',
      endpoint: 's3.eu-central-1.amazonaws.com',
      status: 'critical',
      createdAt: '2023-05-15T15:10:00',
      totalSpace: 1024 * 1024 * 1024 * 500, // 500 GB
      usedSpace: 1024 * 1024 * 1024 * 490, // 490 GB (98% full - critical)
      objectCount: 835621,
      locked: false,
      versioned: false,
      encrypted: true,
      lastSync: '2023-09-01T20:15:10'
    }
  ];
};

const BucketManagement = () => {
  const { toast } = useToast();
  const [isCreatingBucket, setIsCreatingBucket] = useState(false);
  const [isConnectingS3, setIsConnectingS3] = useState(false);
  const [bucketToDelete, setBucketToDelete] = useState<StorageBucket | null>(null);
  const [confirmationInput, setConfirmationInput] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { data: buckets = [], isLoading, refetch } = useQuery({
    queryKey: ['storage-buckets'],
    queryFn: fetchBuckets
  });

  const handleDeployMinio = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingBucket(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsCreatingBucket(false);
      toast({
        title: "MinIO Bucket Deployed",
        description: "New MinIO bucket has been successfully deployed",
      });
      refetch();
    }, 1500);
  };

  const handleConnectS3 = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConnectingS3(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsConnectingS3(false);
      toast({
        title: "S3 Bucket Connected",
        description: "External S3 bucket has been successfully connected",
      });
      refetch();
    }, 1500);
  };

  const openDeleteDialog = (bucket: StorageBucket) => {
    setBucketToDelete(bucket);
    setConfirmationInput('');
    setShowDeleteDialog(true);
  };

  const closeDeleteDialog = () => {
    setShowDeleteDialog(false);
    setBucketToDelete(null);
    setConfirmationInput('');
  };

  const handleDeleteBucket = () => {
    if (!bucketToDelete) return;
    
    // Simulate API call
    toast({
      title: "Bucket Deleted",
      description: `The bucket "${bucketToDelete.name}" has been removed`,
    });
    
    closeDeleteDialog();
    refetch();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <CreateBucketDialog 
          onDeployBucket={handleDeployMinio}
          isCreatingBucket={isCreatingBucket}
        />
        
        <ConnectS3Dialog 
          onConnectS3={handleConnectS3}
          isConnectingS3={isConnectingS3}
        />
      </div>
      
      <DeleteBucketDialog
        bucketToDelete={bucketToDelete}
        confirmationInput={confirmationInput}
        setConfirmationInput={setConfirmationInput}
        showDeleteDialog={showDeleteDialog}
        setShowDeleteDialog={setShowDeleteDialog}
        onDelete={handleDeleteBucket}
        onClose={closeDeleteDialog}
      />
      
      <BucketList
        buckets={buckets}
        onDeleteClick={openDeleteDialog}
        onRefresh={refetch}
      />
    </div>
  );
};

export default BucketManagement;
