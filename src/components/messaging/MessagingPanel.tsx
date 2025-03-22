
import React, { useState } from 'react';
import { toast } from 'sonner';
import ConversationSidebar from './components/ConversationSidebar';
import ConversationArea from './components/ConversationArea';
import { mockConversations, mockMessages } from './mockData';

export const MessagingPanel = () => {
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
  
  if (!currentConversationData) {
    return <div>No conversation selected</div>;
  }
  
  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      <ConversationSidebar 
        conversations={filteredConversations} 
        activeConversation={activeConversation}
        setActiveConversation={setActiveConversation}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <ConversationArea 
        currentConversation={currentConversationData}
        messages={currentMessages}
        message={message}
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default MessagingPanel;
