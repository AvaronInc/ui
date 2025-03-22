
import { useState } from 'react';
import { Info, Bell, BellOff, Search, Plus } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ActiveConversation } from '../types';
import ChatMessageFeed from './ChatMessageFeed';
import ChatInputBar from './ChatInputBar';

interface ChatMainAreaProps {
  activeConversation: ActiveConversation | null;
  toggleInfoSidebar: () => void;
  sendMessage: (content: string) => void;
}

const ChatMainArea = ({ 
  activeConversation,
  toggleInfoSidebar,
  sendMessage
}: ChatMainAreaProps) => {
  const [message, setMessage] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isNotificationsMuted, setIsNotificationsMuted] = useState(false);
  
  if (!activeConversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted/10">
        <div className="text-center p-6">
          <h3 className="text-lg font-medium mb-2">No Conversation Selected</h3>
          <p className="text-muted-foreground">Select a conversation from the sidebar to start chatting.</p>
        </div>
      </div>
    );
  }
  
  const { type, data, team } = activeConversation;
  const isChannel = type === 'channel';
  const name = isChannel ? 
    `#${(data as any).name}` : 
    (data as any).recipient.name;
  
  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };
  
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="h-12 min-h-12 border-b flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <h2 className="font-medium truncate">{name}</h2>
          {isChannel && team && (
            <span className="text-xs text-muted-foreground truncate">
              ({team.name})
            </span>
          )}
        </div>
        
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSearching(!isSearching)} 
            className="h-8 w-8"
          >
            <Search className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsNotificationsMuted(!isNotificationsMuted)} 
            className="h-8 w-8"
          >
            {isNotificationsMuted ? 
              <BellOff className="h-4 w-4" /> : 
              <Bell className="h-4 w-4" />
            }
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleInfoSidebar}
            className="h-8 w-8"
          >
            <Info className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {isSearching && (
        <div className="p-2 border-b">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder="Search in conversation..." 
              className="pl-9 h-9"
            />
          </div>
        </div>
      )}
      
      <ChatMessageFeed activeConversation={activeConversation} />
      
      <ChatInputBar 
        message={message}
        setMessage={setMessage}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ChatMainArea;
