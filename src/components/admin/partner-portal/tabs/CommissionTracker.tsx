
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockCommissions, mockPartnerInfo } from '../mockData';
import { Download, FileText, DollarSign, TrendingUp, Filter } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const CommissionTracker: React.FC = () => {
  const [timeframe, setTimeframe] = useState('thisMonth');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold">Commission Tracker</h2>
          <p className="text-muted-foreground">Track and manage your commission earnings</p>
        </div>
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          <span>Export Statement</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <CommissionMetricCard 
          title="This Month"
          value={calculateCommissions(mockCommissions, 'thisMonth')}
          previousValue={calculateCommissions(mockCommissions, 'lastMonth')}
          icon={<DollarSign className="h-5 w-5 text-green-500" />}
        />
        <CommissionMetricCard 
          title="Quarter to Date"
          value={calculateCommissions(mockCommissions, 'quarter')}
          previousValue={calculateCommissions(mockCommissions, 'lastQuarter')}
          icon={<TrendingUp className="h-5 w-5 text-purple-500" />}
        />
        <CommissionMetricCard 
          title="Year to Date"
          value={mockPartnerInfo.metrics.commissionPaidYTD}
          previousValue={mockPartnerInfo.metrics.commissionPaidYTD * 0.8}
          icon={<FileText className="h-5 w-5 text-blue-500" />}
        />
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-sm font-medium text-muted-foreground">Commission Rate</h3>
            <p className="text-2xl font-bold mt-1">
              {mockPartnerInfo.tier === 'Registered' ? '10%' : 
               mockPartnerInfo.tier === 'Certified' ? '15%' : 
               mockPartnerInfo.tier === 'Premier' ? '20%' : '25%'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Based on {mockPartnerInfo.tier} tier</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="commissions" className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
          <TabsTrigger value="commissions">Commissions</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
        </TabsList>
        
        <TabsContent value="commissions">
          <CommissionsTable timeframe={timeframe} setTimeframe={setTimeframe} />
        </TabsContent>
        
        <TabsContent value="payments">
          <PaymentsHistory />
        </TabsContent>
        
        <TabsContent value="referrals">
          <ReferralProgram />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper function to calculate commissions for different timeframes
const calculateCommissions = (commissions: typeof mockCommissions, timeframe: string) => {
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();
  
  let filteredCommissions = [];
  
  switch(timeframe) {
    case 'thisMonth':
      filteredCommissions = commissions.filter(comm => {
        const date = new Date(comm.period);
        return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
      });
      break;
    case 'lastMonth':
      filteredCommissions = commissions.filter(comm => {
        const date = new Date(comm.period);
        const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
        const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear;
        return date.getMonth() === lastMonth && date.getFullYear() === lastMonthYear;
      });
      break;
    case 'quarter':
      const currentQuarter = Math.floor(thisMonth / 3);
      filteredCommissions = commissions.filter(comm => {
        const date = new Date(comm.period);
        const commQuarter = Math.floor(date.getMonth() / 3);
        return commQuarter === currentQuarter && date.getFullYear() === thisYear;
      });
      break;
    case 'lastQuarter':
      const lastQuarter = thisMonth < 3 ? 3 : Math.floor((thisMonth - 3) / 3);
      const lastQuarterYear = thisMonth < 3 ? thisYear - 1 : thisYear;
      filteredCommissions = commissions.filter(comm => {
        const date = new Date(comm.period);
        const commQuarter = Math.floor(date.getMonth() / 3);
        return commQuarter === lastQuarter && date.getFullYear() === lastQuarterYear;
      });
      break;
    default:
      filteredCommissions = commissions;
  }
  
  return filteredCommissions.reduce((sum, comm) => sum + comm.commissionAmount, 0);
};

const CommissionMetricCard: React.FC<{ 
  title: string; 
  value: number;
  previousValue: number;
  icon: React.ReactNode;
}> = ({ 
  title, 
  value,
  previousValue,
  icon
}) => {
  const percentChange = previousValue > 0 
    ? Math.round(((value - previousValue) / previousValue) * 100) 
    : 0;
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <p className="text-2xl font-bold mt-1">${value.toLocaleString()}</p>
          </div>
          <div className="bg-secondary/50 p-2 h-fit rounded-md">
            {icon}
          </div>
        </div>
        <div className="flex items-center mt-1">
          {percentChange !== 0 && (
            <Badge 
              className={`text-xs ${
                percentChange > 0 
                  ? 'bg-green-600/20 text-green-500' 
                  : 'bg-red-600/20 text-red-500'
              }`}
            >
              {percentChange > 0 ? '+' : ''}{percentChange}%
            </Badge>
          )}
          <p className="text-xs text-muted-foreground ml-1">vs previous period</p>
        </div>
      </CardContent>
    </Card>
  );
};

const CommissionsTable: React.FC<{ 
  timeframe: string;
  setTimeframe: React.Dispatch<React.SetStateAction<string>>;
}> = ({ 
  timeframe,
  setTimeframe
}) => {
  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), 'MMM d, yyyy');
  };
  
  const getStatusBadgeColor = (status: string) => {
    switch(status) {
      case 'Paid':
        return 'bg-green-600/20 text-green-500 hover:bg-green-600/30';
      case 'Pending':
        return 'bg-amber-600/20 text-amber-500 hover:bg-amber-600/30';
      default:
        return 'bg-gray-600/20 text-gray-500';
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <CardTitle>Commission Details</CardTitle>
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="thisMonth">This Month</SelectItem>
                <SelectItem value="lastMonth">Last Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Period</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Product Type</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Rate</TableHead>
              <TableHead>Commission</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCommissions.map(commission => (
              <TableRow key={commission.id}>
                <TableCell>{commission.period}</TableCell>
                <TableCell className="font-medium">{commission.clientName}</TableCell>
                <TableCell>{commission.productType}</TableCell>
                <TableCell>${commission.revenue.toLocaleString()}</TableCell>
                <TableCell>{commission.commissionRate}%</TableCell>
                <TableCell>${commission.commissionAmount.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge className={`${getStatusBadgeColor(commission.status)}`}>
                    {commission.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const PaymentsHistory: React.FC = () => {
  const payments = [
    {
      id: 1,
      period: 'July 2023',
      amount: 18375,
      date: '2023-08-15T00:00:00Z',
      method: 'Direct Deposit',
      reference: 'PMT-20230815-001'
    },
    {
      id: 2,
      period: 'June 2023',
      amount: 14350,
      date: '2023-07-15T00:00:00Z',
      method: 'Direct Deposit',
      reference: 'PMT-20230715-003'
    },
    {
      id: 3,
      period: 'May 2023',
      amount: 12280,
      date: '2023-06-15T00:00:00Z',
      method: 'Direct Deposit',
      reference: 'PMT-20230615-007'
    }
  ];
  
  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), 'MMM d, yyyy');
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
        <CardDescription>History of commission payments to your account</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Period</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead>Receipt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map(payment => (
              <TableRow key={payment.id}>
                <TableCell>{payment.period}</TableCell>
                <TableCell>{formatDate(payment.date)}</TableCell>
                <TableCell className="font-medium">${payment.amount.toLocaleString()}</TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell className="font-mono text-xs">{payment.reference}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="h-8 flex items-center gap-1">
                    <FileText className="h-3.5 w-3.5" />
                    <span>PDF</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const ReferralProgram: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Partner Referral Program</CardTitle>
          <CardDescription>Earn additional commission by referring new partners</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 border rounded-lg flex flex-col items-center">
                <div className="bg-primary/20 p-2 rounded-full mb-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <h4 className="text-sm font-medium">Refer a Partner</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Share your unique referral link with potential partners
                </p>
              </div>
              <div className="p-4 border rounded-lg flex flex-col items-center">
                <div className="bg-primary/20 p-2 rounded-full mb-2">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <h4 className="text-sm font-medium">They Sign Up</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  They register and are approved as an Avaron partner
                </p>
              </div>
              <div className="p-4 border rounded-lg flex flex-col items-center">
                <div className="bg-primary/20 p-2 rounded-full mb-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <h4 className="text-sm font-medium">Earn Bonus</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Receive 5% of their commissions for the first year
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Your Referral Link</h3>
            <div className="flex space-x-2">
              <Input value="https://partners.avaron.com/ref/secure-msp-solutions" readOnly />
              <Button>Copy</Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Invite by Email</h3>
            <div className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Contact name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="contact@example.com" />
                </div>
              </div>
              <div>
                <Label htmlFor="message">Personal Message (Optional)</Label>
                <Input id="message" placeholder="Add a personal message..." />
              </div>
              <Button className="w-full md:w-auto">Send Invitation</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Referral Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Total Referrals</span>
              <span className="text-sm">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Pending Approvals</span>
              <span className="text-sm">1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Active Partners</span>
              <span className="text-sm">2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Bonus YTD</span>
              <span className="text-sm">$4,250</span>
            </div>
          </div>
          
          <div className="pt-2 border-t">
            <h3 className="text-sm font-medium mb-2">Recent Referrals</h3>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium">TechSecure Partners</p>
                    <p className="text-xs text-muted-foreground">Registered: July 15, 2023</p>
                  </div>
                  <Badge>Active</Badge>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Bonus Earned:</span>
                  <span>$2,100</span>
                </div>
              </div>
              
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium">Network Security Group</p>
                    <p className="text-xs text-muted-foreground">Registered: May 3, 2023</p>
                  </div>
                  <Badge>Active</Badge>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Bonus Earned:</span>
                  <span>$2,150</span>
                </div>
              </div>
              
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium">DataShield Solutions</p>
                    <p className="text-xs text-muted-foreground">Invited: Aug 28, 2023</p>
                  </div>
                  <Badge variant="outline">Pending</Badge>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Status:</span>
                  <span>Awaiting Registration</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommissionTracker;
