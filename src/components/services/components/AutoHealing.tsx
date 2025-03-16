
import React from 'react';
import { Service } from '@/types/services';

interface AutoHealingProps {
  service?: Service;
}

const AutoHealing = ({ service }: AutoHealingProps) => {
  if (!service) {
    return <div className="text-center p-4">Please select a service to view auto-healing options</div>;
  }
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Auto-Healing for {service.name}</h3>
      <p>This component will display self-repair configurations for the selected service.</p>
    </div>
  );
};

export default AutoHealing;
