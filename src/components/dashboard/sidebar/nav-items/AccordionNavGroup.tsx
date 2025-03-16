
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup } from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { NavItem } from './navigation-data';

interface AccordionNavGroupProps {
  title: string;
  items: NavItem[];
  isAdmin?: boolean;
}

const AccordionNavGroup: React.FC<AccordionNavGroupProps> = ({ 
  title, 
  items, 
  isAdmin = false 
}) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  
  // Check if any item in this group is active
  const isAnyActive = React.useMemo(() => {
    return items.some(item => location.pathname === item.href);
  }, [items, location.pathname]);
  
  // Open the accordion by default if any item is active
  React.useEffect(() => {
    if (isAnyActive) {
      setIsOpen(true);
    }
  }, [isAnyActive]);

  return (
    <SidebarGroup>
      <Collapsible 
        open={isOpen} 
        onOpenChange={setIsOpen}
        className="w-full"
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between px-3 py-2 text-sm font-semibold tracking-wide text-sidebar-foreground/80 hover:bg-sidebar-accent/30 rounded-md">
          <span>{title}</span>
          <ChevronDown 
            className={cn("h-4 w-4 text-sidebar-foreground/70 transition-transform", 
              isOpen && "transform rotate-180"
            )} 
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenu>
            {items.map((item) => {
              // Skip items that require admin if user is not admin
              if (item.adminOnly && !isAdmin) return null;
              
              const isActive = location.pathname === item.href;
              
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={isActive}>
                    <Link 
                      to={item.href} 
                      className={cn(
                        "nav-link text-sm flex items-center",
                        isActive && "active"
                      )}
                    >
                      <item.icon className="h-4 w-4 mr-3" />
                      <span className="flex-1">{item.title}</span>
                      {item.adminOnly && (
                        <Badge 
                          variant="outline" 
                          className="ml-2 text-[0.6rem] py-0 h-4 px-1 bg-slate-100 dark:bg-slate-800"
                        >
                          Admin
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </CollapsibleContent>
      </Collapsible>
    </SidebarGroup>
  );
};

export default AccordionNavGroup;
