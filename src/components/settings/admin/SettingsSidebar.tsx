
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SettingsCard from '@/components/settings/SettingsCard';
import AuditTrail from '@/components/settings/AuditTrail';
import { SectionType } from './types';

interface SettingsSidebarProps {
  sections: SectionType[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

const SettingsSidebar = ({ sections, activeSection, onSectionChange }: SettingsSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter sections based on search query
  const filteredSections = sections.filter(section => 
    section.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
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
                  onClick={() => onSectionChange(section.id)}
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
  );
};

export default SettingsSidebar;
