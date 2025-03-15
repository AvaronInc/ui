
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Zap } from 'lucide-react';
import ScriptGenerationInput from './ScriptGenerationInput';
import ScriptEditor from './ScriptEditor';

const CustomScriptingSection = () => {
  const [scriptDescription, setScriptDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleGenerateScript = (scriptType: string) => {
    setIsGenerating(true);
    // Simulate AI generation (in a real implementation, this would call an API)
    setTimeout(() => {
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Zap className="mr-2 h-5 w-5" />
          Custom Scripting
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScriptGenerationInput 
          scriptDescription={scriptDescription}
          setScriptDescription={setScriptDescription}
          handleGenerateScript={handleGenerateScript}
          isGenerating={isGenerating}
        />
        
        <Separator className="my-4" />
        
        <ScriptEditor 
          handleGenerateScript={handleGenerateScript}
          isGenerating={isGenerating}
          scriptDescription={scriptDescription}
        />
      </CardContent>
    </Card>
  );
};

export default CustomScriptingSection;
