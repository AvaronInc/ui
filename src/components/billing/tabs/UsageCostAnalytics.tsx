
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, LineChart, PieChart } from 'lucide-react';
import { Line, LineChart as RechartsLineChart, Bar, BarChart as RechartsBarChart, 
         XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
         PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

// Sample data for the charts
const monthlyBillingData = [
  { month: 'Jun', amount: 1199.95 },
  { month: 'Jul', amount: 1199.95 },
  { month: 'Aug', amount: 1249.95 },
  { month: 'Sep', amount: 1249.95 },
  { month: 'Oct', amount: 1249.95 },
  { month: 'Nov', amount: 1299.95 },
];

const breakdownData = [
  { name: 'Subscription', value: 499.95 },
  { name: 'Vertex Devices', value: 600.00 },
  { name: 'Premium Support', value: 200.00 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const UsageCostAnalytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Usage & Cost Analytics</h2>
        <p className="text-muted-foreground">
          Track and analyze your billing costs and usage trends
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Billing Trends</CardTitle>
            <CardDescription>
              View your billing history and projected costs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart
                  data={monthlyBillingData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Amount']}
                    labelFormatter={(label) => `${label} 2023`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    name="Monthly Bill" 
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }} 
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Month's Breakdown</CardTitle>
            <CardDescription>
              Detailed cost breakdown for the current billing cycle
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={breakdownData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {breakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Amount']}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Total Monthly Bill:</span>
                <span>$1,299.95</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Next Billing Date:</span>
                <span>December 1, 2023</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Costs & Overages</CardTitle>
            <CardDescription>
              Track costs beyond your standard subscription
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={[
                    { month: 'Jul', amount: 0 },
                    { month: 'Aug', amount: 50 },
                    { month: 'Sep', amount: 0 },
                    { month: 'Oct', amount: 0 },
                    { month: 'Nov', amount: 50 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Amount']}
                    labelFormatter={(label) => `${label} 2023`}
                  />
                  <Legend />
                  <Bar dataKey="amount" name="Additional Costs" fill="#82ca9d" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                Additional costs include one-time charges, service upgrades, or usage overages.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Projected Future Costs</CardTitle>
          <CardDescription>
            Estimated future costs based on your current usage patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-md p-4 text-center">
                <p className="text-sm text-muted-foreground">Next Month (Dec)</p>
                <p className="text-2xl font-bold mt-1">$1,299.95</p>
                <p className="text-xs text-muted-foreground mt-1">No change</p>
              </div>
              <div className="border rounded-md p-4 text-center">
                <p className="text-sm text-muted-foreground">3-Month Avg (Dec-Feb)</p>
                <p className="text-2xl font-bold mt-1">$1,299.95</p>
                <p className="text-xs text-muted-foreground mt-1">Stable</p>
              </div>
              <div className="border rounded-md p-4 text-center">
                <p className="text-sm text-muted-foreground">Annual Projection</p>
                <p className="text-2xl font-bold mt-1">$15,599.40</p>
                <p className="text-xs text-muted-foreground mt-1">+4.2% YoY</p>
              </div>
            </div>

            <div className="border rounded-md p-4">
              <h4 className="font-medium">Cost Optimization Suggestions</h4>
              <ul className="mt-2 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="bg-green-100 text-green-800 rounded-full p-1 mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Consider annual billing to receive a 10% discount on your subscription</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-green-100 text-green-800 rounded-full p-1 mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Bundle additional devices to qualify for volume pricing</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-end">
              <Button variant="outline">
                <BarChart className="mr-2 h-4 w-4" />
                Generate Detailed Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsageCostAnalytics;
