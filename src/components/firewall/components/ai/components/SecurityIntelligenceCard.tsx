
import React from 'react';
import { BarChart, RefreshCw, Shield } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SecurityIntelligenceCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="h-5 w-5 text-primary" />
          Security Intelligence
        </CardTitle>
        <CardDescription>
          AI-driven security metrics and predictions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-lg p-3">
            <div className="text-sm font-medium mb-1">Rules Created</div>
            <div className="text-2xl font-bold">18</div>
            <div className="text-xs text-muted-foreground mt-1">Past 7 days</div>
          </div>
          
          <div className="border rounded-lg p-3">
            <div className="text-sm font-medium mb-1">Threats Blocked</div>
            <div className="text-2xl font-bold">143</div>
            <div className="text-xs text-muted-foreground mt-1">Past 7 days</div>
          </div>
          
          <div className="border rounded-lg p-3">
            <div className="text-sm font-medium mb-1">False Positives</div>
            <div className="text-2xl font-bold">3</div>
            <div className="text-xs text-muted-foreground mt-1">2.1% of detections</div>
          </div>
          
          <div className="border rounded-lg p-3">
            <div className="text-sm font-medium mb-1">Learning Hours</div>
            <div className="text-2xl font-bold">124</div>
            <div className="text-xs text-muted-foreground mt-1">Model maturity 78%</div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <RefreshCw className="h-4 w-4" />
            Refresh Stats
          </Button>
          <Button size="sm" className="flex items-center gap-1">
            <Shield className="h-4 w-4" />
            Run Analysis
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityIntelligenceCard;
