
import { useState } from 'react';
import ChatSidebar from './components/ChatSidebar';
import ChatMainArea from './components/ChatMainArea';
import ChatInfoSidebar from './components/ChatInfoSidebar';
import { Channel, DirectMessage, Team, Message, UserStatus } from './types';
import { mockTeams, mockDirectMessages, mockCurrentUser } from './mockData';

const TeamsChatPanel = () => {
  const [teams, setTeams] = useState<Team[]>(mockTeams);
  const [directMessages, setDirectMessages] = useState<DirectMessage[]>(mockDirectMessages);
  const [activeChannelId, setActiveChannelId] = useState<string | null>(mockTeams[0].channels[0].id);
  const [activeDmId, setActiveDmId] = useState<string | null>(null);
  const [showInfoSidebar, setShowInfoSidebar] = useState(true);
  const [userStatus, setUserStatus] = useState<UserStatus>(mockCurrentUser.status);
  const [searchQuery, setSearchQuery] = useState('');

  // Get current active channel or DM conversation
  const getActiveConversation = () => {
    if (activeChannelId) {
      for (const team of teams) {
        const channel = team.channels.find(ch => ch.id === activeChannelId);
        if (channel) return { type: 'channel', data: channel, team };
      }
    }
    
    if (activeDmId) {
      const dm = directMessages.find(dm => dm.id === activeDmId);
      if (dm) return { type: 'dm', data: dm };
    }
    
    return null;
  };

  const activeConversation = getActiveConversation();
  
  // Toggle info sidebar
  const toggleInfoSidebar = () => {
    setShowInfoSidebar(!showInfoSidebar);
  };

  // Set active conversation (channel or DM)
  const setActiveConversation = (type: 'channel' | 'dm', id: string) => {
    if (type === 'channel') {
      setActiveChannelId(id);
      setActiveDmId(null);
    } else {
      setActiveDmId(id);
      setActiveChannelId(null);
    }
  };

  // Change user status
  const changeUserStatus = (status: UserStatus) => {
    setUserStatus(status);
  };

  // Send message to active conversation
  const sendMessage = (content: string) => {
    // This would be connected to a real backend in production
    console.log('Sending message to', activeConversation?.type, activeConversation?.data?.id, content);
  };

  return (
    <div className="flex w-full h-full">
      <ChatSidebar 
        teams={teams}
        directMessages={directMessages}
        activeChannelId={activeChannelId}
        activeDmId={activeDmId}
        setActiveConversation={setActiveConversation}
        userStatus={userStatus}
        changeUserStatus={changeUserStatus}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <ChatMainArea 
        activeConversation={activeConversation}
        toggleInfoSidebar={toggleInfoSidebar}
        sendMessage={sendMessage}
      />
      
      {showInfoSidebar && activeConversation && (
        <ChatInfoSidebar 
          activeConversation={activeConversation}
        />
      )}
    </div>
  );
};

export default TeamsChatPanel;
