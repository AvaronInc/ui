
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/auth';
import { LogOut, User } from 'lucide-react';
import { SidebarFooter as Footer } from '@/components/ui/sidebar/sidebar-structure';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar/sidebar-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

const SidebarFooter: React.FC = () => {
  const navigate = useNavigate();
  const { signOut, isAdmin, user, profile } = useAuth();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  
  const confirmLogout = () => {
    // Close the dialog first
    setLogoutDialogOpen(false);
    
    // Then perform the signOut operation in a separate tick
    setTimeout(async () => {
      try {
        await signOut();
        // After successful logout, navigate to auth page
        window.location.href = '/auth';
      } catch (error) {
        console.error('Failed to log out:', error);
        // Even if there's an error, navigate to auth page
        window.location.href = '/auth';
      }
    }, 200);
  };

  // Get user display name from profile or user email
  const getDisplayName = () => {
    if (profile?.full_name) return profile.full_name;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  // Get user initials for avatar fallback
  const getInitials = () => {
    const displayName = getDisplayName();
    return displayName.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Get avatar URL from profile or default to empty string
  const getAvatarUrl = () => {
    return profile?.avatar_url || '';
  };

  return (
    <Footer className="border-t px-2 py-2 border-slate-200/60 dark:border-slate-700/60">
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={getAvatarUrl()} />
            <AvatarFallback className="bg-primary/10 text-primary">{getInitials()}</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="font-medium leading-none">{getDisplayName()}</p>
            <p className="text-xs text-muted-foreground">{isAdmin ? 'Administrator' : 'Standard User'}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full h-8 w-8"
          onClick={() => setLogoutDialogOpen(true)}
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>

      <AlertDialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to log out? Any unsaved changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmLogout}>Log out</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Footer>
  );
};

export default SidebarFooter;
