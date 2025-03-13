
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { Settings, LogOut } from 'lucide-react';
import { SidebarFooter as Footer, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
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
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, isAdmin } = useAuth();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  
  const handleSettingsClick = () => {
    navigate('/settings');
    // Force a full page reload to ensure proper routing
    setTimeout(() => {
      if (location.pathname !== '/settings') {
        window.location.href = '/settings';
      }
    }, 100);
  };
  
  const confirmLogout = () => {
    // Close the dialog first
    setLogoutDialogOpen(false);
    
    // Then perform the signOut operation
    setTimeout(async () => {
      try {
        await signOut();
        navigate('/auth');
      } catch (error) {
        console.error('Failed to log out:', error);
      }
    }, 100);
  };

  // Only render the settings button if the user is an admin
  return (
    <Footer className="px-3 py-4 border-t">
      <SidebarMenu>
        {isAdmin && (
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Button 
                variant="ghost" 
                className={cn(
                  "nav-link w-full justify-start",
                  location.pathname === "/settings" && "active"
                )}
                onClick={handleSettingsClick}
              >
                <Settings className="h-5 w-5 mr-3" />
                <span>Settings</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Button 
              variant="ghost" 
              className="nav-link w-full justify-start"
              onClick={() => setLogoutDialogOpen(true)}
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span>Log out</span>
            </Button>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>

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
