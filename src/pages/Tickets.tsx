
import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { PageTransition } from '@/components/transitions/PageTransition';
import { TicketProvider } from '@/context/TicketContext';
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

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Checking authentication status...');
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error checking authentication:', error);
          toast({
            title: "Authentication Error",
            description: "Please sign in again",
            variant: "destructive"
          });
          navigate('/login');
          return;
        }
        
        if (!data.session) {
          console.log('No active session found, redirecting to login');
          navigate('/login');
        } else {
          console.log('User authenticated:', data.session.user.id);
          setAuthenticated(true);
        }
      } catch (err) {
        console.error('Unexpected error during auth check:', err);
        toast({
          title: "Unexpected Error",
          description: "Please try again later",
          variant: "destructive"
        });
        navigate('/login');
      } finally {
        console.log('Auth check complete, setting loading to false');
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  // Render loading skeleton while checking authentication
  if (loading) {
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

  // We don't want to render anything while redirecting
  if (!authenticated) {
    return null;
  }

  console.log('Rendering authenticated Tickets page');
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
