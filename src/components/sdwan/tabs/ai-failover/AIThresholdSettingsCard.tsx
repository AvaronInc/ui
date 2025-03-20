
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Brain } from 'lucide-react';
import { AIThresholdSettingsProps } from './interfaces';

const AIThresholdSettingsCard = ({
  confidenceLevel,
  minimumConfidence,
  threshold,
  requireAdminApproval,
  onConfidenceLevelChange,
  onMinimumConfidenceChange,
  onThresholdChange,
  onAdminApprovalToggle
}: AIThresholdSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="mr-2 h-5 w-5" />
          AI Confidence Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>AI Confidence Level</Label>
            <span className="text-sm font-semibold">{confidenceLevel}%</span>
          </div>
          <Slider 
            min={50} 
            max={100} 
            step={1}
            value={[confidenceLevel]}
            onValueChange={(value) => onConfidenceLevelChange(value[0])}
          />
          <p className="text-xs text-muted-foreground">
            Higher confidence means AI will only suggest failover actions when it's more certain about the prediction.
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Minimum Required Confidence</Label>
            <span className="text-sm font-semibold">{minimumConfidence}%</span>
          </div>
          <Slider 
            min={50} 
            max={100} 
            step={1}
            value={[minimumConfidence]}
            onValueChange={(value) => onMinimumConfidenceChange(value[0])}
          />
          <p className="text-xs text-muted-foreground">
            Predictions below this confidence threshold will not trigger automatic failover.
          </p>
        </div>
        
        <div className="space-y-2">
          <Label>Recommendation Threshold</Label>
          <RadioGroup 
            value={threshold} 
            onValueChange={(value) => onThresholdChange(value as 'low' | 'medium' | 'high')}
            className="flex space-x-4 pt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="low" id="low" />
              <Label htmlFor="low">Low</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="medium" />
              <Label htmlFor="medium">Medium</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="high" id="high" />
              <Label htmlFor="high">High</Label>
            </div>
          </RadioGroup>
          <p className="text-xs text-muted-foreground">
            Determines how sensitive the AI is to network changes when making recommendations.
          </p>
        </div>
        
        <div className="pt-2">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="admin-approval" className="block">Require Admin Approval</Label>
              <p className="text-xs text-muted-foreground">For AI-driven failover decisions</p>
            </div>
            <Switch 
              id="admin-approval" 
              checked={requireAdminApproval}
              onCheckedChange={onAdminApprovalToggle}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIThresholdSettingsCard;
