
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { Camera, User } from 'lucide-react';

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProfileDialog: React.FC<ProfileDialogProps> = ({ 
  open, 
  onOpenChange 
}) => {
  const { user, profile } = useAuth();
  const [nickname, setNickname] = useState(profile?.full_name || '');
  
  // Get initials for avatar fallback
  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleSave = () => {
    // This would save the profile updates to the backend
    // For now, just close the dialog
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Profile Settings</DialogTitle>
          <DialogDescription>
            Update your profile information and photo
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-xl">
                  {getInitials(profile?.full_name)}
                </AvatarFallback>
              </Avatar>
              <Button 
                size="icon" 
                variant="outline" 
                className="absolute bottom-0 right-0 rounded-full h-8 w-8"
              >
                <Camera className="h-4 w-4" />
                <span className="sr-only">Upload photo</span>
              </Button>
            </div>
            <span className="text-sm text-muted-foreground">
              Click the camera icon to upload a new photo
            </span>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={user?.email || ''} disabled />
            <span className="text-xs text-muted-foreground">Email cannot be changed</span>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="nickname">Nickname</Label>
            <Input 
              id="nickname" 
              value={nickname} 
              onChange={(e) => setNickname(e.target.value)} 
              placeholder="Enter your preferred name"
            />
            <span className="text-xs text-muted-foreground">
              This name will be displayed to others
            </span>
          </div>
          
          {profile?.role && (
            <div className="grid gap-2">
              <Label>Role</Label>
              <div className="px-3 py-2 rounded-md border bg-muted/50 flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="capitalize">{profile.role}</span>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
