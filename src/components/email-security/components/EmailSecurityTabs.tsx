
import { ReactNode } from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Bell, 
  Users, 
  Lock, 
  FileText, 
  Search, 
  Phone, 
  LayoutDashboard 
} from 'lucide-react';

interface EmailSecurityTabsProps {
  activeTab: string;
}

const EmailSecurityTabs = ({ activeTab }: EmailSecurityTabsProps) => {
  return (
    <TabsList className="grid grid-cols-9 w-full">
      <TabsTrigger value="overview" className="flex items-center gap-2">
        <LayoutDashboard className="h-4 w-4" />
        <span className="hidden md:inline">Overview</span>
      </TabsTrigger>
      <TabsTrigger value="filtering" className="flex items-center gap-2">
        <Shield className="h-4 w-4" />
        <span className="hidden md:inline">DLP Filtering</span>
      </TabsTrigger>
      <TabsTrigger value="risk" className="flex items-center gap-2">
        <Bell className="h-4 w-4" />
        <span className="hidden md:inline">Risk Assessment</span>
      </TabsTrigger>
      <TabsTrigger value="identity" className="flex items-center gap-2">
        <Users className="h-4 w-4" />
        <span className="hidden md:inline">Identity Verification</span>
      </TabsTrigger>
      <TabsTrigger value="encryption" className="flex items-center gap-2">
        <Lock className="h-4 w-4" />
        <span className="hidden md:inline">Encryption</span>
      </TabsTrigger>
      <TabsTrigger value="logging" className="flex items-center gap-2">
        <FileText className="h-4 w-4" />
        <span className="hidden md:inline">Logging & Compliance</span>
      </TabsTrigger>
      <TabsTrigger value="alerts" className="flex items-center gap-2">
        <Bell className="h-4 w-4" />
        <span className="hidden md:inline">Threat Alerts</span>
      </TabsTrigger>
      <TabsTrigger value="analysis" className="flex items-center gap-2">
        <Search className="h-4 w-4" />
        <span className="hidden md:inline">Historical Analysis</span>
      </TabsTrigger>
      <TabsTrigger value="voice" className="flex items-center gap-2">
        <Phone className="h-4 w-4" />
        <span className="hidden md:inline">Voice Alerts</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default EmailSecurityTabs;
