import React from 'react';
import { Card } from '@/components/ui/card';

interface CodeDiffViewProps {
  before: string;
  after: string;
  fileType: string;
}

export const CodeDiffView: React.FC<CodeDiffViewProps> = ({
  before,
  after,
  fileType
}) => {
  // Parse the before and after strings into arrays of lines
  const beforeLines = before.split('\n');
  const afterLines = after.split('\n');
  
  // Find the differences between the two files
  const diffLines = generateDiff(beforeLines, afterLines);

  return (
    <Card className="relative border overflow-hidden">
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm font-mono">
          {diffLines.map((line, index) => {
            let bgColor = '';
            let textColor = '';
            
            if (line.startsWith('+')) {
              bgColor = 'bg-green-100 dark:bg-green-900/20';
              textColor = 'text-green-800 dark:text-green-300';
            } else if (line.startsWith('-')) {
              bgColor = 'bg-red-100 dark:bg-red-900/20';
              textColor = 'text-red-800 dark:text-red-300';
            } else if (line.startsWith('~')) {
              bgColor = 'bg-yellow-100 dark:bg-yellow-900/20';
              textColor = 'text-yellow-800 dark:text-yellow-300';
              line = line.substring(1); // Remove the ~ marker
            }
            
            return (
              <div key={index} className={`${bgColor} ${textColor}`}>
                {line}
              </div>
            );
          })}
        </pre>
      </div>
    </Card>
  );
};

// Simple diff generator for demonstration
const generateDiff = (beforeLines: string[], afterLines: string[]): string[] => {
  const diffLines: string[] = [];
  
  // For this demo, we'll create a simple line-by-line diff
  // In a real implementation, you would use a proper diff algorithm
  
  // Determine the maximum number of lines to compare
  const maxLines = Math.max(beforeLines.length, afterLines.length);
  
  for (let i = 0; i < maxLines; i++) {
    const beforeLine = i < beforeLines.length ? beforeLines[i] : '';
    const afterLine = i < afterLines.length ? afterLines[i] : '';
    
    if (!beforeLine && afterLine) {
      // Line was added
      diffLines.push(`+ ${afterLine}`);
    } else if (beforeLine && !afterLine) {
      // Line was removed
      diffLines.push(`- ${beforeLine}`);
    } else if (beforeLine !== afterLine) {
      // Line was changed
      diffLines.push(`- ${beforeLine}`);
      diffLines.push(`+ ${afterLine}`);
    } else {
      // Line is unchanged
      diffLines.push(`  ${beforeLine}`);
    }
  }
  
  return diffLines;
};

export default CodeDiffView;
