
export type UserStatus = 'online' | 'away' | 'dnd' | 'offline';

export interface User {
  id: string;
  name: string;
  avatar?: string;
  email: string;
  status: UserStatus;
  role: string;
}

export interface Message {
  id: string;
  content: string;
  sender: User;
  timestamp: Date;
  reactions?: Array<{
    emoji: string;
    count: number;
    users: string[];
  }>;
  attachments?: Array<{
    id: string;
    name: string;
    type: string;
    url: string;
  }>;
  replyTo?: string;
  isPinned?: boolean;
}

export interface Channel {
  id: string;
  name: string;
  description?: string;
  isPrivate: boolean;
  members: User[];
  messages: Message[];
  topic?: string;
  pinnedMessages?: Message[];
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  channels: Channel[];
  members: User[];
}

export interface DirectMessage {
  id: string;
  recipient: User;
  messages: Message[];
}

export interface ActiveConversation {
  type: 'channel' | 'dm';
  data: Channel | DirectMessage;
  team?: Team;
}
