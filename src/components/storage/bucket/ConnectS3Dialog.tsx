
import React from 'react';
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Link } from 'lucide-react';

interface ConnectS3DialogProps {
  onConnectS3: (e: React.FormEvent) => void;
  isConnectingS3: boolean;
}

const ConnectS3Dialog: React.FC<ConnectS3DialogProps> = ({ 
  onConnectS3, 
  isConnectingS3 
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Link className="mr-2 h-4 w-4" />
          Connect S3 Bucket
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect External S3 Bucket</DialogTitle>
          <DialogDescription>
            Connect to an external S3-compatible storage bucket.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onConnectS3}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="s3-name">Bucket Name</Label>
              <Input id="s3-name" placeholder="e.g., my-company-backups" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="s3-endpoint">Endpoint URL</Label>
              <Input id="s3-endpoint" placeholder="e.g., s3.amazonaws.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="s3-region">Region</Label>
              <Select defaultValue="us-east-1">
                <SelectTrigger id="s3-region">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                  <SelectItem value="us-east-2">US East (Ohio)</SelectItem>
                  <SelectItem value="us-west-1">US West (N. California)</SelectItem>
                  <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                  <SelectItem value="eu-west-1">EU (Ireland)</SelectItem>
                  <SelectItem value="eu-central-1">EU (Frankfurt)</SelectItem>
                  <SelectItem value="ap-northeast-1">Asia Pacific (Tokyo)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="s3-access-key">Access Key</Label>
              <Input id="s3-access-key" type="password" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="s3-secret-key">Secret Key</Label>
              <Input id="s3-secret-key" type="password" required />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isConnectingS3}>
              {isConnectingS3 ? 'Connecting...' : 'Connect Bucket'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectS3Dialog;
