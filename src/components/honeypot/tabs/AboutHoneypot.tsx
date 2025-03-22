import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Info, Brain, Shield, ExternalLink, ArrowRight } from 'lucide-react';

const AboutHoneypot: React.FC = () => {
  const [isAvaronIntegrationEnabled, setIsAvaronIntegrationEnabled] = useState(false);
  const { toast } = useToast();

  const handleSavePreferences = () => {
    toast({
      title: isAvaronIntegrationEnabled ? 
        "Avaron Integration Enabled" : 
        "Preferences Updated",
      description: isAvaronIntegrationEnabled ? 
        "Your honeypot data will be shared with Avaron. A 2% discount has been applied to your bill." : 
        "Your honeypot preferences have been updated.",
      duration: 5000,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-500" />
            What is a Honeypot?
          </CardTitle>
          <CardDescription>
            Understanding honeypot technology and its importance in cybersecurity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h3 className="font-medium text-base">Definition & Purpose</h3>
            <p className="text-sm text-muted-foreground">
              A honeypot is a cybersecurity mechanism that creates a controlled, 
              isolated environment designed to look like a legitimate system, but 
              is actually a decoy meant to attract and detect attackers. Honeypots 
              intentionally appear vulnerable to entice threat actors, allowing security 
              teams to study attack patterns, techniques, and motivations without 
              risking actual production systems.
            </p>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium text-base flex items-center gap-2">
              <Brain className="h-4 w-4 text-purple-500" />
              AI Training & Threat Intelligence
            </h3>
            <p className="text-sm text-muted-foreground">
              Honeypots serve as invaluable data collectors for AI-based security systems. 
              By capturing real attack patterns, exploits, and malicious behaviors, they 
              provide rich datasets that help train machine learning models to recognize 
              and respond to emerging threats. This creates a continuously improving security 
              posture that adapts to the evolving threat landscape.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-muted/50 p-3 rounded-lg">
                <h4 className="text-sm font-medium mb-1">Benefits for AI Training</h4>
                <ul className="text-xs space-y-1 text-muted-foreground list-disc pl-4">
                  <li>Collection of real-world attack data</li>
                  <li>Identification of new attack vectors</li>
                  <li>Pattern recognition of attacker behavior</li>
                  <li>Zero-day threat discovery</li>
                  <li>Development of predictive security models</li>
                </ul>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <h4 className="text-sm font-medium mb-1">Detection Capabilities</h4>
                <ul className="text-xs space-y-1 text-muted-foreground list-disc pl-4">
                  <li>Advanced Persistent Threats (APTs)</li>
                  <li>Novel malware variants</li>
                  <li>Social engineering techniques</li>
                  <li>Credential harvesting attempts</li>
                  <li>Network scanning and reconnaissance</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium text-base flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              Types & Implementation
            </h3>
            <p className="text-sm text-muted-foreground">
              Avaron.AI's honeypot solution offers various deployment options, from 
              low-interaction honeypots that emulate only parts of systems to high-interaction 
              honeypots that replicate entire operating environments. Our AI-enhanced honeypots 
              adapt to attacker behavior, creating more convincing decoys that yield higher 
              quality intelligence.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5 text-purple-500" />
            Avaron Enterprise Integration
          </CardTitle>
          <CardDescription>
            Enhance collective threat intelligence and receive billing benefits
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            By sharing anonymized honeypot data with Avaron's enterprise threat intelligence 
            platform, you contribute to a global security ecosystem that protects organizations 
            worldwide. This collaborative approach strengthens everyone's security posture while 
            providing you with exclusive benefits.
          </p>
          
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded-lg p-4 my-2">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex-shrink-0">
                <Info className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h4 className="font-medium text-sm text-blue-800 dark:text-blue-300 mb-1">
                  Receive a 2% reduction on your overall bill
                </h4>
                <p className="text-xs text-blue-700 dark:text-blue-400">
                  Organizations that opt-in to share their anonymized honeypot data with 
                  Avaron receive an automatic 2% discount on their monthly subscription. 
                  This incentive recognizes your contribution to the collective security 
                  community.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 mt-2">
            <Checkbox 
              id="avaron-integration" 
              checked={isAvaronIntegrationEnabled}
              onCheckedChange={(checked) => setIsAvaronIntegrationEnabled(checked as boolean)}
            />
            <label 
              htmlFor="avaron-integration" 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Enable Avaron integration and apply 2% billing discount
            </label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSavePreferences} className="flex items-center gap-1">
            Save Preferences
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AboutHoneypot;
