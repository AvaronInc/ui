
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  Settings as SettingsIcon,
  User, 
  Users, 
  Briefcase, 
  Shield, 
  Network, 
  MapPin, 
  HardDrive, 
  List, 
  Bot, 
  Bell, 
  Code, 
  Database, 
  FileText 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbSeparator,
  BreadcrumbList,
  BreadcrumbPage
} from '@/components/ui/breadcrumb';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTransition from '@/components/transitions/PageTransition';
import SettingsCard from '@/components/settings/SettingsCard';
import AuditTrail from '@/components/settings/AuditTrail';
import GeneralSettings from '@/components/settings/general'; // Updated import path
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

const sections = [
  { id: 'general', name: 'General System Settings', icon: SettingsIcon },
  { id: 'user-access', name: 'User & Access Management', icon: Users },
  { id: 'workforce', name: 'Workforce EMS Settings', icon: Briefcase },
  { id: 'security', name: 'Security & Compliance Settings', icon: Shield },
  { id: 'network', name: 'Network & Infrastructure Settings', icon: Network },
  { id: 'nest', name: 'CyberNest Management Settings', icon: MapPin },
  { id: 'storage', name: 'File Storage (MinIO) Settings', icon: HardDrive },
  { id: 'logging', name: 'Logging & Audit Settings', icon: List },
  { id: 'ai', name: 'AI & Automation Settings', icon: Bot },
  { id: 'notification', name: 'Notification & Alert Settings', icon: Bell },
  { id: 'api', name: 'API & Integration Settings', icon: Code },
  { id: 'backup', name: 'Backup & Disaster Recovery Settings', icon: Database },
  { id: 'compliance', name: 'Compliance & Legal Settings', icon: FileText }
];

const AdminSettings = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Filter sections based on search query
  const filteredSections = sections.filter(section => 
    section.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get current section from URL or default to 'general'
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && sections.some(section => section.id === hash)) {
      setActiveSection(hash);
    }
  }, [location]);

  // Update URL when section changes
  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    navigate(`#${sectionId}`);
  };

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
    <DashboardLayout>
      <PageTransition>
        <div className="flex flex-col p-6 h-full">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Admin Settings</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
            {/* Settings Sidebar */}
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search settings..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="bg-card rounded-lg border shadow-sm">
                <div className="p-4 border-b">
                  <h3 className="font-medium">Settings Categories</h3>
                </div>
                <nav className="p-2">
                  <ul className="space-y-1">
                    {filteredSections.map((section) => (
                      <li key={section.id}>
                        <Button
                          variant={activeSection === section.id ? "secondary" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => handleSectionChange(section.id)}
                        >
                          <section.icon className="mr-2 h-4 w-4" />
                          <span className="truncate">{section.name}</span>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              
              <SettingsCard
                title="Recent Activity"
                className="hidden lg:block"
              >
                <AuditTrail />
              </SettingsCard>
            </div>
            
            {/* Settings Content */}
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
          </div>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default AdminSettings;
