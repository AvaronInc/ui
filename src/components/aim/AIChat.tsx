
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Mic, Send, Bot, User, MicOff } from 'lucide-react';
import { toast } from 'sonner';
import { useVoiceInteraction } from '@/hooks/useVoiceInteraction';

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

  const handleSendMessage = (messageText: string = input) => {
    if (!messageText.trim()) return;

    const len = messages.length+1
    
    const newMessage: MessageType = {
      id: Date.now().toString(),
      content: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsProcessing(true);

    const ai: MessageType = {
      id: (Date.now() + 1).toString(),
      content: "",
      sender: 'assistant',
      timestamp: new Date(),
    };

    console.log("xhr http")
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/chat", true);
    let content = ""
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 3) {
        const newData = xhr.responseText.substring(xhr.seenBytes);
        console.log("data chunk:", newData);
        xhr.seenBytes = xhr.responseText.length; // Track received bytes
        setMessages((prev) => {
          console.log("prev", prev )
          console.log("len", len)
          content += newData
          let n = [...(prev.slice(0, len)), {...ai, content}]
          console.log("new messages", n)
          return n
        })
      } else if (xhr.readyState === 4 && xhr.status === 200) {
        setIsProcessing(false);
      } else if (xhr.readyState === 4 && xhr.status !== 200) {
        console.error("failed with status:", xhr.status);
        setIsProcessing(false);
      }
    };
    xhr.seenBytes = 0; // Initialize the seenBytes counter
    console.log("send")
    xhr.send(messageText);
  };

  const toggleVoiceMode = () => {
    const newMode = !voiceMode;
    setVoiceMode(newMode);
    
    if (newMode) {
      if (isVoiceSupported) {
        toast.info('Voice mode activated', {
          description: 'You can now speak to AIM'
        });
      } else {
        toast.error('Voice mode not supported', {
          description: 'Your browser does not support speech recognition'
        });
        setVoiceMode(false);
      }
    } else {
      toast.info('Voice mode deactivated', {
        description: 'Switched back to text input'
      });
      stopListening();
    }
  };

  const { 
    isListening, 
    isSpeaking, 
    isVoiceSupported, 
    startListening, 
    stopListening, 
    speakText 
  } = useVoiceInteraction(voiceMode, setMessages, handleSendMessage);

  // Effect to speak the last assistant message when it's added
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (voiceMode && lastMessage && lastMessage.sender === 'assistant') {
      speakText(lastMessage.content);
    }
  }, [messages, voiceMode, speakText]);

  return (
    <Card className="h-[600px] flex flex-col shadow-md">
      <CardHeader className="border-b pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <span>AI Assistant</span>
            {isSpeaking && <span className="text-xs text-muted-foreground animate-pulse">(Speaking...)</span>}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Label htmlFor="voice-mode" className="text-sm cursor-pointer">Voice Mode</Label>
            <Switch 
              id="voice-mode" 
              checked={voiceMode}
              onCheckedChange={toggleVoiceMode}
              disabled={!isVoiceSupported}
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
              variant={isListening ? "default" : "outline"}
              aria-label="Toggle microphone"
              onClick={isListening ? stopListening : startListening}
              disabled={!isVoiceSupported}
              className={isListening ? "bg-red-500 hover:bg-red-600" : ""}
            >
              {isListening ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4 text-primary" />
              )}
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
            disabled={isProcessing || (voiceMode && isListening)}
            // Removed autoFocus={!voiceMode} to prevent auto-scrolling on page load
          />
          <Button 
            size="icon" 
            onClick={() => handleSendMessage()}
            disabled={isProcessing || !input.trim() || (voiceMode && isListening)}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AIChat;
