
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { Settings, LogOut } from 'lucide-react';
import { SidebarFooter as Footer, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

const SidebarFooter: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  
  const handleSettingsClick = () => {
    navigate('/settings');
  };
  
  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <Footer className="px-3 py-4 border-t">
      <SidebarMenu>
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
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Button 
              variant="ghost" 
              className="nav-link w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span>Log out</span>
            </Button>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </Footer>
  );
};

export default SidebarFooter;
