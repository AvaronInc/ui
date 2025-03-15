
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar, FileText, AlertCircle, MoreHorizontal } from 'lucide-react';

// Sample data (in a real app, this would come from the API)
const contracts = [
  {
    id: '001',
    deviceType: 'NEST N5000',
    serialNumber: 'NEST-N5K-78945612',
    location: 'Main Office, New York',
    startDate: '2023-05-15',
    endDate: '2024-05-14',
    monthlyCost: 249.99,
    term: 'Annual',
    status: 'active'
  },
  {
    id: '002',
    deviceType: 'NEST N3000',
    serialNumber: 'NEST-N3K-65478932',
    location: 'Branch Office, Seattle',
    startDate: '2023-02-10',
    endDate: '2024-02-09',
    monthlyCost: 149.99,
    term: 'Annual',
    status: 'active'
  },
  {
    id: '003',
    deviceType: 'NEST N1000',
    serialNumber: 'NEST-N1K-12369854',
    location: 'Remote Office, Denver',
    startDate: '2023-08-22',
    endDate: '2023-11-21',
    monthlyCost: 99.99,
    term: 'Quarterly',
    status: 'expiring'
  },
  {
    id: '004',
    deviceType: 'SD-WAN Controller',
    serialNumber: 'SDWAN-CTL-98765432',
    location: 'Data Center, Dallas',
    startDate: '2023-01-05',
    endDate: '2024-01-04',
    monthlyCost: 349.99,
    term: 'Annual',
    status: 'active'
  },
  {
    id: '005',
    deviceType: 'Security Gateway',
    serialNumber: 'SG-ENT-45678901',
    location: 'Main Office, New York',
    startDate: '2023-06-30',
    endDate: '2023-12-29',
    monthlyCost: 199.99,
    term: 'Bi-Annual',
    status: 'expiring'
  }
];

const HardwareContracts = () => {
  // Calculate days remaining for each contract
  const getStatusBadge = (status: string, endDate: string) => {
    const daysRemaining = Math.ceil((new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    
    if (status === 'expiring' || daysRemaining < 30) {
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Expiring Soon</Badge>;
    }
    return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Hardware Contracts & Service Agreements</h2>
        <p className="text-muted-foreground">
          Manage your devices, services, and contract agreements
        </p>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/50">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Active Contracts</CardTitle>
              <CardDescription>
                All NESTS & services currently under contract
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button size="sm">
                Add New Device
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Device Type</TableHead>
                  <TableHead>Serial Number</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Monthly Cost</TableHead>
                  <TableHead>Term</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contracts.map((contract) => (
                  <TableRow key={contract.id}>
                    <TableCell className="font-medium">{contract.deviceType}</TableCell>
                    <TableCell>{contract.serialNumber}</TableCell>
                    <TableCell>{contract.location}</TableCell>
                    <TableCell>{new Date(contract.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(contract.endDate).toLocaleDateString()}</TableCell>
                    <TableCell>${contract.monthlyCost.toFixed(2)}</TableCell>
                    <TableCell>{contract.term}</TableCell>
                    <TableCell>
                      {getStatusBadge(contract.status, contract.endDate)}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contract Renewal Options</CardTitle>
            <CardDescription>
              Manage upcoming contract renewals and term extensions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border p-4 bg-amber-50/50">
              <div className="flex items-start space-x-4">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-900">Contracts Expiring Soon</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    You have 2 contracts that will expire in the next 30 days. Review and renew them to avoid service interruptions.
                  </p>
                  <Button variant="outline" className="mt-3 border-amber-300">
                    Review Expiring Contracts
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-md border p-4">
              <h4 className="font-medium">Bulk Renewal Options</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Save by renewing multiple contracts with the same end date
              </p>
              <Button variant="outline" className="mt-3">
                <Calendar className="mr-2 h-4 w-4" />
                Align Contract End Dates
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contract Terms</CardTitle>
            <CardDescription>
              Details about contract terms and conditions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Standard Terms</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  All hardware contracts include our standard support package, software updates, and warranty coverage.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium">Early Termination</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Contracts terminated before their end date may be subject to early termination fees.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium">Automatic Renewals</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Contracts will automatically renew unless cancelled 30 days before the end date.
                </p>
              </div>
              
              <Button variant="outline" className="mt-2">
                <FileText className="mr-2 h-4 w-4" />
                View Full Terms & Conditions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HardwareContracts;
