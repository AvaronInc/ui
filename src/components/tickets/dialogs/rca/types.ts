
export interface RootCause {
  id: number;
  cause: string;
  probability: string;
  description: string;
  evidence: string;
}

export interface AnalysisData {
  rootCauses: RootCause[];
  recommendedActions: string[];
}

export const mockAnalysisData: AnalysisData = {
  rootCauses: [
    { 
      id: 1,
      cause: "Network Latency Spike",
      probability: "92%",
      description: "A sudden increase in network latency caused by routing issues in the core switch infrastructure.",
      evidence: "Analyzed traffic patterns show a 300% increase in packet loss starting at 14:32 GMT on the affected systems.",
    },
    { 
      id: 2,
      cause: "Outdated Firmware",
      probability: "78%",
      description: "The affected system is running firmware version 3.2.1, which has known bugs when handling high volumes of concurrent connections.",
      evidence: "System logs show connection timeouts occurring at predictable intervals, matching bug reports for this firmware version.",
    },
    { 
      id: 3,
      cause: "Memory Allocation Error",
      probability: "65%",
      description: "A memory leak in the application caused gradual resource depletion until system failure.",
      evidence: "Memory usage graphs show a linear increase over time without corresponding user activity increases.",
    }
  ],
  recommendedActions: [
    "Update switch firmware to latest stable release (v4.2.3)",
    "Implement QoS prioritization for critical application traffic",
    "Add 30% capacity buffer to network monitoring thresholds",
    "Schedule weekly restart of affected services until permanent fix is deployed"
  ]
};
