
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Mail, Phone, FileText, ExternalLink, ChevronDown, Clock } from 'lucide-react';

// Sample support tickets
const supportTickets = [
  {
    id: 'BILL-1234',
    subject: 'Question about recent invoice',
    date: '2023-10-15',
    status: 'open',
    lastUpdate: '2 days ago'
  },
  {
    id: 'BILL-1203',
    subject: 'Request for itemized billing statement',
    date: '2023-09-28',
    status: 'closed',
    lastUpdate: '3 weeks ago'
  },
  {
    id: 'BILL-1184',
    subject: 'Change billing cycle to quarterly',
    date: '2023-09-05',
    status: 'resolved',
    lastUpdate: '1 month ago'
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'open':
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Open</Badge>;
    case 'closed':
      return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Closed</Badge>;
    case 'resolved':
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Resolved</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const BillingSupport = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Support & Billing Communication</h2>
        <p className="text-muted-foreground">
          Contact our billing team and track your support requests
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Support Tickets</CardTitle>
            <CardDescription>
              View and track your billing support requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {supportTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">{ticket.id}</TableCell>
                      <TableCell>{ticket.subject}</TableCell>
                      <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {ticket.lastUpdate}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {supportTickets.length === 0 && (
              <div className="text-center py-6 text-muted-foreground">
                No support tickets found
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button variant="outline" className="w-full">
              View All Tickets
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Billing Support</CardTitle>
            <CardDescription>
              Get assistance with your billing questions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4 p-3 border rounded-md">
                <MessageCircle className="h-5 w-5 text-blue-600" />
                <div>
                  <h4 className="font-medium">Live Chat</h4>
                  <p className="text-sm text-muted-foreground">
                    Chat with a billing specialist
                  </p>
                </div>
                <div className="ml-auto">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Available</Badge>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-3 border rounded-md">
                <Mail className="h-5 w-5 text-blue-600" />
                <div>
                  <h4 className="font-medium">Email Support</h4>
                  <p className="text-sm text-muted-foreground">
                    billing@cybernest.com
                  </p>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">
                  Email Us
                </Button>
              </div>
              
              <div className="flex items-center space-x-4 p-3 border rounded-md">
                <Phone className="h-5 w-5 text-blue-600" />
                <div>
                  <h4 className="font-medium">Phone Support</h4>
                  <p className="text-sm text-muted-foreground">
                    Mon-Fri, 9am-5pm ET
                  </p>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">
                  Request Call
                </Button>
              </div>
            </div>

            <div className="pt-4">
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Send a message
              </label>
              <Textarea
                id="message"
                placeholder="Type your billing question here..."
                className="resize-none"
                rows={4}
              />
              <Button className="mt-4 w-full">
                <MessageCircle className="mr-2 h-4 w-4" />
                Submit Question
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Billing Documents & Agreements</CardTitle>
          <CardDescription>
            Access important documents related to your billing and services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="border rounded-md p-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Service Level Agreement</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Last updated: September, 2023
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <Button variant="outline" size="sm" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  View SLA
                </Button>
              </div>
            </div>

            <div className="border rounded-md p-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Terms of Service</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Last updated: August, 2023
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <Button variant="outline" size="sm" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  View Terms
                </Button>
              </div>
            </div>

            <div className="border rounded-md p-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Privacy Policy</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Last updated: July, 2023
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <Button variant="outline" size="sm" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  View Policy
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t pt-6">
            <h4 className="font-medium mb-4">FAQ</h4>
            <div className="space-y-3">
              <div className="border rounded-md p-3">
                <button className="w-full flex justify-between items-center font-medium">
                  <span>How can I change my billing cycle?</span>
                  <ChevronDown className="h-5 w-5" />
                </button>
              </div>
              <div className="border rounded-md p-3">
                <button className="w-full flex justify-between items-center font-medium">
                  <span>What payment methods do you accept?</span>
                  <ChevronDown className="h-5 w-5" />
                </button>
              </div>
              <div className="border rounded-md p-3">
                <button className="w-full flex justify-between items-center font-medium">
                  <span>How do I request a refund?</span>
                  <ChevronDown className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="text-center mt-4">
              <Button variant="link">
                View All FAQ <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingSupport;
