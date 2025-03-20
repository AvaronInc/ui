
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

  // Parse URL params and fragments
  useEffect(() => {
    // Check for hash fragment
    const hashPath = location.hash.replace('#', '');
    
    // Handle both simple fragments and complex ones with subpaths
    if (hashPath) {
      if (hashPath.includes('/')) {
        // For paths like '#security/firewall'
        const [sectionId, subPath] = hashPath.split('/');
        if (settingsSections.some(section => section.id === sectionId)) {
          setActiveSection(sectionId);
          
          // Store subpath in sessionStorage for the section component to use
          if (subPath) {
            sessionStorage.setItem(`${sectionId}-active-tab`, subPath);
          }
        }
      } else {
        // For simple paths like '#security'
        if (settingsSections.some(section => section.id === hashPath)) {
          setActiveSection(hashPath);
        }
      }
    }
    
    // Also check for query params (for compatibility with existing links)
    const searchParams = new URLSearchParams(location.search);
    const sectionParam = searchParams.get('section');
    if (sectionParam && settingsSections.some(section => section.id === sectionParam)) {
      setActiveSection(sectionParam);
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
