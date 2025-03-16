
import { Network, Server, Share2, MapPin, Package } from 'lucide-react';
import { NavItem } from './types';

// Network & Infrastructure Management
export const networkItems: NavItem[] = [
  {
    title: 'Topology',
    icon: Network,
    href: '/topology'
  },
  {
    title: 'N.E.S.T.',
    icon: Server,
    href: '/nest'
  },
  {
    title: 'SD-WAN',
    icon: Share2,
    href: '/sdwan'
  },
  {
    title: 'IPAM',
    icon: MapPin,
    href: '/ipam'
  },
  {
    title: 'Containers',
    icon: Package,
    href: '/containers'
  },
];
