
import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

export const SidebarAutomationButton = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isActive = location.pathname === '/automation'
  
  return (
    <Button 
      variant="outline" 
      size="sm" 
      className={cn(
        "w-full mt-4", 
        isActive 
          ? "bg-sidebar-accent text-sidebar-accent-foreground border-sidebar-accent" 
          : "bg-sidebar-accent/10 border-sidebar-accent/20"
      )}
      onClick={() => navigate('/automation')}
    >
      <Zap className={cn("mr-2 h-4 w-4", isActive ? "text-current" : "")} />
      Automation Panel
    </Button>
  )
}
