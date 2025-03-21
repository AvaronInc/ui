
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import AIChat from './AIChat';
import QuickAccessQueries from './QuickAccessQueries';
import SystemHealthSummary from './SystemHealthSummary';
import CustomizationPanel from './CustomizationPanel';

const AIMPanel: React.FC = () => {
  const [voiceMode, setVoiceMode] = useState(false);
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Removed the redundant heading that was here */}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main chat area - takes up 2/3 of the width on large screens */}
        <div className="lg:col-span-2 space-y-6">
          <AIChat voiceMode={voiceMode} setVoiceMode={setVoiceMode} />
          <QuickAccessQueries />
        </div>
        
        {/* Right sidebar - takes up 1/3 of the width on large screens */}
        <div className="space-y-6">
          <SystemHealthSummary />
          <CustomizationPanel />
        </div>
      </div>
    </div>
  );
};

export default AIMPanel;
