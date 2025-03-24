
import React from 'react';
import { cn } from '@/lib/utils';
import { SidebarContent } from '@/components/ui/sidebar/sidebar-structure';
import { SidebarSeparator } from '@/components/ui/sidebar/sidebar-structure';
import { useAuth } from '@/context/auth';
import AccordionNavGroup from './AccordionNavGroup';
import { navSections } from './navigation-data';

interface SidebarNavItemsProps {
  className?: string;
}

const SidebarNavItems: React.FC<SidebarNavItemsProps> = ({ className }) => {
  const { isAdmin } = useAuth();
  
  return (
    <SidebarContent className={cn("px-1.5 py-1", className)}>
      {navSections.map((section, index) => (
        <React.Fragment key={section.title}>
          <AccordionNavGroup 
            title={section.title} 
            items={section.items} 
            isAdmin={isAdmin} 
          />
          
          {/* Add separator except after the last item */}
          {index < navSections.length - 1 && (
            <SidebarSeparator className="my-0.5" />
          )}
        </React.Fragment>
      ))}
    </SidebarContent>
  );
};

export default SidebarNavItems;
