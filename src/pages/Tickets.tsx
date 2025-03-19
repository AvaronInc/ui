import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { PageTransition } from '@/components/transitions/PageTransition';
import { TicketProvider } from '@/context/ticket/TicketContext';
import TicketPageHeader from '@/components/tickets/TicketPageHeader';
import TicketMainContent from '@/components/tickets/TicketMainContent';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

const TicketsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  // Check authentication status only once when component mounts
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('💡 TicketsPage: Checking authentication status...');
        
        // In development mode, we'll bypass authentication for easier testing
        if (import.meta.env.DEV) {
          console.log('💡 TicketsPage: Development mode, bypassing authentication check');
          setAuthenticated(true);
          setLoading(false);
          return;
        }
        
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('💡 TicketsPage: Error checking authentication:', error);
          toast("Authentication Error", {
            description: "Please sign in again"
          });
          navigate('/login');
          return;
        }
        
        if (!data.session) {
          console.log('💡 TicketsPage: No active session found, redirecting to login');
          navigate('/login');
        } else {
          console.log('💡 TicketsPage: User authenticated:', data.session.user.id);
          setAuthenticated(true);
        }
      } catch (err) {
        console.error('💡 TicketsPage: Unexpected error during auth check:', err);
        toast("Unexpected Error", {
          description: "Please try again later"
        });
        navigate('/login');
      } finally {
        // Always set loading to false after authentication check
        console.log('💡 TicketsPage: Auth check complete, setting loading to false');
        setLoading(false);
      }
    };

    checkAuth();
    
    // Add cleanup function
    return () => {
      console.log('💡 TicketsPage: Component unmounting');
    };
  }, [navigate]);

  // For development purposes, we'll set authenticated to true
  useEffect(() => {
    if (import.meta.env.DEV && !authenticated) {
      console.log('💡 TicketsPage: Force setting authenticated to true in DEV mode');
      setAuthenticated(true);
    }
  }, [authenticated]);

  // Render loading skeleton while checking authentication
  if (loading) {
    console.log('💡 TicketsPage: Rendering loading skeleton');
    return (
      <PageTransition>
        <DashboardLayout>
          <div className="container p-4 md:p-6 space-y-6">
            <Skeleton className="h-12 w-48 mb-4" />
            <Skeleton className="h-6 w-96 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              {Array(4).fill(null).map((_, i) => (
                <Skeleton key={i} className="h-[120px]" />
              ))}
            </div>
            <Skeleton className="h-[600px]" />
          </div>
        </DashboardLayout>
      </PageTransition>
    );
  }

  // For development mode or if authenticated, render the ticket page
  const isDevelopment = import.meta.env.DEV;
  const shouldRenderTickets = authenticated || isDevelopment;
  
  if (!shouldRenderTickets) {
    console.log('💡 TicketsPage: Not authenticated, returning null');
    return null;
  }

  console.log('💡 TicketsPage: Rendering authenticated Tickets page');
  return (
    <PageTransition>
      <DashboardLayout>
        <TicketProvider>
          <div className="container p-4 md:p-6 space-y-6">
            <TicketPageHeader />
            <TicketMainContent />
          </div>
        </TicketProvider>
      </DashboardLayout>
    </PageTransition>
  );
};

export default TicketsPage;
