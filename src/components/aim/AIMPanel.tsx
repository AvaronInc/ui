
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import AIChat from './AIChat';
import QuickAccessQueries from './QuickAccessQueries';
import SystemHealthSummary from './SystemHealthSummary';
import CustomizationPanel from './CustomizationPanel';

type MessageType = {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
};

const AIMPanel: React.FC = () => {
  const [voiceMode, setVoiceMode] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: '1',
      content: "Welcome to AIM. How can I assist you with your infrastructure management today?",
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  
  // Handle when a quick query is selected
  const handleQuickQuery = (queryText: string) => {
    const userMessage: MessageType = {
      id: Date.now().toString(),
      content: queryText,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse: MessageType = {
        id: (Date.now() + 1).toString(),
        content: `I'm processing your request: "${queryText}". This is a placeholder response while the actual AI integration is being developed.`,
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main chat area - takes up 2/3 of the width on large screens */}
        <div className="lg:col-span-2 space-y-6">
          <AIChat 
            voiceMode={voiceMode} 
            setVoiceMode={setVoiceMode} 
            messages={messages}
            setMessages={setMessages}
          />
          <QuickAccessQueries onQuerySelect={handleQuickQuery} />
        </div>
        
        {/* Right sidebar - takes up 1/3 of the width on large screens */}
        <div className="space-y-6">
          <SystemHealthSummary />
          <CustomizationPanel />
        </div>
      </div>
    </div>
  );
};

export default AIMPanel;
