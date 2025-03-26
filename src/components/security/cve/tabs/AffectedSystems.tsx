
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Search, Filter } from 'lucide-react';

type AffectedSystem = {
  id: string;
  systemName: string;
  cveId: string;
  cvssScore: number;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  patchAvailable: boolean;
  status: 'Patched' | 'Pending' | 'Ignored';
};

const mockAffectedSystems: AffectedSystem[] = [
  {
    id: '1',
    systemName: 'Web Server 01',
    cveId: 'CVE-2023-45178',
    cvssScore: 9.8,
    severity: 'Critical',
    patchAvailable: true,
    status: 'Pending'
  },
  {
    id: '2',
    systemName: 'API Gateway',
    cveId: 'CVE-2023-38408',
    cvssScore: 8.2,
    severity: 'High',
    patchAvailable: true,
    status: 'Patched'
  },
  {
    id: '3',
    systemName: 'Database Server',
    cveId: 'CVE-2023-29200',
    cvssScore: 6.5,
    severity: 'Medium',
    patchAvailable: false,
    status: 'Pending'
  },
  {
    id: '4',
    systemName: 'Load Balancer',
    cveId: 'CVE-2022-87654',
    cvssScore: 8.7,
    severity: 'High',
    patchAvailable: true,
    status: 'Ignored'
  },
  {
    id: '5',
    systemName: 'Auth Service',
    cveId: 'CVE-2023-12345',
    cvssScore: 4.3,
    severity: 'Low',
    patchAvailable: true,
    status: 'Patched'
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'Critical':
      return 'bg-red-500 hover:bg-red-600';
    case 'High':
      return 'bg-orange-500 hover:bg-orange-600';
    case 'Medium':
      return 'bg-yellow-500 hover:bg-yellow-600';
    case 'Low':
      return 'bg-blue-500 hover:bg-blue-600';
    default:
      return 'bg-gray-500 hover:bg-gray-600';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Patched':
      return 'bg-green-500 hover:bg-green-600';
    case 'Pending':
      return 'bg-orange-500 hover:bg-orange-600';
    case 'Ignored':
      return 'bg-gray-500 hover:bg-gray-600';
    default:
      return 'bg-gray-500 hover:bg-gray-600';
  }
};

const AffectedSystems = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search systems or CVEs..." className="pl-8" />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Site" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sites</SelectItem>
              <SelectItem value="datacenter1">Data Center 1</SelectItem>
              <SelectItem value="datacenter2">Data Center 2</SelectItem>
              <SelectItem value="cloud">Cloud</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="patched">Patched</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="ignored">Ignored</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="CVSS Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Scores</SelectItem>
              <SelectItem value="critical">9.0-10.0</SelectItem>
              <SelectItem value="high">7.0-8.9</SelectItem>
              <SelectItem value="medium">4.0-6.9</SelectItem>
              <SelectItem value="low">0.1-3.9</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Affected Systems</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>System Name</TableHead>
                <TableHead>CVE ID</TableHead>
                <TableHead>CVSS Score</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Patch Available</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAffectedSystems.map((system) => (
                <TableRow key={system.id}>
                  <TableCell className="font-medium">{system.systemName}</TableCell>
                  <TableCell>
                    <a href={`https://nvd.nist.gov/vuln/detail/${system.cveId}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      {system.cveId}
                    </a>
                  </TableCell>
                  <TableCell>{system.cvssScore}</TableCell>
                  <TableCell>
                    <Badge className={getSeverityColor(system.severity)}>
                      {system.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {system.patchAvailable ? (
                      <span className="flex items-center gap-1 text-green-500">
                        <AlertCircle className="h-4 w-4" />
                        Yes
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-500">
                        <AlertCircle className="h-4 w-4" />
                        No
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(system.status)}>
                      {system.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AffectedSystems;
