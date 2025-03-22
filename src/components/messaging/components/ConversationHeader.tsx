
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PinIcon, Search } from 'lucide-react';
import { Conversation } from '../types';
import { currentUser } from '../mockData';

interface ConversationHeaderProps {
  conversation: Conversation;
}

export const ConversationHeader = ({ conversation }: ConversationHeaderProps) => {
  return (
    <div className="p-4 border-b flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage
            src={
              conversation.isGroup
                ? undefined
                : conversation.participants.find(p => p.id !== currentUser.id)?.avatar
            }
          />
          <AvatarFallback>{conversation.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{conversation.name}</h3>
          <p className="text-sm text-muted-foreground">
            {conversation.isGroup
              ? `${conversation.participants.length} members`
              : conversation.participants.find(p => p.id !== currentUser.id)?.role}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="ghost" size="icon">
          <PinIcon className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ConversationHeader;
