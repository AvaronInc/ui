
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Paperclip, Smile, AtSign } from 'lucide-react';
import { toast } from 'sonner';

interface MessageInputProps {
  onSendMessage: () => void;
  message: string;
  setMessage: (message: string) => void;
}

export const MessageInput = ({ onSendMessage, message, setMessage }: MessageInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="p-4 border-t">
      <div className="flex gap-2 items-end">
        <Textarea
          placeholder="Type your message..."
          className="resize-none min-h-[80px]"
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
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
          <Button onClick={onSendMessage}>Send</Button>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
