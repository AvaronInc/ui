
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface RiskScoreCardProps {
  title: string;
  value: number;
  maxValue: number;
  description: string;
}

const RiskScoreCard: React.FC<RiskScoreCardProps> = ({ 
  title, 
  value, 
  maxValue,
  description 
}) => {
  // Calculate percentage
  const percentage = (value / maxValue) * 100;
  
  // Determine color based on risk level
  const getProgressColor = () => {
    if (percentage >= 75) return 'bg-red-500';
    if (percentage >= 50) return 'bg-amber-500';
    if (percentage >= 25) return 'bg-blue-500';
    return 'bg-green-500';
  };
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="mt-2 flex items-end justify-between">
            <div className="text-2xl font-bold">
              {value}
              <span className="text-sm font-normal text-muted-foreground ml-1">/ {maxValue}</span>
            </div>
            <div className="text-sm font-medium" style={{ color: getRiskTextColor(percentage) }}>
              {getRiskLabel(percentage)}
            </div>
          </div>
          <Progress 
            value={percentage} 
            className={`h-2 mt-2 ${getProgressColor()}`} 
          />
          <p className="text-xs text-muted-foreground mt-2">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper functions
function getRiskLabel(percentage: number): string {
  if (percentage >= 75) return 'Critical';
  if (percentage >= 50) return 'High';
  if (percentage >= 25) return 'Medium';
  return 'Low';
}

function getRiskTextColor(percentage: number): string {
  if (percentage >= 75) return '#ef4444'; // red-500
  if (percentage >= 50) return '#f59e0b'; // amber-500
  if (percentage >= 25) return '#3b82f6'; // blue-500
  return '#22c55e'; // green-500
}

export default RiskScoreCard;
