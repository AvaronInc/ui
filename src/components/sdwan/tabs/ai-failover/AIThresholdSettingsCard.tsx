
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
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
          AI Confidence & Threshold Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="ai-confidence">AI Confidence Level for Autonomous Failover: {confidenceLevel}%</Label>
            </div>
            <Slider 
              id="ai-confidence" 
              value={[confidenceLevel]} 
              max={100} 
              step={1} 
              onValueChange={(value) => onConfidenceLevelChange(value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="min-confidence">Minimum Confidence Required: {minimumConfidence}%</Label>
            </div>
            <Slider 
              id="min-confidence" 
              value={[minimumConfidence]} 
              min={50} 
              max={100} 
              step={1} 
              onValueChange={(value) => onMinimumConfidenceChange(value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="threshold">Threshold for AI-Generated Failover Recommendations</Label>
            <Select 
              value={threshold} 
              onValueChange={(value: 'low' | 'medium' | 'high') => onThresholdChange(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select threshold" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="admin-approval">Admin Approval Requirement</Label>
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
