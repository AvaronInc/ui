
import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTransition from '@/components/transitions/PageTransition';
import TeamsChatPanel from '@/components/teams-chat/TeamsChatPanel';

const TeamsChat = () => {
  useEffect(() => {
    document.title = 'Teams Chat - Network Pulse Management';
  }, []);

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden">
          <TeamsChatPanel />
          <Toaster />
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default TeamsChat;
