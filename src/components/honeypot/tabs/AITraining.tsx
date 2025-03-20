
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Brain, BookOpen, Target, Wrench } from 'lucide-react';
import { AITrainingModels } from '../components/AITrainingModels';
import { AIInsightsDashboard } from '../components/AIInsightsDashboard';
import { AutomationRules } from '../components/AutomationRules';

const AITraining: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold mb-1">AI Training & Intelligence</h2>
        <p className="text-muted-foreground text-sm">Train AI models with honeypot data to improve security automation</p>
      </div>
      
      <Tabs defaultValue="models" className="space-y-4">
        <TabsList>
          <TabsTrigger value="models" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Models
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Insights
          </TabsTrigger>
          <TabsTrigger value="automation" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            Automation
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="models" className="space-y-4">
          <AITrainingModels />
        </TabsContent>
        
        <TabsContent value="insights" className="space-y-4">
          <AIInsightsDashboard />
        </TabsContent>
        
        <TabsContent value="automation" className="space-y-4">
          <AutomationRules />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AITraining;
