
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { loadUserSettings, SettingsCategory } from '@/services/settings-service';
import { ThemeToggle } from './header/ThemeToggle';
import { AIMButton } from './header/AIMButton';
import { NotificationButton } from './header/NotificationButton';
import { UserProfileMenu } from './header/UserProfileMenu';
import { CompanyName } from './header/CompanyName';
import NotificationsPanel from '@/components/notifications/NotificationsPanel';

const DashboardHeader = () => {
  const { signOut } = useAuth();
  const [companyName, setCompanyName] = useState(localStorage.getItem('companyName') || 'SecuriCorp');
  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false);
  
  useEffect(() => {
    const storedCompanyName = localStorage.getItem('companyName');
    if (storedCompanyName) {
      setCompanyName(storedCompanyName);
    }
    
    const fetchCompanyName = async () => {
      try {
        const generalSettings = await loadUserSettings(SettingsCategory.GENERAL);
        if (generalSettings && generalSettings.companyName) {
          setCompanyName(generalSettings.companyName);
          localStorage.setItem('companyName', generalSettings.companyName);
        }
      } catch (error) {
        console.error('Error loading company name:', error);
      }
    };
    
    fetchCompanyName();
  }, []);
  
  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = '/auth';
    } catch (error) {
      console.error('Failed to log out:', error);
      window.location.href = '/auth';
    }
  };
  
  return (
    <header className="w-full flex items-center justify-between">
      <CompanyName companyName={companyName} />
      
      <div className="flex items-center space-x-2">
        <AIMButton />
        <ThemeToggle />
        <NotificationButton onClick={() => setNotificationsPanelOpen(true)} />
        <UserProfileMenu onLogoutConfirm={handleLogout} />
      </div>

      <NotificationsPanel 
        open={notificationsPanelOpen} 
        onOpenChange={setNotificationsPanelOpen} 
      />
    </header>
  );
};

export default DashboardHeader;
