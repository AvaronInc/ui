
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CollaborationBoardPanel from './components/collaborationboard/CollaborationBoardPanel';
import UserLeaderboard from './components/gamification/UserLeaderboard';
import BadgeShowcase from './components/gamification/BadgeShowcase';
import UserContributionDashboard from './components/gamification/UserContributionDashboard';
import { Activity, Award, MessageSquare, User } from 'lucide-react';

export const MessagingPanel = () => {
  const [activeTab, setActiveTab] = useState<string>("collaboration");
  
  return (
    <Tabs defaultValue="collaboration" className="h-full flex flex-col" onValueChange={setActiveTab}>
      <div className="border-b px-4 py-2">
        <TabsList className="grid grid-cols-4 w-full max-w-xl">
          <TabsTrigger value="collaboration" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>Collaboration</span>
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            <span>Leaderboard</span>
          </TabsTrigger>
          <TabsTrigger value="badges" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span>Badges</span>
          </TabsTrigger>
          <TabsTrigger value="contribution" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>My Contributions</span>
          </TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="collaboration" className="flex-1 overflow-hidden">
        <CollaborationBoardPanel />
      </TabsContent>
      
      <TabsContent value="leaderboard" className="flex-1 overflow-hidden p-4">
        <UserLeaderboard />
      </TabsContent>
      
      <TabsContent value="badges" className="flex-1 overflow-hidden p-4">
        <BadgeShowcase />
      </TabsContent>
      
      <TabsContent value="contribution" className="flex-1 overflow-hidden p-4">
        <UserContributionDashboard />
      </TabsContent>
    </Tabs>
  );
};

export default MessagingPanel;
