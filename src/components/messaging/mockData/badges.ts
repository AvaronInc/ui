
import { Badge } from '../types/gamification';

// Sample badges that users can earn
export const availableBadges: Badge[] = [
  {
    id: 'problem-solver',
    name: '🧩 Problem Solver',
    description: 'Provided 10 or more solutions to community problems',
    icon: '🧩',
    threshold: 10,
    category: 'solutions',
    level: 'bronze'
  },
  {
    id: 'problem-solver-silver',
    name: '🧩 Problem Solver II',
    description: 'Provided 25 or more solutions to community problems',
    icon: '🧩',
    threshold: 25,
    category: 'solutions',
    level: 'silver'
  },
  {
    id: 'problem-solver-gold',
    name: '🧩 Problem Solver III',
    description: 'Provided 50 or more solutions to community problems',
    icon: '🧩',
    threshold: 50,
    category: 'solutions',
    level: 'gold'
  },
  {
    id: 'conversationalist',
    name: '💬 Conversationalist',
    description: 'Posted 100 or more comments',
    icon: '💬',
    threshold: 100,
    category: 'comments',
    level: 'bronze'
  },
  {
    id: 'conversationalist-silver',
    name: '💬 Conversationalist II',
    description: 'Posted 250 or more comments',
    icon: '💬',
    threshold: 250,
    category: 'comments',
    level: 'silver'
  },
  {
    id: 'knowledge-architect',
    name: '🧠 Knowledge Architect',
    description: 'Created 5 or more posts with 10+ reactions each',
    icon: '🧠',
    threshold: 5,
    category: 'posts',
    level: 'silver'
  },
  {
    id: 'hot-topic',
    name: '🔥 Hot Topic',
    description: 'Created a post that reached the Top 3 trending',
    icon: '🔥',
    threshold: 1,
    category: 'trending',
    level: 'gold'
  },
  {
    id: 'first-post',
    name: '🎯 First Post',
    description: 'Created your first post',
    icon: '🎯',
    threshold: 1,
    category: 'posts',
    level: 'bronze'
  },
  {
    id: 'rising-star',
    name: '⭐ Rising Star',
    description: 'Received 50+ reactions on your content',
    icon: '⭐',
    threshold: 50,
    category: 'reactions',
    level: 'bronze'
  },
  {
    id: 'community-pillar',
    name: '🏛️ Community Pillar',
    description: 'Active for 6+ months with consistent contributions',
    icon: '🏛️',
    threshold: 180,
    category: 'posts',
    level: 'platinum'
  }
];
