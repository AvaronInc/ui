
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, AlertTriangle, Activity, BarChart3, Lock, Server } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

interface BehaviorDetectionProps {
  disabled: boolean;
}

const BehaviorDetection = ({ disabled }: BehaviorDetectionProps) => {
  const { toast } = useToast();
  const [sensitivityLevel, setSensitivityLevel] = useState([75]);
  const [learningEnabled, setLearningEnabled] = useState(true);
  const [aiAssisted, setAiAssisted] = useState(true);

  const handleSensitivityChange = (value: number[]) => {
    if (disabled) return;
    setSensitivityLevel(value);
  };

  const handleToggleLearning = (checked: boolean) => {
    if (disabled) return;
    setLearningEnabled(checked);
    if (checked) {
      toast({
        title: "Learning Mode Enabled",
        description: "The system will now learn from traffic patterns to improve detection."
      });
    }
  };

  const handleToggleAI = (checked: boolean) => {
    if (disabled) return;
    setAiAssisted(checked);
    if (checked) {
      toast({
        title: "AI-Assisted Detection Enabled",
        description: "Neural networks will now assist in anomaly detection."
      });
    }
  };

  const handleTrainModel = () => {
    if (disabled) return;
    toast({
      title: "Model Training Initiated",
      description: "The behavior analysis model is being trained with latest data."
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-500" />
                Behavior-Based Anomaly Detection
              </CardTitle>
              <CardDescription>
                Uses AI-driven heuristics to detect zero-day attacks and unusual behaviors
              </CardDescription>
            </div>
            <Button 
              onClick={handleTrainModel}
              disabled={disabled || !learningEnabled}
              size="sm"
            >
              Train Model
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-sm font-medium">Detection Sensitivity</h4>
                <p className="text-xs text-muted-foreground">Higher sensitivity may lead to more false positives</p>
              </div>
              <div className="text-sm font-medium">{sensitivityLevel[0]}%</div>
            </div>
            <Slider
              value={sensitivityLevel}
              onValueChange={handleSensitivityChange}
              disabled={disabled}
              max={100}
              step={5}
              className={disabled ? "opacity-50" : ""}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>More Permissive</span>
              <span>More Strict</span>
            </div>
          </div>
          
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">Continuous Learning</h4>
                <p className="text-xs text-muted-foreground">System learns from new traffic patterns</p>
              </div>
              <Switch 
                checked={learningEnabled} 
                onCheckedChange={handleToggleLearning}
                disabled={disabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">AI-Assisted Detection</h4>
                <p className="text-xs text-muted-foreground">Use neural networks for enhanced detection</p>
              </div>
              <Switch 
                checked={aiAssisted} 
                onCheckedChange={handleToggleAI}
                disabled={disabled}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-4 w-4 text-blue-500" />
                  <h4 className="text-sm font-medium">Network Behavior</h4>
                </div>
                <p className="text-xs text-muted-foreground mb-2">Monitors traffic flow patterns</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs">Baseline Quality:</span>
                  <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400">Strong</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Server className="h-4 w-4 text-purple-500" />
                  <h4 className="text-sm font-medium">System Behavior</h4>
                </div>
                <p className="text-xs text-muted-foreground mb-2">Monitors system resource usage</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs">Baseline Quality:</span>
                  <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400">Medium</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      
      <Card className={`${disabled ? 'opacity-60' : ''}`}>
        <CardHeader>
          <CardTitle className="text-base">Recent Behavioral Anomalies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {disabled ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                Enable IPS/IDS to view behavioral anomalies
              </div>
            ) : (
              <>
                <div className="p-3 border rounded-lg flex items-start justify-between">
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      <Badge variant="outline" className="bg-red-100 border-red-200 text-red-700 dark:bg-red-900/20 dark:text-red-400">
                        Critical
                      </Badge>
                      Unusual Data Exfiltration Pattern
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">Detected 35 minutes ago</div>
                    <div className="text-xs text-muted-foreground mt-1">Source: Internal Workstation • Target: External IP</div>
                  </div>
                  <Badge variant="outline" className="bg-green-100 border-green-200 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                    Blocked
                  </Badge>
                </div>
                
                <div className="p-3 border rounded-lg flex items-start justify-between">
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      <Badge variant="outline" className="bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
                        Warning
                      </Badge>
                      Abnormal API Access Pattern
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">Detected 2 hours ago</div>
                    <div className="text-xs text-muted-foreground mt-1">Source: Development Server • Target: API Gateway</div>
                  </div>
                  <Badge variant="outline" className="bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                    Monitoring
                  </Badge>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BehaviorDetection;
