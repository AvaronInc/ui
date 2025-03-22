
import { useState } from 'react';
import { Paperclip, Code, Calendar, Smile, AtSign, Send, Video, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';

interface ChatInputBarProps {
  message: string;
  setMessage: (message: string) => void;
  onSendMessage: () => void;
}

const ChatInputBar = ({ 
  message, 
  setMessage, 
  onSendMessage 
}: ChatInputBarProps) => {
  const [isAttaching, setIsAttaching] = useState(false);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };
  
  const formatText = (formatter: string) => {
    // Get selection or insert at cursor
    const textarea = document.querySelector('textarea');
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = message.substring(start, end);
    
    let formattedText = '';
    switch (formatter) {
      case 'bold':
        formattedText = `**${selectedText || 'bold text'}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText || 'italic text'}*`;
        break;
      case 'code':
        formattedText = `\`${selectedText || 'code'}\``;
        break;
      case 'link':
        formattedText = `[${selectedText || 'link text'}](url)`;
        break;
      case 'mention':
        formattedText = `@${selectedText || ''}`;
        break;
      default:
        formattedText = selectedText;
    }
    
    const newMessage = message.substring(0, start) + formattedText + message.substring(end);
    setMessage(newMessage);
    
    // Focus back on textarea after formatting
    setTimeout(() => {
      if (textarea) {
        textarea.focus();
        textarea.selectionStart = start + formattedText.length;
        textarea.selectionEnd = start + formattedText.length;
      }
    }, 0);
  };
  
  return (
    <div className="p-3 border-t">
      <div className="rounded-lg border bg-background overflow-hidden">
        <Textarea 
          placeholder="Type your message..." 
          className="resize-none border-0 focus-visible:ring-0 min-h-[80px]"
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        
        <div className="flex justify-between items-center px-3 py-2 border-t">
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full" 
              onClick={() => setIsAttaching(true)}
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full"
              onClick={() => formatText('code')}
            >
              <Code className="h-4 w-4" />
            </Button>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full"
                >
                  <Smile className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-2">
                <div className="grid grid-cols-8 gap-1">
                  {["😀", "😂", "❤️", "👍", "👎", "😢", "🔥", "✅", "❌", "💯", "🎉", "🤔", "👀", "🙌", "👏", "🚀"].map(emoji => (
                    <Button 
                      key={emoji} 
                      variant="ghost" 
                      className="h-8 w-8 p-0" 
                      onClick={() => setMessage(message + emoji)}
                    >
                      {emoji}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full"
              onClick={() => formatText('mention')}
            >
              <AtSign className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full"
            >
              <Calendar className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full"
            >
              <Mic className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full"
            >
              <Video className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="default" 
              size="sm" 
              className="rounded-full px-3"
              onClick={onSendMessage}
              disabled={!message.trim()}
            >
              <Send className="h-4 w-4 mr-1" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInputBar;
