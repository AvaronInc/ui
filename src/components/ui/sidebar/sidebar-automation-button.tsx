
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Zap } from 'lucide-react'

export const SidebarAutomationButton = () => {
  const navigate = useNavigate()
  
  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="w-full mt-4 bg-sidebar-accent/10 border-sidebar-accent/20"
      onClick={() => navigate('/automation')}
    >
      <Zap className="mr-2 h-4 w-4" />
      Automation Panel
    </Button>
  )
}
