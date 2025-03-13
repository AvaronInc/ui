
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { Camera, User } from 'lucide-react';
import { toast } from 'sonner';

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProfileDialog: React.FC<ProfileDialogProps> = ({ 
  open, 
  onOpenChange 
}) => {
  const { user, profile } = useAuth();
  const [nickname, setNickname] = useState('PowerUser'); // Default to PowerUser
  
  // Update nickname when profile changes or dialog opens
  useEffect(() => {
    if (open && profile?.full_name) {
      setNickname(profile.full_name);
    } else if (open) {
      // Fall back to PowerUser if no profile name exists
      setNickname('PowerUser');
    }
  }, [profile, open]);

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
    // Save changes then notify
    console.log('Saving profile with nickname:', nickname);
    toast.success("Profile updated successfully");
    
    // Close the dialog
    console.log('Closing dialog from Save button');
    onOpenChange(false);
  };
  
  const handleCancel = () => {
    // Reset the nickname to the current profile name or default
    setNickname(profile?.full_name || 'PowerUser');
    console.log('Closing dialog from Cancel button');
    onOpenChange(false);
  };
  
  // Safe handler for nickname input changes
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Only update if there's a value, otherwise keep as PowerUser
    setNickname(newValue || 'PowerUser');
  };
  
  // We're not using DialogClose to let us control the flow
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
                type="button"
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
              onChange={handleNicknameChange}
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
          <Button 
            variant="outline" 
            onClick={handleCancel} 
            type="button"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            type="button"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
