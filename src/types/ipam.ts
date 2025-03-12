
export interface IPAddress {
  id: string;
  address: string;
  subnet: string;
  status: 'available' | 'in-use' | 'conflict';
  deviceName?: string;
  assignedUser?: string;
  lastUpdated: string;
  description?: string;
  history?: IPHistoryEntry[];
}

export interface IPHistoryEntry {
  id: string;
  date: string;
  action: 'assigned' | 'released' | 'modified' | 'scanned';
  user: string;
  details: string;
}

export interface Subnet {
  id: string;
  name: string;
  cidr: string;
  totalIPs: number;
  usedIPs: number;
  description?: string;
}
