
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface ScriptGenerationInputProps {
  scriptDescription: string;
  setScriptDescription: (value: string) => void;
  handleGenerateScript: (scriptType: string) => void;
  isGenerating: boolean;
}

const ScriptGenerationInput: React.FC<ScriptGenerationInputProps> = ({
  scriptDescription,
  setScriptDescription,
  handleGenerateScript,
  isGenerating
}) => {
  return (
    <div className="space-y-4 mb-4">
      <Label htmlFor="script-description">AI Script Generation</Label>
      <Textarea 
        id="script-description" 
        placeholder="Describe what you want the script to do (e.g., 'Monitor primary connection and failover to secondary if latency exceeds 100ms for more than 30 seconds')"
        value={scriptDescription}
        onChange={(e) => setScriptDescription(e.target.value)}
        className="h-24"
      />
      <div className="flex items-center space-x-2">
        <Switch id="use-ai" />
        <Label htmlFor="use-ai">Use AI to optimize generated scripts</Label>
      </div>
      <Button 
        variant="outline" 
        className="w-full flex items-center justify-center" 
        disabled={!scriptDescription.trim() || isGenerating}
        onClick={() => handleGenerateScript("current")}
      >
        <Sparkles className="mr-2 h-4 w-4" />
        {isGenerating ? "Generating Script..." : "Generate Script with AI"}
      </Button>
    </div>
  );
};

export default ScriptGenerationInput;
