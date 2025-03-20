
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  AIHeader, 
  AISettingsCard, 
  SecurityIntelligenceCard, 
  AIRulesPanel,
  ZeroTrustSegmentation
} from './components';

interface AIRule {
  id: string;
  name: string;
  source: string;
  destination: string;
  action: 'allow' | 'block';
  confidence: number;
  status: 'active' | 'proposed' | 'rejected';
  created: string;
  threat: string;
  automated: boolean;
}

const AIThreatPanel = () => {
  const { toast } = useToast();
  const [aiEnabled, setAiEnabled] = useState(true);
  const [learningMode, setLearningMode] = useState(true);
  const [autoBlocking, setAutoBlocking] = useState(false);
  const [zeroTrust, setZeroTrust] = useState(false);
  const [confidenceThreshold, setConfidenceThreshold] = useState(75);
  
  const [aiRules, setAiRules] = useState<AIRule[]>([
    {
      id: '1',
      name: 'Block Malicious IP Range',
      source: '194.31.98.0/24',
      destination: 'Any',
      action: 'block',
      confidence: 96,
      status: 'active',
      created: '2025-03-15 08:43:21',
      threat: 'Command & Control Traffic',
      automated: true
    },
    {
      id: '2',
      name: 'Restrict Suspicious Host',
      source: '10.0.3.45',
      destination: 'Internet',
      action: 'block',
      confidence: 88,
      status: 'active',
      created: '2025-03-17 14:21:05',
      threat: 'Data Exfiltration',
      automated: true
    },
    {
      id: '3',
      name: 'Allow Legitimate Service',
      source: 'Any',
      destination: '10.0.2.15:8080',
      action: 'allow',
      confidence: 92,
      status: 'active',
      created: '2025-03-18 11:05:33',
      threat: 'False Positive Resolution',
      automated: false
    },
    {
      id: '4',
      name: 'Block Port Scanning',
      source: '172.16.83.12',
      destination: 'Any',
      action: 'block',
      confidence: 71,
      status: 'proposed',
      created: '2025-03-19 16:32:45',
      threat: 'Port Scanning Activity',
      automated: false
    },
    {
      id: '5',
      name: 'Segment IoT Device',
      source: '10.0.4.102',
      destination: 'Internal Network',
      action: 'block',
      confidence: 63,
      status: 'proposed',
      created: '2025-03-20 09:15:27',
      threat: 'Anomalous Behavior',
      automated: false
    }
  ]);

  const toggleAI = () => {
    setAiEnabled(!aiEnabled);
    toast({
      title: aiEnabled ? "AI Security Disabled" : "AI Security Enabled",
      description: aiEnabled 
        ? "AI-powered security features have been turned off." 
        : "AI-powered security features are now active.",
    });
  };

  const toggleLearningMode = () => {
    setLearningMode(!learningMode);
    toast({
      title: learningMode ? "Learning Mode Disabled" : "Learning Mode Enabled",
      description: learningMode 
        ? "AI will no longer adapt rules based on traffic patterns." 
        : "AI will now learn from traffic patterns and adapt rules accordingly.",
    });
  };

  const toggleAutoBlocking = () => {
    setAutoBlocking(!autoBlocking);
    toast({
      title: autoBlocking ? "Auto-Blocking Disabled" : "Auto-Blocking Enabled",
      description: autoBlocking 
        ? "AI will only suggest rules for admin approval." 
        : "AI will automatically implement high-confidence blocking rules.",
    });
  };

  const toggleZeroTrust = () => {
    setZeroTrust(!zeroTrust);
    toast({
      title: zeroTrust ? "Zero Trust Segmentation Disabled" : "Zero Trust Segmentation Enabled",
      description: zeroTrust 
        ? "Automatic isolation of high-risk endpoints disabled." 
        : "AI will now automatically segment high-risk endpoints.",
    });
  };

  const handleApproveRule = (id: string) => {
    setAiRules(prev => prev.map(rule => 
      rule.id === id ? { ...rule, status: 'active' } : rule
    ));
    toast({
      title: "Rule Approved",
      description: "The AI-suggested rule has been activated.",
    });
  };

  const handleRejectRule = (id: string) => {
    setAiRules(prev => prev.map(rule => 
      rule.id === id ? { ...rule, status: 'rejected' } : rule
    ));
    toast({
      title: "Rule Rejected",
      description: "The AI-suggested rule has been rejected.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with AI Controls */}
      <AIHeader aiEnabled={aiEnabled} toggleAI={toggleAI} />

      {/* AI Settings Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AISettingsCard 
          aiEnabled={aiEnabled}
          learningMode={learningMode}
          toggleLearningMode={toggleLearningMode}
          autoBlocking={autoBlocking}
          toggleAutoBlocking={toggleAutoBlocking}
          zeroTrust={zeroTrust}
          toggleZeroTrust={toggleZeroTrust}
          confidenceThreshold={confidenceThreshold}
          setConfidenceThreshold={setConfidenceThreshold}
        />
        <SecurityIntelligenceCard />
      </div>

      {/* AI Rules Panel */}
      <AIRulesPanel 
        aiEnabled={aiEnabled}
        aiRules={aiRules}
        handleApproveRule={handleApproveRule}
        handleRejectRule={handleRejectRule}
      />

      {/* Zero Trust Segmentation Section */}
      <ZeroTrustSegmentation 
        zeroTrust={zeroTrust}
        toggleZeroTrust={toggleZeroTrust}
        aiEnabled={aiEnabled}
      />
    </div>
  );
};

export default AIThreatPanel;
