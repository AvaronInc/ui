
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import ResourceThresholds from './ResourceThresholds';
import RecoveryStrategy from './RecoveryStrategy';

const ConfigurationPanel = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Auto-Healing Configuration</CardTitle>
        <CardDescription>
          Configure when and how containers are automatically recovered
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ResourceThresholds />
          <RecoveryStrategy />
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfigurationPanel;
