
import React from 'react';

const TestExecutionConsole: React.FC = () => {
  return (
    <div className="w-full h-[300px] bg-black rounded-lg text-green-400 font-mono text-sm p-4 overflow-auto">
      <div className="space-y-1">
        <div>[09:15:22] Initializing security test suite v2.4.1</div>
        <div>[09:15:23] Target environment: Edge Network Infrastructure</div>
        <div>[09:15:24] Loading test modules: network-tests, firewall-tests, endpoint-tests</div>
        <div className="text-white">[09:15:26] Starting test execution with parameters: intensity=medium, rollback=true</div>
        <div>[09:15:30] RUNNING Firewall Rule Verification Test #1</div>
        <div className="text-green-400">[09:15:35] PASS: Default deny policy correctly implemented</div>
        <div>[09:15:38] RUNNING Firewall Rule Verification Test #2</div>
        <div className="text-green-400">[09:15:43] PASS: Admin interfaces properly restricted</div>
        <div>[09:15:46] RUNNING DNS Security Test #1</div>
        <div className="text-green-400">[09:15:52] PASS: DNSSEC properly implemented</div>
        <div>[09:15:55] RUNNING DNS Security Test #2</div>
        <div className="text-red-400">[09:16:05] FAIL: DNS zone transfer restrictions not properly configured</div>
        <div className="text-yellow-400">[09:16:06] WARNING: Potential information disclosure risk detected</div>
        <div>[09:16:10] RUNNING Packet Filtering Test #1</div>
        <div className="text-green-400">[09:16:18] PASS: SYN flood protection active</div>
        <div>[09:16:22] RUNNING Packet Filtering Test #2</div>
        <div className="text-red-400">[09:16:30] FAIL: IPv6 filtering rules insufficient</div>
        <div>[09:16:35] RUNNING Network Segmentation Test #1</div>
        <div className="text-green-400">[09:16:42] PASS: VLAN segmentation properly implemented</div>
        <div>[09:16:45] RUNNING Network Segmentation Test #2</div>
        <div className="text-white">[09:16:50] Executing cross-zone connectivity tests...</div>
        <div className="text-green-400">[09:17:02] PASS: Production to Development zone restrictions verified</div>
        <div className="animate-pulse">[09:17:05] RUNNING Zero Trust Access Test #1...</div>
      </div>
    </div>
  );
};

export default TestExecutionConsole;
