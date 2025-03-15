
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Download, FileDown, Filter, CheckSquare } from 'lucide-react';

// Sample invoice data
const invoices = [
  {
    id: 'INV-20231001',
    date: '2023-10-01',
    amount: 1249.95,
    status: 'paid',
    items: 'Monthly subscription, 5 NEST devices, Support package',
    paymentMethod: 'Visa ending in 4242'
  },
  {
    id: 'INV-20230901',
    date: '2023-09-01',
    amount: 1249.95,
    status: 'paid',
    items: 'Monthly subscription, 5 NEST devices, Support package',
    paymentMethod: 'Visa ending in 4242'
  },
  {
    id: 'INV-20230801',
    date: '2023-08-01',
    amount: 1249.95,
    status: 'paid',
    items: 'Monthly subscription, 5 NEST devices, Support package',
    paymentMethod: 'Visa ending in 4242'
  },
  {
    id: 'INV-20230701',
    date: '2023-07-01',
    amount: 1199.95,
    status: 'paid',
    items: 'Monthly subscription, 5 NEST devices',
    paymentMethod: 'ACH ending in 7890'
  },
  {
    id: 'INV-20230601',
    date: '2023-06-01',
    amount: 1199.95,
    status: 'paid',
    items: 'Monthly subscription, 5 NEST devices',
    paymentMethod: 'ACH ending in 7890'
  },
  {
    id: 'INV-20231101',
    date: '2023-11-01',
    amount: 1299.95,
    status: 'unpaid',
    items: 'Monthly subscription, 5 NEST devices, Premium support upgrade',
    dueDate: '2023-11-15'
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'paid':
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Paid</Badge>;
    case 'unpaid':
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Unpaid</Badge>;
    case 'overdue':
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Overdue</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredInvoices = invoices.filter(invoice => 
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.items.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Invoices & Billing Statements</h2>
        <p className="text-muted-foreground">
          View and download your billing history and payment records
        </p>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/50">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>
                Your complete invoice and payment history
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search invoices..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                    <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    <TableCell className="max-w-xs truncate">{invoice.items}</TableCell>
                    <TableCell>{invoice.paymentMethod || '-'}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <FileDown className="mr-2 h-4 w-4" />
                        PDF
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
            <CardTitle>Current Billing Cycle</CardTitle>
            <CardDescription>
              Details for the current billing period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-medium">Next Invoice Date</span>
                <span>December 1, 2023</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-medium">Estimated Amount</span>
                <span>$1,299.95</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-medium">Billing Cycle</span>
                <span>Monthly</span>
              </div>
              <div className="flex justify-between items-center pb-2">
                <span className="font-medium">Default Payment Method</span>
                <span>Visa ending in 4242</span>
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                <CheckSquare className="mr-2 h-4 w-4" />
                Pay Now
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Billing Support</CardTitle>
            <CardDescription>
              Get help with your invoices and payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <h4 className="font-medium">Invoice Disputes</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  If you believe there's an error on your invoice, please submit a dispute for review.
                </p>
                <Button variant="outline" className="mt-3">
                  Submit Dispute
                </Button>
              </div>
              
              <div className="rounded-md border p-4">
                <h4 className="font-medium">Export Financial Reports</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Download comprehensive financial reports for your accounting team.
                </p>
                <Button variant="outline" className="mt-3">
                  <Download className="mr-2 h-4 w-4" />
                  Export Reports
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Invoices;
