
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Message } from '../types';
import { PinIcon, Paperclip } from 'lucide-react';
import { formatTime } from '../utils/formatTime';

interface MessageItemProps {
  message: Message;
  isCurrentUser: boolean;
}

export const MessageItem = ({ message, isCurrentUser }: MessageItemProps) => {
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

export default MessageItem;
