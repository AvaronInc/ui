
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { Bell, LogOut, User, Settings, HelpCircle, Building } from 'lucide-react';
import { loadUserSettings, SettingsCategory } from '@/services/settings-service';

const DashboardHeader = () => {
  const { user, profile, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState(localStorage.getItem('companyName') || 'SecuriCorp');
  
  useEffect(() => {
    // Set up initial company name
    const storedCompanyName = localStorage.getItem('companyName');
    if (storedCompanyName) {
      setCompanyName(storedCompanyName);
    }
    
    // Load company name from database if user is logged in
    if (user) {
      const fetchCompanyName = async () => {
        try {
          const generalSettings = await loadUserSettings(SettingsCategory.GENERAL);
          if (generalSettings && generalSettings.companyName) {
            setCompanyName(generalSettings.companyName);
            // Also update localStorage for components that rely on it
            localStorage.setItem('companyName', generalSettings.companyName);
          }
        } catch (error) {
          console.error('Error loading company name:', error);
        }
      };
      
      fetchCompanyName();
    }
  }, [user]);
  
  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  const userName = profile?.full_name || user?.email?.split('@')[0] || 'User';
  
  const handleSettingsClick = () => {
    navigate('/settings');
  };
  
  return (
    <header className="w-full flex items-center justify-between">
      <div className="flex items-center">
        <SidebarTrigger />
        <div className="ml-4">
          <Link to="/" className="font-bold">{companyName}</Link>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/notifications">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Link>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative rounded-full h-8 w-8 border">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{getInitials(profile?.full_name)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
                {isAdmin && (
                  <Badge variant="outline" className="mt-1 w-fit">Admin</Badge>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile" className="flex items-center cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            {isAdmin && (
              <DropdownMenuItem onClick={handleSettingsClick} className="flex items-center cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild>
              <Link to="/help" className="flex items-center cursor-pointer">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut} className="text-red-600 focus:text-red-600 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
