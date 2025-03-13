
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Plus } from 'lucide-react';

interface CreateBucketDialogProps {
  onDeployBucket: (e: React.FormEvent) => void;
  isCreatingBucket: boolean;
}

const CreateBucketDialog: React.FC<CreateBucketDialogProps> = ({ 
  onDeployBucket, 
  isCreatingBucket 
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Deploy MinIO Bucket
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deploy New MinIO Bucket</DialogTitle>
          <DialogDescription>
            Create a new bucket in your MinIO storage infrastructure.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onDeployBucket}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="bucket-name">Bucket Name</Label>
              <Input id="bucket-name" placeholder="e.g., backups-primary" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bucket-size">Storage Size (GB)</Label>
              <Input id="bucket-size" type="number" min="1" defaultValue="100" required />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="bucket-versioning" className="flex-grow">Enable Versioning</Label>
              <Switch id="bucket-versioning" defaultChecked />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="bucket-encryption" className="flex-grow">Enable Encryption</Label>
              <Switch id="bucket-encryption" defaultChecked />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="bucket-immutable" className="flex-grow">Make Immutable</Label>
              <Switch id="bucket-immutable" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isCreatingBucket}>
              {isCreatingBucket ? 'Deploying...' : 'Deploy Bucket'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBucketDialog;
