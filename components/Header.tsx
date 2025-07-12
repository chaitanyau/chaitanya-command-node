import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { GlossyGradient } from './GlossyGradient';

interface HeaderProps {
  links: { name: string; href: string }[];
}

// ACTION: Added animation variants to define the header's visible and hidden states.
const headerVariants: Variants = {
    // The 'visible' state (when scrolling up)
    visible: { 
        y: 0,
        transition: { duration: 0.3, ease: 'easeOut' }
    },
    // The 'hidden' state (when scrolling down)
    hidden: { 
        y: '-100%', // Slides the header completely out of view
        transition: { duration: 0.3, ease: 'easeIn' }
    },
};

const GradientBackground = () => (
  <div className="absolute top-0 left-0 w-full h-full z-0">
    <Canvas>
      <Suspense fallback={null}>
        <GlossyGradient scale={1.0} />
      </Suspense>
    </Canvas>
  </div>
);

export const Header: React.FC<HeaderProps> = ({ links }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- ACTION: Logic for the show/hide on scroll feature ---
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
        // If the mobile menu is open, do nothing. Keep the header visible.
        if (isMobileMenuOpen) {
            setIsHeaderVisible(true);
            return;
        }

        const currentScrollY = window.scrollY;
        // A small buffer to prevent hiding at the very top of the page
        const scrollBuffer = 50; 

        // Hide header logic: Scrolling DOWN and past the buffer
        if (currentScrollY > lastScrollY.current && currentScrollY > scrollBuffer) {
            setIsHeaderVisible(false);
        } 
        // Show header logic: Scrolling UP
        else {
            setIsHeaderVisible(true);
        }
        
        // Update the last scroll position for the next event
        lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]); // Re-run the effect if the mobile menu state changes.

  return (
    // ACTION: The header is now a motion component, animated based on our state.
    <motion.header 
        className="fixed top-0 left-0 w-full z-40"
        variants={headerVariants}
        // The animate prop intelligently switches between 'visible' and 'hidden'
        animate={isHeaderVisible ? 'visible' : 'hidden'}
    >
      {/* --- DESKTOP HEADER --- */}
      <div className="header-container relative flex justify-between items-center shadow-lg overflow-hidden px-4 sm:px-6 lg:px-8">
        <GradientBackground />

        <div className="relative z-10 w-full flex justify-between items-center">
          <a
            href="#home"
            className="text-2xl lg:text-3xl font-orbitron font-black tracking-wider text-white transition-all duration-300 ease-in-out drop-shadow-[0_3px_3px_rgba(0,0,0,0.8)] can-hover:hover:text-cyan-300 can-hover:hover:scale-105"
          >
            C<span className="text-brand-primary">/</span>R
          </a>

          <nav className="hidden md:flex gap-x-8 items-center">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                // FIX: Corrected a typo from can-hover::scale-110
                className="inline-block text-base font-sans font-semibold tracking-wider text-slate-300 can-hover:hover:text-cyan-400 can-hover:hover:scale-110 transition-all duration-300 ease-in-out"
              >
                <span className="text-brand-primary/80 mr-1">/</span>
                {link.name.toLowerCase()}
              </a>
            ))}
          </nav>

          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)] z-50">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'} /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-[75%] max-w-[320px] bg-brand-dark shadow-2xl z-50 md:hidden"
            >
              <nav className="h-full flex flex-col items-center justify-center gap-8">
                {links.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-sans font-bold text-slate-200 can-hover:hover:text-brand-primary transition-colors duration-200"
                  >
                    /{link.name.toLowerCase()}
                  </a>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};