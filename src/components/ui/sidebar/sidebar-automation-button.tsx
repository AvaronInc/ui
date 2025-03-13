
import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Zap } from 'lucide-react'
import { SidebarMenuItem, SidebarMenuButton } from './sidebar-menu'

export const SidebarAutomationButton = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isActive = location.pathname === '/automation'
  
  return (
    <SidebarMenuItem>
      <SidebarMenuButton 
        asChild
        isActive={isActive}
      >
        <button
          onClick={() => navigate('/automation')}
          className={cn(
            "nav-link w-full justify-start",
            isActive && "active"
          )}
        >
          <Zap className="h-5 w-5 mr-3" />
          <span>Automation Panel</span>
        </button>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
