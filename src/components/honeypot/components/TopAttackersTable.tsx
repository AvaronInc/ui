
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const attackers = [
  {
    id: 1,
    ipAddress: '192.168.43.117',
    country: 'Russia',
    attackTypes: ['SQL Injection', 'Brute Force'],
    attempts: 147,
    firstSeen: '2023-12-10',
    lastSeen: '2023-12-12',
    threatLevel: 'High'
  },
  {
    id: 2,
    ipAddress: '45.123.67.89',
    country: 'China',
    attackTypes: ['XSS', 'Command Injection'],
    attempts: 92,
    firstSeen: '2023-12-08',
    lastSeen: '2023-12-12',
    threatLevel: 'High'
  },
  {
    id: 3,
    ipAddress: '78.34.156.78',
    country: 'Iran',
    attackTypes: ['File Upload', 'Path Traversal'],
    attempts: 76,
    firstSeen: '2023-12-11',
    lastSeen: '2023-12-12',
    threatLevel: 'Medium'
  },
  {
    id: 4,
    ipAddress: '102.45.67.89',
    country: 'Nigeria',
    attackTypes: ['Brute Force', 'Command Injection'],
    attempts: 65,
    firstSeen: '2023-12-09',
    lastSeen: '2023-12-12',
    threatLevel: 'Medium'
  },
  {
    id: 5,
    ipAddress: '213.98.76.54',
    country: 'Unknown',
    attackTypes: ['SQL Injection'],
    attempts: 48,
    firstSeen: '2023-12-12',
    lastSeen: '2023-12-12',
    threatLevel: 'Low'
  }
];

export const TopAttackersTable: React.FC = () => {
  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>IP Address</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Attack Types</TableHead>
            <TableHead>Attempts</TableHead>
            <TableHead>First Seen</TableHead>
            <TableHead>Last Seen</TableHead>
            <TableHead>Threat Level</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attackers.map((attacker) => (
            <TableRow key={attacker.id}>
              <TableCell className="font-medium">{attacker.ipAddress}</TableCell>
              <TableCell>{attacker.country}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {attacker.attackTypes.map((type, index) => (
                    <Badge key={index} variant="outline">{type}</Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>{attacker.attempts}</TableCell>
              <TableCell>{attacker.firstSeen}</TableCell>
              <TableCell>{attacker.lastSeen}</TableCell>
              <TableCell>
                <Badge 
                  variant={
                    attacker.threatLevel === 'High' ? 'destructive' : 
                    attacker.threatLevel === 'Medium' ? 'default' : 
                    'outline'
                  }
                >
                  {attacker.threatLevel}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
