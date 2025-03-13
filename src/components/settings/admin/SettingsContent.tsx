
import { Badge } from '@/components/ui/badge';
import SettingsCard from '@/components/settings/SettingsCard';
import AuditTrail from '@/components/settings/AuditTrail';
import GeneralSettings from '@/components/settings/general';
import UserAccessSettings from '@/components/settings/UserAccessSettings';
import WorkforceSettings from '@/components/settings/WorkforceSettings';
import SecuritySettings from '@/components/settings/SecuritySettings';
import NetworkSettings from '@/components/settings/NetworkSettings';
import NestSettings from '@/components/settings/NestSettings';
import StorageSettings from '@/components/settings/StorageSettings';
import LoggingSettings from '@/components/settings/LoggingSettings';
import AISettings from '@/components/settings/AISettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import APISettings from '@/components/settings/APISettings';
import BackupSettings from '@/components/settings/BackupSettings';
import ComplianceSettings from '@/components/settings/ComplianceSettings';
import { SectionType } from './types';

interface SettingsContentProps {
  activeSection: string;
  sections: SectionType[];
}

const SettingsContent = ({ activeSection, sections }: SettingsContentProps) => {
  // Render the active section content
  const renderSectionContent = () => {
    switch (activeSection) {
      case 'general':
        return <GeneralSettings />;
      case 'user-access':
        return <UserAccessSettings />;
      case 'workforce':
        return <WorkforceSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'network':
        return <NetworkSettings />;
      case 'nest':
        return <NestSettings />;
      case 'storage':
        return <StorageSettings />;
      case 'logging':
        return <LoggingSettings />;
      case 'ai':
        return <AISettings />;
      case 'notification':
        return <NotificationSettings />;
      case 'api':
        return <APISettings />;
      case 'backup':
        return <BackupSettings />;
      case 'compliance':
        return <ComplianceSettings />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="bg-card rounded-lg border shadow-sm">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">{sections.find(s => s.id === activeSection)?.name}</h2>
          <Badge variant="outline" className="text-sm">
            Admin Only
          </Badge>
        </div>
        <div className="p-4">
          {renderSectionContent()}
        </div>
      </div>
      
      <SettingsCard
        title="Recent Activity"
        className="lg:hidden"
      >
        <AuditTrail />
      </SettingsCard>
    </div>
  );
};

export default SettingsContent;
