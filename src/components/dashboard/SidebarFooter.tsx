
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { LogOut, User } from 'lucide-react';
import { SidebarFooter as Footer, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
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
  const { signOut, isAdmin, user } = useAuth();
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

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (!user?.name) return 'U';
    return user.name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Footer className="border-t px-2 py-2 border-slate-200/60 dark:border-slate-700/60">
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.profileUrl || ''} />
            <AvatarFallback className="bg-primary/10 text-primary">{getInitials()}</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="font-medium leading-none">{user?.name || 'User'}</p>
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
