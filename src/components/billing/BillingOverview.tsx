
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Calendar, CreditCard, DollarSign, BarChart, Activity, HardDrive } from 'lucide-react';
import { useBillingData } from '@/components/billing/hooks/useBillingData';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Define a more inclusive plan type that contains all possible values
type SubscriptionPlanExtended = 'SMB' | 'Enterprise' | 'Government' | 'Basic' | 'Professional' | 'Enterprise Plus';

const BillingOverview = () => {
  const { billing } = useBillingData();
  const isMobile = useIsMobile();
  
  // Dialog open states
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [planDialogOpen, setPlanDialogOpen] = useState(false);
  const [hardwareDialogOpen, setHardwareDialogOpen] = useState(false);
  const [renewalDialogOpen, setRenewalDialogOpen] = useState(false);
  const [paymentMethodDialogOpen, setPaymentMethodDialogOpen] = useState(false);

  // Payment state
  const [paymentAmount, setPaymentAmount] = useState(billing?.currentBalance || '0.00');
  const [paymentMethod, setPaymentMethod] = useState('saved');
  
  // Plan change state - updated type to match available options
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlanExtended>(billing?.subscriptionPlan || 'Enterprise');
  
  // Credit card state
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const handleMakePayment = () => {
    // In a real app, this would call an API to process the payment
    toast.success(`Payment of $${paymentAmount} processed successfully`);
    setPaymentDialogOpen(false);
  };

  const handleChangePlan = () => {
    // In a real app, this would call an API to change the plan
    toast.success(`Subscription changed to ${selectedPlan} plan`);
    setPlanDialogOpen(false);
  };

  const handleViewHardware = () => {
    // In a real app, this would navigate to a hardware detail page
    toast.info('Viewing hardware details');
    setHardwareDialogOpen(false);
  };

  const handleRenewContracts = () => {
    // In a real app, this would call an API to renew contracts
    toast.success('Contracts renewed successfully');
    setRenewalDialogOpen(false);
  };

  const handleAddPaymentMethod = () => {
    // Validate card information
    if (!cardNumber || !cardName || !cardExpiry || !cardCvc) {
      toast.error('Please fill in all card details');
      return;
    }
    
    // In a real app, this would call an API to add the payment method
    toast.success('Payment method added successfully');
    setPaymentMethodDialogOpen(false);
  };

  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Add space after every 4 digits
    let formatted = '';
    for (let i = 0; i < digits.length; i += 4) {
      formatted += digits.substring(i, i + 4) + ' ';
    }
    
    return formatted.trim();
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted.substring(0, 19)); // limit to 16 digits + 3 spaces
  };

  const handleCardExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    // Format as MM/YY
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    
    setCardExpiry(value);
  };

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${billing?.currentBalance || '0.00'}</div>
          <p className="text-xs text-muted-foreground">
            Due on {billing?.paymentDueDate || 'N/A'}
          </p>
        </CardContent>
        <CardFooter>
          <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full" size={isMobile ? "sm" : "default"}>
                Make Payment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Make a Payment</DialogTitle>
                <DialogDescription>
                  Enter the amount you want to pay and select your payment method.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="payment-amount">Payment Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5">$</span>
                    <Input
                      id="payment-amount"
                      type="number"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      className="pl-7"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="saved" id="saved" />
                    <Label htmlFor="saved">Use saved payment method</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="new" id="new" />
                    <Label htmlFor="new">Use a new payment method</Label>
                  </div>
                </RadioGroup>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setPaymentDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleMakePayment}>Process Payment</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Subscription Plan</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{billing?.subscriptionPlan || 'Enterprise'}</div>
          <p className="text-xs text-muted-foreground">
            ${billing?.monthlySubscriptionCost || '999'}/month
          </p>
        </CardContent>
        <CardFooter>
          <Dialog open={planDialogOpen} onOpenChange={setPlanDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full" size={isMobile ? "sm" : "default"}>
                Change Plan
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change Subscription Plan</DialogTitle>
                <DialogDescription>
                  Select a new subscription plan for your Avaron Vertex services.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="plan-select">Select Plan</Label>
                  <Select 
                    value={selectedPlan} 
                    onValueChange={(value: SubscriptionPlanExtended) => setSelectedPlan(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Basic">Basic ($399/month)</SelectItem>
                      <SelectItem value="Professional">Professional ($699/month)</SelectItem>
                      <SelectItem value="Enterprise">Enterprise ($999/month)</SelectItem>
                      <SelectItem value="Enterprise Plus">Enterprise Plus ($1499/month)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="rounded-md bg-muted p-4">
                  <h4 className="font-medium mb-2">{selectedPlan} Plan Features:</h4>
                  {selectedPlan === "Basic" && (
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      <li>Up to 5 Vertex units</li>
                      <li>Basic network monitoring</li>
                      <li>Email support</li>
                      <li>Standard SLA</li>
                    </ul>
                  )}
                  {selectedPlan === "Professional" && (
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      <li>Up to 15 Vertex units</li>
                      <li>Advanced monitoring</li>
                      <li>Email and phone support</li>
                      <li>Enhanced SLA</li>
                      <li>Security insights</li>
                    </ul>
                  )}
                  {selectedPlan === "Enterprise" && (
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      <li>Up to 50 Vertex units</li>
                      <li>Premium monitoring and alerts</li>
                      <li>24/7 priority support</li>
                      <li>Premium SLA</li>
                      <li>Advanced security features</li>
                      <li>Custom integrations</li>
                    </ul>
                  )}
                  {selectedPlan === "Enterprise Plus" && (
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      <li>Unlimited Vertex units</li>
                      <li>Enterprise-grade monitoring</li>
                      <li>Dedicated support manager</li>
                      <li>Custom SLA</li>
                      <li>All security features</li>
                      <li>Custom development and integrations</li>
                      <li>On-site support</li>
                    </ul>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setPlanDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleChangePlan}>Confirm Change</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Hardware Under Contract</CardTitle>
          <HardDrive className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{billing?.totalHardwareCount || '12'} devices</div>
          <p className="text-xs text-muted-foreground">
            {billing?.activeVertexCount || '8'} Vertex units + {billing?.additionalHardwareCount || '4'} add-ons
          </p>
        </CardContent>
        <CardFooter>
          <Dialog open={hardwareDialogOpen} onOpenChange={setHardwareDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full" size={isMobile ? "sm" : "default"}>
                View Hardware
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Hardware Under Contract</DialogTitle>
                <DialogDescription>
                  View details of all your Avaron Vertex hardware units
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4 max-h-[60vh] overflow-auto">
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 gap-4 p-3 bg-muted font-medium text-sm">
                    <div>Device ID</div>
                    <div>Type</div>
                    <div>Location</div>
                    <div>Status</div>
                    <div>Warranty</div>
                  </div>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={`vertex-${i}`} className="grid grid-cols-5 gap-4 p-3 text-sm border-t">
                      <div>Vertex-{1000 + i}</div>
                      <div>Vertex Core</div>
                      <div>{['HQ', 'Branch Office', 'Data Center', 'Remote Site'][i % 4]}</div>
                      <div className="flex items-center">
                        <span className={`h-2 w-2 rounded-full mr-2 ${i % 5 !== 0 ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                        {i % 5 !== 0 ? 'Active' : 'Maintenance'}
                      </div>
                      <div>Valid until {['Dec 2024', 'Jan 2025', 'Mar 2025', 'Jun 2025'][i % 4]}</div>
                    </div>
                  ))}
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={`addon-${i}`} className="grid grid-cols-5 gap-4 p-3 text-sm border-t">
                      <div>ADD-{2000 + i}</div>
                      <div>{['Sensor Array', 'Expansion Module', 'Edge Processor', 'Wireless Extender'][i]}</div>
                      <div>{['HQ', 'Branch Office', 'Data Center', 'Remote Site'][i]}</div>
                      <div className="flex items-center">
                        <span className={`h-2 w-2 rounded-full mr-2 ${i !== 1 ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                        {i !== 1 ? 'Active' : 'Maintenance'}
                      </div>
                      <div>Valid until {['Dec 2024', 'Jan 2025', 'Mar 2025', 'Jun 2025'][i]}</div>
                    </div>
                  ))}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setHardwareDialogOpen(false)}>Close</Button>
                <Button onClick={handleViewHardware}>Manage Hardware</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>

      {billing?.expiringContracts && billing.expiringContracts.length > 0 && (
        <Card className="col-span-full sm:col-span-2 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-800 dark:text-amber-400">Upcoming Renewals</CardTitle>
            <AlertCircle className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {billing.expiringContracts.slice(0, 2).map((contract, i) => (
                <li key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <span className="text-sm">{contract.name}</span>
                  <span className="text-xs text-amber-800 dark:text-amber-400 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Expires {contract.expirationDate}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Dialog open={renewalDialogOpen} onOpenChange={setRenewalDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full border-amber-300 dark:border-amber-700" size={isMobile ? "sm" : "default"}>
                  Renew Contracts
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Renew Expiring Contracts</DialogTitle>
                  <DialogDescription>
                    Select the contracts you want to renew and confirm your renewal.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  {billing.expiringContracts.map((contract, i) => {
                    // Define mock renewal cost for each contract
                    const mockRenewalCost = i === 0 ? 599 : 599;
                    
                    return (
                      <div key={i} className="flex items-center space-x-2">
                        <input type="checkbox" id={`contract-${i}`} className="rounded" defaultChecked />
                        <Label htmlFor={`contract-${i}`}>
                          <div className="flex flex-col">
                            <span>{contract.name}</span>
                            <span className="text-xs text-muted-foreground">Expires {contract.expirationDate}</span>
                          </div>
                        </Label>
                        <span className="ml-auto font-medium">${mockRenewalCost}</span>
                      </div>
                    );
                  })}
                  <div className="pt-4 border-t">
                    <div className="flex justify-between">
                      <span className="font-medium">Total Renewal Cost:</span>
                      <span className="font-bold">$1,198.00</span>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setRenewalDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleRenewContracts}>Confirm Renewal</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      )}

      <Card className="col-span-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Add Payment Method</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="py-4">
          <p className="text-sm text-muted-foreground">
            Configure your payment methods to enable automatic billing and simplify your payment process.
          </p>
        </CardContent>
        <CardFooter>
          <Dialog open={paymentMethodDialogOpen} onOpenChange={setPaymentMethodDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full" size={isMobile ? "sm" : "default"}>
                <CreditCard className="mr-2 h-4 w-4" /> {isMobile ? "Add Payment" : "Add Payment Method"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Payment Method</DialogTitle>
                <DialogDescription>
                  Enter your credit card information to add a new payment method.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="card-name">Cardholder Name</Label>
                  <Input 
                    id="card-name"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Name as it appears on card"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input 
                    id="card-number"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="0000 0000 0000 0000"
                    maxLength={19}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input 
                      id="expiry"
                      value={cardExpiry}
                      onChange={handleCardExpiryChange}
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input 
                      id="cvc"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').substring(0, 3))}
                      placeholder="123"
                      maxLength={3}
                      type="password"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <input type="checkbox" id="save-default" className="rounded" defaultChecked />
                  <Label htmlFor="save-default">Set as default payment method</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setPaymentMethodDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddPaymentMethod}>Add Payment Method</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BillingOverview;
