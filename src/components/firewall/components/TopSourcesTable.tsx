
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Globe, ShieldAlert, Shield } from 'lucide-react';

interface TopSourcesTableProps {
  type: 'allowed' | 'blocked';
}

interface SourceData {
  id: number;
  ip: string;
  country: string;
  region: string;
  count: number;
  lastSeen: string;
  type: 'allowed' | 'blocked';
  riskLevel?: 'low' | 'medium' | 'high';
}

const mockData: SourceData[] = [
  { id: 1, ip: '192.168.24.15', country: 'United States', region: 'California', count: 1452, lastSeen: '2 min ago', type: 'allowed' },
  { id: 2, ip: '10.45.67.89', country: 'Internal', region: 'Local', count: 1253, lastSeen: '1 min ago', type: 'allowed' },
  { id: 3, ip: '8.8.8.8', country: 'United States', region: 'California', count: 986, lastSeen: '30 sec ago', type: 'allowed' },
  { id: 4, ip: '172.16.10.5', country: 'Internal', region: 'VPN', count: 874, lastSeen: '5 min ago', type: 'allowed' },
  { id: 5, ip: '52.94.236.248', country: 'United States', region: 'Virginia', count: 743, lastSeen: '3 min ago', type: 'allowed' },
  { id: 6, ip: '34.102.136.180', country: 'United States', region: 'Oregon', count: 621, lastSeen: '1 min ago', type: 'allowed' },
  { id: 7, ip: '35.190.72.21', country: 'United States', region: 'Iowa', count: 532, lastSeen: '2 min ago', type: 'allowed' },
  { id: 8, ip: '104.16.85.20', country: 'United States', region: 'California', count: 487, lastSeen: '4 min ago', type: 'allowed' },
  { id: 9, ip: '13.107.42.16', country: 'United States', region: 'Washington', count: 423, lastSeen: '2 min ago', type: 'allowed' },
  { id: 10, ip: '40.100.174.2', country: 'Ireland', region: 'Dublin', count: 398, lastSeen: '6 min ago', type: 'allowed' },
  
  { id: 11, ip: '185.143.223.16', country: 'Russia', region: 'Moscow', count: 867, lastSeen: '30 sec ago', type: 'blocked', riskLevel: 'high' },
  { id: 12, ip: '103.74.19.104', country: 'China', region: 'Beijing', count: 743, lastSeen: '1 min ago', type: 'blocked', riskLevel: 'high' },
  { id: 13, ip: '91.214.124.143', country: 'Ukraine', region: 'Kyiv', count: 521, lastSeen: '2 min ago', type: 'blocked', riskLevel: 'medium' },
  { id: 14, ip: '45.227.255.206', country: 'Brazil', region: 'Sao Paulo', count: 478, lastSeen: '3 min ago', type: 'blocked', riskLevel: 'medium' },
  { id: 15, ip: '221.176.222.98', country: 'China', region: 'Shanghai', count: 451, lastSeen: '30 sec ago', type: 'blocked', riskLevel: 'high' },
  { id: 16, ip: '5.39.217.41', country: 'Netherlands', region: 'Amsterdam', count: 387, lastSeen: '1 min ago', type: 'blocked', riskLevel: 'medium' },
  { id: 17, ip: '185.156.73.54', country: 'Romania', region: 'Bucharest', count: 342, lastSeen: '4 min ago', type: 'blocked', riskLevel: 'low' },
  { id: 18, ip: '81.171.29.146', country: 'Germany', region: 'Berlin', count: 298, lastSeen: '2 min ago', type: 'blocked', riskLevel: 'low' },
  { id: 19, ip: '212.102.35.29', country: 'United Kingdom', region: 'London', count: 273, lastSeen: '5 min ago', type: 'blocked', riskLevel: 'low' },
  { id: 20, ip: '107.175.221.73', country: 'United States', region: 'New York', count: 246, lastSeen: '3 min ago', type: 'blocked', riskLevel: 'medium' },
];

const TopSourcesTable: React.FC<TopSourcesTableProps> = ({ type }) => {
  const filteredData = mockData.filter(item => item.type === type).slice(0, 10);
  
  const getRiskBadge = (riskLevel?: 'low' | 'medium' | 'high') => {
    if (!riskLevel) return null;
    
    const colors = {
      low: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      medium: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    };
    
    return (
      <Badge variant="outline" className={`${colors[riskLevel]} ml-2`}>
        {riskLevel}
      </Badge>
    );
  };
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>IP Address</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="text-right">Count</TableHead>
            <TableHead className="text-right">Last Seen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map(source => (
            <TableRow key={source.id}>
              <TableCell className="font-medium flex items-center">
                {type === 'allowed' ? (
                  <Shield className="inline mr-2 h-4 w-4 text-green-500" />
                ) : (
                  <ShieldAlert className="inline mr-2 h-4 w-4 text-red-500" />
                )}
                {source.ip}
                {type === 'blocked' && getRiskBadge(source.riskLevel)}
              </TableCell>
              <TableCell className="flex items-center">
                <Globe className="inline mr-2 h-4 w-4 text-blue-500" />
                {source.country}, {source.region}
              </TableCell>
              <TableCell className="text-right">{source.count.toLocaleString()}</TableCell>
              <TableCell className="text-right">{source.lastSeen}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TopSourcesTable;
