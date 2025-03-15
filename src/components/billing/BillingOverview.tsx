
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Calendar, CreditCard, DollarSign, BarChart, Activity } from 'lucide-react';
import { useBillingData } from '@/components/billing/hooks/useBillingData';

const BillingOverview = () => {
  const { billing } = useBillingData();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
          <Button variant="outline" className="w-full">
            Make Payment
          </Button>
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
          <Button variant="outline" className="w-full">
            Change Plan
          </Button>
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
            {billing?.activeNestCount || '8'} NEST units + {billing?.additionalHardwareCount || '4'} add-ons
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View Hardware
          </Button>
        </CardFooter>
      </Card>

      {billing?.expiringContracts && billing.expiringContracts.length > 0 && (
        <Card className="col-span-full md:col-span-2 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-800 dark:text-amber-400">Upcoming Renewals</CardTitle>
            <AlertCircle className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {billing.expiringContracts.slice(0, 2).map((contract, i) => (
                <li key={i} className="flex justify-between items-center">
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
            <Button variant="outline" className="w-full border-amber-300 dark:border-amber-700">
              Renew Contracts
            </Button>
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
          <Button className="w-full">
            <CreditCard className="mr-2 h-4 w-4" /> Add Payment Method
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BillingOverview;
