
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ConversationHeader from './ConversationHeader';
import MessageItem from './MessageItem';
import MessageInput from './MessageInput';
import { Message, Conversation } from '../types';
import { currentUser } from '../mockData';

interface ConversationAreaProps {
  currentConversation: Conversation;
  messages: Message[];
  message: string;
  setMessage: (message: string) => void;
  handleSendMessage: () => void;
}

export const ConversationArea = ({ 
  currentConversation, 
  messages, 
  message, 
  setMessage, 
  handleSendMessage 
}: ConversationAreaProps) => {
  return (
    <div className="flex-1 flex flex-col h-full">
      <ConversationHeader conversation={currentConversation} />
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map(msg => (
            <MessageItem 
              key={msg.id} 
              message={msg} 
              isCurrentUser={msg.sender.id === currentUser.id} 
            />
          ))}
        </div>
      </ScrollArea>
      
      <MessageInput 
        message={message}
        setMessage={setMessage}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ConversationArea;
