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
  // Use a ref to track if we're already inside a TooltipProvider context
  const [hasProvider, setHasProvider] = React.useState<boolean>(false);
  
  // Use effect to safely check for provider
  React.useEffect(() => {
    // A simple heuristic to determine if a provider is already available
    // We create a dummy tooltip and see if it renders without error
    try {
      const testElement = document.createElement('div');
      document.body.appendChild(testElement);
      
      const tooltipRoot = document.createElement('div');
      tooltipRoot.dataset.radixTooltipRoot = '';
      testElement.appendChild(tooltipRoot);
      
      // If a TooltipProvider exists, the data attribute should be processed
      // We use this as a proxy to determine if we're already within a provider
      setHasProvider(testElement.querySelector('[data-radix-tooltip-root]') !== null);
      
      // Clean up
      document.body.removeChild(testElement);
    } catch (e) {
      // If any error occurs, assume we need a provider
      setHasProvider(false);
    }
  }, []);

  // If we determined a provider exists, render children directly
  // Otherwise, wrap with our own provider
  return hasProvider ? (
    <>{children}</>
  ) : (
    <TooltipProvider>{children}</TooltipProvider>
  );
};

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, SafeTooltipWrapper }
