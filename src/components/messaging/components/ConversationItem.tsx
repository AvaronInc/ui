
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Conversation } from '../types';
import { currentUser } from '../mockData';
import StatusIndicator from './StatusIndicator';
import { formatTime } from '../utils/formatTime';

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

export const ConversationItem = ({ conversation, isActive, onClick }: ConversationItemProps) => {
  const { name, lastMessage, isGroup, unreadCount } = conversation;
  
  // Get the main participant if it's a 1:1 chat
  const participant = !isGroup ? conversation.participants.find(p => p.id !== currentUser.id) : null;
  const displayName = !isGroup && participant ? participant.name : name;
  
  // For avatar
  const mainUser = !isGroup && participant ? participant : conversation.participants[0];
  
  return (
    <div 
      className={`p-3 cursor-pointer hover:bg-accent rounded-md transition-colors ${isActive ? 'bg-accent' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Avatar>
            <AvatarImage src={mainUser.avatar} />
            <AvatarFallback>{displayName.substring(0, 2)}</AvatarFallback>
          </Avatar>
          {!isGroup && participant && (
            <StatusIndicator status={participant.status} />
          )}
          {isGroup && (
            <div className="absolute bottom-0 right-0 rounded-full bg-primary text-primary-foreground w-4 h-4 flex items-center justify-center text-[10px]">
              {conversation.participants.length}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="font-medium truncate">{displayName}</p>
            {lastMessage && (
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {formatTime(lastMessage.timestamp)}
              </span>
            )}
          </div>
          {lastMessage && (
            <p className="text-sm text-muted-foreground truncate">
              {lastMessage.sender.id === currentUser.id ? "You: " : ""}
              {lastMessage.content}
            </p>
          )}
        </div>
        {unreadCount > 0 && (
          <div className="ml-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {unreadCount}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationItem;
