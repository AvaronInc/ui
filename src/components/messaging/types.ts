
export type UserStatus = 'online' | 'away' | 'dnd' | 'offline';

export interface User {
  id: string;
  name: string;
  avatar?: string;
  status: UserStatus;
  role: string;
}

export interface Message {
  id: string;
  content: string;
  sender: User;
  timestamp: Date;
  attachments?: Array<{
    id: string;
    name: string;
    type: string;
    url: string;
  }>;
  reactions?: Array<{
    emoji: string;
    count: number;
    users: string[];
  }>;
  isPinned?: boolean;
  replyTo?: string;
}

export interface Conversation {
  id: string;
  name: string;
  isGroup: boolean;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
}
