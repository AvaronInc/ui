
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/context/auth';
import MultiTenantView from '@/components/dashboard/MultiTenantView';
import MainDashboard from '@/components/dashboard/MainDashboard';
import PageTransition from '@/components/transitions/PageTransition';
import VideoPopup from '@/components/common/VideoPopup';

const Index = () => {
  const { isAdmin } = useAuth();
  const [showMultiTenant, setShowMultiTenant] = useState(false);
  const [showWelcomeVideo, setShowWelcomeVideo] = useState(false);
  
  useEffect(() => {
    // Check if this is the first visit to the dashboard in this session
    const hasSeenWelcomeVideo = sessionStorage.getItem('hasSeenWelcomeVideo');
    if (!hasSeenWelcomeVideo) {
      // Show video popup after a short delay to ensure page is loaded
      const timer = setTimeout(() => {
        setShowWelcomeVideo(true);
        // Mark that the user has seen the welcome video in this session
        sessionStorage.setItem('hasSeenWelcomeVideo', 'true');
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  return (
    <PageTransition>
      <DashboardLayout>
        <div className="container py-6 space-y-6">
          {showMultiTenant && isAdmin ? (
            <MultiTenantView />
          ) : (
            <MainDashboard />
          )}
        </div>
        
        <VideoPopup 
          open={showWelcomeVideo}
          onOpenChange={setShowWelcomeVideo}
          videoUrl="https://ldhcbonevdxtoycfoeds.supabase.co/storage/v1/object/public/docs//Untitled%20Video.mp4"
          title="Welcome to AIM System"
        />
      </DashboardLayout>
    </PageTransition>
  );
};

export default Index;
