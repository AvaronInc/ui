
import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if the current device is a mobile device
 * based on screen width.
 * 
 * @param breakpoint The max width in pixels to consider as mobile (default: 768)
 * @returns Boolean indicating if the current device is mobile
 */
export const useIsMobile = (breakpoint: number = 768): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Check on mount
    checkMobile();

    // Add resize listener with debounce for better performance
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkMobile, 100);
    };
    
    window.addEventListener('resize', handleResize);

    // Remove listener on cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
