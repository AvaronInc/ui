import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

// Create a more robust safe wrapper component that provides TooltipProvider context when needed
const SafeTooltipWrapper = ({ children }: { children: React.ReactNode }) => {
  // Use a ref to check if we're already inside a TooltipProvider context
  const tooltipProviderRef = React.useRef<boolean>(false);
  
  // Try to access TooltipProvider context to see if it exists
  try {
    // This will throw an error if TooltipProvider context is not available
    React.useContext(TooltipPrimitive.TooltipProviderContext);
    tooltipProviderRef.current = true;
  } catch (e) {
    tooltipProviderRef.current = false;
  }

  // If we're already inside a TooltipProvider context, just render children
  // Otherwise, wrap children with TooltipProvider
  return tooltipProviderRef.current ? (
    <>{children}</>
  ) : (
    <TooltipProvider>{children}</TooltipProvider>
  );
};

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, SafeTooltipWrapper }
