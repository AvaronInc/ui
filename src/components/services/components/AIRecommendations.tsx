
import React from 'react';
import { Service } from '@/types/services';

interface AIRecommendationsProps {
  service?: Service;
}

const AIRecommendations = ({ service }: AIRecommendationsProps) => {
  if (!service) {
    return <div className="text-center p-4">Please select a service to view AI recommendations</div>;
  }
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">AI Recommendations for {service.name}</h3>
      <p>This component will display intelligent suggestions for optimizing the selected service.</p>
    </div>
  );
};

export default AIRecommendations;
