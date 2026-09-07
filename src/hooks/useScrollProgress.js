import { useState, useEffect } from 'react';

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentProgress = totalHeight > 0 ? Math.min(Math.max(scrollY / totalHeight, 0), 1) : 0;
          setScrollProgress(currentProgress);

          const sectionIds = [
            'section-0',
            'section-1',
            'section-2',
            'section-3',
            'section-4',
            'section-5',
            'section-6',
          ];

          // If scrolled to the bottom of the document, activate the last section
          if (totalHeight > 0 && scrollY >= totalHeight - 50) {
            setActiveSection(sectionIds.length - 1);
            ticking = false;
            return;
          }

          // Active section threshold: light up as entered the beginning of the section (~140px offset from top)
          const viewportThreshold = 140;
          let currentActive = 0;

          for (let i = 0; i < sectionIds.length; i++) {
            const el = document.getElementById(sectionIds[i]);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= viewportThreshold) {
                currentActive = i;
              }
            }
          }

          setActiveSection(currentActive);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return { scrollProgress, activeSection };
}

