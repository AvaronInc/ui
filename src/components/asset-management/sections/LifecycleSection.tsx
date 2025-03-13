
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar, TrendingDown, Calculator, BrainCircuit, Clock, RefreshCw } from 'lucide-react';

const LifecycleSection = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <Calculator className="h-5 w-5 mr-2 text-primary" />
              <CardTitle className="text-base">Depreciation Overview</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Total Assets Value</span>
                  <span className="text-sm font-medium">$1,248,532</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Current Book Value</span>
                  <span className="text-sm font-medium">$876,245</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Accumulated Depreciation</span>
                  <span className="text-sm font-medium">$372,287</span>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-2">Depreciation Rate</div>
                <div className="flex items-center space-x-3">
                  <Slider defaultValue={[25]} className="flex-1" max={50} step={1} />
                  <span className="text-sm font-medium">25%</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">Straight-line depreciation rate per year</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <TrendingDown className="h-5 w-5 mr-2 text-primary" />
              <CardTitle className="text-base">Assets Approaching EOL</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <div className="text-sm text-muted-foreground mb-4">Assets reaching end-of-life this year</div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Workstations</span>
                <span className="font-medium">18</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Servers</span>
                <span className="font-medium">6</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Networking</span>
                <span className="font-medium">5</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Other</span>
                <span className="font-medium">3</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <BrainCircuit className="h-5 w-5 mr-2 text-primary" />
              <CardTitle className="text-base">Recommended Replacements</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <div className="text-sm text-muted-foreground mb-4">AI-suggested immediate replacements</div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span>Critical Priority</span>
                <Badge variant="destructive">5</Badge>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>High Priority</span>
                <Badge variant="warning">9</Badge>
              </div>
              <div className="text-xs text-muted-foreground mt-4">
                Based on age, performance metrics, and failure prediction
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <RefreshCw className="h-5 w-5 mr-2 text-primary" />
              <CardTitle className="text-lg">Lifecycle Planning</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="workstation">Workstations</SelectItem>
                  <SelectItem value="server">Servers</SelectItem>
                  <SelectItem value="network">Networking</SelectItem>
                  <SelectItem value="storage">Storage</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Refresh Plan
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="hidden md:table-cell">Purchase Date</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead className="hidden md:table-cell">Current Value</TableHead>
                  <TableHead className="hidden lg:table-cell">Recommended EOL</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">WS-DEV-01</TableCell>
                  <TableCell>Workstation</TableCell>
                  <TableCell className="hidden md:table-cell">2020-01-15</TableCell>
                  <TableCell>3.8 years</TableCell>
                  <TableCell className="hidden md:table-cell">$432</TableCell>
                  <TableCell className="hidden lg:table-cell">2024-01-15</TableCell>
                  <TableCell><Badge variant="destructive">Replace Now</Badge></TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">Plan</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">SRV-DB-01</TableCell>
                  <TableCell>Server</TableCell>
                  <TableCell className="hidden md:table-cell">2021-04-10</TableCell>
                  <TableCell>2.6 years</TableCell>
                  <TableCell className="hidden md:table-cell">$5,820</TableCell>
                  <TableCell className="hidden lg:table-cell">2026-04-10</TableCell>
                  <TableCell><Badge variant="default">Healthy</Badge></TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">Plan</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">SW-CORE-01</TableCell>
                  <TableCell>Switch</TableCell>
                  <TableCell className="hidden md:table-cell">2018-08-22</TableCell>
                  <TableCell>5.2 years</TableCell>
                  <TableCell className="hidden md:table-cell">$1,145</TableCell>
                  <TableCell className="hidden lg:table-cell">2023-08-22</TableCell>
                  <TableCell><Badge variant="warning">Plan Replacement</Badge></TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">Plan</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">LAP-MKT-05</TableCell>
                  <TableCell>Laptop</TableCell>
                  <TableCell className="hidden md:table-cell">2022-11-30</TableCell>
                  <TableCell>1.0 year</TableCell>
                  <TableCell className="hidden md:table-cell">$1,645</TableCell>
                  <TableCell className="hidden lg:table-cell">2025-11-30</TableCell>
                  <TableCell><Badge variant="default">Healthy</Badge></TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">Plan</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">FW-EDGE-02</TableCell>
                  <TableCell>Firewall</TableCell>
                  <TableCell className="hidden md:table-cell">2019-03-17</TableCell>
                  <TableCell>4.7 years</TableCell>
                  <TableCell className="hidden md:table-cell">$870</TableCell>
                  <TableCell className="hidden lg:table-cell">2024-03-17</TableCell>
                  <TableCell><Badge variant="warning">Plan Replacement</Badge></TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">Plan</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-primary" />
            <CardTitle className="text-lg">Depreciation Calculator</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Asset Type</h4>
                <Select defaultValue="server">
                  <SelectTrigger>
                    <SelectValue placeholder="Select asset type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="server">Server</SelectItem>
                    <SelectItem value="workstation">Workstation</SelectItem>
                    <SelectItem value="network">Network Equipment</SelectItem>
                    <SelectItem value="storage">Storage Equipment</SelectItem>
                    <SelectItem value="peripheral">Peripheral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Initial Cost</h4>
                <div className="relative">
                  <span className="absolute left-3 top-2.5">$</span>
                  <Input type="text" className="pl-7" placeholder="Enter cost" defaultValue="12000" />
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Purchase Date</h4>
                <Input type="date" defaultValue="2022-06-15" />
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Useful Life (Years)</h4>
                <Select defaultValue="5">
                  <SelectTrigger>
                    <SelectValue placeholder="Select years" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 Years</SelectItem>
                    <SelectItem value="4">4 Years</SelectItem>
                    <SelectItem value="5">5 Years</SelectItem>
                    <SelectItem value="7">7 Years</SelectItem>
                    <SelectItem value="10">10 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Depreciation Method</h4>
                <Select defaultValue="straight">
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="straight">Straight Line</SelectItem>
                    <SelectItem value="declining">Declining Balance</SelectItem>
                    <SelectItem value="sum">Sum of Years Digits</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Salvage Value</h4>
                <div className="relative">
                  <span className="absolute left-3 top-2.5">$</span>
                  <Input type="text" className="pl-7" placeholder="Enter value" defaultValue="1200" />
                </div>
              </div>
              
              <Button className="w-full mt-2">Calculate Depreciation</Button>
            </div>
            
            <Card className="border-dashed">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Depreciation Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Initial Value:</span>
                    <span className="text-sm">$12,000.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Salvage Value:</span>
                    <span className="text-sm">$1,200.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Depreciable Amount:</span>
                    <span className="text-sm">$10,800.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Annual Depreciation:</span>
                    <span className="text-sm">$2,160.00</span>
                  </div>
                  
                  <div className="pt-3 border-t">
                    <div className="text-sm font-medium mb-2">Yearly Breakdown</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Year 1 (2022):</span>
                        <span>$9,840.00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Year 2 (2023):</span>
                        <span>$7,680.00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Year 3 (2024):</span>
                        <span>$5,520.00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Year 4 (2025):</span>
                        <span>$3,360.00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Year 5 (2026):</span>
                        <span>$1,200.00</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t">
                    <div className="text-sm font-medium mb-2">Current Value</div>
                    <div className="text-2xl font-bold">$7,680.00</div>
                    <div className="text-xs text-muted-foreground">As of November 16, 2023</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// This is needed for the Input component
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

// Import cn from @/lib/utils
import { cn } from '@/lib/utils';
import { Database } from 'lucide-react';

export default LifecycleSection;
