
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const AnalyticsTabContent = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium flex items-center">
            <FileText className="mr-2 h-5 w-5 text-primary" />
            Security Analytics
          </CardTitle>
          <CardDescription>Advanced endpoint security analytics and reporting</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <FileText className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Security Analytics Dashboard</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">
              Generate comprehensive reports and visualize security metrics with our
              advanced analytics tools. Track compliance, monitor vulnerabilities, and
              identify security trends across your workforce.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsTabContent;
