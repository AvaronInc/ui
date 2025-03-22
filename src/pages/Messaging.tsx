
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import { Search, PinIcon, MessageCircle, Users, AtSign, Paperclip, Smile } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTransition from '@/components/transitions/PageTransition';
import PageTitle from '@/components/common/PageTitle';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

// Types
type UserStatus = 'online' | 'away' | 'dnd' | 'offline';

interface User {
  id: string;
  name: string;
  avatar?: string;
  status: UserStatus;
  role: string;
}

interface Message {
  id: string;
  content: string;
  sender: User;
  timestamp: Date;
  attachments?: Array<{
    id: string;
    name: string;
    type: string;
    url: string;
  }>;
  reactions?: Array<{
    emoji: string;
    count: number;
    users: string[];
  }>;
  isPinned?: boolean;
  replyTo?: string;
}

interface Conversation {
  id: string;
  name: string;
  isGroup: boolean;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
}

// Mock data
const currentUser: User = {
  id: 'u1',
  name: 'Alex Morgan',
  status: 'online',
  role: 'Network Engineer'
};

const mockUsers: User[] = [
  currentUser,
  { id: 'u2', name: 'Sam Wilson', status: 'online', role: 'System Admin' },
  { id: 'u3', name: 'Taylor Chen', status: 'away', role: 'Security Analyst' },
  { id: 'u4', name: 'Jamie Rodriguez', status: 'dnd', role: 'IT Manager' },
  { id: 'u5', name: 'Morgan Smith', status: 'offline', role: 'DevOps Engineer' },
];

const mockConversations: Conversation[] = [
  {
    id: 'c1',
    name: 'Security Team',
    isGroup: true,
    participants: [mockUsers[0], mockUsers[1], mockUsers[2]],
    lastMessage: {
      id: 'm1',
      content: 'Has everyone reviewed the new firewall rules?',
      sender: mockUsers[2],
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
    },
    unreadCount: 2,
  },
  {
    id: 'c2',
    name: 'Sam Wilson',
    isGroup: false,
    participants: [mockUsers[0], mockUsers[1]],
    lastMessage: {
      id: 'm2',
      content: 'I\'ll prepare the server maintenance report by EOD',
      sender: mockUsers[1],
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
    unreadCount: 0,
  },
  {
    id: 'c3',
    name: 'Network Ops',
    isGroup: true,
    participants: [mockUsers[0], mockUsers[1], mockUsers[3], mockUsers[4]],
    lastMessage: {
      id: 'm3',
      content: 'Datacenter migration planning meeting at 3 PM tomorrow',
      sender: mockUsers[3],
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
    },
    unreadCount: 0,
  },
  {
    id: 'c4',
    name: 'Jamie Rodriguez',
    isGroup: false,
    participants: [mockUsers[0], mockUsers[3]],
    lastMessage: {
      id: 'm4',
      content: 'Please review the updated disaster recovery procedures',
      sender: mockUsers[3],
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    },
    unreadCount: 1,
  },
];

const mockMessages: Record<string, Message[]> = {
  'c1': [
    {
      id: 'm11',
      content: 'Team, we need to review our security protocols this week.',
      sender: mockUsers[0],
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
    },
    {
      id: 'm12',
      content: 'I\'ve prepared the initial assessment, will share later today.',
      sender: mockUsers[1],
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
    {
      id: 'm13',
      content: 'Great, I\'ll start on the network vulnerability scans.',
      sender: mockUsers[2],
      timestamp: new Date(Date.now() - 1000 * 60 * 40),
    },
    {
      id: 'm14',
      content: 'Has everyone reviewed the new firewall rules?',
      sender: mockUsers[2],
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      isPinned: true,
    },
  ],
};

// Component for displaying user status indicator
const StatusIndicator = ({ status }: { status: UserStatus }) => {
  const statusColors = {
    online: 'bg-green-500',
    away: 'bg-yellow-500',
    dnd: 'bg-red-500',
    offline: 'bg-gray-400'
  };
  
  return (
    <span className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white ${statusColors[status]}`} />
  );
};

// Component for conversation list item
const ConversationItem = ({ 
  conversation, 
  isActive, 
  onClick 
}: { 
  conversation: Conversation; 
  isActive: boolean; 
  onClick: () => void;
}) => {
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

// Format timestamp for messages
const formatTime = (date: Date) => {
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 24 && date.getDate() === now.getDate()) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (diffInHours < 48) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
};

// Component for a single message
const MessageItem = ({ message, isCurrentUser }: { message: Message; isCurrentUser: boolean }) => {
  return (
    <div className={`mb-4 max-w-[80%] ${isCurrentUser ? 'ml-auto' : ''}`}>
      {!isCurrentUser && (
        <div className="flex items-center gap-2 mb-1">
          <Avatar className="h-6 w-6">
            <AvatarImage src={message.sender.avatar} />
            <AvatarFallback>{message.sender.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{message.sender.name}</span>
          <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
        </div>
      )}
      <div 
        className={`rounded-lg p-3 ${
          isCurrentUser 
            ? 'bg-primary text-primary-foreground rounded-tr-none' 
            : 'bg-accent rounded-tl-none'
        }`}
      >
        <p>{message.content}</p>
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 space-y-1">
            {message.attachments.map(attachment => (
              <div key={attachment.id} className="flex items-center gap-2 p-2 bg-background/50 rounded text-sm">
                <Paperclip className="h-4 w-4" />
                <span className="truncate">{attachment.name}</span>
              </div>
            ))}
          </div>
        )}
        {message.reactions && message.reactions.length > 0 && (
          <div className="flex gap-1 mt-2">
            {message.reactions.map((reaction, index) => (
              <div key={index} className="bg-background/50 rounded-full px-2 py-0.5 text-xs flex items-center gap-1">
                <span>{reaction.emoji}</span>
                <span>{reaction.count}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {isCurrentUser && (
        <div className="flex justify-end text-xs text-muted-foreground mt-1">
          {formatTime(message.timestamp)}
        </div>
      )}
      {message.isPinned && (
        <div className="flex justify-end gap-1 text-xs text-muted-foreground mt-1">
          <PinIcon className="h-3 w-3" />
          <span>Pinned</span>
        </div>
      )}
    </div>
  );
};

const Messaging = () => {
  useEffect(() => {
    document.title = 'Messaging - Network Pulse Management';
  }, []);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeConversation, setActiveConversation] = useState<string>(mockConversations[0].id);
  const [message, setMessage] = useState('');
  
  // Filter conversations based on search query
  const filteredConversations = mockConversations.filter(
    conv => conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Get current conversation messages
  const currentMessages = mockMessages[activeConversation] || [];
  
  // Get current conversation data
  const currentConversationData = mockConversations.find(c => c.id === activeConversation);
  
  // Handle sending a new message
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // In a real application, you would call an API here
    toast.success('Message sent');
    setMessage('');
  };
  
  return (
    <PageTransition>
      <DashboardLayout>
        <div className="px-0 py-0 flex h-[calc(100vh-4rem)] overflow-hidden">
          {/* Sidebar with conversations */}
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
                {filteredConversations.map(conversation => (
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
          
          {/* Main chat area */}
          <div className="flex-1 flex flex-col h-full">
            {/* Chat header */}
            {currentConversationData && (
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={currentConversationData.isGroup ? undefined : currentConversationData.participants.find(p => p.id !== currentUser.id)?.avatar} />
                    <AvatarFallback>
                      {currentConversationData.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{currentConversationData.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {currentConversationData.isGroup 
                        ? `${currentConversationData.participants.length} members` 
                        : currentConversationData.participants.find(p => p.id !== currentUser.id)?.role}
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
            )}
            
            {/* Messages area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {currentMessages.map(msg => (
                  <MessageItem 
                    key={msg.id} 
                    message={msg} 
                    isCurrentUser={msg.sender.id === currentUser.id} 
                  />
                ))}
              </div>
            </ScrollArea>
            
            {/* Message input */}
            <div className="p-4 border-t">
              <div className="flex gap-2 items-end">
                <Textarea 
                  placeholder="Type your message..."
                  className="resize-none min-h-[80px]"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="icon" title="Attach files">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" title="Insert emoji">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" title="Mention user">
                    <AtSign className="h-4 w-4" />
                  </Button>
                  <Button onClick={handleSendMessage}>Send</Button>
                </div>
              </div>
            </div>
          </div>
          <Toaster />
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default Messaging;
