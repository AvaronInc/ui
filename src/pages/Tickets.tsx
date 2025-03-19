
import React, { useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { PageTransition } from '@/components/transitions/PageTransition';
import { TicketProvider } from '@/context/TicketContext';
import TicketPageHeader from '@/components/tickets/TicketPageHeader';
import TicketMainContent from '@/components/tickets/TicketMainContent';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

const TicketsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [authenticated, setAuthenticated] = React.useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        // Not authenticated, redirect to login page
        navigate('/login');
      } else {
        setAuthenticated(true);
      }
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

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

  if (!authenticated) {
    return null; // Will redirect in the useEffect
  }

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
