
export interface User {
  id: string;
  name: string;
  avatar?: string;
  department: string;
  role: string;
}

export interface Reaction {
  type: 'like' | 'heart' | 'rocket' | 'laugh';
  count: number;
  reactedBy: string[]; // User IDs
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  timestamp: Date;
  reactions: Reaction[];
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  timestamp: Date;
  tags: string[];
  reactions: {
    like: Reaction;
    heart: Reaction;
    rocket: Reaction;
    laugh: Reaction;
  };
  attachments?: {
    id: string;
    name: string;
    type: string;
    url: string;
  }[];
  comments: Comment[];
  isPinned: boolean;
  visibility: 'admin' | 'network' | 'everyone';
}

export type SortOption = 'newest' | 'oldest' | 'most-liked' | 'most-commented';
export type FilterOption = {
  tags: string[];
  authors: string[];
  dateRange?: {
    start: Date | null;
    end: Date | null;
  };
  searchQuery: string;
};
