
import React from 'react';
import { Server } from 'lucide-react';
import VirtualSwitchConfigDialog from '../components/virtual-switch/VirtualSwitchConfigDialog';
import VirtualSwitchSecurityDialog from '../components/virtual-switch/VirtualSwitchSecurityDialog';
import SwitchActionButtons from '../components/virtual-switch/management/SwitchActionButtons';
import NetworkTopologySection from '../components/virtual-switch/management/NetworkTopologySection';
import PerformanceMetricsSection from '../components/virtual-switch/management/PerformanceMetricsSection';
import SwitchDashboardSection from '../components/virtual-switch/management/SwitchDashboardSection';
import { useVirtualSwitchManagement } from '../components/virtual-switch/management/useVirtualSwitchManagement';

const VirtualSwitchManagementTab: React.FC = () => {
  const {
    selectedSwitch,
    setSelectedSwitch,
    configDialogOpen,
    setConfigDialogOpen,
    securityDialogOpen,
    setSecurityDialogOpen,
    handleCreateSwitch,
    handleDeploySwitch,
    handleModifySwitch,
    handleDeleteSwitch,
    handleAttachVLAN,
    handleSecuritySettings,
    handleApplySecurity
  } = useVirtualSwitchManagement();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold flex items-center">
          <Server className="mr-2 h-6 w-6 text-primary" />
          Virtual Switch Management
        </h2>
        <SwitchActionButtons
          selectedSwitch={selectedSwitch}
          onCreateSwitch={handleCreateSwitch}
          onModifySwitch={handleModifySwitch}
          onDeleteSwitch={handleDeleteSwitch}
          onAttachVLAN={handleAttachVLAN}
          onSecuritySettings={handleSecuritySettings}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NetworkTopologySection 
          onSelectSwitch={setSelectedSwitch} 
          selectedSwitch={selectedSwitch} 
        />
        <PerformanceMetricsSection selectedSwitch={selectedSwitch} />
      </div>

      <SwitchDashboardSection 
        onSelectSwitch={setSelectedSwitch} 
        selectedSwitch={selectedSwitch} 
      />

      <VirtualSwitchConfigDialog 
        open={configDialogOpen}
        onClose={() => setConfigDialogOpen(false)}
        onDeploy={handleDeploySwitch}
      />

      <VirtualSwitchSecurityDialog 
        open={securityDialogOpen}
        onClose={() => setSecurityDialogOpen(false)}
        selectedSwitch={selectedSwitch}
        onApply={handleApplySecurity}
      />
    </div>
  );
};

export default VirtualSwitchManagementTab;
