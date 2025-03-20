
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Bug, Shield, AlertTriangle, Network } from 'lucide-react';

export const HoneypotStatusCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4 flex flex-row items-center space-x-4">
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
            <Bug className="h-6 w-6 text-blue-700 dark:text-blue-300" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Active Honeypots</p>
            <h3 className="text-2xl font-bold">12</h3>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex flex-row items-center space-x-4">
          <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full">
            <AlertTriangle className="h-6 w-6 text-red-700 dark:text-red-300" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Current Attacks</p>
            <h3 className="text-2xl font-bold">17</h3>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex flex-row items-center space-x-4">
          <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
            <Shield className="h-6 w-6 text-green-700 dark:text-green-300" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Threats Identified</p>
            <h3 className="text-2xl font-bold">124</h3>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex flex-row items-center space-x-4">
          <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
            <Network className="h-6 w-6 text-purple-700 dark:text-purple-300" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Network Segments</p>
            <h3 className="text-2xl font-bold">5</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
