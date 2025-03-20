
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Pause, RefreshCw } from 'lucide-react';

export const AITrainingModels: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium">Attack Pattern Recognition</h3>
                <p className="text-sm text-muted-foreground">Identifies common attack signatures</p>
              </div>
              <Badge className="bg-green-600">Active</Badge>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Training Progress</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div className="flex justify-between text-sm">
                <span>Dataset: 12,450 samples</span>
                <span>Accuracy: 94.3%</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex gap-1 items-center">
                  <Pause className="h-3 w-3" />
                  Pause
                </Button>
                <Button variant="outline" size="sm" className="flex gap-1 items-center">
                  <RefreshCw className="h-3 w-3" />
                  Retrain
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium">Behavioral Analysis</h3>
                <p className="text-sm text-muted-foreground">Analyzes attacker behavior patterns</p>
              </div>
              <Badge variant="secondary">Paused</Badge>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Training Progress</span>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              <div className="flex justify-between text-sm">
                <span>Dataset: 8,320 samples</span>
                <span>Accuracy: 87.6%</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex gap-1 items-center">
                  <Play className="h-3 w-3" />
                  Resume
                </Button>
                <Button variant="outline" size="sm" className="flex gap-1 items-center">
                  <RefreshCw className="h-3 w-3" />
                  Retrain
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium">Threat Classification</h3>
                <p className="text-sm text-muted-foreground">Categorizes threats by severity and type</p>
              </div>
              <Badge className="bg-green-600">Active</Badge>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Training Progress</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div className="flex justify-between text-sm">
                <span>Dataset: 15,730 samples</span>
                <span>Accuracy: 96.1%</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex gap-1 items-center">
                  <Pause className="h-3 w-3" />
                  Pause
                </Button>
                <Button variant="outline" size="sm" className="flex gap-1 items-center">
                  <RefreshCw className="h-3 w-3" />
                  Retrain
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium">Anomaly Detection</h3>
                <p className="text-sm text-muted-foreground">Identifies unusual behavior patterns</p>
              </div>
              <Badge variant="secondary">Paused</Badge>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Training Progress</span>
                  <span className="text-sm font-medium">67%</span>
                </div>
                <Progress value={67} className="h-2" />
              </div>
              <div className="flex justify-between text-sm">
                <span>Dataset: 10,890 samples</span>
                <span>Accuracy: 89.4%</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex gap-1 items-center">
                  <Play className="h-3 w-3" />
                  Resume
                </Button>
                <Button variant="outline" size="sm" className="flex gap-1 items-center">
                  <RefreshCw className="h-3 w-3" />
                  Retrain
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
