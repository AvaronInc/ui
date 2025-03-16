
import React from 'react';
import { Slider } from '@/components/ui/slider';

const ResourceThresholds = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Resource Thresholds</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm">CPU Threshold</label>
              <span className="text-sm">{90}%</span>
            </div>
            <Slider defaultValue={[90]} max={100} step={1} />
            <p className="text-xs text-muted-foreground">Trigger auto-healing when CPU usage exceeds this threshold.</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm">Memory Threshold</label>
              <span className="text-sm">{85}%</span>
            </div>
            <Slider defaultValue={[85]} max={100} step={1} />
            <p className="text-xs text-muted-foreground">Trigger auto-healing when memory usage exceeds this threshold.</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Health Check Configuration</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm">Health Check Interval</label>
              <span className="text-sm">{30} seconds</span>
            </div>
            <Slider defaultValue={[30]} min={5} max={120} step={5} />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm">Failure Threshold</label>
              <span className="text-sm">{3} failures</span>
            </div>
            <Slider defaultValue={[3]} min={1} max={10} step={1} />
            <p className="text-xs text-muted-foreground">Number of consecutive failures before auto-healing triggers.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceThresholds;
