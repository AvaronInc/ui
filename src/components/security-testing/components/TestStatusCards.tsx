
import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Zap } from 'lucide-react';

const TestStatusCards: React.FC = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 p-4 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="bg-green-100 dark:bg-green-800/50 p-2 rounded-full">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <div className="text-xl font-bold">24</div>
            <div className="text-xs text-muted-foreground">Passed Tests</div>
          </div>
        </div>
      </div>
      
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 p-4 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="bg-red-100 dark:bg-red-800/50 p-2 rounded-full">
            <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <div className="text-xl font-bold">7</div>
            <div className="text-xs text-muted-foreground">Failed Tests</div>
          </div>
        </div>
      </div>
      
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 p-4 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="bg-yellow-100 dark:bg-yellow-800/50 p-2 rounded-full">
            <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <div className="text-xl font-bold">3</div>
            <div className="text-xs text-muted-foreground">Warnings</div>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 p-4 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 dark:bg-blue-800/50 p-2 rounded-full">
            <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <div className="text-xl font-bold">12</div>
            <div className="text-xs text-muted-foreground">Active Tests</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestStatusCards;
