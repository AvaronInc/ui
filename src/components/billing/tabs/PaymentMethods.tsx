
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, Info, Lock, Shield, Trash2 } from 'lucide-react';

const PaymentMethods = () => {
  const [enableAutoPay, setEnableAutoPay] = useState(true);
  const [enableCrypto, setEnableCrypto] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Payment Methods & Preferences</h2>
        <p className="text-muted-foreground">
          Manage your payment methods and billing preferences
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Payment Methods</CardTitle>
            <CardDescription>
              Add, edit, or remove payment methods for your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border p-4 relative">
              <div className="absolute right-2 top-2 flex space-x-1">
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Info className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 p-2 rounded">
                  <CreditCard className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Visa ending in 4242</div>
                  <div className="text-sm text-muted-foreground">Expires 12/2025</div>
                  <div className="mt-1">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-50 text-green-700 border-green-200">
                      Default
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-md border p-4 relative">
              <div className="absolute right-2 top-2 flex space-x-1">
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Info className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 p-2 rounded">
                  <CreditCard className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <div className="font-medium">ACH Direct Debit</div>
                  <div className="text-sm text-muted-foreground">Account ending in 7890</div>
                </div>
              </div>
            </div>

            <Button>
              <CreditCard className="mr-2 h-4 w-4" /> Add New Payment Method
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing Preferences</CardTitle>
              <CardDescription>
                Configure your default payment method and auto-pay settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default-payment">Default Payment Method</Label>
                <Select defaultValue="visa-4242">
                  <SelectTrigger id="default-payment">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visa-4242">Visa ending in 4242</SelectItem>
                    <SelectItem value="ach-7890">ACH ending in 7890</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="auto-pay" className="flex flex-col space-y-1">
                  <span>Enable Auto-Pay</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Automatically charge your default payment method
                  </span>
                </Label>
                <Switch
                  id="auto-pay"
                  checked={enableAutoPay}
                  onCheckedChange={setEnableAutoPay}
                />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="crypto-payments" className="flex flex-col space-y-1">
                  <span>Enable Cryptocurrency Payments</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Allow payments via Bitcoin, Ethereum, etc.
                  </span>
                </Label>
                <Switch
                  id="crypto-payments"
                  checked={enableCrypto}
                  onCheckedChange={setEnableCrypto}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Information</CardTitle>
              <CardDescription>
                How we protect your payment information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Lock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">Tokenization</h4>
                    <p className="text-sm text-muted-foreground">
                      Your payment details are tokenized and never stored directly in our database.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">End-to-End Encryption</h4>
                    <p className="text-sm text-muted-foreground">
                      All transactions are encrypted using industry-standard TLS/SSL protocols.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
