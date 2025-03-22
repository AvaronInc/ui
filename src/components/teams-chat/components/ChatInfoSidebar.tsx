
import { ActiveConversation } from '../types';
import ChatInfoSidebar from './chat-info-sidebar';

interface ChatInfoSidebarProps {
  activeConversation: ActiveConversation;
  sendMessage?: (content: string) => void;
}

// This file is now just a re-export wrapper to maintain compatibility
// with existing imports in the codebase
export default function ChatInfoSidebarWrapper(props: ChatInfoSidebarProps) {
  return <ChatInfoSidebar {...props} />;
}
