
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import { Bell, LogOut, User, Settings, HelpCircle, Building, ChevronDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample tenant data - in a real app, this would come from an API
const tenants = [
  { id: '1', name: 'Primary Tenant' },
  { id: '2', name: 'Secondary Tenant' },
  { id: '3', name: 'Client X Corporation' },
  { id: '4', name: 'Acme Industries' },
];

const DashboardHeader = () => {
  const { user, profile, signOut, isAdmin } = useAuth();
  const [selectedTenant, setSelectedTenant] = useState(tenants[0].id);
  
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
  
  const handleTenantChange = (tenantId: string) => {
    setSelectedTenant(tenantId);
    // In a real app, you would perform actions like switching context, loading tenant-specific data, etc.
    console.log(`Switched to tenant: ${tenantId}`);
  };
  
  return (
    <header className="w-full flex items-center justify-between">
      <div className="flex items-center">
        <SidebarTrigger />
        <div className="hidden md:flex ml-4">
          <Link to="/" className="font-bold">SecuriCorp</Link>
        </div>
        
        <div className="ml-4">
          <Select 
            value={selectedTenant} 
            onValueChange={handleTenantChange}
          >
            <SelectTrigger className="w-[220px] bg-background border-input">
              <div className="flex items-center">
                <Building className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select tenant" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {tenants.map(tenant => (
                <SelectItem key={tenant.id} value={tenant.id}>
                  {tenant.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
            <DropdownMenuItem asChild>
              <Link to="/settings" className="flex items-center cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
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
