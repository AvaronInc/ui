
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertTriangle } from 'lucide-react';
import { StorageBucket } from './types';

interface DeleteBucketDialogProps {
  bucketToDelete: StorageBucket | null;
  confirmationInput: string;
  setConfirmationInput: (value: string) => void;
  showDeleteDialog: boolean;
  setShowDeleteDialog: (show: boolean) => void;
  onDelete: () => void;
  onClose: () => void;
}

const DeleteBucketDialog: React.FC<DeleteBucketDialogProps> = ({
  bucketToDelete,
  confirmationInput,
  setConfirmationInput,
  showDeleteDialog,
  setShowDeleteDialog,
  onDelete,
  onClose,
}) => {
  return (
    <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Confirm Bucket Deletion
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <p>
              This action <strong>cannot be undone</strong>. This will permanently delete the
              <strong> {bucketToDelete?.name}</strong> bucket and all contained data.
            </p>
            <div className="rounded-md bg-amber-50 p-4 border border-amber-200">
              <div className="flex items-start">
                <div className="mt-1 flex-shrink-0">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-amber-800">Warning</h3>
                  <div className="mt-1 text-sm text-amber-700">
                    <p>
                      To confirm deletion, please type the bucket name below:
                      <strong> {bucketToDelete?.name}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-2">
              <Label htmlFor="confirm-name" className="sr-only">Type bucket name to confirm</Label>
              <Input
                id="confirm-name"
                value={confirmationInput}
                onChange={(e) => setConfirmationInput(e.target.value)}
                placeholder="Type bucket name here"
                className="w-full"
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            disabled={confirmationInput !== bucketToDelete?.name}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50"
          >
            Delete Bucket
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBucketDialog;
