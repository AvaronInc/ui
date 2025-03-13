
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbSeparator,
  BreadcrumbList,
  BreadcrumbPage
} from '@/components/ui/breadcrumb';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTransition from '@/components/transitions/PageTransition';
import { SettingsSidebar, SettingsContent, settingsSections } from '@/components/settings/admin';

const AdminSettings = () => {
  const [activeSection, setActiveSection] = useState('general');
  const navigate = useNavigate();
  const location = useLocation();

  // Get current section from URL or default to 'general'
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && settingsSections.some(section => section.id === hash)) {
      setActiveSection(hash);
    }
  }, [location]);

  // Update URL when section changes
  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    navigate(`#${sectionId}`);
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
            <SettingsSidebar 
              sections={settingsSections}
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
            />
            
            {/* Settings Content */}
            <SettingsContent 
              activeSection={activeSection}
              sections={settingsSections}
            />
          </div>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default AdminSettings;
