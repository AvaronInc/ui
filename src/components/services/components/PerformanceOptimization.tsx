
import React from 'react';
import { Service } from '@/types/services';

interface PerformanceOptimizationProps {
  service?: Service;
}

const PerformanceOptimization = ({ service }: PerformanceOptimizationProps) => {
  if (!service) {
    return <div className="text-center p-4">Please select a service to view performance optimization options</div>;
  }
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Performance Optimization for {service.name}</h3>
      <p>This component will display AI-powered performance optimization options for the selected service.</p>
    </div>
  );
};

export default PerformanceOptimization;
