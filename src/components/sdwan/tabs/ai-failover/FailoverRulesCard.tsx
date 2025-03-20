
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RotateCw, Plus } from 'lucide-react';
import { FailoverRulesProps } from './interfaces';

const FailoverRulesCard = ({ 
  failoverPriority, 
  simulationMode, 
  customRules,
  onFailoverPriorityChange,
  onSimulationModeToggle,
  onAddRule
}: FailoverRulesProps) => {
  const [newRule, setNewRule] = useState({
    sourceIp: '',
    destination: '',
    priority: 'medium' as 'high' | 'medium' | 'low'
  });
  
  const handleAddRule = () => {
    if (newRule.sourceIp && newRule.destination) {
      onAddRule(newRule);
      setNewRule({
        sourceIp: '',
        destination: '',
        priority: 'medium'
      });
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <RotateCw className="mr-2 h-5 w-5" />
          Failover Rules & Simulation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div>
            <Label className="text-base">Failover Priority Strategy</Label>
            <RadioGroup 
              value={failoverPriority} 
              onValueChange={(value) => onFailoverPriorityChange(value as 'cost' | 'performance' | 'stability')}
              className="flex flex-col space-y-2 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cost" id="cost" />
                <Label htmlFor="cost">Cost Optimized</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="performance" id="performance" />
                <Label htmlFor="performance">Performance Optimized</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="stability" id="stability" />
                <Label htmlFor="stability">Stability Focused</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <Label htmlFor="simulation-mode">Enable Simulation Mode</Label>
            <Switch 
              id="simulation-mode" 
              checked={simulationMode}
              onCheckedChange={onSimulationModeToggle}
            />
          </div>
          
          <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-3">
              <Label className="text-base">Custom Failover Rules</Label>
              <span className="text-xs text-muted-foreground">{customRules.length} rules defined</span>
            </div>
            
            <div className="space-y-2 mb-4">
              {customRules.map((rule) => (
                <div key={rule.id} className="flex items-center justify-between p-2 bg-muted rounded">
                  <div className="text-sm">
                    <span className="font-medium">{rule.sourceIp}</span>
                    <span className="mx-2">→</span>
                    <span>{rule.destination}</span>
                  </div>
                  <Badge 
                    className={
                      rule.priority === 'high' 
                        ? 'bg-red-500' 
                        : rule.priority === 'medium' 
                          ? 'bg-amber-500'
                          : 'bg-blue-500'
                    }
                  >
                    {rule.priority}
                  </Badge>
                </div>
              ))}
            </div>
            
            <div className="space-y-2">
              <div className="grid grid-cols-5 gap-2">
                <div className="col-span-2">
                  <Input 
                    placeholder="Source IP/Range" 
                    value={newRule.sourceIp}
                    onChange={(e) => setNewRule({...newRule, sourceIp: e.target.value})}
                  />
                </div>
                <div className="col-span-2">
                  <Input 
                    placeholder="Destination" 
                    value={newRule.destination}
                    onChange={(e) => setNewRule({...newRule, destination: e.target.value})}
                  />
                </div>
                <div>
                  <Select 
                    value={newRule.priority}
                    onValueChange={(value) => setNewRule({...newRule, priority: value as any})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={handleAddRule} 
                className="w-full flex items-center gap-1"
                disabled={!newRule.sourceIp || !newRule.destination}
              >
                <Plus className="h-4 w-4" />
                <span>Add Rule</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

import { Badge } from '@/components/ui/badge';

export default FailoverRulesCard;
