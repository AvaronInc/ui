
import { Network, Share2, MapPin, Package, Globe, Server } from 'lucide-react';
import { NavItem } from './types';

// Network & Infrastructure Management
export const networkItems: NavItem[] = [
  {
    title: 'Topology',
    icon: Network,
    href: '/topology'
  },
  {
    title: 'SD-WAN',
    icon: Share2,
    href: '/sdwan'
  },
  {
    title: 'SDN',
    icon: Globe,
    href: '/sdn'
  },
  {
    title: 'DNS Management',
    icon: Server,
    href: '/dns-management'
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
