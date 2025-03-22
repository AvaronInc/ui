
import { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ActiveConversation } from '../types';
import ChatMessage from './ChatMessage';

interface ChatMessageFeedProps {
  activeConversation: ActiveConversation;
}

const ChatMessageFeed = ({ activeConversation }: ChatMessageFeedProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { type, data } = activeConversation;
  const messages = type === 'channel' ? 
    (data as any).messages : 
    (data as any).messages;
  
  // Sort messages by timestamp
  const sortedMessages = [...messages].sort(
    (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
  );
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {sortedMessages.map(message => (
          <ChatMessage 
            key={message.id} 
            message={message} 
          />
        ))}
        <div ref={scrollRef} />
      </div>
    </ScrollArea>
  );
};

export default ChatMessageFeed;
