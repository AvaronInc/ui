
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import PageTitle from '@/components/common/PageTitle';
import ConversationItem from './ConversationItem';
import { Conversation } from '../types';

interface ConversationSidebarProps {
  conversations: Conversation[];
  activeConversation: string;
  setActiveConversation: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const ConversationSidebar = ({ 
  conversations, 
  activeConversation, 
  setActiveConversation,
  searchQuery,
  setSearchQuery
}: ConversationSidebarProps) => {
  return (
    <div className="w-80 border-r flex flex-col h-full">
      <div className="p-4 border-b">
        <PageTitle 
          title="Messaging" 
          subtitle="IT internal communication" 
          className="mb-4"
        />
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="text" 
            placeholder="Search conversations..." 
            className="pl-9"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-3">
          {conversations.map(conversation => (
            <ConversationItem 
              key={conversation.id} 
              conversation={conversation} 
              isActive={activeConversation === conversation.id}
              onClick={() => setActiveConversation(conversation.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ConversationSidebar;
