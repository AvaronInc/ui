
import { MessageCircle, Users } from 'lucide-react';
import { NavItem } from './types';

export const communicationItems: NavItem[] = [
  {
    title: "Messaging",
    icon: MessageCircle,
    href: "/messaging",
  },
  {
    title: "Teams Chat",
    icon: Users,
    href: "/teams-chat",
  },
];
