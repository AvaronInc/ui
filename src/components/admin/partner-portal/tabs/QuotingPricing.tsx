
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { mockQuotes } from '../mockData';
import { Plus, Copy, Download, FileCheck, Clock, Printer, Settings } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const QuotingPricing: React.FC = () => {
  return (
    <Tabs defaultValue="builder" className="space-y-4">
      <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
        <TabsTrigger value="builder" className="flex items-center gap-2">
          <Plus size={16} />
          <span>Quote Builder</span>
        </TabsTrigger>
        <TabsTrigger value="history" className="flex items-center gap-2">
          <Clock size={16} />
          <span>Quote History</span>
        </TabsTrigger>
        <TabsTrigger value="whitelabel" className="flex items-center gap-2">
          <Settings size={16} />
          <span>White Label</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="builder">
        <QuoteBuilder />
      </TabsContent>
      
      <TabsContent value="history">
        <QuoteHistory />
      </TabsContent>
      
      <TabsContent value="whitelabel">
        <WhiteLabelSettings />
      </TabsContent>
    </Tabs>
  );
};

const QuoteBuilder: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Create New Quote</h2>
        <p className="text-muted-foreground">Configure products and services for your client</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Client Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input id="clientName" placeholder="Enter client name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientEmail">Client Email</Label>
                  <Input id="clientEmail" type="email" placeholder="client@example.com" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="opportunityValue">Opportunity Value</Label>
                  <Input id="opportunityValue" placeholder="$10,000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expectedClose">Expected Close Date</Label>
                  <Input id="expectedClose" type="date" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Hardware & Products</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Hardware Model</Label>
                <RadioGroup defaultValue="x3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="x1" id="model-x1" />
                      <Label htmlFor="model-x1" className="flex-1">
                        <div className="font-medium">Security Gateway X1</div>
                        <div className="text-xs text-muted-foreground">For small businesses</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="x3" id="model-x3" />
                      <Label htmlFor="model-x3" className="flex-1">
                        <div className="font-medium">Security Gateway X3</div>
                        <div className="text-xs text-muted-foreground">For medium businesses</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="x5" id="model-x5" />
                      <Label htmlFor="model-x5" className="flex-1">
                        <div className="font-medium">Security Gateway X5</div>
                        <div className="text-xs text-muted-foreground">For enterprise</div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label>Support Tier</Label>
                <Select defaultValue="standard">
                  <SelectTrigger>
                    <SelectValue placeholder="Select support tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic (8x5)</SelectItem>
                    <SelectItem value="standard">Standard (12x5)</SelectItem>
                    <SelectItem value="premium">Premium (24x7)</SelectItem>
                    <SelectItem value="enterprise">Enterprise (24x7 + Dedicated)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Storage Add-ons (VertexVault)</Label>
                <div className="flex items-center justify-between">
                  <span className="text-sm">2 TB</span>
                  <Slider 
                    defaultValue={[2]} 
                    max={20} 
                    step={1}
                    className="w-[70%]" 
                  />
                  <span className="text-sm">20 TB</span>
                </div>
                <div className="text-sm text-muted-foreground text-right">
                  Selected: 2 TB
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>VaultID Licenses</Label>
                  <Input type="number" defaultValue="50" />
                </div>
                <div className="space-y-2">
                  <Label>Tenant Licenses</Label>
                  <Input type="number" defaultValue="1" />
                </div>
              </div>
              
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <Switch id="ai-features" />
                  <Label htmlFor="ai-features">Include AI Security Features</Label>
                </div>
                <div className="text-sm text-muted-foreground pl-7">
                  Adds AI-powered threat detection and response capabilities
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="text-lg">Quote Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Selected Items</h3>
                <ul className="mt-2 space-y-2">
                  <li className="flex justify-between text-sm">
                    <span>Security Gateway X3</span>
                    <span>$12,500</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span>Standard Support (12x5)</span>
                    <span>$3,000</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span>VertexVault Storage (2TB)</span>
                    <span>$2,000</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span>VaultID Licenses (50)</span>
                    <span>$2,500</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span>Tenant License (1)</span>
                    <span>$2,000</span>
                  </li>
                </ul>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span className="font-medium">MSRP Total</span>
                  <span className="font-medium">$22,000</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm">Partner Discount (10%)</span>
                  <span className="text-sm">-$2,200</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm">Volume Discount (5%)</span>
                  <span className="text-sm">-$1,100</span>
                </div>
                <div className="flex justify-between mt-4 text-lg font-bold">
                  <span>Final Price</span>
                  <span>$18,700</span>
                </div>
                <div className="flex justify-between mt-1 text-sm text-muted-foreground">
                  <span>Your Margin</span>
                  <span>15% ($2,805)</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button className="w-full">Generate Quote</Button>
              <Button variant="outline" className="w-full flex items-center gap-2">
                <Printer size={16} />
                <span>Print Preview</span>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

const QuoteHistory: React.FC = () => {
  const getStatusBadgeColor = (status: string) => {
    switch(status) {
      case 'Pending':
        return 'bg-amber-600/20 text-amber-500 hover:bg-amber-600/30';
      case 'Won':
        return 'bg-green-600/20 text-green-500 hover:bg-green-600/30';
      case 'Lost':
        return 'bg-red-600/20 text-red-500 hover:bg-red-600/30';
      default:
        return 'bg-gray-600/20 text-gray-500';
    }
  };
  
  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), 'MMM d, yyyy');
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Quote History</CardTitle>
        <CardDescription>View and manage your previous quotes</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Quote ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockQuotes.map(quote => (
              <TableRow key={quote.id}>
                <TableCell className="font-medium">{quote.id}</TableCell>
                <TableCell>{quote.clientName}</TableCell>
                <TableCell>{formatDate(quote.createdDate)}</TableCell>
                <TableCell>${quote.pricing.suggestedPrice.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge className={`${getStatusBadgeColor(quote.status)}`}>
                    {quote.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const WhiteLabelSettings: React.FC = () => {
  const [whitelabelEnabled, setWhitelabelEnabled] = useState(false);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">White Label Settings</CardTitle>
        <CardDescription>Configure white label options for your brand</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <Switch 
              id="whitelabel-toggle" 
              checked={whitelabelEnabled}
              onCheckedChange={setWhitelabelEnabled}
            />
            <Label htmlFor="whitelabel-toggle" className="font-medium">Enable White Label Mode</Label>
          </div>
          
          <div className="text-sm text-muted-foreground pl-7">
            White label enables you to rebrand the Avaron portal with your own company branding.
            This includes logos, colors, and custom domain. A one-time setup fee of $10,000 applies.
          </div>
        </div>
        
        {whitelabelEnabled && (
          <div className="space-y-4 border-t pt-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" placeholder="Your company name" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="primary-color">Primary Brand Color</Label>
              <div className="flex space-x-2">
                <Input id="primary-color" type="color" className="w-16 h-10" value="#6366f1" />
                <Input placeholder="#6366f1" value="#6366f1" className="flex-1" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Logo Upload</Label>
                <div className="border border-dashed rounded-md p-4 text-center cursor-pointer hover:bg-secondary/50 transition-colors">
                  <div className="flex flex-col items-center justify-center">
                    <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Upload Logo</p>
                    <p className="text-xs text-muted-foreground mt-1">SVG, PNG or JPG (max 2MB)</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Favicon Upload</Label>
                <div className="border border-dashed rounded-md p-4 text-center cursor-pointer hover:bg-secondary/50 transition-colors">
                  <div className="flex flex-col items-center justify-center">
                    <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Upload Favicon</p>
                    <p className="text-xs text-muted-foreground mt-1">ICO or PNG (max 1MB)</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="custom-domain">Custom Domain</Label>
              <Input id="custom-domain" placeholder="portal.yourcompany.com" />
              <p className="text-xs text-muted-foreground mt-1">
                You'll need to add a CNAME record pointing to avaron-whitelabel.com
              </p>
            </div>
            
            <div className="pt-2">
              <Button className="w-full md:w-auto">
                Save White Label Settings
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuotingPricing;
