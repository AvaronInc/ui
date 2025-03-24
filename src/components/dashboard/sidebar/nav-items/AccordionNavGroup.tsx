
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronDown, CircleDot } from 'lucide-react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar/sidebar-menu';
import { SidebarGroup } from '@/components/ui/sidebar/sidebar-group';
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
        <CollapsibleTrigger 
          className={cn(
            "flex w-full items-center justify-between px-3 py-1.5 text-sm font-semibold tracking-wide text-sidebar-foreground/80 hover:bg-sidebar-accent/30 rounded-md transition-all duration-200",
            "hover:text-sidebar-foreground hover:translate-x-0.5",
            isOpen && "text-sidebar-foreground bg-sidebar-accent/20",
            // Add a subtle highlight when this section contains the active route but is collapsed
            !isOpen && isAnyActive && "text-primary border-l-2 border-primary pl-[10px]"
          )}
        >
          <span className="flex items-center">
            {/* Show indicator dot when section contains active route but is collapsed */}
            {!isOpen && isAnyActive && (
              <CircleDot className="h-3 w-3 mr-1.5 text-primary animate-pulse-slow" />
            )}
            {title}
          </span>
          <ChevronDown 
            className={cn(
              "h-4 w-4 text-sidebar-foreground/70 transition-transform duration-200", 
              isOpen && "transform rotate-180"
            )} 
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="animate-accordion-down">
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
                        "nav-link text-sm flex items-center transition-all duration-200",
                        "hover:translate-x-1 hover:bg-sidebar-accent/40",
                        isActive ? "active bg-sidebar-accent/50 shadow-sm" : ""
                      )}
                    >
                      <item.icon className={cn(
                        "h-4 w-4 mr-2 transition-transform duration-200",
                        isActive ? "text-primary" : "text-sidebar-foreground/70",
                        "group-hover:text-sidebar-foreground"
                      )} />
                      <span className="flex-1">{item.title}</span>
                      {item.adminOnly && (
                        <Badge 
                          variant="outline" 
                          className="ml-2 text-[0.6rem] py-0 h-4 px-1 bg-slate-100 dark:bg-slate-800 transition-colors"
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
