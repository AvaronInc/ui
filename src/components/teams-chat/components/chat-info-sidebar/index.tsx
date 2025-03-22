
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ActiveConversation } from '../../types';
import InfoTabContent from './InfoTabContent';
import MembersTabContent from './MembersTabContent';
import AIAssistantTab from './AIAssistantTab';
import SummaryDialog from './SummaryDialog';

interface ChatInfoSidebarProps {
  activeConversation: ActiveConversation;
  sendMessage?: (content: string) => void;
}

const ChatInfoSidebar = ({ activeConversation, sendMessage }: ChatInfoSidebarProps) => {
  const [summaryDialogOpen, setSummaryDialogOpen] = useState(false);
  
  const handleInsertSummary = (summary: string) => {
    if (sendMessage) {
      sendMessage(summary);
    }
  };
  
  return (
    <div className="w-64 min-w-64 border-l flex flex-col h-full bg-background">
      <div className="p-3 border-b flex items-center">
        <div className="flex-1">
          <h3 className="font-medium">Channel Info</h3>
        </div>
      </div>
      
      <Tabs defaultValue="info" className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-3 mx-3 mt-3">
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="ai">AI</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="flex-1 flex flex-col">
          <InfoTabContent activeConversation={activeConversation} />
        </TabsContent>
        
        <TabsContent value="members" className="flex-1 flex flex-col pt-3">
          <MembersTabContent activeConversation={activeConversation} />
        </TabsContent>
        
        <TabsContent value="ai" className="flex-1 flex flex-col">
          <AIAssistantTab openSummaryDialog={() => setSummaryDialogOpen(true)} />
        </TabsContent>
      </Tabs>
      
      <SummaryDialog 
        open={summaryDialogOpen}
        onOpenChange={setSummaryDialogOpen}
        onInsertSummary={handleInsertSummary}
      />
    </div>
  );
};

export default ChatInfoSidebar;
