
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, FileBadge, Download, BarChart3 } from 'lucide-react';
import TestExecutionConsole from '../components/TestExecutionConsole';
import ComplianceChecksTable from '../components/ComplianceChecksTable';

const TestExecution: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-1">Test Execution & Reports</h2>
          <p className="text-muted-foreground text-sm">Execute security tests and view detailed reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Results
          </Button>
          <Button className="flex items-center gap-2">
            <Play className="h-4 w-4" />
            Execute Test
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Real-time Test Execution</CardTitle>
            <CardDescription>Live logs and events during test execution</CardDescription>
          </CardHeader>
          <CardContent>
            <TestExecutionConsole />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Test Status</CardTitle>
            <CardDescription>Current test execution status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">In Progress</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Duration:</span>
                  <span>15m 42s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Tests Completed:</span>
                  <span>24/38</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Passing:</span>
                  <span className="text-green-500 font-medium">18</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Failing:</span>
                  <span className="text-red-500 font-medium">6</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Warnings:</span>
                  <span className="text-yellow-500 font-medium">2</span>
                </div>
              </div>
              
              <div className="h-[1px] bg-border my-2"></div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Test Coverage</h3>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '63%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>63% Complete</span>
                  <span>100%</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm" className="flex items-center justify-center gap-1">
                  <FileBadge className="h-3.5 w-3.5" />
                  <span>View Previous Test Results</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center justify-center gap-1">
                  <BarChart3 className="h-3.5 w-3.5" />
                  <span>Compare with Baseline</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Compliance Validation Results</CardTitle>
          <CardDescription>Mapping test results to compliance frameworks</CardDescription>
        </CardHeader>
        <CardContent>
          <ComplianceChecksTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default TestExecution;
