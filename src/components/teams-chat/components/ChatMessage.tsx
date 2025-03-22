
import { useState } from 'react';
import { MessageSquare, ThumbsUp, Smile, MoreHorizontal, Paperclip, Reply, Pin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Message } from '../types';
import UserStatusIndicator from './UserStatusIndicator';
import { formatMessageTime } from '../utils/formatTime';
import { mockCurrentUser } from '../mockData';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const [showActions, setShowActions] = useState(false);
  const isCurrentUser = message.sender.id === mockCurrentUser.id;
  
  // Format message content with markdown (simple version)
  const formatContent = (content: string) => {
    // Bold
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Italic
    content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Code
    content = content.replace(/`(.*?)`/g, '<code class="bg-muted px-1 rounded">$1</code>');
    // Link
    content = content.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary underline">$1</a>');
    // New line
    content = content.replace(/\n/g, '<br />');
    
    return content;
  };
  
  return (
    <div 
      className={`group relative ${isCurrentUser ? 'ml-12' : ''}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-start gap-3">
        {!isCurrentUser && (
          <div className="relative flex-shrink-0">
            <Avatar className="h-9 w-9">
              <AvatarImage src={message.sender.avatar} />
              <AvatarFallback>{message.sender.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <UserStatusIndicator 
              status={message.sender.status} 
              className="absolute -bottom-0.5 -right-0.5 h-3 w-3 ring-2 ring-background" 
            />
          </div>
        )}
        
        <div className={`flex-1 ${isCurrentUser ? 'flex flex-col items-end' : ''}`}>
          {!isCurrentUser && (
            <div className="flex items-center mb-0.5">
              <span className="font-medium text-sm mr-2">{message.sender.name}</span>
              <span className="text-xs text-muted-foreground">{formatMessageTime(message.timestamp)}</span>
            </div>
          )}
          
          <div className={`max-w-[85%] ${isCurrentUser ? 'bg-primary text-primary-foreground' : 'bg-accent'} rounded-lg p-2.5`}>
            <div 
              className="text-sm" 
              dangerouslySetInnerHTML={{ __html: formatContent(message.content) }} 
            />
            
            {message.attachments && message.attachments.length > 0 && (
              <div className="mt-2 space-y-1">
                {message.attachments.map(attachment => (
                  <div key={attachment.id} className="flex items-center gap-2 p-1.5 bg-background/50 rounded text-xs">
                    <Paperclip className="h-3 w-3" />
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
            <div className="text-xs text-muted-foreground mt-0.5">
              {formatMessageTime(message.timestamp)}
            </div>
          )}
          
          {message.isPinned && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <Pin className="h-3 w-3" />
              <span>Pinned</span>
            </div>
          )}
        </div>
      </div>
      
      {showActions && (
        <div className={`absolute top-0 ${isCurrentUser ? 'left-0 -translate-x-full -ml-1' : 'right-0 translate-x-full mr-1'} flex items-center bg-background border rounded-md shadow-sm`}>
          <Button variant="ghost" size="icon" className="h-7 w-7" title="Reply">
            <Reply className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" title="React">
            <Smile className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" title="Pin message">
            <Pin className="h-3.5 w-3.5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <MoreHorizontal className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isCurrentUser ? "start" : "end"}>
              <DropdownMenuItem>Edit Message</DropdownMenuItem>
              <DropdownMenuItem>Copy Message</DropdownMenuItem>
              <DropdownMenuItem>Forward Message</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete Message</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
