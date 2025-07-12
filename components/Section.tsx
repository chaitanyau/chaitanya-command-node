import React from 'react';
import { motion, Variants } from 'framer-motion';

// Define the component's props for type safety.
interface SectionProps {
  children: React.ReactNode;
  id: string; // The ID for anchor linking (e.g., "about", "projects")
  className?: string; // For any additional custom styling
}

// ACTION: Defined animation variants for a cleaner, more readable component.
const sectionVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50, // A slightly smaller initial offset
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] // A high-quality ease-out curve
    },
  },
};

export const Section: React.FC<SectionProps> = ({ children, id, className = '' }) => {
  return (
    // FIX: The section tag now has the crucial "section" class.
    // This is the fundamental fix for the header conflict issue.
    // It applies the 'scroll-margin-top' from my index.css.
    <motion.section
      id={id}
      className={`section ${className}`}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      // FIX: 'once: false' makes the animation trigger on scroll up AND down.
      // 'amount: 0.1' triggers the animation when 10% of the section is visible.
      viewport={{ once: false, amount: 0.1 }}
    >
      {/* 
        ACTION: The inner div now handles all padding and layout.
        - 'paddingBlock' is a modern CSS property for vertical padding.
        - It uses our fluid CSS variable '--space-xl' for responsive spacing.
      */}
      <div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ paddingBlock: 'var(--space-xl)' }}
      >
        {children}
      </div>
    </motion.section>
  );
};