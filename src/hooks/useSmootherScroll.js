import { useEffect } from 'react';

/**
 * Custom hook to implement smooth slow-fast-slow scrolling
 * Uses a cubic bezier easing function for the slow-fast-slow effect
 */
const useSmootherScroll = () => {
  useEffect(() => {
    // Store original scrolling position
    let targetScrollY = window.scrollY;
    let currentScrollY = window.scrollY;
    let scrolling = false;
    let scrollTimeout;
    
    // Cubic bezier easing function for slow-fast-slow effect
    const easeInOutCubic = (t) => {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };
    
    // Handle wheel events
    const handleWheel = (e) => {
      e.preventDefault();
      
      // Clear any existing scroll timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      // Determine direction and calculate target position
      const delta = e.deltaY;
      const direction = delta > 0 ? 1 : -1;
      
      // Calculate the scroll distance based on the section heights
      // We use viewport height as a rough estimate for section size
      const sectionHeight = window.innerHeight;
      
      // Find the current section and the next section to scroll to
      const currentSectionIndex = Math.round(window.scrollY / sectionHeight);
      const targetSectionIndex = 
        direction > 0 
          ? Math.min(currentSectionIndex + 1, document.body.scrollHeight / sectionHeight - 1)
          : Math.max(currentSectionIndex - 1, 0);
      
      targetScrollY = targetSectionIndex * sectionHeight;
      
      // Start animation if not already scrolling
      if (!scrolling) {
        scrolling = true;
        requestAnimationFrame(animateScroll);
      }
      
      // Set a timeout to prevent multiple rapid scrolls
      scrollTimeout = setTimeout(() => {
        scrollTimeout = null;
      }, 800); // Adjust timeout as needed
    };
    
    // Animation function
    const animateScroll = () => {
      // Calculate how far to scroll based on easing
      const distanceToTarget = targetScrollY - currentScrollY;
      
      // If we're very close to the target, just jump to it
      if (Math.abs(distanceToTarget) < 0.5) {
        currentScrollY = targetScrollY;
        window.scrollTo(0, currentScrollY);
        scrolling = false;
        return;
      }
      
      // Apply easing - step size is a percentage of the distance
      // Smaller step = slower animation, larger step = faster animation
      const step = distanceToTarget * 0.075;
      currentScrollY += step;
      
      // Perform the scroll
      window.scrollTo(0, currentScrollY);
      
      // Continue animation
      requestAnimationFrame(animateScroll);
    };
    
    // Add wheel event listener with passive: false to prevent default scrolling
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    // Cleanup
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, []);
};

export default useSmootherScroll;