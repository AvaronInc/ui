
import React from 'react';

interface RecommendedActionsProps {
  actions: string[];
}

export const RecommendedActions: React.FC<RecommendedActionsProps> = ({ actions }) => {
  return (
    <div className="space-y-4">
      <h4 className="text-md font-medium">Recommended Actions</h4>
      <ul className="space-y-2">
        {actions.map((action, index) => (
          <li key={index} className="text-sm flex items-start">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border bg-background text-xs font-medium mr-2 shrink-0">
              {index + 1}
            </span>
            {action}
          </li>
        ))}
      </ul>
    </div>
  );
};
