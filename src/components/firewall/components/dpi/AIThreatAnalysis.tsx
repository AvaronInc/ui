
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { BrainCircuit, BarChart3, NetworkIcon, Shield } from 'lucide-react';

interface AIThreatAnalysisProps {
  dpiEnabled: boolean;
  onToggleDPI: () => void;
}

const AIThreatAnalysis = ({ dpiEnabled, onToggleDPI }: AIThreatAnalysisProps) => {
  return (
    <Card className="border-t-4 border-t-primary">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainCircuit className="h-5 w-5" />
          AI-Enhanced Threat Analysis
        </CardTitle>
        <CardDescription>
          Advanced machine learning traffic analysis and anomaly detection
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">AI Analysis Status</h4>
            <Switch checked={dpiEnabled} onCheckedChange={onToggleDPI} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Anomaly Detection</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">1</span>
                  <BarChart3 className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Traffic pattern anomalies detected
                </p>
                <Button variant="outline" className="w-full mt-2" size="sm">
                  View Details
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Data Exfiltration</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">0</span>
                  <NetworkIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  No suspicious data transfer detected
                </p>
                <Button variant="outline" className="w-full mt-2" size="sm">
                  Configure Alerts
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">AI Confidence</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">94%</span>
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Model certainty in detection results
                </p>
                <Button variant="outline" className="w-full mt-2" size="sm">
                  Tune Model
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline">
              Configure AI Settings
            </Button>
            <Button>
              Run Full Analysis
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIThreatAnalysis;
