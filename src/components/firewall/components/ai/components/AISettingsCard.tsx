
import React from 'react';
import { Brain } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

interface AISettingsCardProps {
  aiEnabled: boolean;
  learningMode: boolean;
  toggleLearningMode: () => void;
  autoBlocking: boolean;
  toggleAutoBlocking: () => void;
  zeroTrust: boolean;
  toggleZeroTrust: () => void;
  confidenceThreshold: number;
  setConfidenceThreshold: (value: number) => void;
}

const AISettingsCard = ({
  aiEnabled,
  learningMode,
  toggleLearningMode,
  autoBlocking,
  toggleAutoBlocking,
  zeroTrust,
  toggleZeroTrust,
  confidenceThreshold,
  setConfidenceThreshold
}: AISettingsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Adaptive AI Settings
        </CardTitle>
        <CardDescription>
          Configure how the AI learns and responds to threats
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="font-medium">Self-Learning Firewall</div>
            <div className="text-sm text-muted-foreground">
              Learns traffic patterns and updates rules
            </div>
          </div>
          <Switch 
            checked={learningMode} 
            onCheckedChange={toggleLearningMode} 
            disabled={!aiEnabled}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="font-medium">Dynamic Threat Blocking</div>
            <div className="text-sm text-muted-foreground">
              Automatically create rules for emerging threats
            </div>
          </div>
          <Switch 
            checked={autoBlocking} 
            onCheckedChange={toggleAutoBlocking} 
            disabled={!aiEnabled}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="font-medium">Zero Trust Segmentation</div>
            <div className="text-sm text-muted-foreground">
              Automatically isolate high-risk endpoints
            </div>
          </div>
          <Switch 
            checked={zeroTrust} 
            onCheckedChange={toggleZeroTrust} 
            disabled={!aiEnabled}
          />
        </div>
        
        <div className="pt-2">
          <div className="mb-2 flex justify-between">
            <span className="text-sm font-medium">Confidence Threshold</span>
            <span className="text-sm">{confidenceThreshold}%</span>
          </div>
          <input
            type="range"
            min="50"
            max="95"
            step="5"
            value={confidenceThreshold}
            onChange={(e) => setConfidenceThreshold(parseInt(e.target.value))}
            className="w-full"
            disabled={!aiEnabled || !autoBlocking}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Permissive</span>
            <span>Strict</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AISettingsCard;
