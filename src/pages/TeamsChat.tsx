
import { useEffect } from 'react';
import { Toaster } from 'sonner';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTransition from '@/components/transitions/PageTransition';
import PageTitle from '@/components/common/PageTitle';
import { Card } from '@/components/ui/card';

const TeamsChat = () => {
  useEffect(() => {
    document.title = 'Teams Chat - Network Pulse Management';
  }, []);

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6 flex-1 overflow-auto">
          <PageTitle 
            title="Teams Chat" 
            subtitle="Private & team-based real-time chat system" 
          />
          <div className="grid grid-cols-1 gap-4">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Welcome to Teams Chat</h2>
              <p className="text-muted-foreground">
                This panel will contain the team-based real-time chat system. 
                You can use this system to communicate with your team members in real-time.
              </p>
            </Card>
          </div>
          <Toaster />
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default TeamsChat;
