
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Zap, AlertCircle, ShieldCheck } from 'lucide-react';

export const AIInsightsDashboard: React.FC = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
            AI-Generated Insights
          </CardTitle>
          <CardDescription>Machine learning-powered security observations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="flex items-start gap-4">
              <div className="bg-red-100 dark:bg-red-900 p-2 rounded-full">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-300" />
              </div>
              <div>
                <h4 className="font-medium">Emerging SQL Injection Pattern Detected</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  The AI has identified a new SQL injection pattern targeting the web server honeypot that bypasses standard WAF rules. This pattern uses a novel payload structure with nested comments.
                </p>
                <div className="mt-2 text-sm font-mono bg-muted p-2 rounded">
                  Pattern: <code>/*!50000 SELECT*//**//*!50000 1*/</code>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                <Zap className="h-5 w-5 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <h4 className="font-medium">Attack Source Correlation</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  The AI has correlated a set of 17 IP addresses that show similar attack patterns and timing. These may be part of a coordinated botnet attack originating from Eastern Europe.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                <ShieldCheck className="h-5 w-5 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <h4 className="font-medium">Defense Recommendation</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Based on collected attack data, the AI recommends implementing additional rate limiting on authentication endpoints and adding the following signature to the WAF rules.
                </p>
                <div className="mt-2 text-sm font-mono bg-muted p-2 rounded">
                  <code>SecRule REQUEST_URI "/api/auth" "id:1000,phase:1,t:none,block"</code>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
