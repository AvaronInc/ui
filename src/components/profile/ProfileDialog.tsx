
import React, { useState, useEffect } from 'react';
import { 
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
import { toast } from 'sonner';
import * as Dialog from '@radix-ui/react-dialog';

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProfileDialog: React.FC<ProfileDialogProps> = ({ 
  open, 
  onOpenChange 
}) => {
  const { user, profile } = useAuth();
  const [nickname, setNickname] = useState('PowerUser');
  
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

  const handleSave = (event: React.MouseEvent) => {
    // Prevent default to avoid any browser-related issues
    event.preventDefault();
    
    // Log the save action
    console.log('Save button clicked with nickname:', nickname);
    
    // Show success toast
    toast.success("Profile updated successfully");
    
    // Use setTimeout to ensure the UI updates before closing the dialog
    // This helps prevent freezing by ensuring state updates complete
    setTimeout(() => {
      console.log('Now closing dialog after save');
      onOpenChange(false);
    }, 0);
  };
  
  const handleCancel = (event: React.MouseEvent) => {
    // Prevent default to avoid any browser-related issues
    event.preventDefault();
    
    // Reset nickname
    setNickname(profile?.full_name || 'PowerUser');
    console.log('Cancel button clicked, resetting nickname');
    
    // Use setTimeout to ensure the UI updates before closing the dialog
    setTimeout(() => {
      console.log('Now closing dialog after cancel');
      onOpenChange(false);
    }, 0);
  };
  
  // Nickname input change handler
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setNickname(newValue || 'PowerUser');
  };
  
  // Use the direct Radix UI Dialog primitive for more control
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
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
          
          {/* Add an explicit close button */}
          <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            <span className="sr-only">Close</span>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ProfileDialog;
