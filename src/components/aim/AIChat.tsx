
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Mic, Send, Bot, User } from 'lucide-react';
import { toast } from 'sonner';

type MessageType = {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
};

interface AIChatProps {
  voiceMode: boolean;
  setVoiceMode: (mode: boolean) => void;
  messages: MessageType[];
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
}

const AIChat: React.FC<AIChatProps> = ({ 
  voiceMode, 
  setVoiceMode, 
  messages, 
  setMessages 
}) => {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    const newMessage: MessageType = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsProcessing(true);
    
    setTimeout(() => {
      const aiResponse: MessageType = {
        id: (Date.now() + 1).toString(),
        content: "I'm analyzing your request. This is a placeholder response while the actual AI integration is being developed.",
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsProcessing(false);
    }, 1500);
  };

  const toggleVoiceMode = () => {
    const newMode = !voiceMode;
    setVoiceMode(newMode);
    
    if (newMode) {
      toast.info('Voice mode activated', {
        description: 'You can now speak to AIM'
      });
    } else {
      toast.info('Voice mode deactivated', {
        description: 'Switched back to text input'
      });
    }
  };

  return (
    <Card className="h-[600px] flex flex-col shadow-md">
      <CardHeader className="border-b pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <span>AI Assistant</span>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Label htmlFor="voice-mode" className="text-sm cursor-pointer">Voice Mode</Label>
            <Switch 
              id="voice-mode" 
              checked={voiceMode}
              onCheckedChange={toggleVoiceMode}
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-hidden p-0">
        <ScrollArea className="h-[460px] p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex max-w-[80%] ${
                    message.sender === 'user'
                      ? 'flex-row-reverse'
                      : 'flex-row'
                  }`}
                >
                  <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border bg-primary text-primary-foreground">
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={`mx-2 rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="mt-1 text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      
      <CardFooter className="border-t p-3">
        <div className="flex w-full items-center space-x-2">
          {voiceMode && (
            <Button
              size="icon"
              variant="outline"
              aria-label="Toggle microphone"
              onClick={() => toast.info('Microphone toggled')}
            >
              <Mic className="h-4 w-4 text-primary" />
            </Button>
          )}
          <Input
            placeholder="Type your message here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            disabled={isProcessing || voiceMode}
            autoFocus={false}
          />
          <Button 
            size="icon" 
            onClick={handleSendMessage}
            disabled={isProcessing || !input.trim() || voiceMode}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AIChat;
