
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, CheckCircle2, XCircle, RefreshCw, AlertTriangle, Terminal } from 'lucide-react';
import SecurityScoreChart from '../components/SecurityScoreChart';
import TestStatusCards from '../components/TestStatusCards';
import RecentTestsTable from '../components/RecentTestsTable';

const TestingDashboard: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-1">Security Testing Dashboard</h2>
          <p className="text-muted-foreground text-sm">Monitor and manage automated security tests across your infrastructure</p>
        </div>
        <Button className="sm:self-start flex items-center gap-2">
          <Play className="h-4 w-4" />
          Start New Test Suite
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg">Security Test Summary</CardTitle>
                <CardDescription>Current security posture based on test results</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Refresh</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <TestStatusCards />
              <div className="pt-2">
                <SecurityScoreChart />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Tests</CardTitle>
            <CardDescription>Currently running security tests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-muted/30">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Firewall Penetration Test</span>
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 animate-pulse">Running</Badge>
                </div>
                <div className="text-xs text-muted-foreground mb-2">Started 4m ago • ETA: 11m remaining</div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '30%' }}></div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="text-xs">View Details</Button>
                  <Button variant="ghost" size="sm" className="text-xs text-destructive hover:text-destructive">Abort</Button>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg bg-muted/30">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Zero Trust Validation</span>
                  <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">Queued</Badge>
                </div>
                <div className="text-xs text-muted-foreground mb-2">Scheduled to start after current test</div>
                <div className="mt-2 flex gap-2">
                  <Button variant="ghost" size="sm" className="text-xs hover:bg-muted">Cancel</Button>
                </div>
              </div>
              
              <div className="pt-2 flex justify-center">
                <Button variant="outline" size="sm" className="w-full">
                  <Terminal className="h-3.5 w-3.5 mr-1" />
                  View All Active Tests
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg">Recent Test Results</CardTitle>
              <CardDescription>Security test results from the past 7 days</CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                <span>Passed: 24</span>
              </Badge>
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800">
                <XCircle className="h-3.5 w-3.5 mr-1" />
                <span>Failed: 7</span>
              </Badge>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800">
                <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                <span>Warning: 3</span>
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <RecentTestsTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default TestingDashboard;
