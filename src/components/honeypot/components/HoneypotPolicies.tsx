
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Save, Undo } from 'lucide-react';

export const HoneypotPolicies: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-md font-medium">Honeypot Behavior</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="response-delay">Response Delay</Label>
              <span className="text-sm text-muted-foreground">250ms</span>
            </div>
            <Slider
              id="response-delay"
              defaultValue={[250]}
              max={1000}
              step={10}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">Artificial delay to appear more realistic</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="emulation-fidelity">Emulation Fidelity</Label>
              <span className="text-sm text-muted-foreground">High</span>
            </div>
            <Select defaultValue="high">
              <SelectTrigger id="emulation-fidelity">
                <SelectValue placeholder="Select fidelity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low - Basic functionality only</SelectItem>
                <SelectItem value="medium">Medium - Standard system behavior</SelectItem>
                <SelectItem value="high">High - Advanced service emulation</SelectItem>
                <SelectItem value="ultra">Ultra - Indistinguishable from real systems</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Level of system detail to emulate</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-md font-medium">Interaction Policy</h3>
        <RadioGroup defaultValue="medium" className="flex flex-col space-y-1">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="passive" id="passive" />
            <Label htmlFor="passive">Passive - Log only, no interaction</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="low" id="low" />
            <Label htmlFor="low">Low - Minimal responses to keep attacker engaged</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="medium" />
            <Label htmlFor="medium">Medium - Simulated vulnerability responses</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="high" id="high" />
            <Label htmlFor="high">High - Advanced interaction with deception tactics</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-md font-medium">General Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Automatic Deployment</Label>
              <p className="text-xs text-muted-foreground">Deploy honeypots automatically based on threats</p>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>AI-Driven Responses</Label>
              <p className="text-xs text-muted-foreground">Use AI to generate dynamic responses</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Data Retention Policy</Label>
              <p className="text-xs text-muted-foreground">How long to keep honeypot data</p>
            </div>
            <Select defaultValue="90">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="60">60 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
                <SelectItem value="180">180 days</SelectItem>
                <SelectItem value="365">1 year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Deception Level</Label>
              <p className="text-xs text-muted-foreground">How convincing the honeypot appears</p>
            </div>
            <Select defaultValue="advanced">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="pt-4 flex justify-end gap-2">
        <Button variant="outline" className="flex items-center gap-2">
          <Undo className="h-4 w-4" />
          Reset to Defaults
        </Button>
        <Button className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
};
