
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockDeals } from '../mockData';
import { Plus, Calendar, Building, Clock, Shield } from 'lucide-react';
import { format, parseISO, differenceInDays } from 'date-fns';

const DealRegistration: React.FC = () => {
  const [showNewDealForm, setShowNewDealForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Deal Registration</h2>
          <p className="text-muted-foreground">Register new opportunities and view existing deals</p>
        </div>
        <Button 
          onClick={() => setShowNewDealForm(!showNewDealForm)}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          <span>Register New Deal</span>
        </Button>
      </div>

      {showNewDealForm && <NewDealForm onCancel={() => setShowNewDealForm(false)} />}
      
      <DealsList />
    </div>
  );
};

const NewDealForm: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const products = [
    { id: 'smb', name: 'SMB' },
    { id: 'mid', name: 'Mid-Market' },
    { id: 'enterprise', name: 'Enterprise' },
    { id: 'ai', name: 'AI Security' },
    { id: 'vaultId', name: 'VaultID' },
    { id: 'nestvault', name: 'NestVault Storage' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Register New Deal</CardTitle>
        <CardDescription>Register a new opportunity to receive 90-day protection</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name *</Label>
              <Input id="businessName" placeholder="Enter business name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry *</Label>
              <Input id="industry" placeholder="e.g. Healthcare, Finance, etc." />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactName">Contact Name *</Label>
              <Input id="contactName" placeholder="Enter contact name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email *</Label>
              <Input id="contactEmail" type="email" placeholder="contact@example.com" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="estimatedSize">Estimated User Count *</Label>
            <Input id="estimatedSize" type="number" placeholder="e.g. 50" />
          </div>
          
          <div className="space-y-2">
            <Label>Products of Interest *</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {products.map(product => (
                <div key={product.id} className="flex items-center space-x-2">
                  <Checkbox id={product.id} />
                  <Label htmlFor={product.id} className="text-sm font-normal">{product.name}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea 
              id="notes" 
              placeholder="Provide any additional details about this opportunity..."
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-2">
            <Button variant="outline" onClick={onCancel}>Cancel</Button>
            <Button>Submit Deal</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

const DealsList: React.FC = () => {
  const getStatusBadgeColor = (status: string) => {
    switch(status) {
      case 'Protected':
        return 'bg-green-600/20 text-green-500 hover:bg-green-600/30';
      case 'Expired':
        return 'bg-gray-600/20 text-gray-500 hover:bg-gray-600/30';
      case 'Converted':
        return 'bg-blue-600/20 text-blue-500 hover:bg-blue-600/30';
      case 'Disputed':
        return 'bg-red-600/20 text-red-500 hover:bg-red-600/30';
      default:
        return 'bg-gray-600/20 text-gray-500';
    }
  };
  
  const calculateDaysRemaining = (expirationDate: string) => {
    const expDate = parseISO(expirationDate);
    const today = new Date();
    return differenceInDays(expDate, today);
  };
  
  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), 'MMM d, yyyy');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Registered Deals</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Business</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Registration Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Protection</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockDeals.map(deal => (
              <TableRow key={deal.id} className="cursor-pointer hover:bg-secondary/50">
                <TableCell className="font-medium">{deal.businessName}</TableCell>
                <TableCell>{deal.industry}</TableCell>
                <TableCell>{deal.estimatedSize} users</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {deal.requestedProducts.slice(0, 2).map((product, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {product}
                      </Badge>
                    ))}
                    {deal.requestedProducts.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{deal.requestedProducts.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                    <span>{formatDate(deal.registrationDate)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={`${getStatusBadgeColor(deal.status)}`}>
                    {deal.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {deal.status === 'Protected' && (
                    <div className="flex items-center text-sm">
                      <Shield className="h-3.5 w-3.5 mr-1.5 text-green-500" />
                      <span>{calculateDaysRemaining(deal.expirationDate)} days left</span>
                    </div>
                  )}
                  {deal.status !== 'Protected' && (
                    <span className="text-muted-foreground text-sm">—</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DealRegistration;
