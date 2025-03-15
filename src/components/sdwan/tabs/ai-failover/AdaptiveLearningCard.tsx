
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Signal } from 'lucide-react';

const AdaptiveLearningCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Signal className="mr-2 h-5 w-5" />
          Failover Learning & Adaptive AI Policies
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="adaptive-learning">Enable Adaptive Learning Mode</Label>
            <Switch id="adaptive-learning" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="real-time-adjust">Allow AI to Adjust Traffic Routing in Real-Time</Label>
            <Switch id="real-time-adjust" defaultChecked />
          </div>
          
          <div className="pt-2 space-y-2">
            <Button className="w-full">
              Train AI on Past Network Failover Logs
            </Button>
          </div>
          
          <div className="pt-2 space-y-2">
            <Button variant="outline" className="w-full">
              View AI Decision Logs & Accuracy Reports
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdaptiveLearningCard;
